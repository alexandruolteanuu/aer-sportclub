import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import LogoutButton from "./LogoutButton";

// Componentă server: citește utilizatorul din sesiune.
export default async function Cont() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // dacă nu ești autentificat, te trimite la login
  if (!user) {
    redirect("/login");
  }

  // ia profilul (numele, telefonul, rolul)
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role")
    .eq("id", user.id)
    .single();

  const nume = (profile && profile.full_name) || user.email;
  const rowStyle = { display: "flex", flexDirection: "column", gap: "2px", padding: "12px 0", borderBottom: "1px solid var(--line)" };
  const kStyle = { fontSize: "12px", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--muted)" };

  return (
    <div className="auth-wrap" style={{ maxWidth: "560px" }}>
      <div className="auth-card glass sweep">
        <span className="eyebrow">Contul meu</span>
        <h1 style={{ fontSize: "32px" }}>Bine ai revenit, {nume}.</h1>
        <p className="sub">Ești autentificat. Aici va fi dashboard-ul tău — abonament, cod de acces și plăți. Îl construim în pașii următori.</p>

        <div style={{ marginTop: "20px" }}>
          <div style={rowStyle}>
            <span style={kStyle}>Email</span>
            <span className="fd" style={{ fontSize: "16px" }}>{user.email}</span>
          </div>
          <div style={rowStyle}>
            <span style={kStyle}>Telefon</span>
            <span className="fd" style={{ fontSize: "16px" }}>{(profile && profile.phone) || "—"}</span>
          </div>
          <div style={{ ...rowStyle, borderBottom: "none" }}>
            <span style={kStyle}>Rol</span>
            <span className="fd" style={{ fontSize: "16px" }}>{(profile && profile.role) || "member"}</span>
          </div>
        </div>

        <div style={{ marginTop: "22px" }}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}