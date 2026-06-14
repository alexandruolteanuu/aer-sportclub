import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

function dataRo(x) {
  if (!x) return "—";
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" }).format(new Date(x));
}

export default async function ContAbonament() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan_name, status, current_period_end, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const activ = sub && sub.status === "active";
  const inAsteptare = sub && sub.status === "pending";

  return (
    <>
      <h1 className="dash-h1">Abonamentul meu</h1>

      <div className="dash-card glass sweep">
        {activ || inAsteptare ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div className="fd" style={{ fontSize: "24px" }}>{sub.plan_name}</div>
              {activ
                ? <span className="badge-status activ"><span className="d"></span>Activ</span>
                : <span className="badge-status asteptare"><span className="d"></span>În așteptare</span>}
            </div>
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="ab-row"><span className="muted">Status</span><span>{activ ? "Activ" : "În așteptare (achită la recepție)"}</span></div>
              <div className="ab-row"><span className="muted">Valabil până la</span><span>{dataRo(sub.current_period_end)}</span></div>
              <div className="ab-row"><span className="muted">Început la</span><span>{dataRo(sub.created_at)}</span></div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
              <Link href="/abonamente" className="btn btn-ghost magnetic">Schimbă abonamentul</Link>
            </div>
            <p className="muted" style={{ fontSize: "12.5px", marginTop: "14px" }}>
              Reînnoirea, prelungirea și anularea cu plată online se activează când conectăm plățile (Stripe).
            </p>
          </>
        ) : (
          <div className="empty">
            <h3>Nu ai un abonament activ</h3>
            <p className="muted" style={{ fontSize: "15px" }}>Alege un plan ca să te poți antrena non-stop și să primești codul de acces.</p>
            <Link href="/abonamente" className="btn btn-primary magnetic">Alege abonament</Link>
          </div>
        )}
      </div>
    </>
  );
}