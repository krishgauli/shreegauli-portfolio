import { NextRequest, NextResponse } from "next/server";

/**
 * Redirect non-www → www to prevent duplicate content and Google redirect errors.
 * Runs on the Vercel Edge — zero cold-start overhead.
 */
export function middleware(request: NextRequest) {
  const { hostname } = request.nextUrl;

  // Redirect apex domain to www (permanent 308)
  if (hostname === "shreegauli.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.shreegauli.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)).*)",
  ],
};
