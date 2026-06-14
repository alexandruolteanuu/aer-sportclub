"use client"; // pagină interactivă (citește + acțiuni)

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/client";

// planuri + durata implicită (zile)
const PLANURI = [
  { nume: "Full", zile: 30 },
  { nume: "Fitness", zile: 30 },
  { nume: "Elevi", zile: 30 },
  { nume: "M.A.I.", zile: 30 },
  { nume: "Family", zile: 30 },
  { nume: "3 luni", zile: 90 },
  { nume: "6 luni", zile: 180 },
  { nume: "12 luni", zile: 365 },
  { nume: "2 Săptămâni", zile: 14 },
  { nume: "O ședință", zile: 1 },
];

function dataRo(x) {
  if (!x) return "—";
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" }).format(new Date(x));
}

export default function AdminMembruDetail() {
  const supabase = createClient();
  const params = useParams();
  const id = params.id;

  const [m, setM] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [euAdmin, setEuAdmin] = useState(false);

  // formular activare
  const [plan, setPlan] = useState("Full");
  const [zile, setZile] = useState(30);
  const [rolNou, setRolNou] = useState("member");
  const [lucrez, setLucrez] = useState(false);

  const incarca = useCallback(async () => {
    const { data, error } = await supabase.rpc("admin_member_detail", { p_user: id });
    if (error) { setErr(error.message); }
    else { setM(data); setRolNou(data.role); }
    setLoading(false);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (async () => {
      // află dacă cel logat e admin (ca să arate controlul de rol)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: p } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        setEuAdmin(p && p.role === "admin");
      }
      await incarca();
    })();
  }, [incarca]); // eslint-disable-line react-hooks/exhaustive-deps

  function alegePlan(nume) {
    setPlan(nume);
    const p = PLANURI.find((x) => x.nume === nume);
    if (p) setZile(p.zile);
  }

  async function activeaza() {
    setErr(""); setMsg(""); setLucrez(true);
    const { error } = await supabase.rpc("admin_set_subscription", { p_user: id, p_plan: plan, p_days: Number(zile) });
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    setMsg("Abonament activat.");
    incarca();
  }
  async function anuleaza() {
    setErr(""); setMsg(""); setLucrez(true);
    const { error } = await supabase.rpc("admin_cancel_subscription", { p_user: id });
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    setMsg("Abonament anulat.");
    incarca();
  }
  async function schimbaRol() {
    setErr(""); setMsg(""); setLucrez(true);
    const { error } = await supabase.rpc("admin_set_role", { p_user: id, p_role: rolNou });
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    setMsg("Rol actualizat.");
    incarca();
  }

  if (loading) return (<><h1 className="dash-h1">Fișă membru</h1><p className="muted">Se încarcă...</p></>);
  if (err && !m) return (<><h1 className="dash-h1">Fișă membru</h1><div className="auth-msg err">{err}</div></>);

  const sub = m.subscription;
  const activ = sub && sub.status === "active";

  return (
    <>
      <Link href="/admin/membri" className="muted" style={{ fontSize: "14px" }}>← Înapoi la membri</Link>
      <h1 className="dash-h1">{m.full_name || m.email}</h1>

      {err && <div className="auth-msg err">{err}</div>}
      {msg && <div className="auth-msg ok">{msg}</div>}

      {/* DATE MEMBRU */}
      <div className="dash-card glass sweep">
        <h3>Date membru</h3>
        <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="ab-row"><span className="muted">Email</span><span>{m.email}</span></div>
          <div className="ab-row"><span className="muted">Telefon</span><span>{m.phone || "—"}</span></div>
          <div className="ab-row"><span className="muted">Rol</span><span className={"role-pill " + m.role}>{m.role}</span></div>
          <div className="ab-row"><span className="muted">Înscris la</span><span>{dataRo(m.created_at)}</span></div>
        </div>
      </div>

      {/* ABONAMENT */}
      <div className="dash-card glass">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h3>Abonament</h3>
          {activ
            ? <span className="badge-status activ"><span className="d"></span>Activ</span>
            : sub && sub.status === "pending"
              ? <span className="badge-status asteptare"><span className="d"></span>În așteptare</span>
              : <span className="badge-status inactiv"><span className="d"></span>Fără</span>}
        </div>
        {sub ? (
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="ab-row"><span className="muted">Plan</span><span>{sub.plan_name || "—"}</span></div>
            <div className="ab-row"><span className="muted">Valabil până la</span><span>{dataRo(sub.current_period_end)}</span></div>
          </div>
        ) : (
          <p className="muted" style={{ marginTop: "10px", fontSize: "14px" }}>Acest membru nu are abonament.</p>
        )}

        {/* acțiuni abonament */}
        <div style={{ marginTop: "18px", borderTop: "1px solid var(--line)", paddingTop: "16px" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>Activează / schimbă abonament</div>
          <div className="adm-tools" style={{ marginBottom: "10px" }}>
            <select className="adm-select" value={plan} onChange={(e) => alegePlan(e.target.value)}>
              {PLANURI.map((p) => <option key={p.nume} value={p.nume}>{p.nume}</option>)}
            </select>
            <input className="adm-select" type="number" min="1" value={zile} onChange={(e) => setZile(e.target.value)} style={{ width: "110px" }} />
            <span className="muted" style={{ alignSelf: "center", fontSize: "13px" }}>zile</span>
            <button className="btn btn-primary magnetic" onClick={activeaza} disabled={lucrez}>Activează</button>
          </div>
          {activ && <button className="btn btn-ghost" onClick={anuleaza} disabled={lucrez}>Anulează abonamentul</button>}
        </div>
      </div>

      {/* PLĂȚI */}
      <div className="dash-card glass">
        <h3>Plăți</h3>
        {m.payments && m.payments.length > 0 ? (
          <div className="adm-table-wrap" style={{ marginTop: "12px" }}>
            <table className="adm-table">
              <thead><tr><th>Plan</th><th>Sumă</th><th>Status</th><th>Data</th></tr></thead>
              <tbody>
                {m.payments.map((p, i) => (
                  <tr key={i}><td>{p.plan_name}</td><td>{p.amount} {p.currency}</td><td>{p.status}</td><td className="muted">{dataRo(p.created_at)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="muted" style={{ marginTop: "10px", fontSize: "14px" }}>Nicio plată înregistrată.</p>
        )}
      </div>

      {/* ROL (doar admin) */}
      {euAdmin && (
        <div className="dash-card glass">
          <h3>Rol cont</h3>
          <div className="adm-tools" style={{ marginTop: "12px" }}>
            <select className="adm-select" value={rolNou} onChange={(e) => setRolNou(e.target.value)}>
              <option value="member">member</option>
              <option value="staff">staff</option>
              <option value="admin">admin</option>
            </select>
            <button className="btn btn-ghost" onClick={schimbaRol} disabled={lucrez}>Schimbă rolul</button>
          </div>
          <p className="muted" style={{ fontSize: "12.5px", marginTop: "10px" }}>Atenție: „admin" are acces total la panou.</p>
        </div>
      )}
    </>
  );
}