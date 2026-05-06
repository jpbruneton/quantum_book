export type Lang = "en" | "fr";

export type UpdateEntry = {
  date: string;
  title: string;
  body: string;
};

export const translations = {
  en: {
    book: {
      title: "Quantum Mechanics",
      subtitle: "",
      description:
        "This book proposes a rigorous formalization of modern quantum mechanics. Going beyond the scope of conventional introductory textbooks, it develops the essential tools of mathematical physics, from Hilbert spaces to advanced spectral theory, including topology and geometry.\n\nThis treatise is intended for readers who seek, beyond computational practice, to understand the logical necessity and foundation of the structures in use. The text addresses interpretational issues directly, with a detailed analysis of the measurement problem and decoherence, while also presenting alternative theories and their experimental constraints.\n\nIntended for master's students, doctoral students, and researchers, it aims at a comprehensive command of the theory, uniting technical rigor with conceptual depth.",
      edition: "First Edition",
    },
    nav: {
      home: "Home",
      chapters: "Themes",
      exercises: "Exercises",
      glossary: "Glossary",
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
      authorBioSuffix: "is a physicist at ",
      authorBioRest:
        "His research interests include the laws of gravitation, quantum mechanics and its foundations, and symbolic regression as a machine learning task. This book grew from lecture notes developed over many years of teaching at graduate and advanced undergraduate level.",
      authorLinksHeading: "Profiles",
      authorLinkLinkedIn: "LinkedIn",
      authorLinkGoogleScholar: "Google Scholar",
      authorLinkGitHub: "GitHub",
      aboutProjectTitle: "About the Project",
      aboutProjectLead:
        "This site and the book are under development. Lessons and exercises will be added gradually.",
      aboutProjectOutlineLabel: "Planned content:",
      aboutProjectOutlineBody:
        "Part I, isolated systems: mathematical formalism (mathematical physics), postulates, basic applications. Part II, interacting systems: entanglement, decoherence, measurement theory. Part III: interpretations of quantum mechanics and alternative theories. Part IV: quantum information, quantum algorithms. Part V: quantum gravity.",
      aboutBookBody2:
        "The text develops quantum mechanics from first principles, assuming a strong background in classical mechanics, electrodynamics, and mathematics. Proofs are given in full whenever they clarify the physics, and many worked examples complement the theoretical exposition.",
      translationWarning:
        "Warning: this book is primarily written in French; the English version is automatically translated using Claude Sonnet 4.6.",
    },
    updates: {
      label: "UPDATES",
      title: "Project updates",
      description: "",
      latestTitle: "Latest posts",
      timelineLabel: "Timeline",
      entries: [
        {
          date: "2026-04-27",
          title: "Exercise pages architecture finalized",
          body:
            "The /exercises hub is in place: library TeX with metadata and search, grouping by book theme, clickable cards that deep-link to each exercise on the theme page, and PDF downloads (with or without solutions — English and French) wired from public/pdfs. The build script can batch all themes (--all) and strips solutions plus hints/indications for the statements-only PDFs.",
        },
        {
          date: "2026-03-31",
          title: "Domain acquisition and theme 2",
          body:
            "Acquisition of the production domain; theme 2 lessons and exercises are being rolled out (English page translation in progress).",
        },
      ] as UpdateEntry[],
      comingSoon: "",
    },
    footer: {
      navigation: "Navigation",
      home: "Home",
      allChapters: "All Themes",
      exercises: "Exercises",
      aboutBook: "About the Book",
      author: "Author",
      copyright: (year: string, author: string) =>
        `© ${year} ${author}. All rights reserved.`,
    },
  },
  fr: {
    book: {
      title: "Mécanique Quantique",
      subtitle: "",
      description:
        "Cet ouvrage propose une formalisation rigoureuse de la mécanique quantique moderne. Dépassant le cadre des manuels d'introduction conventionnels, il approfondit les outils essentiels de la physique mathématique, des espaces de Hilbert à la théorie spectrale avancée en passant par la topologie et la géométrie.\n\nCe traité s’adresse à ceux qui cherchent, au-delà de la simple pratique du calcul, à saisir la nécessité logique et le fondement des structures employées. Le texte aborde de front les enjeux de l’interprétation, analysant en détail le problème de la mesure et de la décohérence, tout en présentant les théories alternatives et leurs contraintes expérimentales.\n\nDestiné aux étudiants de second cycle, doctorants et chercheurs, il vise une maîtrise exhaustive de la théorie, unissant rigueur technique et profondeur conceptuelle.",
      edition: "Première Édition",
    },
    nav: {
      home: "Accueil",
      chapters: "Thèmes",
      exercises: "Exercices",
      glossary: "Glossaire",
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
        "Ses intérêts de recherche couvrent les lois de la gravitation, la mécanique quantique et ses fondements, ainsi que la régression symbolique comme tâche d'apprentissage automatique. Ce livre est issu de notes de cours développées au fil de nombreuses années d'enseignement aux cycles supérieurs.",
      authorLinksHeading: "Liens",
      authorLinkLinkedIn: "LinkedIn",
      authorLinkGoogleScholar: "Google Scholar",
      authorLinkGitHub: "GitHub",
      aboutProjectTitle: "À propos du projet",
      aboutProjectLead:
        "Ce site et cet ouvrage sont en cours de développement. Les leçons et les exercices seront publiés progressivement.",
      aboutProjectOutlineLabel: "Contenu prévu :",
      aboutProjectOutlineBody:
        "Partie I, systèmes isolés : formalisme mathématique (physique mathématique), postulats, applications de base. Partie II, systèmes en interaction : intrication, décohérence, théorie de la mesure. Partie III : interprétations de la mécanique quantique et théories alternatives. Partie IV : information quantique, algorithmique quantique. Partie V : gravitation quantique.",
      aboutBookBody2:
        "Le texte développe la mécanique quantique à partir des premiers principes, en supposant une solide formation en mécanique classique, en électrodynamique et en mathématiques. Les preuves sont données en entier lorsqu'elles éclairent la physique, et de nombreux exemples travaillés complètent l'exposition théorique.",
      translationWarning:
        "Note : ce livre est principalement rédigé en français ; la version anglaise est traduite automatiquement avec Claude Sonnet 4.6.",
    },
    updates: {
      label: "ACTUALITÉS",
      title: "Actualités du projet",
      description: "",
      latestTitle: "Derniers articles",
      timelineLabel: "Fil chronologique",
      entries: [
        {
          date: "2026-04-27",
          title: "Architecture des pages exercices finalisée",
          body:
            "La page /exercices est en place : bibliothèque TeX avec métadonnées et recherche, regroupement par thème du livre, cartes cliquables avec lien direct vers chaque exercice sur la page du thème, et téléchargements PDF (avec ou sans corrigés — français et anglais) branchés sur public/pdfs. Le script de build peut traiter tous les thèmes (--all) et retire corrigés, indices et indications pour les PDF « énoncés seuls ».",
        },
        {
          date: "2026-03-31",
          title: "Acquisition du domaine et thème 2",
          body:
            "Acquisition du nom de domaine de production ; déploiement des leçons du thème 2 et de ses exercices en cours (+ traduction sur la page anglaise).",
        },
      ] as UpdateEntry[],
      comingSoon: "",
    },
    footer: {
      navigation: "Navigation",
      home: "Accueil",
      allChapters: "Tous les thèmes",
      exercises: "Exercices",
      aboutBook: "À propos du livre",
      author: "Auteur",
      copyright: (year: string, author: string) =>
        `© ${year} ${author}. Tous droits réservés.`,
    },
  },
};

export type Translations = typeof translations.en;
