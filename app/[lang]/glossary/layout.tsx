import type { Metadata } from "next";
import { bookMeta } from "@/lib/chapters";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, localizedPath } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (!isSiteLang(params.lang)) return {};
  const url = absoluteUrl(localizedPath(params.lang, "/glossary"));
  return {
    title: "Glossary",
    description: `Key terms and concepts from ${bookMeta.title}: Hilbert spaces, operators, Born rule, Dirac notation, wave functions, entanglement, and more.`,
    alternates: localeAlternates(params.lang, "/glossary"),
    openGraph: {
      title: `Glossary | ${bookMeta.title}`,
      description: `Key concepts in quantum mechanics: Hilbert spaces, operators, Born rule, Dirac notation, entanglement, and more.`,
      url,
    },
  };
}

export default function GlossaryLayout({ children }: Props) {
  return <>{children}</>;
}
