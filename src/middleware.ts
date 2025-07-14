import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect unauthenticated users trying to access protected pages
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect logged-in users away from public pages like login
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
