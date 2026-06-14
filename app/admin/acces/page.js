"use client";

import { useState, useRef } from "react";
import { createClient } from "../../../lib/supabase/client";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function AdminAcces() {
  const supabase = createClient();
  const [manual, setManual] = useState("");
  const [rez, setRez] = useState(null); // {granted, member|reason}
  const [err, setErr] = useState("");
  const [camPornita, setCamPornita] = useState(false);
  const [lucrez, setLucrez] = useState(false);
  const scannerRef = useRef(null);

  async function verifica(tok) {
    const t = (tok || "").trim();
    setErr(""); setRez(null);
    if (!t) { setErr("Introdu sau scanează un cod."); return; }
    if (!UUID_RE.test(t)) { setRez({ granted: false, reason: "Cod invalid" }); return; }
    setLucrez(true);
    const { data, error } = await supabase.rpc("access_verify_token", { p_token: t });
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    setRez(data);
  }

  async function pornesteCamera() {
    setErr(""); setRez(null);
    try {
      const mod = await import("html5-qrcode");
      const Html5Qrcode = mod.Html5Qrcode;
      const h = new Html5Qrcode("reader");
      scannerRef.current = h;
      setCamPornita(true);
      await h.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 240 },
        async (decoded) => {
          await opresteCamera();
          verifica(decoded);
        },
        () => {}
      );
    } catch (e) {
      setCamPornita(false);
      setErr("Nu am putut porni camera. Folosește codul manual. (" + (e && e.message ? e.message : e) + ")");
    }
  }

  async function opresteCamera() {
    if (scannerRef.current) {
      try { await scannerRef.current.stop(); } catch (e) { /* ignorăm */ }
      try { scannerRef.current.clear(); } catch (e) { /* ignorăm */ }
      scannerRef.current = null;
    }
    setCamPornita(false);
  }

  function reset() {
    setRez(null); setErr(""); setManual("");
  }

  return (
    <>
      <h1 className="dash-h1">Verifică acces</h1>

      {/* REZULTAT */}
      {rez && (
        <div className={"vf-result " + (rez.granted ? "ok" : "no")}>
          <div className="vf-ic">{rez.granted ? "✓" : "✕"}</div>
          <div className="vf-txt">
            <div className="vf-title">{rez.granted ? "Acces permis" : "Acces respins"}</div>
            <div className="vf-sub">{rez.granted ? rez.member : rez.reason}</div>
          </div>
          <button className="btn btn-ghost" onClick={reset}>Verifică altul</button>
        </div>
      )}

      {err && <div className="auth-msg err">{err}</div>}

      {/* CAMERA */}
      <div className="dash-card glass">
        <h3>Scanează codul</h3>
        <p className="muted" style={{ fontSize: "14px", marginTop: "8px" }}>Îndreaptă camera spre codul QR din aplicația membrului.</p>
        <div id="reader" className="vf-reader" style={{ display: camPornita ? "block" : "none", marginTop: "14px" }}></div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "14px" }}>
          {!camPornita
            ? <button className="btn btn-primary magnetic" onClick={pornesteCamera}>Pornește camera</button>
            : <button className="btn btn-ghost" onClick={opresteCamera}>Oprește camera</button>}
        </div>
      </div>

      {/* MANUAL */}
      <div className="dash-card glass">
        <h3>Cod manual</h3>
        <div className="adm-tools" style={{ marginTop: "14px" }}>
          <input className="adm-search" value={manual} onChange={(e) => setManual(e.target.value)} placeholder="Lipește codul membrului..." />
          <button className="btn btn-primary magnetic" onClick={() => verifica(manual)} disabled={lucrez}>
            {lucrez ? "Se verifică..." : "Verifică"}
          </button>
        </div>
      </div>
    </>
  );
}