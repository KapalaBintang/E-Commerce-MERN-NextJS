import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Helper function to check if the access token is expired
const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export async function middleware(request: NextRequest) {
  const cookieStore = cookies(); // Access the cookie store
  const userCookie = cookieStore.get("user"); // Get the 'user' cookie

  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = JSON.parse(userCookie.value || "{}");

  // Check if access token exists
  if (!user.user.accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if access token is expired
  if (isTokenExpired(user.user.accessToken)) {
    try {
      // Send a request to refresh token endpoint to get a new access token
      const response = await fetch(
        "http://localhost:8000/api/users/refresh-token",
        {
          method: "POST",
          credentials: "include", // Include cookies in the request
        },
      );

      if (!response.ok) {
        // If the refresh token is invalid, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const data = await response.json();

      // Update the 'user' cookie with the new access token
      const updatedUser = {
        ...user,
        user: { ...user.user, accessToken: data.accessToken },
      };
      cookieStore.set("user", JSON.stringify(updatedUser), {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60,
      });

      // Continue the request with the updated access token
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check if the user is trying to access admin pages
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user.isAdmin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If token is valid, continue the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
