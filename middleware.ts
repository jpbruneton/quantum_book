import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import legacyExerciseSlugRedirects from "@/lib/legacyExerciseSlugRedirects.json";

const legacy = legacyExerciseSlugRedirects as Record<string, string>;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/exercises/")) {
    return NextResponse.next();
  }
  const rest = pathname.slice("/exercises/".length).replace(/\/$/, "");
  if (rest.includes("/")) {
    return NextResponse.next();
  }
  const to = legacy[rest];
  if (to) {
    const url = request.nextUrl.clone();
    url.pathname = `/exercises/${to}`;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/exercises/:path*",
};
