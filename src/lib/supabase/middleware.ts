import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const resp = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_PUBLIC || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          const resp = NextResponse.next({ request })
          cookiesToSet.forEach((cookie) => {
            const { name, value, options } = cookie;
            request.cookies.set(name, value);
            resp.cookies.set(name, value, options);
          })
        }
      }
    }
  );

  await supabase.auth.getUser();
  return resp;
}
