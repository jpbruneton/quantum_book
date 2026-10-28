import type { Metadata } from "next";
import { isRtlLang, type Lang } from "@/lib/i18n";
import { fontVariables } from "@/app/fonts";
import "katex/dist/katex.min.css";
import "../globals.css";
import { Providers } from "../providers";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

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
  return (
    <html lang={lang} dir={isRtlLang(lang) ? "rtl" : "ltr"} className={fontVariables} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
