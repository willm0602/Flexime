import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_PUBLIC || '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach((cookie) => {
              const { name, value, options } = cookie;
              cookieStore.set(name, value, options);
            })
          } catch {
            console.error('UNABLE TO SET COOKIES');
          }
        }
      }
    }
  )
}
