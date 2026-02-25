import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { LanguageGate } from "./components/LanguageGate";
import { Providers } from "./providers";
import { bookMeta } from "@/lib/chapters";

export const metadata: Metadata = {
  title: {
    default: `${bookMeta.title}: ${bookMeta.subtitle}`,
    template: `%s | ${bookMeta.title}`,
  },
  description: bookMeta.description,
  keywords: bookMeta.keywords,
  authors: [{ name: bookMeta.author }],
  openGraph: {
    type: "book",
    title: `${bookMeta.title}: ${bookMeta.subtitle}`,
    description: bookMeta.description,
    authors: [bookMeta.author],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          <NavBar />
          <main>
            <LanguageGate>{children}</LanguageGate>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
