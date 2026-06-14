"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

export default function AdminExercitii() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("id, name, muscle_groups, is_published, video_url")
        .order("created_at", { ascending: false });
      if (error) setErr(error.message);
      else setRows(data || []);
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <h1 className="dash-h1">Ghid exerciții</h1>
        <Link href="/admin/exercitii/nou" className="btn btn-primary magnetic">+ Adaugă exercițiu</Link>
      </div>

      <div className="dash-card glass">
        {err && <div className="auth-msg err">{err}</div>}
        {loading ? (
          <p className="muted">Se încarcă...</p>
        ) : rows.length === 0 ? (
          <p className="muted">Niciun exercițiu încă. Apasă „Adaugă exercițiu" ca să creezi primul.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Nume</th><th>Grupe musculare</th><th>Video</th><th>Stare</th><th></th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td className="muted">{r.muscle_groups || "—"}</td>
                    <td>{r.video_url ? "Da" : <span className="muted">—</span>}</td>
                    <td>{r.is_published
                      ? <span className="badge-status activ"><span className="d"></span>Publicat</span>
                      : <span className="badge-status inactiv"><span className="d"></span>Ascuns</span>}</td>
                    <td><Link href={"/admin/exercitii/" + r.id} style={{ color: "var(--accent-2)" }}>Editează</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}