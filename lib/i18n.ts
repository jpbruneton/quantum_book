export type Lang = "en" | "fr";

export const translations = {
  en: {
    book: {
      title: "Quantum Mechanics",
      subtitle: "A Modern Introduction",
      description:
        "A rigorous yet accessible treatment of quantum mechanics, bridging classical intuition and the mathematical formalism of Hilbert spaces, operators, and measurement theory. Designed for advanced undergraduates and graduate students.",
      edition: "First Edition",
    },
    nav: {
      home: "Home",
      chapters: "Chapters",
      exercises: "Exercises",
      blog: "Blog",
      about: "About",
    },
    home: {
      badge: "Free Online Edition",
      readOnline: "Read Online →",
      aboutBook: "About the Book",
      chapterPrefix: "Ch",
      stats: {
        chapters: "Chapters",
        edition: "Edition",
        format: "Format",
        formatValue: "Web + PDF",
      },
      contentsLabel: "Contents",
      exploreTitle: "Explore the Chapters",
      readChapter: "Read chapter →",
      fullBookDownload: "Download the full edition (coming soon)",
      features: [
        {
          icon: "∫",
          title: "Full Math Rendering",
          body: "All equations rendered with KaTeX — crisp LaTeX-quality math in your browser.",
        },
        {
          icon: "⬇",
          title: "PDF Downloads",
          body: "Every chapter available as a downloadable PDF for offline study.",
        },
        {
          icon: "◎",
          title: "Free & Open Access",
          body: "Complete text freely available online. No paywalls, no sign-up required.",
        },
      ],
    },
    chapters: {
      label: "TABLE OF CONTENTS",
      title: "All Chapters",
      description:
        "Each chapter is available to read online with full math rendering, or to download as a PDF.",
    },
    chapter: {
      chapterLabel: "CHAPTER",
      readTime: (t: string) => `${t} read`,
      downloadPdf: "↓ Download PDF",
      breadcrumbHome: "Home",
      breadcrumbChapters: "Chapters",
      prev: "← Previous",
      next: "Next →",
      noteTitle: "Note:",
      noteBody:
        "This is a preview excerpt. Download the full PDF for the complete chapter, exercises, and solutions.",
      tabOnline: "Read Online",
      tabPdf: "PDF Viewer",
      downloadBtn: "↓ Download",
      pdfFallback: "If the PDF doesn't display,",
      pdfFallbackLink: "click here to download it",
    },
    about: {
      label: "ABOUT THE BOOK",
      aboutBookTitle: "About This Book",
      bookDetails: "Book Details",
      detailLabels: {
        author: "Author",
        affiliation: "Affiliation",
        edition: "Edition",
        year: "Year",
        chapters: "Chapters",
        isbn: "ISBN",
      },
      chaptersUnit: "chapters",
      authorTitle: "About the Author",
      howToUse: "How to Use This Site",
      howToBody:
        "Each chapter can be read online via the Read Online tab, which renders all mathematical equations using KaTeX. Alternatively, switch to the PDF Viewer tab to view the typeset PDF directly in your browser, or download it for offline reading. All content is free and open access.",
      authorBioSuffix: "is a physicist at",
      authorBioRest:
        "Their research interests span quantum field theory, quantum information, and the foundations of quantum mechanics. This book grew from lecture notes developed over many years of teaching graduate and advanced undergraduate courses.",
      bioReplacePlaceholder: "✏️ Replace this bio in app/about/page.tsx",
      aboutBookBody2:
        "The text develops quantum mechanics from first principles, assuming a solid background in classical mechanics, electrodynamics, and the mathematics of linear algebra and differential equations. Proofs are given in full where they illuminate the physics, and numerous worked examples complement the theoretical exposition.",
    },
    updates: {
      label: "BLOG",
      title: "Project Blog",
      description:
        "Updates, release notes, roadmap decisions, and progress notes for the book project.",
      latestTitle: "Latest posts",
      entries: [
        {
          date: "2026-02-25",
          title: "Bilingual mode and theming",
          body:
            "Added French/English language support, dark/light themes, and improved math rendering with KaTeX.",
        },
      ],
      comingSoon: "More updates will be posted here regularly.",
    },
    footer: {
      navigation: "Navigation",
      home: "Home",
      allChapters: "All Chapters",
      exercises: "Exercises",
      blog: "Blog",
      aboutBook: "About the Book",
      author: "Author",
      copyright: (year: string, author: string) =>
        `© ${year} ${author}. All rights reserved.`,
    },
  },
  fr: {
    book: {
      title: "Mécanique Quantique",
      subtitle: "Une Introduction Moderne",
      description:
        "Cet ouvrage propose une formalisation rigoureuse de la mécanique quantique moderne. Dépassant le cadre des manuels d'introduction conventionnels, il approfondit les outils essentiels de la physique mathématique, des espaces de Hilbert à la théorie spectrale avancée en passant par la topologie et la géométrie. Ce traité s’adresse à ceux qui cherchent, au-delà de la simple pratique du calcul, à saisir la nécessité logique et le fondement des structures employées. Le texte aborde de front les enjeux de l’interprétation, analysant en détail le problème de la mesure et de la décohérence, tout en présentant les théories alternatives et leurs contraintes expérimentales. Destiné aux étudiants de second cycle, doctorants et chercheurs, il vise une maîtrise exhaustive de la théorie, unissant rigueur technique et profondeur conceptuelle.",
      edition: "Première Édition",
    },
    nav: {
      home: "Accueil",
      chapters: "Chapitres",
      exercises: "Exercices",
      blog: "Blog",
      about: "À propos",
    },
    home: {
      badge: "Édition gratuite en ligne",
      readOnline: "Lire en ligne →",
      aboutBook: "À propos du livre",
      chapterPrefix: "Ch",
      stats: {
        chapters: "Chapitres",
        edition: "Édition",
        format: "Format",
        formatValue: "Web + PDF",
      },
      contentsLabel: "Sommaire",
      exploreTitle: "Explorer les chapitres",
      readChapter: "Lire le chapitre →",
      fullBookDownload: "Télécharger l'édition complète (bientôt)",
      features: [
        {
          icon: "∫",
          title: "Rendu mathématique complet",
          body: "Toutes les équations sont rendues avec KaTeX — des maths de qualité LaTeX dans votre navigateur.",
        },
        {
          icon: "⬇",
          title: "Téléchargements PDF",
          body: "Chaque chapitre est disponible en téléchargement PDF pour une étude hors ligne.",
        },
        {
          icon: "◎",
          title: "Accès libre et gratuit",
          body: "Texte intégral disponible gratuitement en ligne. Sans abonnement, sans inscription.",
        },
      ],
    },
    chapters: {
      label: "TABLE DES MATIÈRES",
      title: "Tous les chapitres",
      description:
        "Chaque chapitre est disponible en lecture en ligne avec rendu mathématique complet, ou en téléchargement PDF.",
    },
    chapter: {
      chapterLabel: "CHAPITRE",
      readTime: (t: string) => `${t} de lecture`,
      downloadPdf: "↓ Télécharger le PDF",
      breadcrumbHome: "Accueil",
      breadcrumbChapters: "Chapitres",
      prev: "← Précédent",
      next: "Suivant →",
      noteTitle: "Note :",
      noteBody:
        "Ceci est un extrait de prévisualisation. Téléchargez le PDF complet pour le chapitre entier, les exercices et les solutions.",
      tabOnline: "Lire en ligne",
      tabPdf: "Visionneur PDF",
      downloadBtn: "↓ Télécharger",
      pdfFallback: "Si le PDF ne s'affiche pas,",
      pdfFallbackLink: "cliquez ici pour le télécharger",
    },
    about: {
      label: "À PROPOS DU LIVRE",
      aboutBookTitle: "À propos de ce livre",
      bookDetails: "Détails du livre",
      detailLabels: {
        author: "Auteur",
        affiliation: "Établissement",
        edition: "Édition",
        year: "Année",
        chapters: "Chapitres",
        isbn: "ISBN",
      },
      chaptersUnit: "chapitres",
      authorTitle: "À propos de l'auteur",
      howToUse: "Comment utiliser ce site",
      howToBody:
        "Chaque chapitre peut être lu en ligne via l'onglet Lire en ligne, qui affiche toutes les équations mathématiques avec KaTeX. Vous pouvez également basculer vers l'onglet Visionneur PDF pour consulter le PDF directement dans votre navigateur, ou le télécharger pour une lecture hors ligne. Tout le contenu est en accès libre.",
      authorBioSuffix: "est physicien(ne) à",
      authorBioRest:
        "Ses intérêts de recherche couvrent la théorie quantique des champs, l'information quantique et les fondements de la mécanique quantique. Ce livre est issu de notes de cours développées au fil de nombreuses années d'enseignement aux cycles supérieurs.",
      bioReplacePlaceholder: "✏️ Remplacez cette biographie dans app/about/page.tsx",
      aboutBookBody2:
        "Le texte développe la mécanique quantique à partir des premiers principes, en supposant une solide formation en mécanique classique, en électrodynamique et en mathématiques. Les preuves sont données en entier lorsqu'elles éclairent la physique, et de nombreux exemples travaillés complètent l'exposition théorique.",
    },
    updates: {
      label: "BLOG",
      title: "Blog du projet",
      description:
        "Actualités, notes de version, décisions de feuille de route et avancées du projet de livre.",
      latestTitle: "Derniers articles",
      entries: [
        {
          date: "2026-02-25",
          title: "Mode bilingue et thèmes",
          body:
            "Ajout de la prise en charge français/anglais, des thèmes sombre/clair et amélioration du rendu mathématique avec KaTeX.",
        },
      ],
      comingSoon: "D'autres mises à jour seront publiées ici régulièrement.",
    },
    footer: {
      navigation: "Navigation",
      home: "Accueil",
      allChapters: "Tous les chapitres",
      exercises: "Exercices",
      blog: "Blog",
      aboutBook: "À propos du livre",
      author: "Auteur",
      copyright: (year: string, author: string) =>
        `© ${year} ${author}. Tous droits réservés.`,
    },
  },
};

export type Translations = typeof translations.en;
