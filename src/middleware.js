import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/anonymous/signup", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
