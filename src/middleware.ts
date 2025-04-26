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
  if (!isAuthenticated && !isAuthPage) {
    // Exclude public paths that don't need authentication
    const isPublicPath = [
      "/",
      "/about",
      "/contact",
      // Add other public paths here
    ].includes(path);

    if (!isPublicPath) {
      url.pathname = mainPaths.login;
      // Store the original URL to redirect back after login
      url.searchParams.set("redirect", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // Continue with the request
  return NextResponse.next();
}
