import Link from "next/link";
import { createClient } from "../../lib/supabase/server";

function dataRo(x) {
  if (!x) return "—";
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" }).format(new Date(x));
}

export default async function ContAcasa() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // cel mai recent abonament al utilizatorului
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan_name, status, current_period_end")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const activ = sub && sub.status === "active";
  const inAsteptare = sub && sub.status === "pending";

  return (
    <>
      <h1 className="dash-h1">Bun venit înapoi.</h1>

      {/* CARD ABONAMENT */}
      <div className="dash-card glass sweep">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h3>Abonamentul tău</h3>
          {activ
            ? <span className="badge-status activ"><span className="d"></span>Activ</span>
            : inAsteptare
              ? <span className="badge-status asteptare"><span className="d"></span>În așteptare</span>
              : <span className="badge-status inactiv"><span className="d"></span>Fără abonament</span>}
        </div>

        {activ ? (
          <div style={{ marginTop: "14px" }}>
            <div className="fd" style={{ fontSize: "24px" }}>{sub.plan_name}</div>
            <p className="muted" style={{ marginTop: "6px", fontSize: "14px" }}>Valabil până la {dataRo(sub.current_period_end)}.</p>
          </div>
        ) : inAsteptare ? (
          <div className="empty" style={{ marginTop: "14px" }}>
            <p className="muted" style={{ fontSize: "15px" }}>
              Ai ales <b style={{ color: "var(--ink)" }}>{sub.plan_name}</b>. Achită la recepție ca să-ți activăm accesul — un coleg confirmă plata și primești codul QR.
            </p>
          </div>
        ) : (
          <div className="empty" style={{ marginTop: "14px" }}>
            <p className="muted" style={{ fontSize: "15px" }}>
              Nu ai un abonament activ. Alege unul ca să primești codul de acces și să intri în sală non-stop.
            </p>
            <Link href="/abonamente" className="btn btn-primary magnetic">Alege abonament</Link>
          </div>
        )}
      </div>

      {/* CARD COD ACCES */}
      <div className="dash-card glass">
        <h3>Cod de acces</h3>
        <div className="qr-locked" style={{ marginTop: "14px" }}>
          <svg viewBox="0 0 24 24" style={{ width: "30px", height: "30px", stroke: "var(--muted)", fill: "none", strokeWidth: 1.6 }}>
            <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          <p className="muted" style={{ fontSize: "14px", maxWidth: "320px" }}>
            {activ
              ? "Codul QR dinamic de acces 24/7 se activează în pasul „Acces 24/7”. Revino curând."
              : "Codul de acces apare aici după ce ai un abonament activ."}
          </p>
        </div>
      </div>

      {/* STATISTICI RAPIDE */}
      <div className="dash-stats">
        <div className="dash-card glass dash-stat">
          <div className="v">—</div>
          <div className="k">Intrări luna asta · în curând</div>
        </div>
        <div className="dash-card glass dash-stat">
          <div className="v">{activ ? dataRo(sub.current_period_end) : "—"}</div>
          <div className="k">Următoarea reînnoire</div>
        </div>
      </div>
    </>
  );
}