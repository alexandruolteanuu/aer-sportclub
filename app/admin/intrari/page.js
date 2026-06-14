"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

function dt(x) {
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(x));
}
function motiv(status, reason) {
  if (status === "granted") return "Permis";
  const m = {
    token_invalid: "Cod invalid",
    token_used: "Cod deja folosit",
    token_expired: "Cod expirat",
    no_active_subscription: "Abonament inactiv",
  };
  return m[reason] || "Respins";
}

export default function AdminIntrari() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [filtru, setFiltru] = useState("toate");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("admin_access_logs", { p_limit: 200 });
      if (error) setErr(error.message);
      else setRows(data || []);
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtrate = useMemo(() => {
    if (filtru === "permise") return rows.filter((r) => r.status === "granted");
    if (filtru === "respinse") return rows.filter((r) => r.status !== "granted");
    return rows;
  }, [rows, filtru]);

  return (
    <>
      <h1 className="dash-h1">Istoric intrări</h1>

      <div className="dash-card glass">
        <div className="adm-tools">
          <select className="adm-select" value={filtru} onChange={(e) => setFiltru(e.target.value)}>
            <option value="toate">Toate</option>
            <option value="permise">Permise</option>
            <option value="respinse">Respinse</option>
          </select>
        </div>

        {err && <div className="auth-msg err">{err}</div>}

        {loading ? (
          <p className="muted">Se încarcă...</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Data</th><th>Membru</th><th>Email</th><th>Rezultat</th></tr></thead>
              <tbody>
                {filtrate.map((r) => (
                  <tr key={r.id}>
                    <td className="muted">{dt(r.created_at)}</td>
                    <td>{r.full_name || "—"}</td>
                    <td className="muted">{r.email || "—"}</td>
                    <td>{r.status === "granted"
                      ? <span className="badge-status activ"><span className="d"></span>{motiv(r.status, r.reason)}</span>
                      : <span className="badge-status inactiv"><span className="d"></span>{motiv(r.status, r.reason)}</span>}</td>
                  </tr>
                ))}
                {filtrate.length === 0 && (
                  <tr><td colSpan={4} className="muted" style={{ textAlign: "center", padding: "22px" }}>Nicio intrare.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}