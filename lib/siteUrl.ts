/**
 * Public origin for canonical URLs, Open Graph, sitemap, and robots.
 * Set `NEXT_PUBLIC_SITE_URL` in the environment (https only in production, no trailing slash).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set at build time to your public site origin (https://..., no trailing slash)."
  );
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "" || path === "/") {
    return base;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
