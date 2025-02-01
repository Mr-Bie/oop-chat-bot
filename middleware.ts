import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { notFound } from "next/navigation";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define protected routes
  const isAdminRoute = path.startsWith("/admin");
  const isUserRoute = path.startsWith("/dashboard");
  const isAuthRoute = path.startsWith("/auth");
  const isChatRoute = path === "/";

  console.log("middleware.ts ", token, {
    isAdminRoute,
    isUserRoute,
    isAuthRoute,
  });

  // Redirect unauthenticated users
  if (!token && (isAdminRoute || isUserRoute || isChatRoute)) {
    url.pathname = "/auth/login"; // Redirect to sign-in page
    return NextResponse.redirect(url);
  }

  const isAdmin = token?.role == "ADMIN";

  // Redirect logged in user to dashboard
  if (token && isAuthRoute) {
    if (isAdmin) url.pathname = "/admin";
    else url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  if (isUserRoute && isAdmin) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Check admin-specific route access
  if (isAdminRoute && !isAdmin) {
    return notFound();
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/", "/admin/:path*", "/dashboard/:path*", "/auth/:path*"], // Define protected routes
};
