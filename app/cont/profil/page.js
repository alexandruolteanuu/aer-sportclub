"use client"; // formular interactiv: citește și salvează date

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function ContProfil() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [nume, setNume] = useState("");
  const [telefon, setTelefon] = useState("");
  const [incarc, setIncarc] = useState(true);
  const [salvez, setSalvez] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  // la deschidere: aducem datele profilului
  useEffect(() => {
    let activ = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .single();
      if (!activ) return;
      setEmail(user.email || "");
      setNume((profile && profile.full_name) || "");
      setTelefon((profile && profile.phone) || "");
      setIncarc(false);
    })();
    return () => { activ = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function salveaza(e) {
    e.preventDefault();
    setErr(""); setOk(false);
    if (!nume.trim()) { setErr("Numele nu poate fi gol."); return; }
    setSalvez(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: nume.trim(), phone: telefon.trim() })
      .eq("id", user.id);
    setSalvez(false);
    if (error) { setErr("Nu am putut salva. (" + error.message + ")"); return; }
    setOk(true);
    router.refresh(); // actualizează salutul din meniu
  }

  return (
    <>
      <h1 className="dash-h1">Profil</h1>

      <div className="dash-card glass sweep">
        {incarc ? (
          <p className="muted">Se încarcă...</p>
        ) : (
          <form className="cform" onSubmit={salveaza} noValidate>
            {err && <div className="auth-msg err">{err}</div>}
            {ok && <div className="auth-msg ok">Datele au fost salvate.</div>}

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
            </div>

            <div className="field">
              <label htmlFor="nume">Nume complet</label>
              <input id="nume" type="text" value={nume} onChange={(e) => setNume(e.target.value)} placeholder="Prenume Nume" />
            </div>

            <div className="field">
              <label htmlFor="telefon">Telefon</label>
              <input id="telefon" type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="07xx xxx xxx" />
            </div>

            <button type="submit" className="btn btn-primary magnetic" style={{ marginTop: "4px", padding: "13px 26px" }} disabled={salvez}>
              {salvez ? "Se salvează..." : "Salvează modificările"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}