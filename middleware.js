import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // headers
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public routes
  const publicPaths = ["/login", "/signup", "/view_quotation"];

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
