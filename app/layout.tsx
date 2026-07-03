import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Providers } from "./providers";
import { VercelInstrumentation } from "./components/VercelInstrumentation";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <VercelInstrumentation />
        </Providers>
      </body>
    </html>
  );
}
