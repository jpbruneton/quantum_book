import { notFound } from "next/navigation";
import Content from "./Content";
import { getCatalog } from "@/lib/catalog";
import { isSiteLang } from "@/lib/localeRoutes";

export default function Page({ params }: { params: { lang: string } }) {
  if (!isSiteLang(params.lang)) notFound();
  return <Content copy={getCatalog(params.lang).ui.about} />;
}
