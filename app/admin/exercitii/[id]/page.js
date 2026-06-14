"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/client";

export default function AdminExercitiuEditor() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const eNou = id === "nou";

  const [name, setName] = useState("");
  const [grupe, setGrupe] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pasi, setPasi] = useState("");
  const [video, setVideo] = useState("");
  const [publicat, setPublicat] = useState(true);

  const [loading, setLoading] = useState(!eNou);
  const [lucrez, setLucrez] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (eNou) return;
    (async () => {
      const { data, error } = await supabase.from("exercises").select("*").eq("id", id).single();
      if (error) { setErr(error.message); setLoading(false); return; }
      setName(data.name || "");
      setGrupe(data.muscle_groups || "");
      setDescriere(data.description || "");
      setPasi(data.steps || "");
      setVideo(data.video_url || "");
      setPublicat(data.is_published);
      setLoading(false);
    })();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function salveaza(e) {
    e.preventDefault();
    setErr("");
    if (!name.trim()) { setErr("Numele exercițiului e obligatoriu."); return; }
    setLucrez(true);
    const payload = {
      name: name.trim(),
      muscle_groups: grupe.trim() || null,
      description: descriere.trim() || null,
      steps: pasi.trim() || null,
      video_url: video.trim() || null,
      is_published: publicat,
    };
    let error;
    if (eNou) {
      ({ error } = await supabase.from("exercises").insert(payload));
    } else {
      ({ error } = await supabase.from("exercises").update(payload).eq("id", id));
    }
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    router.push("/admin/exercitii");
    router.refresh();
  }

  async function sterge() {
    if (!confirm("Sigur ștergi acest exercițiu?")) return;
    setLucrez(true);
    const { error } = await supabase.from("exercises").delete().eq("id", id);
    setLucrez(false);
    if (error) { setErr(error.message); return; }
    router.push("/admin/exercitii");
    router.refresh();
  }

  if (loading) return (<><h1 className="dash-h1">Exercițiu</h1><p className="muted">Se încarcă...</p></>);

  return (
    <>
      <Link href="/admin/exercitii" className="muted" style={{ fontSize: "14px" }}>← Înapoi la exerciții</Link>
      <h1 className="dash-h1">{eNou ? "Exercițiu nou" : "Editează exercițiu"}</h1>

      <div className="dash-card glass sweep">
        <form className="cform" onSubmit={salveaza} noValidate>
          {err && <div className="auth-msg err">{err}</div>}

          <div className="field">
            <label htmlFor="name">Nume exercițiu</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex. Împins la piept" />
          </div>
          <div className="field">
            <label htmlFor="grupe">Grupe musculare</label>
            <input id="grupe" type="text" value={grupe} onChange={(e) => setGrupe(e.target.value)} placeholder="ex. Piept, triceps, umeri" />
          </div>
          <div className="field">
            <label htmlFor="descriere">Descriere scurtă</label>
            <textarea id="descriere" rows={2} value={descriere} onChange={(e) => setDescriere(e.target.value)} placeholder="O frază despre exercițiu" />
          </div>
          <div className="field">
            <label htmlFor="pasi">Pași de execuție</label>
            <textarea id="pasi" rows={4} value={pasi} onChange={(e) => setPasi(e.target.value)} placeholder={"Câte un pas pe linie:\n1. Reglează scaunul...\n2. Apucă mânerele..."} />
          </div>
          <div className="field">
            <label htmlFor="video">Link video (opțional)</label>
            <input id="video" type="url" value={video} onChange={(e) => setVideo(e.target.value)} placeholder="https://... (YouTube sau .mp4)" />
          </div>
          <label className="auth-check">
            <input type="checkbox" checked={publicat} onChange={(e) => setPublicat(e.target.checked)} />
            <span>Publicat (vizibil la scanarea codului QR)</span>
          </label>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
            <button type="submit" className="btn btn-primary magnetic" disabled={lucrez}>
              {lucrez ? "Se salvează..." : (eNou ? "Creează exercițiu" : "Salvează")}
            </button>
            {!eNou && (
              <>
                <Link href={"/exercitii/" + id} className="btn btn-ghost" target="_blank">Vezi pagina publică</Link>
                <button type="button" className="btn btn-ghost" onClick={sterge} disabled={lucrez} style={{ color: "#e98a8a" }}>Șterge</button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}