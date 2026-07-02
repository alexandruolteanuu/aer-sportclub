// app/aparate/[id]/page.js — PAGINA PUBLICĂ a unui aparat.
// Aici aterizează membrul când scanează codul QR lipit pe aparat.
// Server component: datele se încarcă pe server, pagina vine gata "coaptă".
import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

export default async function AparatPublic({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  // aparatul (doar dacă e publicat — regula RLS oricum ne protejează)
  const { data: aparat } = await supabase
    .from("machines")
    .select("id, name, zone, description")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  // exercițiile publicate ale aparatului
  const { data: exercitii } = await supabase
    .from("exercises")
    .select("id, name, muscle_groups, description, steps, media_url, video_url")
    .eq("machine_id", id)
    .eq("is_published", true)
    .order("name", { ascending: true });

  // aparat inexistent sau nepublicat → mesaj prietenos
  if (!aparat) {
    return (
      <div className="auth-wrap">
        <div className="auth-card glass sweep">
          <span className="eyebrow">Aer SportClub</span>
          <h1>Aparat negăsit</h1>
          <p className="sub">
            Acest cod nu mai e valid sau aparatul nu e disponibil momentan.
            Întreabă la recepție sau vezi ghidul complet de exerciții.
          </p>
          <Link href="/" className="btn btn-primary magnetic" style={{ marginTop: "14px" }}>
            Înapoi la site
          </Link>
        </div>
      </div>
    );
  }

  const lista = exercitii || [];

  return (
    <div className="wrap" style={{ paddingTop: "120px", paddingBottom: "80px", position: "relative", zIndex: 2 }}>
      {/* ANTETUL APARATULUI */}
      <span className="eyebrow">{aparat.zone === "cardio" ? "Zona Cardio" : "Zona Fitness"} · Ghid aparat</span>
      <h1 className="dash-h1" style={{ fontSize: "clamp(30px, 5vw, 46px)" }}>{aparat.name}</h1>
      {aparat.description && (
        <p className="muted" style={{ fontSize: "16px", maxWidth: "560px", marginTop: "4px" }}>
          {aparat.description}
        </p>
      )}

      {/* EXERCIȚIILE */}
      {lista.length === 0 ? (
        <div className="dash-card glass" style={{ marginTop: "24px" }}>
          <p className="muted">Exercițiile pentru acest aparat se adaugă în curând. Revino curând!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "28px" }}>
          {lista.map((ex) => (
            <div key={ex.id} className="dash-card glass sweep">
              <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", alignItems: "flex-start" }}>
                {/* ANIMAȚIA — prin ghișeul nostru /api/gif/... salvat în media_url */}
                {ex.media_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ex.media_url}
                    alt={"Demonstrație: " + ex.name}
                    style={{ width: "240px", maxWidth: "100%", borderRadius: "14px", background: "#fff", flex: "none" }}
                  />
                )}

                <div style={{ flex: 1, minWidth: "240px" }}>
                  <h3 style={{ fontFamily: "var(--fd)", fontSize: "22px" }}>{ex.name}</h3>
                  {ex.muscle_groups && (
                    <p style={{ color: "var(--accent-2)", fontSize: "14px", fontWeight: 600, marginTop: "4px" }}>
                      {ex.muscle_groups}
                    </p>
                  )}
                  {ex.description && (
                    <p className="muted" style={{ fontSize: "14px", marginTop: "8px" }}>{ex.description}</p>
                  )}

                  {/* PAȘII, numerotați */}
                  {ex.steps && (
                    <ol style={{ marginTop: "12px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {ex.steps.split("\n").filter((p) => p.trim()).map((pas, i) => (
                        <li key={i} className="muted" style={{ fontSize: "14px", lineHeight: 1.55 }}>
                          {pas.replace(/^\s*\d+[.)]\s*/, "")}
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* VIDEO opțional (dacă exercițiul are și un link video) */}
                  {ex.video_url && (
                    <a href={ex.video_url} target="_blank" rel="noreferrer"
                      className="btn btn-ghost magnetic" style={{ marginTop: "14px", padding: "10px 18px", fontSize: "14px" }}>
                      Vezi video →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ÎNDEMN FINAL */}
      <div className="dash-card glass" style={{ marginTop: "24px", textAlign: "center" }}>
        <p className="muted" style={{ fontSize: "14px" }}>
          Vrei ghidul complet, cu toate aparatele? Îl ai în aplicația Aer SportClub sau în contul tău de pe site.
        </p>
        <Link href="/cont/exercitii" className="btn btn-primary magnetic" style={{ marginTop: "12px" }}>
          Deschide ghidul complet
        </Link>
      </div>
    </div>
  );
}