import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "About",
  description: `${bookMetaDisplayTitle()} — by ${bookMeta.author} (${bookMeta.affiliation}). ${bookMeta.description}`,
  alternates: { canonical: "https://quantum-book.org/about" },
  openGraph: {
    title: `About | ${bookMeta.title}`,
    description: `${bookMetaDisplayTitle()} by ${bookMeta.author}, ${bookMeta.affiliation}.`,
    url: "https://quantum-book.org/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
