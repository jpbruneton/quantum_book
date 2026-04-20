import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { absoluteUrl } from "@/lib/siteUrl";

// This metadata applies to /chapters (the listing page).
// Individual /chapters/[slug] pages override it via their own generateMetadata.
export const metadata: Metadata = {
  title: "Chapters",
  description: `Browse all themes and lessons of ${bookMetaDisplayTitle()} — covering Hilbert spaces, quantum postulates, measurement, and more.`,
  alternates: { canonical: absoluteUrl("/chapters") },
  openGraph: {
    title: `Chapters | ${bookMeta.title}`,
    description: `All themes and lessons of ${bookMeta.title}: Hilbert spaces, quantum postulates, measurement theory, and more.`,
    url: absoluteUrl("/chapters"),
  },
};

export default function ChaptersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
