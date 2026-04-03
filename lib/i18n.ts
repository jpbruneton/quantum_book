export type Lang = "en" | "fr";

export const translations = {
  en: {
    book: {
      title: "Quantum Mechanics",
      subtitle: "A Modern Introduction",
      description:
        "This book proposes a rigorous formalization of modern quantum mechanics. Going beyond the scope of conventional introductory textbooks, it develops the essential tools of mathematical physics, from Hilbert spaces to advanced spectral theory, including topology and geometry.\n\nThis treatise is intended for readers who seek, beyond computational practice, to understand the logical necessity and foundation of the structures in use. The text addresses interpretational issues directly, with a detailed analysis of the measurement problem and decoherence, while also presenting alternative theories and their experimental constraints.\n\nIntended for master's students, doctoral students, and researchers, it aims at a comprehensive command of the theory, uniting technical rigor with conceptual depth.",
      edition: "First Edition",
    },
    nav: {
      home: "Home",
      chapters: "Themes",
      exercises: "Exercises",
      blog: "Blog",
      about: "About",
    },
    home: {
      badge: "Free Online Edition",
      readOnline: "Read Online →",
      aboutBook: "About the Book",
      chapterPrefix: "Ch",
      themePrefix: "Theme",
      stats: {
        chapters: "Themes",
        edition: "Edition",
        format: "Format",
        formatValue: "Web + PDF",
      },
      contentsLabel: "Contents",
      exploreTitle: "Explore the Themes",
      readTheme: "Open theme →",
      readLesson: "Read lesson →",
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
      label: "THEMES",
      title: "All Themes",
      description: "",
      emptyTheme: "No lesson available yet for this theme.",
      lessonsAvailable: (count: number) =>
        count === 1 ? "1 lesson available" : `${count} lessons available`,
    },
    chapter: {
      chapterLabel: "LESSON",
      themeLabel: "THEME",
      lessonLabel: "LESSON",
      readTime: (t: string) => `${t} read`,
      downloadPdf: "↓ Download PDF",
      breadcrumbHome: "Home",
      breadcrumbChapters: "Themes",
      breadcrumbThemes: "Themes",
      prev: "← Previous",
      next: "Next →",
      noteTitle: "Note:",
      noteBody:
        "This is a preview excerpt. Download the full PDF for the complete chapter, exercises, and solutions.",
      tabOnline: "Read Online",
      tabReferences: "References",
      tabPdf: "PDF Viewer",
      tocTitle: "Table of Contents",
      showToc: "Show TOC",
      hideToc: "Hide TOC",
      refsEmpty: "No references added yet for this lesson.",
      refsEnglishTitle: "English references",
      refsFrenchTitle: "French references",
      refsSectionEmpty: "No link added in this section yet.",
      contentUnavailable:
        "English lesson content is not available yet for this lesson.",
      downloadBtn: "↓ Download",
      pdfFallback: "If the PDF doesn't display,",
      pdfFallbackLink: "click here to download it",
      lessonsTabsLabel: "Lessons",
      noLessonTitle: "No lesson available",
      noLessonBody:
        "This theme is listed in the structure, but lesson content has not been published yet.",
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
      },
      authorTitle: "About the Author",
      authorBioSuffix: "is a physicist at",
      authorBioRest:
        "His research interests include the laws of gravitation, quantum mechanics and its foundations, and artificial intelligence. This book grew from lecture notes developed over many years of teaching at graduate and advanced undergraduate level.",
      authorLinksHeading: "Profiles",
      authorLinkLinkedIn: "LinkedIn",
      authorLinkGoogleScholar: "Google Scholar",
      authorLinkGitHub: "GitHub",
      aboutBookBody2:
        "The text develops quantum mechanics from first principles, assuming a strong background in classical mechanics, electrodynamics, and mathematics. Proofs are given in full whenever they clarify the physics, and many worked examples complement the theoretical exposition.",
      translationWarning:
        "Warning: this book is primarily written in French; the English version is automatically translated using Claude 4.6.",
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
      allChapters: "All Themes",
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
      subtitle: "Une introduction moderne",
      description:
        "Cet ouvrage propose une formalisation rigoureuse de la mécanique quantique moderne. Dépassant le cadre des manuels d'introduction conventionnels, il approfondit les outils essentiels de la physique mathématique, des espaces de Hilbert à la théorie spectrale avancée en passant par la topologie et la géométrie.\n\nCe traité s’adresse à ceux qui cherchent, au-delà de la simple pratique du calcul, à saisir la nécessité logique et le fondement des structures employées. Le texte aborde de front les enjeux de l’interprétation, analysant en détail le problème de la mesure et de la décohérence, tout en présentant les théories alternatives et leurs contraintes expérimentales.\n\nDestiné aux étudiants de second cycle, doctorants et chercheurs, il vise une maîtrise exhaustive de la théorie, unissant rigueur technique et profondeur conceptuelle.",
      edition: "Première Édition",
    },
    nav: {
      home: "Accueil",
      chapters: "Thèmes",
      exercises: "Exercices",
      blog: "Blog",
      about: "À propos",
    },
    home: {
      badge: "Édition gratuite en ligne",
      readOnline: "Lire en ligne →",
      aboutBook: "À propos du livre",
      chapterPrefix: "Ch",
      themePrefix: "Thème",
      stats: {
        chapters: "Thèmes",
        edition: "Édition",
        format: "Format",
        formatValue: "Web + PDF",
      },
      contentsLabel: "Sommaire",
      exploreTitle: "Explorer les thèmes",
      readTheme: "Ouvrir le thème →",
      readLesson: "Lire la leçon →",
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
      label: "THÈMES",
      title: "Tous les thèmes",
      description: "",
      emptyTheme: "Aucune leçon disponible pour ce thème pour le moment.",
      lessonsAvailable: (count: number) =>
        count <= 1 ? `${count} leçon disponible` : `${count} leçons disponibles`,
    },
    chapter: {
      chapterLabel: "LEÇON",
      themeLabel: "THÈME",
      lessonLabel: "LEÇON",
      readTime: (t: string) => `${t} de lecture`,
      downloadPdf: "↓ Télécharger le PDF",
      breadcrumbHome: "Accueil",
      breadcrumbChapters: "Thèmes",
      breadcrumbThemes: "Thèmes",
      prev: "← Précédent",
      next: "Suivant →",
      noteTitle: "Note :",
      noteBody:
        "Ceci est un extrait de prévisualisation. Téléchargez le PDF complet pour le chapitre entier, les exercices et les solutions.",
      tabOnline: "Lire en ligne",
      tabReferences: "Références",
      tabPdf: "Visionneur PDF",
      tocTitle: "Table des matières",
      showToc: "Afficher la table des matières",
      hideToc: "Masquer la table des matières",
      refsEmpty: "Aucune référence ajoutée pour cette leçon pour le moment.",
      refsEnglishTitle: "Références anglaises",
      refsFrenchTitle: "Références françaises",
      refsSectionEmpty: "Aucun lien ajouté dans cette section pour le moment.",
      contentUnavailable:
        "Le contenu de cette leçon n'est pas encore disponible dans cette langue.",
      downloadBtn: "↓ Télécharger",
      pdfFallback: "Si le PDF ne s'affiche pas,",
      pdfFallbackLink: "cliquez ici pour le télécharger",
      lessonsTabsLabel: "Leçons",
      noLessonTitle: "Aucune leçon disponible",
      noLessonBody:
        "Ce thème est bien présent dans la structure, mais son contenu de leçon n'est pas encore publié.",
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
      },
      authorTitle: "À propos de l'auteur",
      authorBioSuffix: "est physicien à l'",
      authorBioRest:
        "Ses intérêts de recherche couvrent les lois de la gravitation, la mécanique quantique et ses fondements, et l'IA. Ce livre est issu de notes de cours développées au fil de nombreuses années d'enseignement aux cycles supérieurs.",
      authorLinksHeading: "Liens",
      authorLinkLinkedIn: "LinkedIn",
      authorLinkGoogleScholar: "Google Scholar",
      authorLinkGitHub: "GitHub",
      aboutBookBody2:
        "Le texte développe la mécanique quantique à partir des premiers principes, en supposant une solide formation en mécanique classique, en électrodynamique et en mathématiques. Les preuves sont données en entier lorsqu'elles éclairent la physique, et de nombreux exemples travaillés complètent l'exposition théorique.",
      translationWarning:
        "Note : ce livre est principalement rédigé en français ; la version anglaise est traduite automatiquement avec Claude 4.6.",
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
      allChapters: "Tous les thèmes",
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
