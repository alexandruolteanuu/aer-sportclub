"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function AdminSetari() {
  const supabase = createClient();
  const [f, setF] = useState({ gym_name: "", address: "", phone: "", email: "", schedule: "", card_price: "" });
  const [euAdmin, setEuAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salvez, setSalvez] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: p } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        setEuAdmin(p && p.role === "admin");
      }
      const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
      if (data) setF({
        gym_name: data.gym_name || "",
        address: data.address || "",
        phone: data.phone || "",
        email: data.email || "",
        schedule: data.schedule || "",
        card_price: data.card_price ?? "",
      });
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function set(k, v) { setF({ ...f, [k]: v }); }

  async function salveaza(e) {
    e.preventDefault();
    setErr(""); setOk(false); setSalvez(true);
    const payload = {
      gym_name: f.gym_name.trim() || null,
      address: f.address.trim() || null,
      phone: f.phone.trim() || null,
      email: f.email.trim() || null,
      schedule: f.schedule.trim() || null,
      card_price: f.card_price === "" ? null : Number(f.card_price),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("settings").update(payload).eq("id", 1);
    setSalvez(false);
    if (error) { setErr(error.message); return; }
    setOk(true);
  }

  return (
    <>
      <h1 className="dash-h1">Setări sală</h1>

      <div className="dash-card glass sweep">
        {loading ? (
          <p className="muted">Se încarcă...</p>
        ) : (
          <form className="cform" onSubmit={salveaza} noValidate>
            {err && <div className="auth-msg err">{err}</div>}
            {ok && <div className="auth-msg ok">Setările au fost salvate.</div>}

            <div className="field">
              <label htmlFor="gym_name">Numele sălii</label>
              <input id="gym_name" type="text" value={f.gym_name} onChange={(e) => set("gym_name", e.target.value)} disabled={!euAdmin} />
            </div>
            <div className="field">
              <label htmlFor="address">Adresă</label>
              <input id="address" type="text" value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="Strada, nr, Târgu Neamț" disabled={!euAdmin} />
            </div>
            <div className="field">
              <label htmlFor="phone">Telefon</label>
              <input id="phone" type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="07xx xxx xxx" disabled={!euAdmin} />
            </div>
            <div className="field">
              <label htmlFor="email">Email contact</label>
              <input id="email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} disabled={!euAdmin} />
            </div>
            <div className="field">
              <label htmlFor="schedule">Program</label>
              <input id="schedule" type="text" value={f.schedule} onChange={(e) => set("schedule", e.target.value)} placeholder="Non-stop · 24/7" disabled={!euAdmin} />
            </div>
            <div className="field">
              <label htmlFor="card_price">Preț card de acces (lei)</label>
              <input id="card_price" type="number" min="0" value={f.card_price} onChange={(e) => set("card_price", e.target.value)} placeholder="ex. 10" disabled={!euAdmin} />
            </div>

            {euAdmin
              ? <button type="submit" className="btn btn-primary magnetic" style={{ marginTop: "4px", padding: "13px 26px" }} disabled={salvez}>{salvez ? "Se salvează..." : "Salvează setările"}</button>
              : <p className="muted" style={{ fontSize: "13px" }}>Doar un administrator poate modifica setările.</p>}
          </form>
        )}
      </div>
    </>
  );
}