import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Updates",
  description: `Latest news and updates about ${bookMetaDisplayTitle()} — new chapters, corrections, and announcements.`,
  alternates: { canonical: "https://quantum-book.org/blog" },
  openGraph: {
    title: `Updates | ${bookMeta.title}`,
    description: `News and updates about ${bookMeta.title}: new chapters, corrections, and announcements.`,
    url: "https://quantum-book.org/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
