import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DashNav from "./DashNav";
import LogoutButton from "./LogoutButton";

// „Rama" zonei de cont: meniu lateral + conținutul fiecărei secțiuni.
export default async function ContLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const numeIntreg = (profile && profile.full_name) || user.email;
  const prenume = numeIntreg.split(" ")[0];
  const rol = (profile && profile.role) || "member";
  const rolEticheta = rol === "admin" ? "Administrator" : rol === "staff" ? "Recepție" : "Membru";

  return (
    <div className="dash wrap">
      <aside className="dash-side glass">
        <div className="dash-greet">
          <span className="eyebrow">Contul meu</span>
          <div className="fd dash-name">Salut, {prenume}</div>
          <span className="dash-role">{rolEticheta}</span>
        </div>

        <DashNav rol={rol} />

        <div className="dash-side-foot">
          <LogoutButton />
        </div>
      </aside>

      <main className="dash-main">{children}</main>
    </div>
  );
}