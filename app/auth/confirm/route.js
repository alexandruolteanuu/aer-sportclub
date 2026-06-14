import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

// Ruta pe care aterizează linkul din email. Verifică token-ul și pornește sesiunea.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      // token valid → mergem la pagina indicată (ex. setarea parolei noi)
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  // token lipsă/expirat
  return NextResponse.redirect(new URL("/login?eroare=link-invalid", origin));
}