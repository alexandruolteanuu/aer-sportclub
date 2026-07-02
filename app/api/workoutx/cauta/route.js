// app/api/workoutx/cauta/route.js
// Ghișeul de căutare în catalogul WorkoutX.
// - poate fi folosit DOAR de admin/staff (verificăm sesiunea Supabase)
// - browserul cere: /api/workoutx/cauta?q=chest press
// - serverul întreabă WorkoutX (cu cheia secretă) și întoarce o listă simplificată
import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { wx } from "../../../../lib/workoutx";

export async function GET(request) {
  // 1) Cine întreabă? Doar admin/staff au voie (protejăm cota plătită).
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Neautentificat." }, { status: 401 });
  }
  const { data: profil } = await supabase
    .from("profiles").select("role").eq("id", user.id).single();
  if (!profil || (profil.role !== "admin" && profil.role !== "staff")) {
    return NextResponse.json({ error: "Doar pentru administratori." }, { status: 403 });
  }

  // 2) Ce căutăm?
  const q = (new URL(request.url).searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ error: "Scrie cel puțin 2 caractere." }, { status: 400 });
  }

  // 3) Întrebăm WorkoutX (SDK-ul reîncearcă singur la erori temporare)
  try {
    const rezultate = await wx.exercises.byName(q);
    const lista = (Array.isArray(rezultate) ? rezultate : []).slice(0, 12).map((ex) => ({
      workoutx_id: String(ex.id),
      nume_en: ex.name,
      grupa: ex.bodyPart || "",
      muschi: ex.target || "",
      echipament: ex.equipment || "",
      // animația trece prin ghișeul NOSTRU de imagini — cheia rămâne ascunsă
      gif: "/api/gif/" + encodeURIComponent(String(ex.id)),
      instructiuni_en: ex.instructions || [],
    }));
    return NextResponse.json({ rezultate: lista });
  } catch (e) {
    return NextResponse.json(
      { error: "WorkoutX nu a răspuns: " + (e && e.message ? e.message : "eroare necunoscută") },
      { status: 502 }
    );
  }
}