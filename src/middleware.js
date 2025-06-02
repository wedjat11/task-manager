// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🛡️ Middleware ejecutado en:", request.nextUrl.pathname);
  const token = request.cookies.get("auth-token")?.value;
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (!token && !isLoginPage) {
    // No hay token y no está en login → redirigir a login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginPage) {
    // Ya hay token y está en login → redirigir a dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
