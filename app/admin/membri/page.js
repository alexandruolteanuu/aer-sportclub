"use client"; // listă interactivă (căutare + filtre)

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

function dataRo(x) {
  if (!x) return "—";
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short", year: "numeric" }).format(new Date(x));
}

export default function AdminMembri() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("toate");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("admin_members");
      if (error) setErr(error.message);
      else setRows(data || []);
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtrate = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter((r) => {
      const okQ = !qq || [r.full_name, r.email, r.phone].some((v) => (v || "").toLowerCase().includes(qq));
      const okS =
        status === "toate" ||
        (status === "activ" && r.sub_status === "active") ||
        (status === "asteptare" && r.sub_status === "pending") ||
        (status === "fara" && !r.sub_status);
      return okQ && okS;
    });
  }, [rows, q, status]);

  function StatusAbon({ s }) {
    if (s === "active") return <span className="badge-status activ"><span className="d"></span>Activ</span>;
    if (s === "pending") return <span className="badge-status asteptare"><span className="d"></span>În așteptare</span>;
    return <span className="badge-status inactiv"><span className="d"></span>Fără</span>;
  }

  return (
    <>
      <h1 className="dash-h1">Membri</h1>

      <div className="dash-card glass" style={{ paddingBottom: "8px" }}>
        <div className="adm-tools">
          <input className="adm-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută după nume, email sau telefon..." />
          <select className="adm-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="toate">Toate abonamentele</option>
            <option value="activ">Active</option>
            <option value="asteptare">În așteptare</option>
            <option value="fara">Fără abonament</option>
          </select>
        </div>

        {err && <div className="auth-msg err">Nu am putut încărca membrii. ({err})</div>}

        {loading ? (
          <p className="muted" style={{ padding: "10px 2px" }}>Se încarcă...</p>
        ) : (
          <>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Nume</th><th>Email</th><th>Telefon</th><th>Rol</th><th>Abonament</th><th>Înscris</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrate.map((r) => (
                    <tr key={r.id}>
                      <td><Link href={"/admin/membri/" + r.id} style={{ color: "var(--accent-2)" }}>{r.full_name || "—"}</Link></td>
                      <td>{r.email}</td>
                      <td>{r.phone || "—"}</td>
                      <td><span className={"role-pill " + r.role}>{r.role}</span></td>
                      <td><StatusAbon s={r.sub_status} />{r.sub_plan ? <span className="muted" style={{ marginLeft: "8px", fontSize: "13px" }}>{r.sub_plan}</span> : null}</td>
                      <td className="muted">{dataRo(r.created_at)}</td>
                    </tr>
                  ))}
                  {filtrate.length === 0 && (
                    <tr><td colSpan={6} className="muted" style={{ textAlign: "center", padding: "22px" }}>Niciun membru găsit.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="muted" style={{ fontSize: "13px", padding: "12px 2px 4px" }}>
              {filtrate.length} membri afișați. Acțiunile pe membru (confirmă plată, schimbă/anulează abonament, link de plată) le adăugăm la fazele cu plăți.
            </p>
          </>
        )}
      </div>
    </>
  );
}