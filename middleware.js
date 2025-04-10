// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicPaths = ["/login", "/register", "/"];

  // 1. If user is logged in (has token) and tries to access auth pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    console.log("Pathname: ", pathname);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. If user is not logged in and tries to access protected page
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
