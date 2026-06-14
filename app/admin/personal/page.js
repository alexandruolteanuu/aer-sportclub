"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function AdminPersonal() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [euAdmin, setEuAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState({}); // {id: rolNou}

  const incarca = useCallback(async () => {
    const { data, error } = await supabase.rpc("admin_members");
    if (error) setErr(error.message);
    else setRows(data || []);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: p } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        setEuAdmin(p && p.role === "admin");
      }
      await incarca();
      setLoading(false);
    })();
  }, [incarca]); // eslint-disable-line react-hooks/exhaustive-deps

  const echipa = useMemo(() => rows.filter((r) => r.role === "admin" || r.role === "staff"), [rows]);
  const membri = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return [];
    return rows.filter((r) => r.role === "member" && [r.full_name, r.email].some((v) => (v || "").toLowerCase().includes(qq))).slice(0, 6);
  }, [rows, q]);

  async function setRol(id, rol) {
    setErr(""); setMsg("");
    const { error } = await supabase.rpc("admin_set_role", { p_user: id, p_role: rol });
    if (error) { setErr(error.message); return; }
    setMsg("Rol actualizat.");
    await incarca();
  }

  return (
    <>
      <h1 className="dash-h1">Personal</h1>
      {err && <div className="auth-msg err">{err}</div>}
      {msg && <div className="auth-msg ok">{msg}</div>}

      {/* ECHIPA */}
      <div className="dash-card glass">
        <h3>Echipa</h3>
        {loading ? (
          <p className="muted" style={{ marginTop: "10px" }}>Se încarcă...</p>
        ) : (
          <div className="adm-table-wrap" style={{ marginTop: "12px" }}>
            <table className="adm-table">
              <thead><tr><th>Nume</th><th>Email</th><th>Rol</th>{euAdmin && <th>Schimbă</th>}</tr></thead>
              <tbody>
                {echipa.map((r) => (
                  <tr key={r.id}>
                    <td>{r.full_name || "—"}</td>
                    <td className="muted">{r.email}</td>
                    <td><span className={"role-pill " + r.role}>{r.role}</span></td>
                    {euAdmin && (
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <select className="adm-select" value={edit[r.id] ?? r.role} onChange={(e) => setEdit({ ...edit, [r.id]: e.target.value })} style={{ padding: "7px 10px" }}>
                            <option value="member">member</option>
                            <option value="staff">staff</option>
                            <option value="admin">admin</option>
                          </select>
                          <button className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: "13px" }} onClick={() => setRol(r.id, edit[r.id] ?? r.role)}>Aplică</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {echipa.length === 0 && (
                  <tr><td colSpan={euAdmin ? 4 : 3} className="muted" style={{ textAlign: "center", padding: "20px" }}>Doar tu ești în echipă momentan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PROMOVARE */}
      {euAdmin && (
        <div className="dash-card glass">
          <h3>Adaugă în echipă</h3>
          <p className="muted" style={{ fontSize: "14px", marginTop: "8px" }}>Caută un membru și fă-l „staff" (recepție).</p>
          <div className="adm-tools" style={{ marginTop: "12px" }}>
            <input className="adm-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută membru după nume sau email..." />
          </div>
          {membri.map((r) => (
            <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <div>
                <div>{r.full_name || "—"}</div>
                <div className="muted" style={{ fontSize: "13px" }}>{r.email}</div>
              </div>
              <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={() => setRol(r.id, "staff")}>Fă staff</button>
            </div>
          ))}
          {q.trim() && membri.length === 0 && <p className="muted" style={{ fontSize: "14px", marginTop: "10px" }}>Niciun membru găsit.</p>}
        </div>
      )}

      {!euAdmin && <p className="muted" style={{ fontSize: "13px" }}>Doar un administrator poate modifica echipa.</p>}
    </>
  );
}