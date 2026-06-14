import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

export default async function ContExercitii() {
  const supabase = await createClient();
  const { data: ex } = await supabase
    .from("exercises")
    .select("id, name, muscle_groups, video_url")
    .eq("is_published", true)
    .order("name", { ascending: true });

  const lista = ex || [];

  return (
    <>
      <h1 className="dash-h1">Ghid exerciții</h1>
      <p className="muted" style={{ fontSize: "15px", marginTop: "-6px" }}>
        Cum se execută corect fiecare exercițiu. În sală poți scana direct codul QR de pe aparat.
      </p>

      {lista.length === 0 ? (
        <div className="dash-card glass"><p className="muted">Momentan nu sunt exerciții publicate. Revino curând.</p></div>
      ) : (
        <div className="ex-grid">
          {lista.map((e) => (
            <Link key={e.id} href={"/exercitii/" + e.id} className="ex-card glass">
              <span className="ex-name">{e.name}</span>
              {e.muscle_groups && <span className="muted" style={{ fontSize: "13px" }}>{e.muscle_groups}</span>}
              <span style={{ fontSize: "13px", color: "var(--accent-2)", marginTop: "4px" }}>
                {e.video_url ? "Vezi video →" : "Vezi pașii →"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}