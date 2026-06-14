"use client"; // formular interactiv, rulează în browser

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

// traduce erorile Supabase în mesaje prietenoase
function traducereEroare(msg) {
  if (/already registered|already exists|user already/i.test(msg)) return "Există deja un cont cu acest email.";
  if (/password/i.test(msg)) return "Parola nu e validă (minim 6 caractere).";
  if (/valid email|invalid email/i.test(msg)) return "Adresa de email nu pare validă.";
  return "Ceva n-a mers. Mai încearcă o dată. (" + msg + ")";
}

export default function Inregistrare() {
  const [prenume, setPrenume] = useState("");
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [parola, setParola] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    // validări simple
    if (!prenume || !nume || !email || !telefon || !parola) {
      setErr("Te rugăm completează toate câmpurile.");
      return;
    }
    if (parola.length < 6) {
      setErr("Parola trebuie să aibă cel puțin 6 caractere.");
      return;
    }
    if (!accept) {
      setErr("Trebuie să accepți Termenii și Politica de confidențialitate.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password: parola,
      options: {
        data: { full_name: prenume.trim() + " " + nume.trim(), phone: telefon.trim() },
      },
    });
    setLoading(false);

    if (error) {
      setErr(traducereEroare(error.message));
      return;
    }
    setOk(true);
  }

  // ecranul de succes
  if (ok) {
    return (
      <div className="auth-wrap">
        <div className="auth-card glass sweep">
          <div className="auth-ok">
            <div className="ok-ic">✓</div>
            <h1 style={{ fontSize: "26px" }}>Cont creat!</h1>
            <p className="sub" style={{ marginBottom: "8px" }}>
              Bun venit la Aer SportClub, {prenume}. Dacă verificarea pe email este activată, confirmă-ți adresa din emailul primit, apoi autentifică-te.
            </p>
            <Link href="/login" className="btn btn-primary magnetic" style={{ marginTop: "10px" }}>
              Mergi la autentificare
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // formularul
  return (
    <div className="auth-wrap">
      <div className="auth-card glass sweep">
        <span className="eyebrow">Aer SportClub</span>
        <h1>Creează cont</h1>
        <p className="sub">Îți faci contul în câteva secunde. Apoi alegi un abonament și primești codul de acces.</p>

        <form className="cform" onSubmit={handleSubmit} style={{ marginTop: "10px" }} noValidate>
          {err && <div className="auth-msg err">{err}</div>}

          <div className="auth-row">
            <div className="field">
              <label htmlFor="prenume">Prenume</label>
              <input id="prenume" type="text" value={prenume} onChange={(e) => setPrenume(e.target.value)} placeholder="Prenumele tău" />
            </div>
            <div className="field">
              <label htmlFor="nume">Nume</label>
              <input id="nume" type="text" value={nume} onChange={(e) => setNume(e.target.value)} placeholder="Numele tău" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adresa@email.ro" />
          </div>

          <div className="field">
            <label htmlFor="telefon">Telefon</label>
            <input id="telefon" type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="07xx xxx xxx" />
          </div>

          <div className="field">
            <label htmlFor="parola">Parolă</label>
            <input id="parola" type="password" value={parola} onChange={(e) => setParola(e.target.value)} placeholder="Minim 6 caractere" />
          </div>

          <label className="auth-check">
            <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
            <span>
              Sunt de acord cu <Link href="/termeni">Termenii</Link> și <Link href="/confidentialitate">Politica de confidențialitate</Link>.
            </span>
          </label>

          <button type="submit" className="btn btn-primary magnetic" style={{ width: "100%", padding: "14px", marginTop: "4px" }} disabled={loading}>
            {loading ? "Se creează contul..." : "Creează cont"}
          </button>
        </form>

        <p className="auth-alt">
          Ai deja cont? <Link href="/login">Autentifică-te</Link>
        </p>
      </div>
    </div>
  );
}