import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { absoluteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Exercises",
  description: `Practice problems and exercises for ${bookMetaDisplayTitle()} — covering Hilbert spaces, operators, measurement, and more.`,
  alternates: { canonical: absoluteUrl("/exercises") },
  openGraph: {
    title: `Exercises | ${bookMeta.title}`,
    description: `Practice problems for ${bookMeta.title}: Hilbert spaces, operators, measurement theory, and more.`,
    url: absoluteUrl("/exercises"),
  },
};

export default function ExercisesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
