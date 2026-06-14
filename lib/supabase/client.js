import { createBrowserClient } from "@supabase/ssr";

// Client Supabase pentru cod care rulează în browser (componente client)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}