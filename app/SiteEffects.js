"use client"; // rulează în browser (folosește mouse, ceas, canvas)

import { useEffect } from "react";

// Componentă fără aspect vizual — doar „dă viață" paginii.
export default function SiteEffects() {
  useEffect(() => {
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches || window.innerWidth < 760;

    /* ---------- SOARE: lumina după ora reală ---------- */
    function sunState() {
      const now = new Date();
      const t = now.getHours() + now.getMinutes() / 60; // 0..24
      const RISE = 6, SET = 20;
      let elev = 0, x = 0.5;
      if (t >= RISE && t <= SET) { const p = (t - RISE) / (SET - RISE); x = p; elev = Math.sin(p * Math.PI); }
      else { elev = 0; x = t < RISE ? 0.08 : 0.92; }
      let color;
      if (elev < 0.06) color = "#5e7fa8";       // noapte (albastru rece)
      else if (elev < 0.35) color = "#ff9d5c";  // răsărit/apus cald
      else if (elev < 0.7) color = "#ffcf8f";   // dimineață/seară
      else color = "#fff4dc";                    // amiază
      return { x, elev, color };
    }
    function applySun() {
      const s = sunState();
      const r = document.documentElement.style;
      r.setProperty("--sun-color", s.color);
      r.setProperty("--sun-x", (8 + s.x * 84).toFixed(1) + "%");
      r.setProperty("--sun-y", (78 - s.elev * 64).toFixed(1) + "%");
      r.setProperty("--sun-elev", s.elev.toFixed(2));
    }
    applySun();
    const sunTimer = setInterval(applySun, 60000); // se actualizează cu timpul

    /* ---------- FUNDAL: puncte care reacționează la mouse ---------- */
    let rafBg = null;
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas ? canvas.getContext("2d") : null;
    let w, h, dots = [], mouse = { x: -999, y: -999 };
    function initDots() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      dots = [];
      const gap = 46;
      for (let i = gap; i < w; i += gap) for (let j = gap; j < h; j += gap) dots.push({ x: i, y: j, bx: i, by: j });
    }
    function drawDots() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy);
        let tx = d.bx, ty = d.by;
        if (dist < 120) { const f = (120 - dist) / 120; tx = d.bx + (dx / dist) * f * 14; ty = d.by + (dy / dist) * f * 14; }
        d.x += (tx - d.x) * 0.1; d.y += (ty - d.y) * 0.1;
        ctx.fillStyle = `rgba(95,179,214,${dist < 120 ? 0.5 : 0.16})`;
        ctx.fillRect(d.x, d.y, 1.6, 1.6);
      }
      rafBg = requestAnimationFrame(drawDots);
    }
    function onMouseDots(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
    if (canvas && !RM) {
      initDots();
      window.addEventListener("resize", initDots);
      window.addEventListener("mousemove", onMouseDots);
      drawDots();
    }

    /* ---------- NAV: fundal de sticlă la scroll ---------- */
    function onScroll() {
      const hdr = document.getElementById("hdr");
      if (hdr) hdr.classList.toggle("stuck", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();

    /* ---------- BUTOANE magnetice ---------- */
    const magnets = [];
    if (!isTouch) {
      document.querySelectorAll(".magnetic").forEach((b) => {
        const move = (e) => {
          const r = b.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          b.style.transform = `translate(${dx * 0.25}px,${dy * 0.35}px)`;
        };
        const leave = () => { b.style.transform = ""; };
        b.addEventListener("mousemove", move);
        b.addEventListener("mouseleave", leave);
        magnets.push({ b, move, leave });
      });
    }

    /* ---------- MENIU mobil ---------- */
    const hamb = document.getElementById("hamb");
    const mnav = document.getElementById("mnav");
    const toggleMenu = () => mnav && mnav.classList.toggle("open");
    const closeMenu = () => mnav && mnav.classList.remove("open");
    if (hamb) hamb.addEventListener("click", toggleMenu);
    if (mnav) mnav.addEventListener("click", closeMenu);

    /* ---------- curățenie ---------- */
    return () => {
      clearInterval(sunTimer);
      if (rafBg) cancelAnimationFrame(rafBg);
      window.removeEventListener("resize", initDots);
      window.removeEventListener("mousemove", onMouseDots);
      window.removeEventListener("scroll", onScroll);
      magnets.forEach(({ b, move, leave }) => { b.removeEventListener("mousemove", move); b.removeEventListener("mouseleave", leave); });
      if (hamb) hamb.removeEventListener("click", toggleMenu);
      if (mnav) mnav.removeEventListener("click", closeMenu);
    };
  }, []);

  return null; // nu afișează nimic, doar adaugă comportament
}