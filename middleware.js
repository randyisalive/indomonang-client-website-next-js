import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public routes
  const publicPaths = ["/login", "/register"];

  console.log("Middleware Debug - Token:", token);
  console.log("Middleware Debug - Pathname:", pathname);

  if (token && publicPaths.includes(pathname)) {
    console.log("User authenticated, redirecting to home...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !publicPaths.includes(pathname)) {
    console.log("User unauthenticated, redirecting to login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Request proceeding...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
