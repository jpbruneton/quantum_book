import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";

// This metadata applies to /chapters (the listing page).
// Individual /chapters/[slug] pages override it via their own generateMetadata.
export const metadata: Metadata = {
  title: "Chapters",
  description: `Browse all themes and lessons of ${bookMetaDisplayTitle()} — covering Hilbert spaces, quantum postulates, measurement, and more.`,
  alternates: { canonical: "https://quantum-book.org/chapters" },
  openGraph: {
    title: `Chapters | ${bookMeta.title}`,
    description: `All themes and lessons of ${bookMeta.title}: Hilbert spaces, quantum postulates, measurement theory, and more.`,
    url: "https://quantum-book.org/chapters",
  },
};

export default function ChaptersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
