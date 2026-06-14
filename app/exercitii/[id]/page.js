import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

function ytEmbed(u) {
  const m = u.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return m ? "https://www.youtube.com/embed/" + m[1] : null;
}

export default async function ExercitiuPublic({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: ex } = await supabase
    .from("exercises")
    .select("name, muscle_groups, description, steps, video_url")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (!ex) {
    return (
      <section className="wrap" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: "14px", paddingTop: "120px", paddingBottom: "80px" }}>
        <span className="eyebrow">Aer SportClub</span>
        <h1 style={{ fontSize: "clamp(30px,6vw,54px)", fontWeight: 800 }}>Exercițiu indisponibil</h1>
        <p className="muted">Acest exercițiu nu există sau nu e publicat momentan.</p>
        <Link href="/" className="btn btn-ghost magnetic" style={{ alignSelf: "flex-start" }}>Înapoi acasă</Link>
      </section>
    );
  }

  const yt = ex.video_url ? ytEmbed(ex.video_url) : null;
  const pasiLista = (ex.steps || "").split("\n").map((s) => s.trim()).filter(Boolean);

  return (
    <section className="wrap mach" style={{ paddingTop: "120px", paddingBottom: "80px", maxWidth: "820px" }}>
      <span className="eyebrow">Ghid exerciții</span>
      <h1 style={{ fontSize: "clamp(30px,6vw,54px)", fontWeight: 800, marginTop: "10px" }}>{ex.name}</h1>
      {ex.muscle_groups && (
        <p className="muted" style={{ marginTop: "10px", fontSize: "16px" }}>Grupe lucrate: <b style={{ color: "var(--ink)" }}>{ex.muscle_groups}</b></p>
      )}

      {ex.video_url && (
        <div className="mach-video" style={{ marginTop: "24px" }}>
          {yt
            ? <iframe src={yt} title={ex.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            : <video src={ex.video_url} controls playsInline></video>}
        </div>
      )}

      {ex.description && <p style={{ marginTop: "24px", fontSize: "17px", lineHeight: 1.6 }}>{ex.description}</p>}

      {pasiLista.length > 0 && (
        <div className="dash-card glass" style={{ marginTop: "24px" }}>
          <h3 style={{ fontFamily: "var(--fd)", fontSize: "20px" }}>Pași de execuție</h3>
          <ol className="mach-steps">
            {pasiLista.map((p, i) => <li key={i}>{p}</li>)}
          </ol>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <Link href="/abonamente" className="btn btn-ghost magnetic">Vezi abonamentele</Link>
      </div>
    </section>
  );
}