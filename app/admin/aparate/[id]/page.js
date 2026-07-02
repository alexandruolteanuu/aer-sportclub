"use client";
// Admin → Aparate → [id]: "camera de comandă" a unui aparat.
// 1) editezi datele aparatului
// 2) vezi/gestionezi exercițiile atașate
// 3) cauți în WorkoutX (cu preview de animații) și atașezi exerciții noi

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";

export default function AdminAparatEditor() {
  const supabase = createClient();
  const params = useParams();
  const id = params.id;

  // --- datele aparatului ---
  const [nume, setNume] = useState("");
  const [zona, setZona] = useState("fitness");
  const [descriere, setDescriere] = useState("");
  const [publicat, setPublicat] = useState(true);

  // --- exercițiile atașate ---
  const [exercitii, setExercitii] = useState([]);

  // --- căutarea WorkoutX ---
  const [q, setQ] = useState("");                 // ce scrii în căutare
  const [rezultate, setRezultate] = useState([]); // ce întoarce WorkoutX
  const [caut, setCaut] = useState(false);
  const [ales, setAles] = useState(null);         // rezultatul selectat pentru atașare
  // formularul de personalizare în română a exercițiului ales
  const [exNume, setExNume] = useState("");
  const [exGrupe, setExGrupe] = useState("");
  const [exPasi, setExPasi] = useState("");

  const [loading, setLoading] = useState(true);
  const [lucrez, setLucrez] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  // ÎNCARCĂ aparatul + exercițiile lui
  const incarca = useCallback(async () => {
    const { data: m, error } = await supabase
      .from("machines").select("*").eq("id", id).single();
    if (error) { setErr(error.message); setLoading(false); return; }
    setNume(m.name || "");
    setZona(m.zone || "fitness");
    setDescriere(m.description || "");
    setPublicat(m.is_published);

    const { data: ex } = await supabase
      .from("exercises")
      .select("id, name, muscle_groups, media_url, is_published")
      .eq("machine_id", id)
      .order("name", { ascending: true });
    setExercitii(ex || []);
    setLoading(false);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { incarca(); }, [incarca]);

  // SALVEAZĂ datele aparatului
  async function salveazaAparat(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    if (!nume.trim()) { setErr("Numele aparatului e obligatoriu."); return; }
    setLucrez(true);
    const { error } = await supabase.from("machines").update({
      name: nume.trim(),
      zone: zona,
      description: descriere.trim() || null,
      is_published: publicat,
    }).eq("id", id);
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    setMsg("Aparat salvat.");
  }

  // CAUTĂ în WorkoutX prin ghișeul nostru protejat
  async function cauta(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setAles(null); setRezultate([]);
    if (q.trim().length < 2) { setErr("Scrie cel puțin 2 caractere în căutare."); return; }
    setCaut(true);
    try {
      const r = await fetch("/api/workoutx/cauta?q=" + encodeURIComponent(q.trim()));
      const data = await r.json();
      if (!r.ok) {
        setErr(data.error || "Căutarea a eșuat.");
      } else if (!data.rezultate || data.rezultate.length === 0) {
        // atenție: în string-uri folosim DOAR ghilimele simple, nu tipografice
        setErr('Niciun rezultat pentru "' + q.trim() + '". Încearcă alt termen (în engleză, ex. chest press).');
      } else {
        setRezultate(data.rezultate);
      }
    } catch (e2) {
      setErr("Nu am putut contacta serverul. (" + e2.message + ")");
    }
    setCaut(false);
  }

  // ALEGE un rezultat → precompletăm formularul de personalizare
  function alege(r) {
    setAles(r);
    setExNume("");        // numele ÎN ROMÂNĂ îl scrii tu
    setExGrupe(r.muschi ? r.muschi : "");
    // instrucțiunile WorkoutX sunt în engleză — le punem ca punct de plecare,
    // tu le rescrii în română înainte de salvare
    setExPasi((r.instructiuni_en || []).join("\n"));
    setMsg("");
    setErr("");
  }

  // ATAȘEAZĂ exercițiul ales pe aparat
  async function ataseaza(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    if (!exNume.trim()) { setErr("Scrie numele exercițiului în română."); return; }
    setLucrez(true);
    const { error } = await supabase.from("exercises").insert({
      name: exNume.trim(),
      muscle_groups: exGrupe.trim() || null,
      steps: exPasi.trim() || null,
      machine_id: id,
      media_url: ales.gif,            // linkul NOSTRU: /api/gif/<workoutx_id>
      media_source: "workoutx",
      workoutx_id: ales.workoutx_id,
      is_published: true,
    });
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    setMsg("Exercițiu atașat.");
    setAles(null); setQ(""); setRezultate([]);
    incarca();
  }

  // DEZLEAGĂ un exercițiu de aparat (exercițiul rămâne în ghidul general)
  async function dezleaga(exId) {
    setErr(""); setMsg("");
    const { error } = await supabase.from("exercises")
      .update({ machine_id: null }).eq("id", exId);
    if (error) { setErr(error.message); return; }
    incarca();
  }

  if (loading) return (<><h1 className="dash-h1">Aparat</h1><p className="muted">Se încarcă...</p></>);

  return (
    <>
      <Link href="/admin/aparate" className="muted" style={{ fontSize: "14px" }}>← Înapoi la aparate</Link>
      <h1 className="dash-h1">{nume || "Aparat"}</h1>

      {err && <div className="auth-msg err">{err}</div>}
      {msg && <div className="auth-msg ok">{msg}</div>}

      {/* ===== 1. DATELE APARATULUI ===== */}
      <div className="dash-card glass sweep">
        <h3>Date aparat</h3>
        <form className="cform" onSubmit={salveazaAparat} noValidate style={{ marginTop: "12px" }}>
          <div className="field">
            <label htmlFor="nume">Nume aparat</label>
            <input id="nume" type="text" value={nume} onChange={(e) => setNume(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="zona">Zona</label>
            <select id="zona" className="adm-select" value={zona} onChange={(e) => setZona(e.target.value)}>
              <option value="fitness">Fitness</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="descriere">Descriere scurtă (opțional)</label>
            <textarea id="descriere" rows={2} value={descriere} onChange={(e) => setDescriere(e.target.value)}
              placeholder="O frază despre aparat, vizibilă membrilor" />
          </div>
          <label className="auth-check">
            <input type="checkbox" checked={publicat} onChange={(e) => setPublicat(e.target.checked)} />
            <span>Publicat (vizibil la scanarea codului QR)</span>
          </label>
          <button type="submit" className="btn btn-primary magnetic" style={{ padding: "13px 26px" }} disabled={lucrez}>
            {lucrez ? "Se salvează..." : "Salvează aparatul"}
          </button>
        </form>
      </div>

      {/* ===== 2. EXERCIȚIILE ATAȘATE ===== */}
      <div className="dash-card glass">
        <h3>Exerciții pe acest aparat ({exercitii.length})</h3>
        {exercitii.length === 0 ? (
          <p className="muted" style={{ marginTop: "10px" }}>
            Niciun exercițiu atașat. Caută mai jos în catalogul WorkoutX și atașează primul.
          </p>
        ) : (
          <div className="ex-grid" style={{ marginTop: "12px" }}>
            {exercitii.map((ex) => (
              <div key={ex.id} className="ex-card glass">
                {ex.media_url && (
                  /* animația exercițiului, prin ghișeul nostru de imagini */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ex.media_url} alt={ex.name}
                    style={{ width: "100%", borderRadius: "10px", background: "#fff" }} />
                )}
                <span className="ex-name">{ex.name}</span>
                {ex.muscle_groups && <span className="muted" style={{ fontSize: "13px" }}>{ex.muscle_groups}</span>}
                <div style={{ display: "flex", gap: "10px", marginTop: "6px", flexWrap: "wrap" }}>
                  <Link href={"/admin/exercitii/" + ex.id} style={{ color: "var(--accent-2)", fontSize: "13px" }}>Editează</Link>
                  <button onClick={() => dezleaga(ex.id)}
                    style={{ background: "none", border: 0, color: "#e98a8a", cursor: "pointer", fontSize: "13px", padding: 0 }}>
                    Dezleagă de aparat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== 3. CAUTĂ ÎN WORKOUTX ȘI ATAȘEAZĂ ===== */}
      <div className="dash-card glass">
        <h3>Adaugă exercițiu din catalogul WorkoutX</h3>
        <p className="muted" style={{ fontSize: "14px", marginTop: "8px" }}>
          Caută în engleză (ex. chest press, lat pulldown, leg extension). Alegi animația, apoi scrii numele și pașii în română.
        </p>

        <form onSubmit={cauta} className="adm-tools" style={{ marginTop: "14px" }}>
          <input className="adm-search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="ex. chest press" />
          <button type="submit" className="btn btn-primary magnetic" disabled={caut}>
            {caut ? "Caut..." : "Caută"}
          </button>
        </form>

        {/* REZULTATELE cu animații */}
        {rezultate.length > 0 && !ales && (
          <div className="ex-grid" style={{ marginTop: "16px" }}>
            {rezultate.map((r) => (
              <div key={r.workoutx_id} className="ex-card glass">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.gif} alt={r.nume_en}
                  style={{ width: "100%", borderRadius: "10px", background: "#fff" }} />
                <span className="ex-name" style={{ fontSize: "15px" }}>{r.nume_en}</span>
                <span className="muted" style={{ fontSize: "12px" }}>
                  {[r.grupa, r.muschi, r.echipament].filter(Boolean).join(" · ")}
                </span>
                <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: "13px", marginTop: "6px" }}
                  onClick={() => alege(r)}>
                  Alege
                </button>
              </div>
            ))}
          </div>
        )}

        {/* FORMULARUL de personalizare în română */}
        {ales && (
          <div style={{ marginTop: "18px", borderTop: "1px solid var(--line)", paddingTop: "18px" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ales.gif} alt={ales.nume_en}
                style={{ width: "180px", borderRadius: "12px", background: "#fff", flex: "none" }} />
              <div style={{ flex: 1, minWidth: "260px" }}>
                <p className="muted" style={{ fontSize: "13px" }}>
                  Ai ales: <b style={{ color: "var(--ink)" }}>{ales.nume_en}</b>. Completează versiunea în română:
                </p>
                <form className="cform" onSubmit={ataseaza} noValidate style={{ marginTop: "10px" }}>
                  <div className="field">
                    <label htmlFor="exnume">Nume exercițiu (în română)</label>
                    <input id="exnume" type="text" value={exNume} onChange={(e) => setExNume(e.target.value)}
                      placeholder="ex. Împins la piept la aparat" />
                  </div>
                  <div className="field">
                    <label htmlFor="exgrupe">Grupe musculare</label>
                    <input id="exgrupe" type="text" value={exGrupe} onChange={(e) => setExGrupe(e.target.value)}
                      placeholder="ex. Piept, triceps" />
                  </div>
                  <div className="field">
                    <label htmlFor="expasi">Pași de execuție (în română, câte unul pe linie)</label>
                    <textarea id="expasi" rows={5} value={exPasi} onChange={(e) => setExPasi(e.target.value)}
                      placeholder={"1. Reglează scaunul...\n2. Apucă mânerele..."} />
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button type="submit" className="btn btn-primary magnetic" disabled={lucrez}>
                      {lucrez ? "Se atașează..." : "Atașează pe aparat"}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => setAles(null)}>
                      Renunță
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}