import { existsSync } from "node:fs";
import { join } from "node:path";
import { MetadataRoute } from "next";
import { getWebThemes } from "@/lib/chapters";

function hasExoTex(themeNumber: number): boolean {
  const frPath = join(process.cwd(), "content", "tex", `theme${themeNumber}_fr`, "exo.tex");
  const enPath = join(process.cwd(), "content", "tex", `theme${themeNumber}_en`, "exo.tex");
  return existsSync(frPath) || existsSync(enPath);
}

const SITE_URL = "https://quantum-book.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/chapters`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/exercises`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const themeRoutes: MetadataRoute.Sitemap = getWebThemes().map((theme) => ({
    url: `${SITE_URL}/chapters/${theme.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const exerciseRoutes: MetadataRoute.Sitemap = getWebThemes()
    .filter((theme) => hasExoTex(theme.number))
    .map((theme) => ({
      url: `${SITE_URL}/exercises/${theme.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...themeRoutes, ...exerciseRoutes];
}
