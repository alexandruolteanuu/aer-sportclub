// app/api/gif/[id]/route.js
// Ghișeul de imagini: servește animația unui exercițiu WorkoutX
// FĂRĂ să expună cheia API. Adresa documentată: /v1/gifs/{id}.gif
// Răspunsul se ține în cache-ul Vercel 24h (limita permisă de termenii WorkoutX).
export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const r = await fetch(
      "https://api.workoutxapp.com/v1/gifs/" + encodeURIComponent(id) + ".gif",
      { headers: { "X-WorkoutX-Key": process.env.WORKOUTX_API_KEY } }
    );

    if (!r.ok) {
      return new Response("Animația nu a putut fi încărcată. (" + r.status + ")", { status: 502 });
    }

    const bytes = await r.arrayBuffer(); // conținutul binar al GIF-ului

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        // public = voie în cache partajat; s-maxage=86400 = 24h pe CDN-ul Vercel;
        // stale-while-revalidate = servește versiunea existentă cât o reîmprospătează
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (e) {
    return new Response("Animația nu a putut fi încărcată.", { status: 502 });
  }
}