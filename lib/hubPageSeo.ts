import type { SiteLang } from "@/lib/localeRoutes";

export type HubPageKey = "home" | "chapters" | "exercises" | "glossary" | "about";

interface HubPageSeoCopy {
  title: string;
  description: string;
}

const HUB_PAGE_SEO: Record<HubPageKey, Record<SiteLang, HubPageSeoCopy>> = {
  home: {
    en: {
      title: "Quantum Mechanics — Free textbook with lessons, exercises and PDFs",
      description:
        "Free online quantum mechanics textbook with rigorous lessons, solved exercises, PDF downloads, and bilingual EN/FR content for advanced students.",
    },
    fr: {
      title: "Mécanique quantique — Cours gratuit avec leçons, exercices et PDF",
      description:
        "Cours gratuit de mécanique quantique en ligne : leçons rigoureuses, exercices corrigés, téléchargements PDF et contenu bilingue français/anglais pour étudiants avancés.",
    },
  },
  chapters: {
    en: {
      title: "Quantum Mechanics chapters — Hilbert spaces, postulates, experiments",
      description:
        "Browse all chapters and lessons: foundational experiments, Hilbert spaces and operators, quantum postulates, with full math rendering and PDFs.",
    },
    fr: {
      title: "Chapitres de mécanique quantique — espaces de Hilbert, postulats, expériences",
      description:
        "Parcourez tous les chapitres et leçons : expériences fondatrices, espaces de Hilbert et opérateurs, postulats quantiques, avec formules et PDF.",
    },
  },
  exercises: {
    en: {
      title: "Quantum mechanics exercises — solved problems with step-by-step solutions",
      description:
        "Practice quantum mechanics with solved exercises on Hilbert spaces, operators, Stern-Gerlach experiments, and postulates. PDF worksheets available.",
    },
    fr: {
      title: "Exercices de mécanique quantique — problèmes corrigés pas à pas",
      description:
        "Entraînez-vous avec des exercices corrigés sur les espaces de Hilbert, les opérateurs, Stern-Gerlach et les postulats. Fiches PDF disponibles.",
    },
  },
  glossary: {
    en: {
      title: "Quantum mechanics glossary — Hilbert spaces, operators, Dirac notation",
      description:
        "Definitions of key quantum mechanics terms: Hilbert spaces, linear operators, Born rule, Dirac bra-ket notation, entanglement, measurement, and decoherence.",
    },
    fr: {
      title: "Glossaire de mécanique quantique — espaces de Hilbert, opérateurs, Dirac",
      description:
        "Définitions des termes clés de la mécanique quantique : espaces de Hilbert, opérateurs, règle de Born, notation de Dirac, intrication, mesure et décohérence.",
    },
  },
  about: {
    en: {
      title: "About Quantum Mechanics — author, edition, and open-access textbook",
      description:
        "Quantum Mechanics by Jean-Philippe Bruneton (Université Paris Cité). A rigorous, open-access textbook bridging intuition and Hilbert space formalism.",
    },
    fr: {
      title: "À propos — Mécanique quantique, auteur, édition et accès libre",
      description:
        "Mécanique Quantique par Jean-Philippe Bruneton (Université Paris Cité). Ouvrage rigoureux en accès libre, entre intuition physique et formalisme hilbertien.",
    },
  },
};

export function hubPageSeo(page: HubPageKey, lang: SiteLang): HubPageSeoCopy {
  return HUB_PAGE_SEO[page][lang];
}
