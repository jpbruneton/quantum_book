import { notFound } from "next/navigation";
import ChaptersPageClient from "./ChaptersPageClient";
import { getWebThemes } from "@/lib/localizedChapters.server";
import { isSiteLang } from "@/lib/localeRoutes";

export default function ChaptersPage({ params }: { params: { lang: string } }) {
  if (!isSiteLang(params.lang)) notFound();
  return <ChaptersPageClient webThemes={getWebThemes(params.lang)} />;
}
