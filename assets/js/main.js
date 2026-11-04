// Shared behavior: footer year, photo lightbox, Hobbies page galleries and chess board.
(function () {
  "use strict";

  // ---------- Footer year ----------
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Lightbox ----------
  // window.openLightbox(photos, startIndex, title) – photos: [{ src, caption }]
  const lb = document.getElementById("lightbox");
  if (lb) {
    const img = lb.querySelector(".lb-img");
    const cap = lb.querySelector(".lb-text");
    const count = lb.querySelector(".lb-count");
    let list = [];
    let idx = 0;
    let title = "";

    const show = () => {
      const p = list[idx];
      img.classList.remove("zoomed");
      img.src = p.src;
      img.alt = p.caption || title;
      cap.textContent = [title, p.caption].filter(Boolean).join(" · ");
      count.textContent = list.length > 1 ? `${idx + 1} / ${list.length}` : "";
      lb.querySelectorAll("[data-step]").forEach((b) => (b.hidden = list.length < 2));
    };

    window.openLightbox = (photos, start, t) => {
      if (!photos || !photos.length) return;
      list = photos;
      idx = start || 0;
      title = t || "";
      show();
      if (!lb.open) lb.showModal();
    };

    const step = (d) => {
      idx = (idx + d + list.length) % list.length;
      show();
    };

    lb.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-step]");
      if (btn) return step(Number(btn.dataset.step));
      if (e.target.closest("[data-close]") || e.target === lb) return lb.close();
      if (e.target === img) img.classList.toggle("zoomed");
    });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    // Zoom follows the cursor so you can look around a zoomed photo.
    img.addEventListener("mousemove", (e) => {
      if (!img.classList.contains("zoomed")) return;
      const r = img.getBoundingClientRect();
      img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
    });
  }

  // ---------- Hobby galleries ----------
  const photos = window.HOBBY_PHOTOS || {};
  document.querySelectorAll("[data-gallery]").forEach((el) => {
    const key = el.dataset.gallery;
    const items = photos[key] || [];
    const title = el.dataset.title || "";
    if (!items.length) {
      el.innerHTML = '<div class="placeholder">Photos coming soon</div>'.repeat(3);
      return;
    }
    items.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Open photo: ${p.caption || title}`);
      const im = document.createElement("img");
      im.src = p.thumb || p.src;
      im.alt = p.caption || title;
      im.loading = "lazy";
      b.appendChild(im);
      b.addEventListener("click", () => window.openLightbox(items, i, title));
      el.appendChild(b);
    });
  });

  // ---------- Live Lichess ratings ----------
  // The page ships with recent numbers; this swaps in the current ones when Lichess answers.
  const ratings = document.getElementById("chess-ratings");
  if (ratings && window.fetch) {
    fetch("https://lichess.org/api/user/Sumanth_18", { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((u) => {
        ratings.querySelectorAll("[data-perf]").forEach((b) => {
          const perf = u.perfs && u.perfs[b.dataset.perf];
          if (perf && perf.rating) b.textContent = perf.rating;
        });
        const games = u.count && u.count.all;
        const note = document.getElementById("chess-games");
        if (note && games) note.textContent = `Live from Lichess · ${games.toLocaleString()} games played`;
      })
      .catch(() => {});
  }

  // ---------- Chess board ----------
  // Renders a FEN position. Click one of your pieces, then a square, to move it around for fun.
  const board = document.getElementById("chess-board");
  if (board) {
    // Solid glyphs for both sides; white pieces get a white fill with a dark outline in CSS.
    // ︎ asks phones to draw them as text instead of emoji.
    const solid = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
    const glyph = (p) => solid[p.toLowerCase()] + "︎";
    const fen = (window.CHESS_POSITION && window.CHESS_POSITION.fen) || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const grid = [];
    fen.split(" ")[0].split("/").forEach((row) => {
      const r = [];
      for (const ch of row) {
        if (/\d/.test(ch)) for (let k = 0; k < Number(ch); k++) r.push("");
        else r.push(ch);
      }
      grid.push(r);
    });

    let picked = null;
    const files = "abcdefgh";
    const render = () => {
      board.innerHTML = "";
      grid.forEach((row, r) =>
        row.forEach((p, c) => {
          const sq = document.createElement("button");
          sq.type = "button";
          sq.className = "sq " + ((r + c) % 2 ? "dark" : "light");
          if (picked && picked[0] === r && picked[1] === c) sq.classList.add("hl");
          sq.setAttribute("aria-label", files[c] + (8 - r) + (p ? " " + p : ""));
          sq.style.border = "none";
          sq.style.cursor = p || picked ? "pointer" : "default";
          if (p) {
            const s = document.createElement("span");
            s.className = "piece " + (p === p.toUpperCase() ? "white" : "black");
            s.textContent = glyph(p);
            sq.appendChild(s);
          }
          sq.addEventListener("click", () => {
            if (picked) {
              const [pr, pc] = picked;
              if (pr !== r || pc !== c) {
                grid[r][c] = grid[pr][pc];
                grid[pr][pc] = "";
              }
              picked = null;
            } else if (p) {
              picked = [r, c];
            }
            render();
          });
          board.appendChild(sq);
        })
      );
    };
    render();
    const capEl = document.getElementById("chess-caption");
    if (capEl && window.CHESS_POSITION && window.CHESS_POSITION.caption) capEl.textContent = window.CHESS_POSITION.caption;
  }
})();
