import { createClient } from "../../lib/supabase/server";

export default async function AdminAcasa() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("admin_overview");
  const s = data || {};

  const stats = [
    { v: s.total_membri ?? 0, k: "Membri înscriși" },
    { v: s.abonamente_active ?? 0, k: "Abonamente active" },
    { v: s.abonamente_asteptare ?? 0, k: "Abonamente în așteptare" },
    { v: (s.venit_luna ?? 0) + " lei", k: "Venit luna curentă" },
  ];

  return (
    <>
      <h1 className="dash-h1">Privire de ansamblu</h1>

      {error && <div className="auth-msg err">Nu am putut încărca statisticile. ({error.message})</div>}

      <div className="adm-stats">
        {stats.map((st, i) => (
          <div key={i} className="dash-card glass adm-stat">
            <div className="v">{st.v}</div>
            <div className="k">{st.k}</div>
          </div>
        ))}
      </div>

      {/* alertă plăți de confirmat */}
      <div className="dash-card glass sweep">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h3>Plăți la recepție de confirmat</h3>
          <span className={(s.plati_asteptare ?? 0) > 0 ? "badge-status asteptare" : "badge-status inactiv"}>
            <span className="d"></span>{s.plati_asteptare ?? 0}
          </span>
        </div>
        <p className="muted" style={{ marginTop: "10px", fontSize: "14px" }}>
          Aici vei confirma plățile cash făcute la recepție (în așteptare → activ). Funcția se conectează odată cu plățile.
        </p>
      </div>

      <p className="muted" style={{ fontSize: "13px" }}>
        Graficele (membri în timp, venit, intrări azi/7/30 zile) și alertele de expirare le adăugăm pe măsură ce intră datele reale (abonamente plătite, scanări QR).
      </p>
    </>
  );
}