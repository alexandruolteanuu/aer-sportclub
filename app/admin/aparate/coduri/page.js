"use client";
// Admin → Aparate → Coduri QR: generează codurile de lipit FIZIC pe aparate.
// Fiecare cod duce la pagina publică /aparate/<id>.
// Butoane: Printează toate (folosește stilurile de print deja existente) + Descarcă PNG per aparat.

import { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { createClient } from "../../../../lib/supabase/client";

export default function CoduriQRAparate() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin); // adresa curentă a site-ului
    (async () => {
      const { data, error } = await supabase
        .from("machines")
        .select("id, name, is_published")
        .order("name", { ascending: true });
      if (error) setErr(error.message);
      else setRows((data || []).filter((r) => r.is_published));
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function descarca(id, name) {
    const c = document.getElementById("qr-ap-" + id);
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "qr-aparat-" + (name || "aparat").replace(/\s+/g, "-").toLowerCase() + ".png";
    a.click();
  }

  return (
    <>
      <div className="no-print">
        <Link href="/admin/aparate" className="muted" style={{ fontSize: "14px" }}>← Înapoi la aparate</Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h1 className="dash-h1">Coduri QR aparate</h1>
          <button className="btn btn-primary magnetic" onClick={() => window.print()}>Printează toate</button>
        </div>
        <p className="muted" style={{ fontSize: "14px", marginBottom: "6px" }}>
          Fiecare cod duce la pagina aparatului, cu toate exercițiile lui. Printează-l și lipește-l pe aparatul corespunzător.
        </p>
      </div>

      {err && <div className="auth-msg err no-print">{err}</div>}

      {loading ? (
        <p className="muted">Se încarcă...</p>
      ) : rows.length === 0 ? (
        <p className="muted">Niciun aparat publicat. Adaugă unul în „Aparate".</p>
      ) : (
        <div className="qr-grid">
          {rows.map((r) => (
            <div key={r.id} className="qr-card">
              <QRCodeCanvas id={"qr-ap-" + r.id} value={origin + "/aparate/" + r.id} size={180} marginSize={2} level="M" />
              <div className="qr-name">{r.name}</div>
              <div className="qr-url">{origin}/aparate/{r.id}</div>
              <button className="btn btn-ghost no-print" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={() => descarca(r.id, r.name)}>
                Descarcă PNG
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}