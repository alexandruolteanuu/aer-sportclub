"use client"; // buton interactiv, rulează în browser

import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={logout} className="btn btn-ghost magnetic">
      Ieși din cont
    </button>
  );
}