import { notFound } from "next/navigation";
import Content from "./Content";
import { getWebThemes } from "@/lib/localizedChapters.server";
import { isSiteLang } from "@/lib/localeRoutes";

export default function Page({ params }: { params: { lang: string } }) {
  if (!isSiteLang(params.lang)) notFound();
  return <Content webThemes={getWebThemes(params.lang)} />;
}
