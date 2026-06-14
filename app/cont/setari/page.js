"use client"; // formular interactiv

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function ContSetari() {
  const supabase = createClient();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [salvez, setSalvez] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  async function schimbaParola(e) {
    e.preventDefault();
    setErr(""); setOk(false);
    if (p1.length < 6) { setErr("Parola nouă trebuie să aibă cel puțin 6 caractere."); return; }
    if (p1 !== p2) { setErr("Parolele nu coincid."); return; }
    setSalvez(true);
    const { error } = await supabase.auth.updateUser({ password: p1 });
    setSalvez(false);
    if (error) { setErr("Nu am putut schimba parola. (" + error.message + ")"); return; }
    setOk(true);
    setP1(""); setP2("");
  }

  return (
    <>
      <h1 className="dash-h1">Setări</h1>

      {/* SCHIMBARE PAROLĂ */}
      <div className="dash-card glass sweep">
        <h3>Schimbă parola</h3>
        <form className="cform" onSubmit={schimbaParola} style={{ marginTop: "14px" }} noValidate>
          {err && <div className="auth-msg err">{err}</div>}
          {ok && <div className="auth-msg ok">Parola a fost schimbată.</div>}
          <div className="field">
            <label htmlFor="p1">Parolă nouă</label>
            <input id="p1" type="password" value={p1} onChange={(e) => setP1(e.target.value)} placeholder="Minim 6 caractere" />
          </div>
          <div className="field">
            <label htmlFor="p2">Confirmă parola nouă</label>
            <input id="p2" type="password" value={p2} onChange={(e) => setP2(e.target.value)} placeholder="Scrie parola din nou" />
          </div>
          <button type="submit" className="btn btn-primary magnetic" style={{ marginTop: "4px", padding: "13px 26px" }} disabled={salvez}>
            {salvez ? "Se salvează..." : "Schimbă parola"}
          </button>
        </form>
      </div>

      {/* NOTIFICĂRI (în curând) */}
      <div className="dash-card glass">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h3>Notificări</h3>
          <span className="badge-status inactiv"><span className="d"></span>În curând</span>
        </div>
        <p className="muted" style={{ marginTop: "10px", fontSize: "14px" }}>
          Vei putea alege ce anunțuri primești pe email (reminder de expirare, promoții). Le activăm odată cu sistemul de emailuri.
        </p>
      </div>
    </>
  );
}