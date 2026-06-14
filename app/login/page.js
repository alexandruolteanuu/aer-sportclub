"use client"; // formular interactiv, rulează în browser

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

function traducereEroare(msg) {
  if (/invalid login credentials/i.test(msg)) return "Email sau parolă greșite.";
  if (/email not confirmed/i.test(msg)) return "Trebuie să-ți confirmi emailul înainte de autentificare.";
  return "Ceva n-a mers. Mai încearcă o dată. (" + msg + ")";
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email || !parola) {
      setErr("Completează emailul și parola.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: parola });
    setLoading(false);
    if (error) {
      setErr(traducereEroare(error.message));
      return;
    }
    router.push("/cont");
    router.refresh();
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card glass sweep">
        <span className="eyebrow">Aer SportClub</span>
        <h1>Intră în cont</h1>
        <p className="sub">Bine ai revenit. Autentifică-te ca să-ți vezi abonamentul și codul de acces.</p>

        <form className="cform" onSubmit={handleSubmit} style={{ marginTop: "10px" }} noValidate>
          {err && <div className="auth-msg err">{err}</div>}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adresa@email.ro" />
          </div>

          <div className="field">
            <label htmlFor="parola">Parolă</label>
            <input id="parola" type="password" value={parola} onChange={(e) => setParola(e.target.value)} placeholder="Parola ta" />
          </div>

          <button type="submit" className="btn btn-primary magnetic" style={{ width: "100%", padding: "14px", marginTop: "4px" }} disabled={loading}>
            {loading ? "Se verifică..." : "Autentifică-te"}
          </button>
        </form>

        <p className="auth-alt">
          Nu ai cont? <Link href="/inregistrare">Creează unul</Link>
        </p>
        <p className="auth-alt">
          <Link href="/recuperare-parola">Mi-am uitat parola</Link>
        </p>
      </div>
    </div>
  );
}