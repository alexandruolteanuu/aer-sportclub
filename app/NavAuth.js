"use client"; // are nevoie de browser (logout + navigare)

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

// Primește din layout dacă utilizatorul e logat și arată butoanele potrivite.
export default function NavAuth({ isLoggedIn }) {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  // neautentificat → buton de intrare
  if (!isLoggedIn) {
    return (
      <Link href="/login" className="btn btn-ghost magnetic" style={{ padding: "10px 18px" }}>
        Intră în cont
      </Link>
    );
  }

  // autentificat → link spre cont + buton de ieșire
  return (
    <>
      <Link href="/cont" className="btn btn-ghost magnetic" style={{ padding: "10px 18px" }}>
        Contul meu
      </Link>
      <button
        onClick={logout}
        aria-label="Ieși din cont"
        style={{ background: "none", border: 0, color: "var(--muted)", cursor: "pointer", fontSize: "14px", fontFamily: "var(--fb)" }}
      >
        Ieși
      </button>
    </>
  );
}