// src/app/api/logout/route.js
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  cookieStore.delete("user-name");

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
}
