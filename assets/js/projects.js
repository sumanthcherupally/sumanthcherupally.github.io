// Project grid: picture cards that reveal their name on hover and open a details panel on click.
(function () {
  "use strict";

  const grid = document.getElementById("project-grid");
  const panel = document.getElementById("project-panel");
  const projects = window.PROJECTS || [];
  if (!grid || !panel) return;

  const $ = (id) => document.getElementById(id);

  const open = (p) => {
    $("pp-img").src = p.image;
    $("pp-img").alt = p.title;
    $("pp-where").textContent = p.where || "";
    $("pp-title").textContent = p.title;
    $("pp-summary").textContent = p.summary || "";

    const ul = $("pp-points");
    ul.innerHTML = "";
    (p.points || []).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });

    const tags = $("pp-tags");
    tags.innerHTML = "";
    (p.tags || []).forEach((t) => {
      const s = document.createElement("span");
      s.textContent = t;
      tags.appendChild(s);
    });

    const links = $("pp-links");
    links.innerHTML = "";
    (p.links || []).forEach((l) => {
      const a = document.createElement("a");
      a.href = l.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = l.label + " ↗";
      links.appendChild(a);
    });
    links.hidden = !(p.links || []).length;

    if (!panel.open) panel.showModal();
  };

  projects.forEach((p) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "project";
    b.setAttribute("aria-label", `${p.title}: ${p.tagline}. Show details`);
    b.innerHTML = `
      <img src="${p.image}" alt="" loading="lazy">
      <span class="project-label">
        <b></b>
        <span></span>
      </span>`;
    b.querySelector("b").textContent = p.title;
    b.querySelector(".project-label span").textContent = p.tagline;
    b.addEventListener("click", () => open(p));
    grid.appendChild(b);
  });

  panel.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]") || e.target === panel) panel.close();
  });
})();
