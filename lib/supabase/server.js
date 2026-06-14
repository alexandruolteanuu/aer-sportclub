import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client Supabase pentru cod care rulează pe server (componente server, acțiuni)
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Apelat dintr-un Server Component — se poate ignora, middleware-ul reîmprospătează sesiunea
          }
        },
      },
    }
  );
}