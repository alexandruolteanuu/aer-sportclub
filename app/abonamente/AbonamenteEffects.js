"use client"; // rulează în browser

import { useEffect } from "react";

export default function AbonamenteEffects() {
  useEffect(() => {
    /* ---------- REVEAL + light sweep la scroll ---------- */
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); revObs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

    const sweepObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("lit"); setTimeout(() => en.target.classList.remove("lit"), 1300); sweepObs.unobserve(en.target); } });
    }, { threshold: 0.45 });
    document.querySelectorAll(".sweep").forEach((el) => sweepObs.observe(el));

    /* ---------- CHECKOUT (alegerea metodei de plată) ---------- */
    let coMethod = "card";
    function openCheckout(btn) {
      document.getElementById("coName").textContent = btn.dataset.plan;
      document.getElementById("coPrice").textContent = btn.dataset.price;
      const r = document.getElementById("coResult"); r.classList.remove("show"); r.innerHTML = "";
      coMethod = "card";
      document.querySelectorAll(".pay").forEach((p) => p.classList.toggle("sel", p.dataset.method === "card"));
      document.getElementById("checkout").classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeCheckout() { document.getElementById("checkout").classList.remove("open"); document.body.style.overflow = ""; }
    function selPay(el) { coMethod = el.dataset.method; document.querySelectorAll(".pay").forEach((p) => p.classList.remove("sel")); el.classList.add("sel"); }
    function doCheckout() {
      const r = document.getElementById("coResult");
      const plan = document.getElementById("coName").textContent;
      if (coMethod === "card") {
        r.innerHTML = "<b>Demo:</b> aici te-am duce la plata securizată cu cardul (Stripe). După plată, abonamentul <b>" + plan + "</b> s-ar activa instant și ai primi codul QR de acces în cont.";
      } else {
        r.innerHTML = "<b>Demo:</b> abonamentul <b>" + plan + "</b> ar fi rezervat cu statusul <b>„în așteptare”</b>. Achiți la recepție, un coleg confirmă plata în panoul de administrare, apoi primești codul QR de acces.";
      }
      r.classList.add("show");
    }

    // legăm butoanele (înlocuiește vechiul onclick)
    const planBtns = Array.from(document.querySelectorAll("[data-plan]"));
    planBtns.forEach((b) => b.addEventListener("click", () => openCheckout(b)));
    const pays = Array.from(document.querySelectorAll(".pay"));
    pays.forEach((p) => p.addEventListener("click", () => selPay(p)));
    const closeEls = Array.from(document.querySelectorAll(".mclose, .modal-bg"));
    closeEls.forEach((e) => e.addEventListener("click", closeCheckout));
    const cont = document.getElementById("coContinue");
    if (cont) cont.addEventListener("click", doCheckout);
    const onKey = (e) => { if (e.key === "Escape") closeCheckout(); };
    window.addEventListener("keydown", onKey);

    /* ---------- curățenie ---------- */
    return () => {
      revObs.disconnect();
      sweepObs.disconnect();
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}