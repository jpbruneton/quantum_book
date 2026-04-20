export interface LessonReference {
  key: string;
  label: string;
  url: string;
  language: "en" | "fr";
}

export interface Lesson {
  slug: string;
  number: number;
  display_on_web: boolean;
  kind?: "lesson" | "fiche";
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  topicsFr: string[];
  topicsEn: string[];
  pdfFile: string;
  pdfAvailable: boolean;
  readingTime: string;
  content: string;
  texFile: string;
  references: LessonReference[];
}

export interface Theme {
  slug: string;
  number: number;
  display_on_web: boolean;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  lessons: Lesson[];
  /** If set, a section heading is shown above this theme on the chapters index (e.g. Part I / Part II). */
  partHeadingFr?: string;
  partHeadingEn?: string;
}

export const bookMeta = {
  title: "Quantum Mechanics",
  subtitle: "",
  author: "Jean-Philippe Bruneton",
  affiliation: "Université Paris Cité, France",
  year: "2026",
  description:
    "A rigorous yet accessible treatment of quantum mechanics, bridging classical intuition and the mathematical formalism of Hilbert spaces, operators, and measurement theory. Designed for advanced undergraduates and graduate students.",
  keywords: ["quantum mechanics", "wave functions", "Schrödinger equation", "Hilbert space", "quantum field theory"],
};

/** Title plus optional subtitle, for SEO and Open Graph (no trailing colon if subtitle empty). */
export function bookMetaDisplayTitle(): string {
  const sub = bookMeta.subtitle.trim();
  return sub.length > 0 ? `${bookMeta.title}: ${sub}` : bookMeta.title;
}

export const themes: Theme[] = [
  {
    slug: "foundational-experiments",
    number: 1,
    display_on_web: true,
    partHeadingFr: "Partie I : Systèmes isolés",
    partHeadingEn: "Part I: Isolated Systems",
    titleFr: "Introduction générale et expériences fondatrices",
    titleEn: "General Introduction and Foundational Experiments",
    descriptionFr:
      "Quelques expériences historiques invalidant la mécanique classique.",
    descriptionEn:
      "Historical experiments that invalidate classical mechanics.",
    lessons: [
      {
        slug: "introduction",
        number: 1,
        display_on_web: true,
        titleFr: "Leçon n°1",
        titleEn: "Lesson 1",
        subtitleFr: "Expérience de Stern et Gerlach",
        subtitleEn: "Stern-Gerlach Experiment",
        descriptionFr:
          "Introduction expérimentale au spin, au moment magnétique, et à la quantification observée dans l'expérience de Stern et Gerlach.",
        descriptionEn:
          "Experimental introduction to spin, magnetic moment, and quantization observed in the Stern-Gerlach experiment.",
        topicsFr: [
          "Spin",
          "Moment magnétique",
          "Stern-Gerlach",
          "Précession de Larmor",
          "Quantification",
          "Mesure quantique",
          "Composantes de spin",
          "Faisceau atomique",
          "Champ magnétique inhomogène",
          "Projection d'état",
        ],
        topicsEn: [
          "Spin",
          "Magnetic moment",
          "Stern-Gerlach",
          "Larmor precession",
          "Quantization",
          "Quantum measurement",
          "Spin components",
          "Atomic beam",
          "Inhomogeneous magnetic field",
          "State projection",
        ],
        pdfFile: "ch1.pdf",
        pdfAvailable: true,
        readingTime: "45 min",
        texFile: "theme1_fr/lecon1.tex",
        references: [],
        content: `
<p>Nous commençons notre présentation de la mécanique quantique par les expériences portant sur le spin, et l'introduction même de ce concept. C'est en réalité tardif dans le développement historique, puisque Otto Stern et Walther Gerlach réalisent leur expérience fondamentale en 1922; tandis Samuel Goudsmit et George Uhlenbeck proposent l'hypothèse du spin électronique en 1925.</p>

<p>Il faut d'abord anticiper sur le fait qu'un spin se comporte comme un moment magnétique. Les cours usuels de L2 en éléctromagnétisme sont toujours très dense car il y a beaucoup de choses à dire, et j'ai pu constater qu'en général la théorie des moments magnétiques classiques est souvent sacrifiée par manque de temps. Cela pose en général problème quand on passe en L3, à la fois en mécanique quantique mais aussi en physique statistique. Je commence donc par rappeler les notions classiques essentielles.</p>

<p>Un moment magnétique  $\\vec{\\mu}$, ou dipôle magnétique, est un vecteur. C'est la quantité fondamentale qui permet de quantifier l'intensité d'un aimant naturel, par exemple, ou d'un eléctro-aimant, c'est-à-dire d'une boucle de courant. Un aimant naturel possède un moment magnétique, qui par définition est dans la direction pôle Sud $\\to$ pôle Nord de l'aimant. C'est aussi la direction des lignes de champ magnétique générées par l'aimant à l'extérieur de celui-ci (elles sortent du pôle Nord et reviennent au pôle Sud ; à l'intérieur de l'aimant elles vont directement du Sud a Nord), cf figure \\ref{magnet}.</p>
        `,
      },
    ],
  },
  {
    slug: "hilbert-spaces",
    number: 2,
    display_on_web: true,
    titleFr: "Espaces de Hilbert et opérateurs linéaires",
    titleEn: "Hilbert Spaces and Linear Operators",
    descriptionFr:
      "Algèbre & topologie, théorie des opérateurs linéaires & théorie spectrale. Notation de Dirac.",
    descriptionEn:
      "Algebra & topology, linear operator theory & spectral theory. Dirac notation.",
    lessons: [
      {
        slug: "espaces-de-hilbert-lecon-1",
        number: 1,
        display_on_web: true,
        titleFr: "Leçon n°1",
        titleEn: "Lesson 1",
        subtitleFr: "Espaces de Hilbert",
        subtitleEn: "Hilbert Spaces",
        descriptionFr:
          "Structures mathématiques : Espaces vectoriels, espaces métriques, norme, espaces vectoriels normés, produit scalaire, espace préhilbertien, espace hilbertien, base algébrique, base Hilbertienne, dimensionnalité, classification, espaces modèles, isomorphismes",
        descriptionEn:
          "Vector spaces, norms, inner products, strong topology, completeness, and Hilbert bases to establish quantum mechanics' formal framework.",
        topicsFr: [
          "Espace de Hilbert",
          "Espace normé",
          "Produit scalaire hermitien",
          "Dimension algébrique",
          "Dimension hilbertienne",
          "Base Hilbertienne",
          "Complétude",
          "Classification des Hilbert",
        ],
        topicsEn: [
          "Vector spaces",
          "Norms",
          "Inner products",
          "Hilbert spaces",
          "Pre-Hilbert spaces",
          "Completeness",
          "Hilbert basis",
          "Hilbert dimension",
          "Model spaces",
          "Isomorphisms",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "55 min",
        texFile: "theme2_fr/lecon1.tex",
        references: [],
        content: `
<p>Les cours de mathématiques font souvent des maths sans s'expliquer, comme si les mathématiques se suffisaient à elles-même, ce qui n'est d'ailleurs pas faux. Les cours de physique les utilisent souvent sans les expliciter suffisamment. Dans ce chapitre, on essaiera de trouver au mieux cet équilibre entre mathématiques et physique. Ce chapitre est en particulier basé sur diverses notes de cours de mathématiques, de l'agrégation de mathématiques \\cite{hilbert_agreg, hilbert_agreg2} ou de notes de cours universitaires condensées \\cite{hilbert_lyon, hilbert_x}. La référence la plus complète est \\cite{hilbert_orsay}, où l'on y trouvera de nombreuses démonstrations.</p>

<p>La physique établit des correspondances entre le monde sensible et des espaces mathématiques abstraits. C'est la phase de formalisation du problème physique. Mais la démarche ne s’arrête pas là : il s’agit aussi de tracer le chemin inverse, en faisant revenir ces abstractions vers le réel, sous forme de prédictions expérimentales, où les propriétés mathématiques se traduisent en nombres. On doit donc impérativement équiper ces structures mathématiques d'application vers les nombres réels\\footnote{Ou autres : on peut sans doute se convaincre que tout résultat expérimental peut se décomposer en une série de réponses à des questions binaires oui/non ; par exemple : la particule est-elle à gauche ou à droite de ceci? Par processus dichotomique, on peut reconstruire les nombres réels à l'aide de cette question. En soi, il semble que les seules applications vraiment nécessaires soient des applications vers les booléens.}. Ces \\og moteurs de prédiction \\fg sont par exemple les projecteurs, traces, produits scalaires, normes, formes quadratiques, etc.</p>

<p>Cette étape est à peine nécessaire en mécanique classique qui manipule directement des nombres réels (ex : le temps) ou des vecteurs de nombres réels (ex : la position) qui sont supposées être directement accessibles expérimentalement; il y a tout au plus une étape de projection triviale à réaliser pour dire par exemple : \\og la particule à l'instant $t$ se trouve en $x$ sur l'axe $Ox$ \\fg. C'est donc suffisamment évident pour ne même pas être signalé.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-2",
        number: 2,
        display_on_web: true,
        titleFr: "Leçon n°2",
        titleEn: "Lesson 2",
        subtitleFr: "Espace dual, kets, bras, adjoint",
        subtitleEn: "Dual Space, Kets, Bras, Adjoint",
        descriptionFr:
          "Construction du dual topologique, théorème de représentation de Riesz, introduction des kets, des bras, et de l'adjoint",
        descriptionEn:
          "Construction of the topological dual, identification via the Riesz representation theorem, and physical interpretation.",
        topicsFr: [
          "Dual algébrique",
          "Dual topologique",
          "Isomorphisme de Riesz",
          "Kets et bras",
          "Éléments de matrice",
          "Décomposition de l'identité",
          "Dagger",
          "Opérateur adjoint",
        ],
        topicsEn: [
          "Algebraic dual",
          "Topological dual",
          "Riesz isomorphism",
          "Kets and bras",
          "Matrix elements",
          "Resolution of the identity",
          "Dagger",
          "Adjoint operator",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "35 min",
        texFile: "theme2_fr/lecon2.tex",
        references: [],
        content: `
<p>Présentation du dual des espaces de Hilbert et du théorème de Riesz, qui permet d'identifier chaque forme linéaire continue à un vecteur de l'espace.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-3",
        number: 3,
        display_on_web: true,
        titleFr: "Leçon n°3",
        titleEn: "Lesson 3",
        subtitleFr: "Topologie des espaces de Hilbert",
        subtitleEn: "Topology of Hilbert Spaces",
        descriptionFr:
          "Topologie générale : ouverts et fermés, convergences forte et faible, suites de Cauchy, somme infinie de vecteurs, complétude, densité, ensembles bornés et ensembles compacts.",
        descriptionEn:
          "Strong/weak convergences, Cauchy sequences, completeness, and topological structures of Hilbert spaces.",
        topicsFr: [
          "Topologie forte",
          "Topologie faible",
          "Convergence forte",
          "Convergence faible",
          "Complétude",
          "Suites de Cauchy",
          "Densité",
          "Sous-espaces vectoriels",
          "Ensembles bornés",
          "Ensembles compacts",
        ],
        topicsEn: [
          "Strong topology",
          "Weak topology",
          "Strong convergence",
          "Weak convergence",
          "Completeness",
          "Cauchy sequences",
          "Density",
          "Vector subspaces",
          "Bounded sets",
          "Compact sets",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "40 min",
        texFile: "theme2_fr/lecon3.tex",
        references: [],
        content: `
<p>Étude de la topologie des espaces de Hilbert : notions de convergence forte et faible, continuité, compacité et complétude.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-4",
        number: 4,
        display_on_web: true,
        titleFr: "Leçon n°4",
        titleEn: "Lesson 4",
        subtitleFr: "Théorie des opérateurs linéaires",
        subtitleEn: "Linear Operator Theory",
        descriptionFr:
          "Définition, domaine, composition, continuité et norme des opérateurs linéaires en espace de Hilbert.",
        descriptionEn:
          "Definition, domain, composition, continuity, and norm of linear operators in Hilbert space.",
        topicsFr: [
          "Opérateurs linéaires",
          "Domaine d'un opérateur",
          "Composition d'opérateurs",
          "Continuité",
          "Norme d'opérateur",
          "Adjoint",
          "Domaine dense",
        ],
        topicsEn: [
          "Linear operators",
          "Operator domain",
          "Operator composition",
          "Continuity",
          "Operator norm",
          "Adjoint",
          "Dense domain",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "50 min",
        texFile: "theme2_fr/lecon4.tex",
        references: [],
        content: `
<p>Étude structurée de la théorie des opérateurs linéaires en espace de Hilbert.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-5",
        number: 5,
        display_on_web: true,
        titleFr: "Leçon n°5",
        titleEn: "Lesson 5",
        subtitleFr: "Notations de Dirac en dimension infinie",
        subtitleEn: "Dirac Notation — Infinite Dimension",
        descriptionFr:
          "Représentation hilbertienne de la mécanique quantique du point, opérateurs position et impulsion, delta de Dirac.",
        descriptionEn:
          "Hilbert representation of point-particle quantum mechanics, position and momentum operators, and Dirac delta.",
        topicsFr: [
          "Notations de Dirac",
          "Dimension infinie",
          "Représentation position",
          "Représentation impulsion",
          "Delta de Dirac",
          "Transformée de Fourier",
          "Résolution de l'identité",
          "Opérateur position",
          "Opérateur impulsion",
          "Commutation canonique",
        ],
        topicsEn: [
          "Dirac notation",
          "Infinite dimension",
          "Position representation",
          "Momentum representation",
          "Dirac delta",
          "Fourier transform",
          "Resolution of identity",
          "Position operator",
          "Momentum operator",
          "Canonical commutation",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "30 min",
        texFile: "theme2_fr/lecon5.tex",
        references: [],
        content: `
<p>Notation de Dirac en dimension infinie : représentations position et impulsion, delta de Dirac et relations de commutation canoniques.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-6",
        number: 6,
        display_on_web: true,
        titleFr: "Leçon n°6",
        titleEn: "Lesson 6",
        subtitleFr: "Opérateurs bornés",
        subtitleEn: "Bounded Operators",
        descriptionFr:
          "Algèbre des opérateurs bornés, opérateurs auto-adjoints et unitaires, théorème spectral en dimension finie.",
        descriptionEn:
          "Algebra of bounded operators, self-adjoint and unitary operators, spectral theorem in finite dimension.",
        topicsFr: [
          "Opérateurs bornés",
          "Algèbre B(H)",
          "Auto-adjonction",
          "Opérateurs unitaires",
          "Opérateurs normaux",
          "Théorème spectral",
        ],
        topicsEn: [
          "Bounded operators",
          "Algebra B(H)",
          "Self-adjointness",
          "Unitary operators",
          "Normal operators",
          "Spectral theorem",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: false,
        readingTime: "",
        texFile: "theme2_fr/lecon6.tex",
        references: [],
        content: "",
      },
      {
        slug: "espaces-de-hilbert-lecon-7",
        number: 7,
        display_on_web: true,
        titleFr: "Leçon n°7",
        titleEn: "Lesson 7",
        subtitleFr: "Opérateurs non bornés",
        subtitleEn: "Unbounded Operators",
        descriptionFr:
          "Opérateurs à domaine dense, fermeture, adjoint, extensions auto-adjointes et critères d'essentielle auto-adjonction.",
        descriptionEn:
          "Densely defined operators, closure, adjoint, self-adjoint extensions, and essential self-adjointness criteria.",
        topicsFr: [
          "Opérateurs non bornés",
          "Domaine dense",
          "Fermeture",
          "Opérateurs symétriques",
          "Extensions auto-adjointes",
          "Défaut d'adjonction",
        ],
        topicsEn: [
          "Unbounded operators",
          "Dense domain",
          "Closure",
          "Symmetric operators",
          "Self-adjoint extensions",
          "Deficiency indices",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: false,
        readingTime: "",
        texFile: "theme2_fr/lecon7.tex",
        references: [],
        content: "",
      },
      {
        slug: "espaces-de-hilbert-lecon-8",
        number: 8,
        display_on_web: true,
        titleFr: "Leçon n°8",
        titleEn: "Lesson 8",
        subtitleFr: "Théorie spectrale",
        subtitleEn: "Spectral Theory",
        descriptionFr:
          "Spectre et résolvante des opérateurs auto-adjoints, mesure spectrale, théorème spectral général et calcul fonctionnel.",
        descriptionEn:
          "Spectrum and resolvent of self-adjoint operators, spectral measure, general spectral theorem, and functional calculus.",
        topicsFr: [
          "Spectre",
          "Résolvante",
          "Mesure spectrale",
          "Théorème spectral",
          "Calcul fonctionnel",
          "Spectre continu",
          "Spectre discret",
        ],
        topicsEn: [
          "Spectrum",
          "Resolvent",
          "Spectral measure",
          "Spectral theorem",
          "Functional calculus",
          "Continuous spectrum",
          "Discrete spectrum",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: false,
        readingTime: "",
        texFile: "theme2_fr/lecon8.tex",
        references: [],
        content: "",
      },
      {
        slug: "espaces-de-hilbert-fiche-1",
        number: 1,
        kind: "fiche",
        display_on_web: true,
        titleFr: "Fiche n°1",
        titleEn: "Sheet 1",
        subtitleFr: "Formulaire Dirac",
        subtitleEn: "Dirac Reference Sheet",
        descriptionFr: "Récapitulatif des notations de Dirac et des formules essentielles.",
        descriptionEn: "Summary of Dirac notation and essential formulas.",
        topicsFr: ["Notations de Dirac", "Formulaire"],
        topicsEn: ["Dirac notation", "Reference sheet"],
        pdfFile: "ch2.pdf",
        pdfAvailable: false,
        readingTime: "",
        texFile: "theme2_fr/fiche1.tex",
        references: [],
        content: "",
      },
      {
        slug: "espaces-de-hilbert-fiche-2",
        number: 2,
        kind: "fiche",
        display_on_web: true,
        titleFr: "Fiche n°2",
        titleEn: "Sheet 2",
        subtitleFr: "Atlas des opérateurs linéaires",
        subtitleEn: "Atlas of Linear Operators",
        descriptionFr: "Catalogue des principaux opérateurs linéaires et de leurs propriétés spectrales.",
        descriptionEn: "Catalogue of the main linear operators and their spectral properties.",
        topicsFr: ["Opérateurs linéaires", "Atlas", "Propriétés spectrales"],
        topicsEn: ["Linear operators", "Atlas", "Spectral properties"],
        pdfFile: "ch2.pdf",
        pdfAvailable: false,
        readingTime: "",
        texFile: "theme2_fr/fiche2.tex",
        references: [],
        content: "",
      },
    ],
  },
  {
    slug: "postulates",
    number: 3,
    display_on_web: true,
    titleFr: "Postulats",
    titleEn: "Postulates",
    descriptionFr:
      "Axiomes de base de la théorie, interprétations et conséquences physiques de la mesure.",
    descriptionEn:
      "Core axioms of the theory, interpretations, and physical consequences of measurement.",
    lessons: [
      {
        slug: "postulats-lecon-1",
        number: 1,
        display_on_web: true,
        titleFr: "Leçon n°1",
        titleEn: "Lesson 1",
        subtitleFr: "Mesure, dynamique et interprétation",
        subtitleEn: "Measurement, Dynamics, and Interpretation",
        descriptionFr:
          "Présentation des postulats quantiques, de la règle de Born, de la réduction du paquet d'onde et de l'équation de Schrödinger.",
        descriptionEn:
          "Presentation of quantum postulates, Born rule, wavefunction collapse, and the Schrodinger equation.",
        topicsFr: [
          "Postulats",
          "Mesure quantique",
          "Règle de Born",
          "Évolution unitaire",
          "Réduction du paquet d'onde",
          "Équation de Schrödinger",
          "Théorème d'Ehrenfest",
          "Superposition",
          "Intrication quantique",
          "Inégalités de Bell",
        ],
        topicsEn: [
          "Postulates",
          "Quantum measurement",
          "Born rule",
          "Unitary evolution",
          "Wavefunction collapse",
          "Schrodinger equation",
          "Ehrenfest theorem",
          "Superposition",
          "Quantum entanglement",
          "Bell inequalities",
        ],
        pdfFile: "ch3.pdf",
        pdfAvailable: true,
        readingTime: "50 min",
        texFile: "theme3_fr/lecon1.tex",
        references: [],
        content: `
<p>Ce chapitre présente les postulats de la mécanique quantique et en propose une première discussion. L'objectif est double : établir le formalisme standard, et souligner à quel point ces postulats proposent une vision du monde radicalement différente de celle de la physique classique. Nous présenterons ici la version dite \\og orthodoxe\\fg, bien connue sous le nom d'« interprétation de Copenhague\\footnote{Du nom de l'école de pensée développée à l'Université de Copenhague dans les années 1920-1930, principalement par Bohr, qui y enseignait, et par Heisenberg, qui y était de passage.} », de la mécanique quantique. Cette formulation inclut notamment le postulat de la réduction du paquet d'onde (postulat 3) ainsi que le caractère fondamentalement probabiliste des résultats de mesure (postulat 4).</p>

<p>Cette précision prend tout son sens lorsque l'on sait qu'il existe d'autres interprétations de la mécanique quantique qui remettent en question certains des postulats énoncés ci-dessous. Une des plus connue, l'interprétation des mondes multiples d'Everett, par exemple, abandonne le postulat de réduction : dans ce cadre, toutes les issues possibles d'une mesure se réalisent dans des branches différentes de la fonction d'onde universelle. Le caractère aléatoire de la mesure devient alors relatif à l'observateur : depuis sa branche, il perçoit un résultat unique et \\emph{apparemment} aléatoire, bien que tous les résultats se produisent effectivement. C'est pourquoi, dans cette interprétation, la règle de Born (postulat 4) devrait pouvoir se dériver des autres postulats pour que la théorie soit pleinement satisfaisante\\footnote{Une telle dérivation n'a pas encore été trouvée ; c'est sujet à de vifs débats en fondements de la mécanique quantique.}. Nous couvrirons ces sujets dans la partie II [[[ref???]]].</p>

<p>Par ailleurs, l'émergence de l'informatique quantique et de la cryptographie quantique a renouvelé l'intérêt théorique pour les fondements, conduisant à des reformulations des axiomes sous une forme \\emph{complètement différente} de celle que l'on expose ci-dessous. Dans ces approches la structure de Hilbert n'est même pas postulée mais dérivée à partir d'une axiomatique informationnelle. Ces approches seront discutées en partie III ou IV [[[check later]]].</p>
        `,
      },
    ],
  },
  {
    slug: "applications",
    number: 4,
    display_on_web: true,
    titleFr: "Applications",
    titleEn: "Applications",
    descriptionFr:
      "Méthodes de calcul et outils opératoriels pour relier les postulats à des prédictions concrètes.",
    descriptionEn:
      "Computational methods and operator tools to connect postulates with concrete predictions.",
    lessons: [
      {
        slug: "applications-lecon-1",
        number: 1,
        display_on_web: true,
        titleFr: "Leçon n°1",
        titleEn: "Lesson 1",
        subtitleFr: "Barrières de potentiel",
        subtitleEn: "Potential Barriers",
        descriptionFr:
          "Transmission, réflexion, effet tunnel et dépendance énergétique des états face aux barrières de potentiel.",
        descriptionEn:
          "Transmission, reflection, tunneling, and energy dependence of states across potential barriers.",
        topicsFr: [
          "Effet tunnel",
          "Transmission",
          "Réflexion",
          "États diffusés",
          "Coefficients",
        ],
        topicsEn: [
          "Tunneling effect",
          "Transmission",
          "Reflection",
          "Scattering states",
          "Coefficients",
        ],
        pdfFile: "ch4.pdf",
        pdfAvailable: true,
        readingTime: "45 min",
        texFile: "theme4_fr/lecon1.tex",
        references: [],
        content: `
<p>Cette leçon introduit l'étude des barrières de potentiel, avec les phénomènes de réflexion, transmission et effet tunnel.</p>
        `,
      },
      {
        slug: "applications-lecon-2",
        number: 2,
        display_on_web: true,
        titleFr: "Leçon n°2",
        titleEn: "Lesson 2",
        subtitleFr: "Oscillateur harmonique",
        subtitleEn: "Harmonic Oscillator",
        descriptionFr:
          "Quantification des niveaux d'énergie, opérateurs de création/annihilation et états propres de l'oscillateur harmonique.",
        descriptionEn:
          "Energy level quantization, creation/annihilation operators, and eigenstates of the harmonic oscillator.",
        topicsFr: [
          "Niveaux d'énergie",
          "Échelles quantiques",
          "Opérateurs a et a†",
          "États propres",
          "Fonctions d'onde",
        ],
        topicsEn: [
          "Energy levels",
          "Quantum ladders",
          "a and a† operators",
          "Eigenstates",
          "Wavefunctions",
        ],
        pdfFile: "ch4.pdf",
        pdfAvailable: true,
        readingTime: "50 min",
        texFile: "theme4_fr/lecon2.tex",
        references: [],
        content: `
<p>Cette leçon traite de l'oscillateur harmonique quantique, de sa résolution algébrique et de son rôle central en physique quantique.</p>
        `,
      },
      {
        slug: "applications-lecon-3",
        number: 3,
        display_on_web: true,
        titleFr: "Leçon n°3",
        titleEn: "Lesson 3",
        subtitleFr: "Spin",
        subtitleEn: "Spin",
        descriptionFr:
          "Matrices de Pauli, mesure de spin, dynamique dans un champ magnétique et applications à deux niveaux.",
        descriptionEn:
          "Pauli matrices, spin measurement, dynamics in magnetic fields, and two-level applications.",
        topicsFr: [
          "Matrices de Pauli",
          "Spin 1/2",
          "Mesure",
          "Précession",
          "Systèmes à deux niveaux",
        ],
        topicsEn: [
          "Pauli matrices",
          "Spin 1/2",
          "Measurement",
          "Precession",
          "Two-level systems",
        ],
        pdfFile: "ch1.pdf",
        pdfAvailable: true,
        readingTime: "40 min",
        texFile: "theme4_fr/lecon3.tex",
        references: [],
        content: `
<p>Cette leçon présente le spin quantique et ses outils de calcul, en particulier pour les systèmes à deux niveaux.</p>
        `,
      },
      {
        slug: "applications-lecon-4",
        number: 4,
        display_on_web: true,
        titleFr: "Leçon n°4",
        titleEn: "Lesson 4",
        subtitleFr: "Dynamique quantique",
        subtitleEn: "Quantum Dynamics",
        descriptionFr:
          "Évolution unitaire, équation de Schrödinger, images de Schrödinger/Heisenberg et propagateurs.",
        descriptionEn:
          "Unitary evolution, Schrodinger equation, Schrodinger/Heisenberg pictures, and propagators.",
        topicsFr: [
          "Évolution unitaire",
          "Équation de Schrödinger",
          "Image de Heisenberg",
          "Propagateurs",
          "Hamiltonien",
        ],
        topicsEn: [
          "Unitary evolution",
          "Schrodinger equation",
          "Heisenberg picture",
          "Propagators",
          "Hamiltonian",
        ],
        pdfFile: "ch3.pdf",
        pdfAvailable: true,
        readingTime: "50 min",
        texFile: "theme4_fr/lecon4.tex",
        references: [],
        content: `
<p>Cette leçon couvre la dynamique quantique et les différentes formulations de l'évolution temporelle des états.</p>
        `,
      },
    ],
  },
  {
    slug: "interacting-systems",
    number: 5,
    display_on_web: false,
    titleFr: "Systèmes en interaction",
    titleEn: "Interacting Systems",
    descriptionFr:
      "États composés, intrication, couplages et dynamiques de systèmes quantiques non isolés.",
    descriptionEn:
      "Composite states, entanglement, couplings, and dynamics of non-isolated quantum systems.",
    lessons: [],
  },
  {
    slug: "decoherence-and-quantum-measurement",
    number: 6,
    display_on_web: false,
    titleFr: "Décohérence et mesure quantique",
    titleEn: "Decoherence and Quantum Measurement",
    descriptionFr:
      "Transition vers le classique, problème de la mesure et rôle de l'environnement.",
    descriptionEn:
      "Classical emergence, the measurement problem, and the role of the environment.",
    lessons: [],
  },
];

/** Part II (themes 4–7): kept out of the public site until removed from this set. */
const THEME_NUMBERS_EXCLUDED_FROM_WEB = new Set<number>([4, 5, 6, 7]);

export function getTheme(slug: string): Theme | undefined {
  return themes.find((theme) => theme.slug === slug);
}

export function getWebThemes(): Theme[] {
  return themes
    .filter(
      (theme) =>
        theme.display_on_web &&
        !THEME_NUMBERS_EXCLUDED_FROM_WEB.has(theme.number)
    )
    .map((theme) => ({
      ...theme,
      lessons: theme.lessons.filter((lesson) => lesson.display_on_web),
    }));
}

export function getWebTheme(slug: string): Theme | undefined {
  return getWebThemes().find((theme) => theme.slug === slug);
}

export function getTotalLessonsCount(): number {
  return getWebThemes().reduce(
    (count, theme) => count + theme.lessons.length,
    0
  );
}
