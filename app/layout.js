import "./globals.css";
import Link from "next/link";
import SiteEffects from "./SiteEffects"; // componenta care „dă viață"
import NavAuth from "./NavAuth"; // butoanele de cont (logat / nelogat)
import { createClient } from "../lib/supabase/server";

export const metadata = {
  title: "Aer SportClub — Târgu Neamț · Non-stop",
  description: "O altfel de sală de fitness. Acces non-stop, 24/7, în Târgu Neamț.",
};

// Componentă server (async): citește sesiunea + setările sălii.
export default async function RootLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  // setările sălii (cu valori de rezervă dacă lipsesc)
  const { data: s } = await supabase.from("settings").select("*").eq("id", 1).single();
  const numeSala = (s && s.gym_name) || "Aer SportClub";
  const adresa = (s && s.address) || "Târgu Neamț";
  const telefon = (s && s.phone) || "";
  const email = (s && s.email) || "contact@aersportclub.ro";
  const program = (s && s.schedule) || "Non-stop · 24/7";

  return (
    <html lang="ro">
      <body>
        {/* Fundalul */}
        <canvas id="bgCanvas"></canvas>
        <div className="sun-glow"></div>
        <div className="grain"></div>

        {/* Comportamentul interactiv (rulează în browser) */}
        <SiteEffects />

        {/* NAV */}
        <header id="hdr">
          <nav className="bar">
            <Link href="/" className="brand" aria-label="Aer SportClub acasă">
              <svg viewBox="0 0 820 311" aria-label="Aer SportClub">
                <path d="M 102 0 L 200 0 L 302 310 L 220 310 L 151 96 L 82 310 L 0 310 Z" fill="#234a66"/>
                <path d="M 128 149 L 154 149 L 178 221 L 157 221 L 141 174 L 125 221 L 104 221 Z" fill="#fff"/>
                <text x="184" y="221" fontFamily="Bricolage Grotesque" fontWeight="700" fontSize="86" letterSpacing="-3" fill="#fff">er SportClub</text>
              </svg>
            </Link>

            <div className="links">
              <Link href="/sala">Sala</Link>
              <Link href="/abonamente">Abonamente</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <NavAuth isLoggedIn={isLoggedIn} />
              <button id="hamb" className="hamb" aria-label="Meniu">
                <span></span><span></span><span></span>
              </button>
            </div>
          </nav>
        </header>

        {/* Meniu mobil */}
        <div id="mnav">
          <Link href="/sala">Sala</Link>
          <Link href="/abonamente">Abonamente</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn
            ? <Link href="/cont">Contul meu</Link>
            : <Link href="/login">Intră în cont</Link>}
        </div>

        {/* Conținutul fiecărei pagini */}
        <main className="content">{children}</main>

        {/* FOOTER */}
        <footer id="contact">
          <div className="wrap foot">
            <div>
              <div className="fd" style={{ fontSize: "22px" }}>{numeSala}</div>
              <p className="muted" style={{ maxWidth: "260px", marginTop: "10px", fontSize: "14px" }}>
                O altfel de sală. Te așteptăm să te convingi.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/sala">Sala</Link>
              <Link href="/abonamente">Abonamente</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/termeni">Termeni</Link>
              <Link href="/confidentialitate">Confidențialitate</Link>
              <Link href="/cookies">Cookies</Link>
            </div>
            <div className="muted" style={{ fontSize: "14px", lineHeight: "1.9" }}>
              {adresa}<br />
              {telefon && <>{telefon}<br /></>}
              {email}<br />
              <b style={{ color: "var(--ink)" }}>{program}</b>
            </div>
          </div>
          <div className="wrap">
            <p className="muted" style={{ fontSize: "12px", marginTop: "34px" }}>© 2026 {numeSala} · Târgu Neamț</p>
          </div>
        </footer>
      </body>
    </html>
  );
}