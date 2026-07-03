import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getWebTheme, getWebThemes } from "@/lib/chapters";
import { lessonToPathSegment, chapterLessonPath } from "@/lib/lessonRoutes";
import legacyExerciseSlugRedirects from "@/lib/legacyExerciseSlugRedirects.json";

const legacy = legacyExerciseSlugRedirects as Record<string, string>;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const chapterMatch = /^\/chapters\/([^/]+)$/.exec(pathname);
  if (chapterMatch) {
    const lessonQuery = request.nextUrl.searchParams.get("lesson");
    if (lessonQuery) {
      const theme = getWebTheme(chapterMatch[1]);
      const lessonIndex = Number.parseInt(lessonQuery, 10) - 1;
      if (
        theme &&
        Number.isFinite(lessonIndex) &&
        lessonIndex >= 0 &&
        lessonIndex < theme.lessons.length
      ) {
        const lesson = theme.lessons[lessonIndex];
        const url = request.nextUrl.clone();
        url.pathname = `/chapters/${theme.slug}/${lessonToPathSegment(lesson)}`;
        url.search = "";
        return NextResponse.redirect(url, 308);
      }
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith("/exercises/")) {
    return NextResponse.next();
  }

  const rest = pathname.slice("/exercises/".length).replace(/\/$/, "");
  const slashIndex = rest.indexOf("/");
  const themeSlug = slashIndex === -1 ? rest : rest.slice(0, slashIndex);
  const to = legacy[themeSlug];
  if (!to) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  if (slashIndex === -1) {
    url.pathname = `/exercises/${to}`;
    return NextResponse.redirect(url, 308);
  }

  const exoSegment = rest.slice(slashIndex + 1);
  url.pathname = `/exercises/${to}/${exoSegment}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/chapters/:path*", "/exercises/:path*"],
};
