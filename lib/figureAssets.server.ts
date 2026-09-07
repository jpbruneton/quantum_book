import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Lang } from "@/lib/i18n";

/** Prefer an actually built translation; otherwise retain the French figure. */
export function localizeFigureAssets(html: string, lang: Lang): string {
  return html.replace(/\/figs\/(?:[a-z]{2}\/)?([^"<>\s]+)/g, (match, name: string) => {
    // Build-generated responsive variants (public/figs/_optimized/...) are already
    // fully resolved by the manifest and live outside content/tex/site-assets/figs;
    // leave them untouched instead of treating "_optimized" as a missing lang code.
    if (name.startsWith("_optimized/")) return match;
    const exists = (code: string) => existsSync(join(process.cwd(), "content/tex/site-assets/figs", code, name));
    const code = exists(lang) ? lang : "fr";
    return `/figs/${code}/${name}`;
  });
}
