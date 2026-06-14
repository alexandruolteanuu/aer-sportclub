"use client"; // formular interactiv, rulează în browser

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function RecuperareParola() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email) {
      setErr("Scrie adresa ta de email.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reseteaza-parola",
    });
    setLoading(false);
    if (error) {
      setErr("Ceva n-a mers. Mai încearcă. (" + error.message + ")");
      return;
    }
    setOk(true);
  }

  if (ok) {
    return (
      <div className="auth-wrap">
        <div className="auth-card glass sweep">
          <div className="auth-ok">
            <div className="ok-ic">✓</div>
            <h1 style={{ fontSize: "26px" }}>Verifică-ți emailul</h1>
            <p className="sub">
              Dacă există un cont cu adresa <b style={{ color: "var(--ink)" }}>{email}</b>, ți-am trimis un link de resetare a parolei. Deschide emailul și apasă pe link.
            </p>
            <Link href="/login" className="btn btn-ghost magnetic" style={{ marginTop: "14px" }}>
              Înapoi la autentificare
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card glass sweep">
        <span className="eyebrow">Aer SportClub</span>
        <h1>Ți-ai uitat parola?</h1>
        <p className="sub">Scrie-ți adresa de email și îți trimitem un link prin care îți setezi o parolă nouă.</p>

        <form className="cform" onSubmit={handleSubmit} style={{ marginTop: "10px" }} noValidate>
          {err && <div className="auth-msg err">{err}</div>}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adresa@email.ro" />
          </div>
          <button type="submit" className="btn btn-primary magnetic" style={{ width: "100%", padding: "14px", marginTop: "4px" }} disabled={loading}>
            {loading ? "Se trimite..." : "Trimite linkul de resetare"}
          </button>
        </form>

        <p className="auth-alt">
          Ți-ai amintit parola? <Link href="/login">Autentifică-te</Link>
        </p>
      </div>
    </div>
  );
}