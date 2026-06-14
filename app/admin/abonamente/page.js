"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

function dataRo(x) {
  if (!x) return "—";
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short", year: "numeric" }).format(new Date(x));
}
// stare reală: un „active" trecut de dată = expirat
function stareReala(s) {
  if (s.status === "active" && s.current_period_end && new Date(s.current_period_end) < new Date()) return "expirat";
  return s.status;
}

export default function AdminAbonamente() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [filtru, setFiltru] = useState("toate");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("admin_subscriptions", { p_limit: 300 });
      if (error) setErr(error.message);
      else setRows(data || []);
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtrate = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter((r) => {
      const okQ = !qq || [r.full_name, r.email, r.plan_name].some((v) => (v || "").toLowerCase().includes(qq));
      const st = stareReala(r);
      const okS =
        filtru === "toate" ||
        (filtru === "active" && st === "active") ||
        (filtru === "asteptare" && st === "pending") ||
        (filtru === "expirate" && (st === "expirat" || st === "inactive"));
      return okQ && okS;
    });
  }, [rows, q, filtru]);

  function Badge({ s }) {
    const st = stareReala(s);
    if (st === "active") return <span className="badge-status activ"><span className="d"></span>Activ</span>;
    if (st === "pending") return <span className="badge-status asteptare"><span className="d"></span>În așteptare</span>;
    if (st === "expirat") return <span className="badge-status inactiv"><span className="d"></span>Expirat</span>;
    return <span className="badge-status inactiv"><span className="d"></span>Inactiv</span>;
  }

  return (
    <>
      <h1 className="dash-h1">Abonamente</h1>

      <div className="dash-card glass">
        <div className="adm-tools">
          <input className="adm-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută după membru, email sau plan..." />
          <select className="adm-select" value={filtru} onChange={(e) => setFiltru(e.target.value)}>
            <option value="toate">Toate</option>
            <option value="active">Active</option>
            <option value="asteptare">În așteptare</option>
            <option value="expirate">Expirate / inactive</option>
          </select>
        </div>

        {err && <div className="auth-msg err">{err}</div>}

        {loading ? (
          <p className="muted">Se încarcă...</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Membru</th><th>Email</th><th>Plan</th><th>Status</th><th>Valabil până la</th><th>Început</th></tr></thead>
              <tbody>
                {filtrate.map((r) => (
                  <tr key={r.id}>
                    <td>{r.full_name || "—"}</td>
                    <td className="muted">{r.email || "—"}</td>
                    <td>{r.plan_name || "—"}</td>
                    <td><Badge s={r} /></td>
                    <td className="muted">{dataRo(r.current_period_end)}</td>
                    <td className="muted">{dataRo(r.created_at)}</td>
                  </tr>
                ))}
                {filtrate.length === 0 && (
                  <tr><td colSpan={6} className="muted" style={{ textAlign: "center", padding: "22px" }}>Niciun abonament.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <p className="muted" style={{ fontSize: "13px", padding: "12px 2px 4px" }}>
          {filtrate.length} afișate. Pentru a activa/schimba un abonament, intră în fișa membrului (Membri → deschide un membru).
        </p>
      </div>
    </>
  );
}