// app/api/gif/[id]/route.js
// Ghișeul de imagini: servește animația unui exercițiu WorkoutX
// FĂRĂ să expună cheia API.
// - site-ul și aplicația cer: /api/gif/0001
// - serverul ia GIF-ul de la WorkoutX (cu cheia) și îl dă mai departe
// - răspunsul se ține în cache-ul Vercel 24h (limita permisă de termenii WorkoutX),
//   deci pentru membri e rapid și consumă foarte puține cereri API
import { wx } from "../../../../lib/workoutx";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const bytes = await wx.gifs.get(id); // conținutul binar al GIF-ului

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        // public = are voie în cache-uri partajate; s-maxage=86400 = 24h pe CDN-ul Vercel;
        // stale-while-revalidate = servește versiunea veche cât o reîmprospătează în fundal
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (e) {
    return new Response("Animația nu a putut fi încărcată.", { status: 502 });
  }
}