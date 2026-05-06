import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { absoluteUrl } from "@/lib/siteUrl";

const UPDATES_URL = absoluteUrl("/updates");

export const metadata: Metadata = {
  title: "Updates",
  description: `Latest news and updates about ${bookMetaDisplayTitle()} — new chapters, corrections, and announcements.`,
  alternates: { canonical: UPDATES_URL },
  openGraph: {
    title: `Updates | ${bookMeta.title}`,
    description: `News and updates about ${bookMeta.title}: new chapters, corrections, and announcements.`,
    url: UPDATES_URL,
  },
};

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
