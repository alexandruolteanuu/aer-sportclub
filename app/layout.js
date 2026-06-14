import "./globals.css";
import Link from "next/link";
import SiteEffects from "./SiteEffects"; // componenta care „dă viață"
import NavAuth from "./NavAuth"; // butoanele de cont (logat / nelogat)
import { createClient } from "../lib/supabase/server";

export const metadata = {
  title: "Aer SportClub — Târgu Neamț · Non-stop",
  description: "O altfel de sală de fitness. Acces non-stop, 24/7, în Târgu Neamț.",
};

// Componentă server (async): citește din sesiune dacă ești logat.
export default async function RootLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

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
              <div className="fd" style={{ fontSize: "22px" }}>Aer SportClub</div>
              <p className="muted" style={{ maxWidth: "260px", marginTop: "10px", fontSize: "14px" }}>
                O altfel de sală. Te așteptăm să te convingi.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/sala">Sala</Link>
              <Link href="/abonamente">Abonamente</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="muted" style={{ fontSize: "14px", lineHeight: "1.9" }}>
              Târgu Neamț<br />Adresa — în curând<br />07xx xxx xxx<br />contact@aersportclub.ro<br />
              <b style={{ color: "var(--ink)" }}>Deschis 24/7</b>
            </div>
          </div>
          <div className="wrap">
            <p className="muted" style={{ fontSize: "12px", marginTop: "34px" }}>© 2026 Aer SportClub · Târgu Neamț</p>
          </div>
        </footer>
      </body>
    </html>
  );
}