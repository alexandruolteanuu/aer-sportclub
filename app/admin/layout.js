import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import AdminNav from "./AdminNav";
import LogoutButton from "../cont/LogoutButton"; // refolosim butonul de logout

// „Rama" zonei de admin. Lasă să intre DOAR admin/staff.
export default async function AdminLayout({ children }) {
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

  const rol = (profile && profile.role) || "member";
  // membrii obișnuiți nu au ce căuta aici
  if (rol !== "admin" && rol !== "staff") {
    redirect("/cont");
  }

  const prenume = ((profile && profile.full_name) || user.email).split(" ")[0];

  return (
    <div className="dash wrap">
      <aside className="dash-side glass">
        <div className="dash-greet">
          <span className="eyebrow">Administrare</span>
          <div className="fd dash-name">Salut, {prenume}</div>
          <span className="dash-role">{rol === "admin" ? "Administrator" : "Recepție"}</span>
        </div>

        <AdminNav rol={rol} />

        <div className="dash-side-foot">
          <LogoutButton />
        </div>
      </aside>

      <main className="dash-main">{children}</main>
    </div>
  );
}