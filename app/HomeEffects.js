"use client"; // rulează în browser

import { useEffect } from "react";

export default function HomeEffects() {
  useEffect(() => {
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches || window.innerWidth < 760;

    /* ---------- SOARE: arcul din hero ---------- */
    function sunState() {
      const now = new Date();
      const t = now.getHours() + now.getMinutes() / 60;
      const RISE = 6, SET = 20;
      let elev = 0, x = 0.5;
      if (t >= RISE && t <= SET) { const p = (t - RISE) / (SET - RISE); x = p; elev = Math.sin(p * Math.PI); }
      else { elev = 0; x = t < RISE ? 0.08 : 0.92; }
      let color;
      if (elev < 0.06) color = "#5e7fa8";
      else if (elev < 0.35) color = "#ff9d5c";
      else if (elev < 0.7) color = "#ffcf8f";
      else color = "#fff4dc";
      return { x, elev, color };
    }
    function drawSunArc() {
      const svg = document.getElementById("sunArc");
      if (!svg) return;
      const s = sunState();
      const H = 360, x = 40 + s.x * 920, y = H - (40 + s.elev * 250);
      svg.innerHTML =
        '<defs><radialGradient id="sg" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="' + s.color + '" stop-opacity="1"/>' +
        '<stop offset="40%" stop-color="' + s.color + '" stop-opacity=".55"/>' +
        '<stop offset="100%" stop-color="' + s.color + '" stop-opacity="0"/>' +
        '</radialGradient></defs>' +
        '<path d="M 40 320 Q 500 -60 960 320" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="1.5" stroke-dasharray="2 7"/>' +
        '<circle cx="' + x + '" cy="' + y + '" r="70" fill="url(#sg)"/>' +
        '<circle cx="' + x + '" cy="' + y + '" r="9" fill="' + s.color + '"/>';
    }
    drawSunArc();
    const arcTimer = setInterval(drawSunArc, 60000);

    /* ---------- MARQUEE ---------- */
    const mq = document.getElementById("mq");
    if (mq) {
      const words = ["24/7", "FITNESS", "CARDIO", "SAUNĂ"];
      const make = () => words.map((w, i) => '<span class="' + (i % 2 ? "fill" : "") + '">' + w + "</span><span>•</span>").join("");
      mq.innerHTML = make() + make();
    }

    /* ---------- QR demo (se reîmprospătează) ---------- */
    function makeQR(id, N) {
      const c = document.getElementById(id);
      if (!c) return;
      c.style.gridTemplateColumns = "repeat(" + N + ",1fr)";
      const cells = Array.from({ length: N * N }, () => Math.random() > 0.52);
      function f(r0, c0, size) {
        for (let r = 0; r < size; r++) for (let cc = 0; cc < size; cc++) {
          const on = (r === 0 || r === size - 1 || cc === 0 || cc === size - 1) || (r >= 2 && r <= size - 3 && cc >= 2 && cc <= size - 3);
          cells[(r0 + r) * N + (c0 + cc)] = on;
        }
      }
      f(0, 0, 7); f(0, N - 7, 7); f(N - 7, 0, 7);
      c.innerHTML = cells.map((o) => '<div class="qc' + (o ? " on" : "") + '"></div>').join("");
    }
    let qrTimer = null;
    if (document.getElementById("qr")) {
      makeQR("qr", 25);
      let qs = 20;
      qrTimer = setInterval(() => {
        const e = document.getElementById("qrSec");
        if (!e) return;
        qs--; e.textContent = qs;
        if (qs <= 0) { qs = 20; makeQR("qr", 25); }
      }, 1000);
    }
    // mini-QR din telefon
    const aq = document.getElementById("appqr");
    if (aq) {
      const N = 17;
      aq.style.gridTemplateColumns = "repeat(" + N + ",1fr)";
      const cells = Array.from({ length: N * N }, () => Math.random() > 0.5);
      function f(r0, c0) { for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const on = (i === 0 || i === 4 || j === 0 || j === 4) || (i === 2 && j === 2); cells[(r0 + i) * N + (c0 + j)] = on; } }
      f(0, 0); f(0, N - 5); f(N - 5, 0);
      aq.innerHTML = cells.map((o) => '<div class="qc' + (o ? " on" : "") + '"></div>').join("");
    }

    /* ---------- COUNT-UP (numerele din Stats) ---------- */
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target, to = +el.dataset.to;
        if (RM) { el.textContent = to; }
        else { let n = 0; const step = Math.max(1, Math.ceil(to / 40)); const iv = setInterval(() => { n += step; if (n >= to) { n = to; clearInterval(iv); } el.textContent = n; }, 28); }
        countObs.unobserve(el);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".count").forEach((el) => countObs.observe(el));

    /* ---------- REVEAL la scroll ---------- */
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); revObs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

    /* ---------- light sweep când cardul intră ---------- */
    const sweepObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("lit"); setTimeout(() => en.target.classList.remove("lit"), 1300); sweepObs.unobserve(en.target); } });
    }, { threshold: 0.45 });
    document.querySelectorAll(".sweep").forEach((el) => sweepObs.observe(el));

    /* ---------- TELEFON: înclinare după mouse ---------- */
    const stage = document.querySelector(".phone-stage");
    const phone = document.getElementById("appPhone");
    let tiltMove = null, tiltLeave = null;
    if (stage && phone && !isTouch && !RM) {
      tiltMove = (e) => {
        const r = stage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        phone.style.transform = "rotateY(" + (-12 + px * 20) + "deg) rotateX(" + (4 - py * 16) + "deg)";
      };
      tiltLeave = () => { phone.style.transform = "rotateY(-12deg) rotateX(4deg)"; };
      stage.addEventListener("mousemove", tiltMove);
      stage.addEventListener("mouseleave", tiltLeave);
    }

    /* ---------- curățenie ---------- */
    return () => {
      clearInterval(arcTimer);
      if (qrTimer) clearInterval(qrTimer);
      countObs.disconnect(); revObs.disconnect(); sweepObs.disconnect();
      if (stage && tiltMove) { stage.removeEventListener("mousemove", tiltMove); stage.removeEventListener("mouseleave", tiltLeave); }
    };
  }, []);

  return null;
}