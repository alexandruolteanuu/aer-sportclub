import { createClient } from "../../../lib/supabase/server";

function dt(x) {
  return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(new Date(x));
}
function motiv(status, reason) {
  if (status === "granted") return "Intrare permisă";
  const m = {
    token_invalid: "Cod invalid",
    token_used: "Cod deja folosit",
    token_expired: "Cod expirat",
    no_active_subscription: "Abonament inactiv",
  };
  return m[reason] || "Acces respins";
}

export default async function ContIntrari() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: logs } = await supabase
    .from("access_logs")
    .select("id, status, reason, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const lista = logs || [];

  return (
    <>
      <h1 className="dash-h1">Istoric intrări</h1>

      <div className="dash-card glass">
        {lista.length === 0 ? (
          <p className="muted">Nu ai nicio intrare înregistrată încă.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Data</th><th>Rezultat</th></tr></thead>
              <tbody>
                {lista.map((l) => (
                  <tr key={l.id}>
                    <td>{dt(l.created_at)}</td>
                    <td>{l.status === "granted"
                      ? <span className="badge-status activ"><span className="d"></span>{motiv(l.status, l.reason)}</span>
                      : <span className="badge-status inactiv"><span className="d"></span>{motiv(l.status, l.reason)}</span>}</td>
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