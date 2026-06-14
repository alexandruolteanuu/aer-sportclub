"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { createClient } from "../../../lib/supabase/client";

const DURATA = 45; // secunde

export default function ContAcces() {
  const supabase = createClient();
  const [active, setActive] = useState(null); // null = se încarcă
  const [token, setToken] = useState("");
  const [secLeft, setSecLeft] = useState(DURATA);
  const [err, setErr] = useState("");
  const expRef = useRef(0);

  const genereaza = useCallback(async () => {
    const { data, error } = await supabase.rpc("access_generate_token");
    if (error) { setErr(error.message); return; }
    if (!data || !data.active) { setActive(false); return; }
    setActive(true);
    setToken(data.token);
    expRef.current = new Date(data.expires_at).getTime();
    setErr("");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { genereaza(); }, [genereaza]);

  // numărătoare inversă + reîmprospătare automată
  useEffect(() => {
    if (active !== true) return;
    const t = setInterval(() => {
      const left = Math.max(0, Math.round((expRef.current - Date.now()) / 1000));
      setSecLeft(left);
      if (left <= 0) genereaza();
    }, 500);
    return () => clearInterval(t);
  }, [active, genereaza]);

  const pct = Math.max(0, Math.min(100, (secLeft / DURATA) * 100));

  return (
    <>
      <h1 className="dash-h1">Cod de acces</h1>

      {active === null && <div className="dash-card glass"><p className="muted">Se încarcă...</p></div>}

      {active === false && (
        <div className="dash-card glass">
          <div className="empty">
            <h3>Ai nevoie de un abonament activ</h3>
            <p className="muted" style={{ fontSize: "15px" }}>
              Codul de acces 24/7 apare aici imediat ce ai un abonament activ.
            </p>
            <Link href="/abonamente" className="btn btn-primary magnetic">Alege abonament</Link>
          </div>
        </div>
      )}

      {active === true && (
        <div className="dash-card glass sweep" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {err && <div className="auth-msg err" style={{ width: "100%" }}>{err}</div>}

          <p className="muted" style={{ textAlign: "center", fontSize: "15px" }}>
            Arată acest cod la intrare. Se schimbă automat — nu poate fi refolosit.
          </p>

          <div className="acc-qr">
            <QRCodeCanvas value={token} size={220} marginSize={2} level="M" />
          </div>

          <div style={{ width: "100%", maxWidth: "260px" }}>
            <div className="acc-bar"><span style={{ width: pct + "%" }}></span></div>
            <p className="muted" style={{ textAlign: "center", fontSize: "13px", marginTop: "8px" }}>
              Se reîmprospătează în {secLeft}s
            </p>
          </div>

          <button className="btn btn-ghost" onClick={genereaza} style={{ padding: "9px 18px", fontSize: "13px" }}>
            Reîmprospătează acum
          </button>

          <details style={{ width: "100%", maxWidth: "320px" }}>
            <summary className="muted" style={{ fontSize: "12px", cursor: "pointer", textAlign: "center" }}>Cod manual (dacă scanarea nu merge)</summary>
            <p style={{ fontFamily: "monospace", fontSize: "11px", wordBreak: "break-all", textAlign: "center", marginTop: "8px", color: "var(--muted)" }}>{token}</p>
          </details>
        </div>
      )}
    </>
  );
}