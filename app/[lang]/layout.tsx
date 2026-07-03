import { notFound } from "next/navigation";
import { LangProvider } from "@/app/context/LangContext";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";
import { VercelInstrumentation } from "@/app/components/VercelInstrumentation";
import { isSiteLang, SITE_LANGS } from "@/lib/localeRoutes";

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

export function generateStaticParams() {
  return SITE_LANGS.map((lang) => ({ lang }));
}

export default function LangLayout({ children, params }: Props) {
  if (!isSiteLang(params.lang)) {
    notFound();
  }

  return (
    <LangProvider initialLang={params.lang}>
      <NavBar />
      <main>{children}</main>
      <Footer />
      <VercelInstrumentation />
    </LangProvider>
  );
}
