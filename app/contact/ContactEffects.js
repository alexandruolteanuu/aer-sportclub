"use client"; // rulează în browser

import { useEffect } from "react";

export default function ContactEffects() {
  useEffect(() => {
    /* ---------- REVEAL + sweep ---------- */
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); revObs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

    const sweepObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("lit"); setTimeout(() => en.target.classList.remove("lit"), 1300); sweepObs.unobserve(en.target); } });
    }, { threshold: 0.45 });
    document.querySelectorAll(".sweep").forEach((el) => sweepObs.observe(el));

    /* ---------- FORMULAR (demo, fără trimitere reală încă) ---------- */
    const btn = document.getElementById("cf-send");
    const result = document.getElementById("cf-result");
    function onSend() {
      const nume = (document.getElementById("cf-nume").value || "").trim();
      const email = (document.getElementById("cf-email").value || "").trim();
      const mesaj = (document.getElementById("cf-mesaj").value || "").trim();
      if (!nume || !email || !mesaj) {
        result.className = "cform-result err show";
        result.textContent = "Te rugăm completează toate câmpurile.";
        return;
      }
      result.className = "cform-result ok show";
      result.innerHTML = "<b>Mulțumim, " + nume + "!</b> Mesajul a fost preluat. (Demo — trimiterea reală pe email o activăm la final.)";
      document.getElementById("cf-nume").value = "";
      document.getElementById("cf-email").value = "";
      document.getElementById("cf-mesaj").value = "";
    }
    if (btn) btn.addEventListener("click", onSend);

    return () => {
      revObs.disconnect();
      sweepObs.disconnect();
      if (btn) btn.removeEventListener("click", onSend);
    };
  }, []);

  return null;
}