import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: { url: SITE_URL },
};

export default function HomePage() {
  return <HomePageClient />;
}
