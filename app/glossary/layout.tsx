import type { Metadata } from "next";
import { bookMeta } from "@/lib/chapters";
import { absoluteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Glossary",
  description: `Key terms and concepts from ${bookMeta.title}: Hilbert spaces, operators, Born rule, Dirac notation, wave functions, entanglement, and more.`,
  alternates: { canonical: absoluteUrl("/glossary") },
  openGraph: {
    title: `Glossary | ${bookMeta.title}`,
    description: `Key concepts in quantum mechanics: Hilbert spaces, operators, Born rule, Dirac notation, entanglement, and more.`,
    url: absoluteUrl("/glossary"),
  },
};

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
