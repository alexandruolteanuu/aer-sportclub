"use client"; // formular interactiv, rulează în browser

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function ReseteazaParola() {
  const router = useRouter();
  const [parola, setParola] = useState("");
  const [parola2, setParola2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (parola.length < 6) {
      setErr("Parola trebuie să aibă cel puțin 6 caractere.");
      return;
    }
    if (parola !== parola2) {
      setErr("Parolele nu coincid.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: parola });
    setLoading(false);
    if (error) {
      setErr("Linkul a expirat sau nu mai e valid. Cere un link nou de resetare. (" + error.message + ")");
      return;
    }
    setOk(true);
    setTimeout(() => {
      router.push("/cont");
      router.refresh();
    }, 1600);
  }

  if (ok) {
    return (
      <div className="auth-wrap">
        <div className="auth-card glass sweep">
          <div className="auth-ok">
            <div className="ok-ic">✓</div>
            <h1 style={{ fontSize: "26px" }}>Parolă schimbată!</h1>
            <p className="sub">Te ducem în contul tău...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card glass sweep">
        <span className="eyebrow">Aer SportClub</span>
        <h1>Setează o parolă nouă</h1>
        <p className="sub">Alege o parolă nouă pentru contul tău.</p>

        <form className="cform" onSubmit={handleSubmit} style={{ marginTop: "10px" }} noValidate>
          {err && <div className="auth-msg err">{err}</div>}
          <div className="field">
            <label htmlFor="parola">Parolă nouă</label>
            <input id="parola" type="password" value={parola} onChange={(e) => setParola(e.target.value)} placeholder="Minim 6 caractere" />
          </div>
          <div className="field">
            <label htmlFor="parola2">Confirmă parola</label>
            <input id="parola2" type="password" value={parola2} onChange={(e) => setParola2(e.target.value)} placeholder="Scrie parola din nou" />
          </div>
          <button type="submit" className="btn btn-primary magnetic" style={{ width: "100%", padding: "14px", marginTop: "4px" }} disabled={loading}>
            {loading ? "Se salvează..." : "Salvează parola nouă"}
          </button>
        </form>
      </div>
    </div>
  );
}