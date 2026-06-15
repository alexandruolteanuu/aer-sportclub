"use client"; // rulează în browser (animație 3D + mouse)

import { useEffect, useRef } from "react";

/*
  Logo „Aer” 3D pentru hero.
  - extrudare în CSS: mai multe „felii” ale literei A (navy) una în spatele
    alteia formează grosimea; pe față stă logo-ul complet (A + „Aer” alb).
  - rotația o controlăm din JS (leagăn automat + urmărește mouse-ul).
  - reflexia (banda de lumină) se mută pe logo în funcție de unghi, ca să pară
    sticlă care prinde lumina când se rotește.
*/

const NUM_LAYERS = 24; // câte felii are grosimea (mai multe = mai gros)
const STEP = 1.7; // px între felii  -> grosime ~40px

function Silueta() {
  return (
    <svg viewBox="0 0 320 311" xmlns="http://www.w3.org/2000/svg">
      <path d="M 102 0 L 200 0 L 302 310 L 220 310 L 151 96 L 82 310 L 0 310 Z" fill="#1b3a52" />
    </svg>
  );
}

function Fata() {
  return (
    <svg viewBox="0 0 320 311" xmlns="http://www.w3.org/2000/svg">
      <path d="M 102 0 L 200 0 L 302 310 L 220 310 L 151 96 L 82 310 L 0 310 Z" fill="#234a66" />
      <path d="M 128 149 L 154 149 L 178 221 L 157 221 L 141 174 L 125 221 L 104 221 Z" fill="#fff" />
      <text x="184" y="221" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="700" fontSize="86" letterSpacing="-3" fill="#fff">er</text>
    </svg>
  );
}

export default function HeroLogo3D() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rot = root.querySelector(".logo3d-rot");
    const shine = root.querySelector(".logo3d-shine");
    if (!rot) return;

    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = root.closest(".hero") || root;

    // poziție fixă (fără mișcare) dacă utilizatorul preferă mai puțină animație
    if (RM) {
      rot.style.transform = "rotateY(-14deg) rotateX(4deg)";
      if (shine) shine.style.backgroundPositionX = "62%";
      return;
    }

    let mx = 0, my = 0, tmx = 0, tmy = 0; // ținta de la mouse (lină)
    let t = 0, raf = 0;

    function onMove(e) {
      const r = hero.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width - 0.5;  // -0.5 .. 0.5
      tmy = (e.clientY - r.top) / r.height - 0.5;
    }
    function onLeave() { tmx = 0; tmy = 0; }

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    function frame() {
      raf = requestAnimationFrame(frame);
      t += 0.016;
      // leagăn automat stânga-dreapta
      const autoY = Math.sin(t * 0.5) * 20;   // ±20°
      const autoX = Math.sin(t * 0.33) * 4;   // ±4°
      // urmărire lină a mouse-ului
      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      const ry = autoY + mx * 26;  // mouse-ul adaugă până la ±13°
      const rx = autoX - my * 16;
      rot.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      // reflexia se mută după unghiul de rotație
      if (shine) {
        const p = 50 - (ry / 24) * 50;            // ry -24..24  ->  100%..0%
        shine.style.backgroundPositionX = p.toFixed(1) + "%";
        shine.style.opacity = (0.45 + Math.min(0.4, Math.abs(ry) / 55)).toFixed(2);
      }
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // feliile de adâncime (din spate spre față)
  const layers = [];
  for (let k = NUM_LAYERS - 1; k >= 0; k--) {
    layers.push(
      <div
        key={k}
        className="logo3d-body"
        style={{
          transform: "translateZ(" + (-(k + 1) * STEP) + "px)",
          filter: "brightness(" + (0.86 - k * 0.015).toFixed(3) + ")",
        }}
      >
        <Silueta />
      </div>
    );
  }

  return (
    <div className="logo3d" ref={rootRef} aria-hidden="true">
      <div className="logo3d-glow"></div>
      <div className="logo3d-rot">
        {layers}
        <div className="logo3d-face">
          <Fata />
          <div className="logo3d-shine"></div>
        </div>
      </div>
    </div>
  );
}