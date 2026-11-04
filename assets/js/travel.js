// Travel map. Every photo sits at its own spot; nearby photos group into clusters that split
// apart as you zoom in. Hover a cluster to see a collage; click it to glide in.
// Click a photo to open its place's photos full screen. Data lives in data/travel.js.
(function () {
  "use strict";

  const el = document.getElementById("travel-map");
  if (!el || !window.L || !L.markerClusterGroup) return;

  const photos = (window.TRAVEL_PHOTOS || []).filter((p) => isFinite(p.lat) && isFinite(p.lng));
  const isTouch = window.matchMedia("(hover: none)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Map ----------
  const map = L.map(el, {
    worldCopyJump: true,
    scrollWheelZoom: false, // enabled after a click, so the page still scrolls normally
    minZoom: 2,
    maxZoom: 17,
    zoomSnap: 0.25,
    zoomDelta: 0.75,
    wheelPxPerZoomLevel: 90,
    zoomAnimation: !reduceMotion,
    markerZoomAnimation: !reduceMotion
  });

  const esri = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";
  L.tileLayer(esri + "World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    attribution: 'Tiles &copy; <a href="https://www.esri.com">Esri</a>, HERE, Garmin, &copy; OpenStreetMap contributors',
    maxZoom: 16,
    maxNativeZoom: 16
  }).addTo(map);
  L.tileLayer(esri + "World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", { maxZoom: 17, maxNativeZoom: 16 }).addTo(map);

  const hint = document.querySelector(".map-hint");
  map.on("click", () => {
    map.scrollWheelZoom.enable();
    if (hint) hint.style.opacity = "0";
  });
  el.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());

  // ---------- Helpers ----------
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const fly = (target, opts) => {
    const o = Object.assign({ duration: 0.9, easeLinearity: 0.2 }, opts);
    if (reduceMotion) o.animate = false;
    if (target.lat !== undefined) map.flyTo(target, o.zoom || map.getZoom(), o);
    else map.flyToBounds(target, Object.assign({ padding: [60, 60], maxZoom: 15 }, o));
  };

  // Photos of a cluster, featured ones first.
  const ordered = (list) => list.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const groupName = (list) => {
    const counts = {};
    list.forEach((p) => (counts[p.place || p.country || "Somewhere"] = (counts[p.place || p.country || "Somewhere"] || 0) + 1));
    const names = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    if (names.length === 1) return names[0];
    if (names.length === 2) return names[0] + " & " + names[1];
    return `${names[0]} + ${names.length - 1} more`;
  };

  const collage = (list) => {
    const pick = ordered(list).slice(0, 4);
    const cls = "collage n" + pick.length;
    return `<div class="${cls}">${pick.map((p) => `<img src="${esc(p.thumb || p.src)}" alt="">`).join("")}</div>`;
  };

  const cardForGroup = (list) => {
    const n = list.length;
    const hint = isTouch ? "Tap again to zoom in" : "Click to zoom in";
    return `${collage(list)}
      <div class="tip-body">
        <b>${esc(groupName(list))}</b>
        <span class="tip-meta">${n} photo${n > 1 ? "s" : ""}</span>
        <span class="tip-cta">${hint}</span>
      </div>`;
  };

  const cardForPhoto = (p) => `
      <div class="collage n1"><img src="${esc(p.thumb || p.src)}" alt="${esc(p.caption || p.place)}"></div>
      <div class="tip-body">
        <b>${esc(p.caption || p.place)}</b>
        <span class="tip-meta">${esc([p.place, p.date].filter(Boolean).join(" · "))}</span>
        <span class="tip-cta">${isTouch ? "Tap again to open" : "Click to open"}</span>
      </div>`;

  // ---------- Hover card ----------
  // One card element, positioned by us and clamped inside the map so it is never cut off.
  // Showing the same target again only moves it; it doesn't rebuild or restart animations.
  const shell = el.parentElement;
  const card = document.createElement("div");
  card.className = "map-card";
  card.setAttribute("aria-hidden", "true");
  shell.appendChild(card);

  let cardKey = null;
  let hideTimer = null;
  const GAP = 16, EDGE = 10;

  const placeCard = (latlng) => {
    const pt = map.latLngToContainerPoint(latlng);
    const W = el.clientWidth, H = el.clientHeight;
    const w = card.offsetWidth, h = card.offsetHeight;
    let top = pt.y - h - GAP; // prefer above
    let origin = "bottom";
    if (top < EDGE) { top = pt.y + GAP; origin = "top"; } // else below
    if (top + h > H - EDGE) { top = Math.max(EDGE, Math.min(H - h - EDGE, pt.y - h / 2)); origin = "center"; }
    let left = pt.x - w / 2;
    if (origin === "center") left = pt.x + GAP + w > W - EDGE ? pt.x - GAP - w : pt.x + GAP; // beside the marker
    left = Math.max(EDGE, Math.min(W - w - EDGE, left));
    card.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
    card.style.setProperty("--ox", `${Math.round(pt.x - left)}px`);
    card.dataset.origin = origin;
  };

  const showCard = (key, latlng, html) => {
    clearTimeout(hideTimer);
    if (cardKey !== key) {
      cardKey = key;
      card.classList.remove("show");
      card.innerHTML = html;
    }
    placeCard(latlng);
    requestAnimationFrame(() => card.classList.add("show"));
  };
  const hideCard = (now) => {
    clearTimeout(hideTimer);
    const go = () => { card.classList.remove("show"); cardKey = null; };
    if (now) go(); else hideTimer = setTimeout(go, 90); // short grace period avoids flicker between markers
  };
  map.on("zoomstart movestart", () => hideCard(true));

  // Load photos in the background so the first hover doesn't jump while images arrive.
  const preload = () => photos.forEach((p) => { const i = new Image(); i.decoding = "async"; i.src = p.thumb || p.src; });
  if ("requestIdleCallback" in window) requestIdleCallback(preload); else setTimeout(preload, 1200);

  // ---------- Markers ----------
  const squareIcon = L.divIcon({ className: "sq-pin", html: "<span></span>", iconSize: [16, 16], iconAnchor: [8, 8] });

  const clusters = L.markerClusterGroup({
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false, // handled below so the zoom uses the same smooth glide
    spiderfyOnMaxZoom: true,
    animate: !reduceMotion,
    animateAddingMarkers: false,
    maxClusterRadius: (z) => (z < 6 ? 70 : z < 11 ? 55 : 40),
    iconCreateFunction: (c) => {
      const n = c.getChildCount();
      const size = n < 10 ? 30 : n < 50 ? 34 : 38;
      return L.divIcon({
        className: "sq-cluster",
        html: `<span class="stack"><i></i><i></i><i></i></span><b>${n}</b>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    }
  });

  const byPlace = {};
  photos.forEach((p) => {
    const place = p.place || p.country || "Other";
    (byPlace[place] = byPlace[place] || []).push(p);

    const m = L.marker([p.lat, p.lng], { icon: squareIcon, keyboard: true, title: p.caption || p.place, riseOnHover: true });
    m.photo = p;
    const key = "p:" + p.src;
    m.on("mouseover", () => showCard(key, m.getLatLng(), cardForPhoto(p)));
    m.on("mouseout", () => hideCard());
    m.on("click", () => {
      if (isTouch && cardKey !== key) return showCard(key, m.getLatLng(), cardForPhoto(p));
      hideCard(true);
      const group = byPlace[place];
      window.openLightbox && window.openLightbox(group, group.indexOf(p), place);
    });
    clusters.addLayer(m);
  });
  map.addLayer(clusters);

  // ---------- Cluster hover shows a collage card; click glides in ----------
  const clusterKey = (c) => "c:" + c.getAllChildMarkers().map((m) => m.photo.src).sort().join("|");
  const showCluster = (c) => showCard(clusterKey(c), c.getLatLng(), cardForGroup(c.getAllChildMarkers().map((m) => m.photo)));

  const zoomInto = (c) => {
    hideCard(true);
    const b = c.getBounds();
    // Photos at almost the same spot can't split further; fan them out instead.
    if (map.getZoom() >= map.getMaxZoom() - 0.5 || b.getNorthEast().distanceTo(b.getSouthWest()) < 30) return c.spiderfy();
    fly(b.pad(0.15), { duration: 1.0 });
  };

  clusters.on("clustermouseover", (e) => showCluster(e.layer));
  clusters.on("clustermouseout", () => hideCard());
  clusters.on("clusterclick", (e) => {
    if (isTouch && cardKey !== clusterKey(e.layer)) return showCluster(e.layer);
    zoomInto(e.layer);
  });
  // Tapping empty map on a phone closes the card.
  map.on("click", () => hideCard(true));

  // ---------- Home view, reset, place chips ----------
  const allBounds = photos.length ? L.latLngBounds(photos.map((p) => [p.lat, p.lng])).pad(0.35) : null;
  const home = (animate) => {
    if (!allBounds) return map.setView([20, 0], 2);
    if (animate) fly(allBounds, { maxZoom: 4, duration: 1.1 });
    else map.fitBounds(allBounds, { maxZoom: 4 });
  };
  home(false);

  const reset = document.querySelector(".map-reset");
  if (reset) reset.addEventListener("click", () => home(true));

  const listEl = document.getElementById("place-list");
  if (listEl) {
    Object.keys(byPlace).forEach((name) => {
      const group = byPlace[name];
      const b = L.latLngBounds(group.map((p) => [p.lat, p.lng]));
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.innerHTML = `${esc(name)} <span class="muted">${group.length}</span>`;
      chip.addEventListener("click", () => {
        fly(b.pad(0.2), { maxZoom: 12, duration: 1.2 });
        el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      });
      listEl.appendChild(chip);
    });
  }

  // ---------- Stats ----------
  const set = (k, v) => document.querySelectorAll(`[data-stat=${k}]`).forEach((s) => (s.textContent = v));
  const unit = (k, v) => document.querySelectorAll(`[data-unit=${k}]`).forEach((s) => { if (v === 1) s.textContent = s.dataset.one; });
  set("places", Object.keys(byPlace).length);
  unit("places", Object.keys(byPlace).length);
  set("countries", new Set(photos.map((p) => p.country)).size);
  unit("countries", new Set(photos.map((p) => p.country)).size);
  set("photos", photos.length);
  unit("photos", photos.length);
})();
