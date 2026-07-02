// app/api/workoutx/cauta/route.js
// Ghișeul de căutare în catalogul WorkoutX — vorbim DIRECT cu API-ul lor.
// Documentat: GET https://api.workoutxapp.com/v1/exercises/name/{termen}
// Răspunsul lor vine "împachetat": { total, count, data: [...] }
// - poate fi folosit DOAR de admin/staff (verificăm sesiunea Supabase)
// - cheia API stă doar aici, pe server (header X-WorkoutX-Key)
import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function GET(request) {
  // 1) Cine întreabă? Doar admin/staff au voie (protejăm cota).
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

  // 3) Întrebăm WorkoutX direct, pe adresa documentată pentru căutare după nume
  try {
    const r = await fetch(
      "https://api.workoutxapp.com/v1/exercises/name/" + encodeURIComponent(q) + "?limit=12",
      { headers: { "X-WorkoutX-Key": process.env.WORKOUTX_API_KEY } }
    );

    if (!r.ok) {
      const text = await r.text();
      return NextResponse.json(
        { error: "WorkoutX a răspuns cu eroare (" + r.status + "): " + text.slice(0, 200) },
        { status: 502 }
      );
    }

    const corp = await r.json();
    // răspunsul poate fi { data: [...] } (documentat) sau, defensiv, o listă simplă
    const listaBruta = Array.isArray(corp) ? corp : (corp.data || []);

    const lista = listaBruta.slice(0, 12).map((ex) => ({
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