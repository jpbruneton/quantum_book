import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { absoluteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "About",
  description: `${bookMetaDisplayTitle()} — by ${bookMeta.author} (${bookMeta.affiliation}). ${bookMeta.description}`,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: `About | ${bookMeta.title}`,
    description: `${bookMetaDisplayTitle()} by ${bookMeta.author}, ${bookMeta.affiliation}.`,
    url: absoluteUrl("/about"),
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
