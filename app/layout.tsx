import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { isSiteLang } from "@/lib/localeRoutes";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: bookMetaDisplayTitle(),
  description: bookMeta.description,
  author: {
    "@type": "Person",
    name: bookMeta.author,
    affiliation: {
      "@type": "Organization",
      name: bookMeta.affiliation,
    },
  },
  datePublished: bookMeta.year,
  inLanguage: ["en", "fr"],
  url: SITE_URL,
  image: `${SITE_URL}/figs/front.png`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: bookMetaDisplayTitle(),
    template: `%s | ${bookMeta.title}`,
  },
  description: bookMeta.description,
  keywords: bookMeta.keywords,
  authors: [{ name: bookMeta.author }],
  verification: {
    google: "aCLhKbXa-E1sdaL-9q8LrOaKugUSiEIYAy8TTXX7F4g",
  },
  openGraph: {
    type: "book",
    siteName: bookMetaDisplayTitle(),
    title: bookMetaDisplayTitle(),
    description: bookMeta.description,
    authors: [bookMeta.author],
    url: SITE_URL,
    images: [
      {
        url: "/figs/front.png",
        width: 800,
        height: 1100,
        alt: bookMetaDisplayTitle(),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: bookMetaDisplayTitle(),
    description: bookMeta.description,
    images: ["/figs/front.png"],
  },
};

function resolveHtmlLang(): "en" | "fr" {
  const siteLang = headers().get("x-site-lang");
  if (siteLang && isSiteLang(siteLang)) {
    return siteLang;
  }
  return "en";
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const htmlLang = resolveHtmlLang();

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
