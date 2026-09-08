import { getTranslations } from "@/lib/translations.server";
import type { Metadata } from "next";
import Script from "next/script";
import { isRtlLang, type Lang } from "@/lib/i18n";
import { fontVariables } from "@/app/fonts";
import "katex/dist/katex.min.css";
import "../globals.css";
import { Providers } from "../providers";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

const bookJsonLd = {
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: bookMetaDisplayTitle(),
  url: SITE_URL,
  inLanguage: ["en", "fr"],
};

// Set BING_SITE_VERIFICATION in Vercel env vars once the Bing Webmaster
// property is created; no code change needed after that.
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: bookMetaDisplayTitle(),
    template: `%s | ${bookMeta.title}`,
  },
  description: bookMeta.description,
  keywords: bookMeta.keywords,
  authors: [{ name: bookMeta.author }],
  manifest: "/manifest.json",
  verification: {
    google: "aCLhKbXa-E1sdaL-9q8LrOaKugUSiEIYAy8TTXX7F4g",
    ...(bingSiteVerification ? { other: { "msvalidate.01": bingSiteVerification } } : {}),
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

export default function SiteDocument({ children, lang }: { children: React.ReactNode; lang: Lang }) {
  const t = getTranslations(lang);
  return (
    <html lang={lang} dir={isRtlLang(lang) ? "rtl" : "ltr"} className={fontVariables} suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-18438495407" strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18438495407');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({...bookJsonLd, name: t.book.title, description: t.book.description, inLanguage: lang, url: `${SITE_URL}/${lang}`}).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({...websiteJsonLd, name: t.book.title, inLanguage: lang, url: `${SITE_URL}/${lang}`}).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
