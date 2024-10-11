import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const getUserCookie = request.cookies.get("user");
  const user = JSON.parse(getUserCookie?.value || "{}");

  if (!user.user.accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user.isAdmin)
      return NextResponse.redirect(new URL("/login", request.url));

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/coba/:path*", "/admin/:path*"],
};
