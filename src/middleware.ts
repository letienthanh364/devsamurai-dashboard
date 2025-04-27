//  middleware.ts

import { NextRequest, NextResponse } from "next/server";
import mainPaths, { dashboardPaths } from "./constants/path";
import { COOKIE_NAMES } from "./constants/cookies.const";

export const config = {
  matcher: [
    // Protected routes (require authentication)
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    // Auth routes (reject if already authenticated)
    "/auth/login",
    "/auth/signup",
    // Catch all other non-static routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const userProfile = req.cookies.get(COOKIE_NAMES.USER_PROFILE)?.value;

  const isAuthenticated = !!accessToken && !!userProfile;
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  // Check if the current path is an auth page (login or signup)
  const isAuthPage = path === mainPaths.login || path === mainPaths.signup;

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL(dashboardPaths.home, req.url));
  }

  // If not authenticated and trying to access protected routes, redirect to login
  if (
    (!isAuthenticated && path.startsWith("/dashboard")) ||
    (!isAuthenticated && path.startsWith("/profile")) ||
    (!isAuthenticated && path.startsWith("/settings"))
  ) {
    // Add timestamp to make each URL unique - prevents caching issues
    url.pathname = mainPaths.login;
    url.searchParams.set("redirect", path);
    url.searchParams.set("ts", Date.now().toString());
    return NextResponse.redirect(url);
  }

  // Continue with the request
  return NextResponse.next();
}
