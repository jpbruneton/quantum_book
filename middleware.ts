import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getWebTheme } from "@/lib/chapters";
import {
  isSiteLang,
  localizedPath,
  preferSiteLangFromAcceptLanguage,
  toInternalPathname,
  toLogicalPath,
  type SiteLang,
} from "@/lib/localeRoutes";
import { lessonToPathSegment } from "@/lib/lessonRoutes";
import { themeSlugToCanonical } from "@/lib/themePublicSlugs";

const STATIC_PREFIXES = ["/_next", "/pdfs", "/figs", "/favicon", "/robots.txt", "/sitemap.xml"];

function shouldBypass(pathname: string): boolean {
  if (STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return true;
  }
  return false;
}

function withSiteLangHeader(response: NextResponse, lang: SiteLang): NextResponse {
  response.headers.set("x-site-lang", lang);
  return response;
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/" || pathname === "") {
    const lang = preferSiteLangFromAcceptLanguage(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}`;
    return NextResponse.redirect(url, 307);
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (!isSiteLang(first)) {
    const url = request.nextUrl.clone();
    url.pathname = localizedPath("en", toLogicalPath(pathname));
    return NextResponse.redirect(url, 308);
  }

  const lang = first;
  const pathWithoutLang = segments.length > 1 ? `/${segments.slice(1).join("/")}` : "/";
  const logicalPath = toLogicalPath(pathWithoutLang);
  const canonicalPublicPath = localizedPath(lang, logicalPath);

  if (pathname !== canonicalPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = canonicalPublicPath;
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 308);
  }

  const chapterMatch = /^\/chapters\/([^/]+)$/.exec(logicalPath);
  if (chapterMatch) {
    const lessonQuery = request.nextUrl.searchParams.get("lesson");
    if (lessonQuery) {
      const theme = getWebTheme(themeSlugToCanonical(chapterMatch[1]));
      const lessonIndex = Number.parseInt(lessonQuery, 10) - 1;
      if (
        theme &&
        Number.isFinite(lessonIndex) &&
        lessonIndex >= 0 &&
        lessonIndex < theme.lessons.length
      ) {
        const lesson = theme.lessons[lessonIndex];
        const url = request.nextUrl.clone();
        url.pathname = localizedPath(
          lang,
          `/chapters/${theme.slug}/${lessonToPathSegment(lesson)}`
        );
        url.search = "";
        return NextResponse.redirect(url, 308);
      }
    }
  }

  const internalPathname = toInternalPathname(lang, pathWithoutLang);
  if (internalPathname !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = internalPathname;
    return withSiteLangHeader(NextResponse.rewrite(url), lang);
  }

  return withSiteLangHeader(NextResponse.next(), lang);
}

export const config = {
  matcher: ["/((?!_next|pdfs|figs|favicon.ico|robots.txt|sitemap.xml).*)"],
};
