"use client";
// Admin → Aparate: lista aparatelor din sală + adăugare rapidă.
// Fiecare aparat va avea exerciții atașate (le gestionăm în pagina lui).

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

export default function AdminAparate() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // formularul de adăugare rapidă
  const [nume, setNume] = useState("");
  const [zona, setZona] = useState("fitness");
  const [salvez, setSalvez] = useState(false);

  async function incarca() {
    // aparatele + numărul de exerciții atașate fiecăruia
    const { data, error } = await supabase
      .from("machines")
      .select("id, name, zone, is_published, exercises(count)")
      .order("name", { ascending: true });
    if (error) setErr(error.message);
    else setRows(data || []);
    setLoading(false);
  }

  useEffect(() => { incarca(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function adauga(e) {
    e.preventDefault();
    setErr("");
    if (!nume.trim()) { setErr("Scrie numele aparatului."); return; }
    setSalvez(true);
    const { data, error } = await supabase
      .from("machines")
      .insert({ name: nume.trim(), zone: zona })
      .select("id")
      .single();
    setSalvez(false);
    if (error) { setErr(error.message); return; }
    // mergem direct în pagina aparatului nou, să-i atașăm exerciții
    window.location.href = "/admin/aparate/" + data.id;
  }

  return (
    <>
      <h1 className="dash-h1">Aparate</h1>
      <p className="muted" style={{ fontSize: "14px", marginTop: "-6px" }}>
        Fiecare aparat primește propriul cod QR și propria listă de exerciții cu animații.
      </p>

      {err && <div className="auth-msg err">{err}</div>}

      {/* ADĂUGARE RAPIDĂ */}
      <div className="dash-card glass sweep">
        <h3>Adaugă aparat</h3>
        <form className="cform" onSubmit={adauga} noValidate>
          <div className="field">
            <label htmlFor="nume">Nume aparat</label>
            <input id="nume" type="text" value={nume} onChange={(e) => setNume(e.target.value)}
              placeholder="ex. Pec Deck / Fluturări piept" />
          </div>
          <div className="field">
            <label htmlFor="zona">Zona</label>
            <select id="zona" className="adm-select" value={zona} onChange={(e) => setZona(e.target.value)}>
              <option value="fitness">Fitness</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary magnetic" style={{ padding: "13px 26px" }} disabled={salvez}>
            {salvez ? "Se creează..." : "Creează aparat"}
          </button>
        </form>
      </div>

      {/* LISTA */}
      <div className="dash-card glass">
        {loading ? (
          <p className="muted">Se încarcă...</p>
        ) : rows.length === 0 ? (
          <p className="muted">Niciun aparat încă. Adaugă primul mai sus.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Aparat</th><th>Zona</th><th>Exerciții</th><th>Stare</th><th></th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td className="muted">{r.zone === "cardio" ? "Cardio" : "Fitness"}</td>
                    <td>{r.exercises && r.exercises[0] ? r.exercises[0].count : 0}</td>
                    <td>{r.is_published
                      ? <span className="badge-status activ"><span className="d"></span>Publicat</span>
                      : <span className="badge-status inactiv"><span className="d"></span>Ascuns</span>}</td>
                    <td><Link href={"/admin/aparate/" + r.id} style={{ color: "var(--accent-2)" }}>Deschide</Link></td>
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