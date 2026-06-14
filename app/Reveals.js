"use client"; // rulează în browser

import { useEffect } from "react";

// Componentă refolosibilă: aprinde efectul „reveal" (apariție la scroll)
// și „sweep" (banda de lumină pe carduri) pe orice pagină o include.
export default function Reveals() {
  useEffect(() => {
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); revObs.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

    const sweepObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("lit"); setTimeout(() => en.target.classList.remove("lit"), 1300); sweepObs.unobserve(en.target); } });
    }, { threshold: 0.45 });
    document.querySelectorAll(".sweep").forEach((el) => sweepObs.observe(el));

    return () => { revObs.disconnect(); sweepObs.disconnect(); };
  }, []);

  return null;
}