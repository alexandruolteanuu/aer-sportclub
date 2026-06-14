import { updateSession } from "./lib/supabase/middleware";

// În Next.js 16, „middleware" se numește acum „proxy" (logica e identică)
export async function proxy(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};