export interface Lesson {
  slug: string;
  number: number;
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
}

export interface Theme {
  slug: string;
  number: number;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  lessons: Lesson[];
}

export const bookMeta = {
  title: "Quantum Mechanics",
  subtitle: "A Modern Introduction",
  author: "Your Name",
  affiliation: "University / Institution",
  year: "2026",
  edition: "First Edition",
  description:
    "A rigorous yet accessible treatment of quantum mechanics, bridging classical intuition and the mathematical formalism of Hilbert spaces, operators, and measurement theory. Designed for advanced undergraduates and graduate students.",
  isbn: "978-X-XXXX-XXXX-X",
  keywords: ["quantum mechanics", "wave functions", "Schrödinger equation", "Hilbert space", "quantum field theory"],
};

export const themes: Theme[] = [
  {
    slug: "experiences-fondatrices",
    number: 1,
    titleFr: "Expériences fondatrices",
    titleEn: "Foundational Experiments",
    descriptionFr:
      "Des expériences historiques qui révèlent la quantification et motivent le formalisme de la mécanique quantique.",
    descriptionEn:
      "Historical experiments revealing quantization and motivating the formalism of quantum mechanics.",
    lessons: [
      {
        slug: "introduction",
        number: 1,
        titleFr: "Leçon n°1",
        titleEn: "Lesson #1",
        subtitleFr: "Expérience de Stern et Gerlach",
        subtitleEn: "Stern-Gerlach Experiment",
        descriptionFr:
          "Introduction expérimentale au spin, au moment magnétique, et à la quantification observée dans l'expérience de Stern et Gerlach.",
        descriptionEn:
          "Experimental introduction to spin, magnetic moment, and quantization observed in the Stern-Gerlach experiment.",
        topicsFr: [
          "Moment magnétique",
          "Stern-Gerlach",
          "Spin",
          "Précession de Larmor",
          "Quantification",
        ],
        topicsEn: [
          "Magnetic moment",
          "Stern-Gerlach",
          "Spin",
          "Larmor precession",
          "Quantization",
        ],
        pdfFile: "ch1.pdf",
        pdfAvailable: true,
        readingTime: "45 min",
        texFile: "chp1.tex",
        content: `
<p>Nous commençons notre présentation de la mécanique quantique par les expériences portant sur le spin, et l'introduction même de ce concept. C'est en réalité tardif dans le développement historique, puisque Otto Stern et Walther Gerlach réalisent leur expérience fondamentale en 1922; tandis Samuel Goudsmit et George Uhlenbeck proposent l'hypothèse du spin électronique en 1925.</p>

<p>Il faut d'abord anticiper sur le fait qu'un spin se comporte comme un moment magnétique. Les cours usuels de L2 en éléctromagnétisme sont toujours très dense car il y a beaucoup de choses à dire, et j'ai pu constater qu'en général la théorie des moments magnétiques classiques est souvent sacrifiée par manque de temps. Cela pose en général problème quand on passe en L3, à la fois en mécanique quantique mais aussi en physique statistique. Je commence donc par rappeler les notions classiques essentielles.</p>

<p>Un moment magnétique  $\\vec{\\mu}$, ou dipôle magnétique, est un vecteur. C'est la quantité fondamentale qui permet de quantifier l'intensité d'un aimant naturel, par exemple, ou d'un eléctro-aimant, c'est-à-dire d'une boucle de courant. Un aimant naturel possède un moment magnétique, qui par définition est dans la direction pôle Sud $\\to$ pôle Nord de l'aimant. C'est aussi la direction des lignes de champ magnétique générées par l'aimant à l'extérieur de celui-ci (elles sortent du pôle Nord et reviennent au pôle Sud ; à l'intérieur de l'aimant elles vont directement du Sud a Nord), cf figure \\ref{magnet}.</p>
        `,
      },
    ],
  },
  {
    slug: "espaces-de-hilbert",
    number: 2,
    titleFr: "Espaces de Hilbert",
    titleEn: "Hilbert Spaces",
    descriptionFr:
      "Le cadre mathématique des états et observables quantiques : produit scalaire, complétude et bases.",
    descriptionEn:
      "The mathematical framework for quantum states and observables: inner products, completeness, and bases.",
    lessons: [
      {
        slug: "espaces-de-hilbert-lecon-1",
        number: 1,
        titleFr: "Leçon n°1",
        titleEn: "Lesson #1",
        subtitleFr: "Espaces de Hilbert",
        subtitleEn: "Hilbert Spaces",
        descriptionFr:
          "Espaces vectoriels, normes, produit scalaire, topologie forte, complétude et bases hilbertiennes pour établir le cadre formel de la mécanique quantique.",
        descriptionEn:
          "Vector spaces, norms, inner products, strong topology, completeness, and Hilbert bases to establish quantum mechanics' formal framework.",
        topicsFr: [
          "Espaces vectoriels",
          "Normes",
          "Produit scalaire",
          "Topologie forte",
          "Espaces de Hilbert",
        ],
        topicsEn: [
          "Vector spaces",
          "Norms",
          "Inner products",
          "Strong topology",
          "Hilbert spaces",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "55 min",
        texFile: "chp2.tex",
        content: `
<p>Les cours de mathématiques font souvent des maths sans s'expliquer, comme si les mathématiques se suffisaient à elles-même, ce qui n'est d'ailleurs pas faux. Les cours de physique les utilisent souvent sans les expliciter suffisamment. Dans ce chapitre, on essaiera de trouver au mieux cet équilibre entre mathématiques et physique. Ce chapitre est en particulier basé sur diverses notes de cours de mathématiques, de l'agrégation de mathématiques \\cite{hilbert_agreg, hilbert_agreg2} ou de notes de cours universitaires condensées \\cite{hilbert_lyon, hilbert_x}. La référence la plus complète est \\cite{hilbert_orsay}, où l'on y trouvera de nombreuses démonstrations.</p>

<p>La physique établit des correspondances entre le monde sensible et des espaces mathématiques abstraits. C'est la phase de formalisation du problème physique. Mais la démarche ne s’arrête pas là : il s’agit aussi de tracer le chemin inverse, en faisant revenir ces abstractions vers le réel, sous forme de prédictions expérimentales, où les propriétés mathématiques se traduisent en nombres. On doit donc impérativement équiper ces structures mathématiques d'application vers les nombres réels\\footnote{Ou autres : on peut sans doute se convaincre que tout résultat expérimental peut se décomposer en une série de réponses à des questions binaires oui/non ; par exemple : la particule est-elle à gauche ou à droite de ceci? Par processus dichotomique, on peut reconstruire les nombres réels à l'aide de cette question. En soi, il semble que les seules applications vraiment nécessaires soient des applications vers les booléens.}. Ces \\og moteurs de prédiction \\fg sont par exemple les projecteurs, traces, produits scalaires, normes, formes quadratiques, etc.</p>

<p>Cette étape est à peine nécessaire en mécanique classique qui manipule directement des nombres réels (ex : le temps) ou des vecteurs de nombres réels (ex : la position) qui sont supposées être directement accessibles expérimentalement; il y a tout au plus une étape de projection triviale à réaliser pour dire par exemple : \\og la particule à l'instant $t$ se trouve en $x$ sur l'axe $Ox$ \\fg. C'est donc suffisamment évident pour ne même pas être signalé.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-2",
        number: 2,
        titleFr: "Leçon n°2",
        titleEn: "Lesson #2",
        subtitleFr: "Topologie des espaces de Hilbert",
        subtitleEn: "Topology of Hilbert Spaces",
        descriptionFr:
          "Convergences forte/faible, suites de Cauchy, complétude et structures topologiques des espaces de Hilbert.",
        descriptionEn:
          "Strong/weak convergences, Cauchy sequences, completeness, and topological structures of Hilbert spaces.",
        topicsFr: [
          "Convergence forte",
          "Convergence faible",
          "Complétude",
          "Suites de Cauchy",
          "Topologie",
        ],
        topicsEn: [
          "Strong convergence",
          "Weak convergence",
          "Completeness",
          "Cauchy sequences",
          "Topology",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "40 min",
        texFile: "chp2.tex",
        content: `
<p>Étude de la topologie des espaces de Hilbert : notions de convergence forte et faible, continuité, compacité et complétude.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-3",
        number: 3,
        titleFr: "Leçon n°3",
        titleEn: "Lesson #3",
        subtitleFr: "Dual et théorème de Riesz",
        subtitleEn: "Dual Space and Riesz Theorem",
        descriptionFr:
          "Construction du dual topologique, identification au moyen du théorème de représentation de Riesz, et interprétation physique.",
        descriptionEn:
          "Construction of the topological dual, identification via the Riesz representation theorem, and physical interpretation.",
        topicsFr: [
          "Dual topologique",
          "Formes linéaires continues",
          "Théorème de Riesz",
          "Isomorphisme canonique",
          "Produit scalaire",
        ],
        topicsEn: [
          "Topological dual",
          "Continuous linear forms",
          "Riesz theorem",
          "Canonical isomorphism",
          "Inner product",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "35 min",
        texFile: "chp2.tex",
        content: `
<p>Présentation du dual des espaces de Hilbert et du théorème de Riesz, qui permet d'identifier chaque forme linéaire continue à un vecteur de l'espace.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-4",
        number: 4,
        titleFr: "Leçon n°4",
        titleEn: "Lesson #4",
        subtitleFr: "Notations de Dirac",
        subtitleEn: "Dirac Notation",
        descriptionFr:
          "Introduction aux kets, bras, produits bra-ket, opérateurs et projecteurs dans le langage de Dirac.",
        descriptionEn:
          "Introduction to kets, bras, bra-ket products, operators, and projectors in Dirac notation.",
        topicsFr: [
          "Kets",
          "Bras",
          "Produits bra-ket",
          "Projecteurs",
          "Observables",
        ],
        topicsEn: [
          "Kets",
          "Bras",
          "Bra-ket products",
          "Projectors",
          "Observables",
        ],
        pdfFile: "ch2.pdf",
        pdfAvailable: true,
        readingTime: "30 min",
        texFile: "chp2.tex",
        content: `
<p>Introduction pratique à la notation de Dirac pour manipuler les états quantiques, les amplitudes et les opérateurs de façon compacte.</p>
        `,
      },
      {
        slug: "espaces-de-hilbert-lecon-5",
        number: 5,
        titleFr: "Leçon n°5",
        titleEn: "Lesson #5",
        subtitleFr: "Théorie des opérateurs linéaires",
        subtitleEn: "Linear Operator Theory",
        descriptionFr:
          "Opérateurs bornés et non bornés, auto-adjonction, spectre et opérateurs unitaires dans le cadre hilbertien.",
        descriptionEn:
          "Bounded and unbounded operators, self-adjointness, spectrum, and unitary operators in the Hilbert-space framework.",
        topicsFr: [
          "Opérateurs bornés",
          "Opérateurs non bornés",
          "Auto-adjonction",
          "Spectre",
          "Unitarité",
        ],
        topicsEn: [
          "Bounded operators",
          "Unbounded operators",
          "Self-adjointness",
          "Spectrum",
          "Unitarity",
        ],
        pdfFile: "ch4.pdf",
        pdfAvailable: true,
        readingTime: "60 min",
        texFile: "chp4.tex",
        content: `
<p>Étude structurée de la théorie des opérateurs linéaires en espace de Hilbert et de ses conséquences sur la dynamique et la mesure quantiques.</p>
        `,
      },
    ],
  },
  {
    slug: "postulats",
    number: 3,
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
        titleFr: "Leçon n°1",
        titleEn: "Lesson #1",
        subtitleFr: "Mesure, dynamique et interprétation",
        subtitleEn: "Measurement, Dynamics, and Interpretation",
        descriptionFr:
          "Présentation des postulats quantiques, de la règle de Born, de la réduction du paquet d'onde et de l'équation de Schrödinger.",
        descriptionEn:
          "Presentation of quantum postulates, Born rule, wavefunction collapse, and the Schrodinger equation.",
        topicsFr: [
          "Postulats",
          "Règle de Born",
          "Mesure",
          "Évolution unitaire",
          "Théorème d'Ehrenfest",
        ],
        topicsEn: [
          "Postulates",
          "Born rule",
          "Measurement",
          "Unitary evolution",
          "Ehrenfest theorem",
        ],
        pdfFile: "ch3.pdf",
        pdfAvailable: true,
        readingTime: "50 min",
        texFile: "chp3.tex",
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
        titleFr: "Leçon n°1",
        titleEn: "Lesson #1",
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
        texFile: "chp4.tex",
        content: `
<p>Cette leçon introduit l'étude des barrières de potentiel, avec les phénomènes de réflexion, transmission et effet tunnel.</p>
        `,
      },
      {
        slug: "applications-lecon-2",
        number: 2,
        titleFr: "Leçon n°2",
        titleEn: "Lesson #2",
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
        texFile: "chp4.tex",
        content: `
<p>Cette leçon traite de l'oscillateur harmonique quantique, de sa résolution algébrique et de son rôle central en physique quantique.</p>
        `,
      },
      {
        slug: "applications-lecon-3",
        number: 3,
        titleFr: "Leçon n°3",
        titleEn: "Lesson #3",
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
        texFile: "chp1.tex",
        content: `
<p>Cette leçon présente le spin quantique et ses outils de calcul, en particulier pour les systèmes à deux niveaux.</p>
        `,
      },
      {
        slug: "applications-lecon-4",
        number: 4,
        titleFr: "Leçon n°4",
        titleEn: "Lesson #4",
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
        texFile: "chp3.tex",
        content: `
<p>Cette leçon couvre la dynamique quantique et les différentes formulations de l'évolution temporelle des états.</p>
        `,
      },
    ],
  },
  {
    slug: "systemes-en-interaction",
    number: 5,
    titleFr: "Systèmes en interaction",
    titleEn: "Interacting Systems",
    descriptionFr:
      "États composés, intrication, couplages et dynamiques de systèmes quantiques non isolés.",
    descriptionEn:
      "Composite states, entanglement, couplings, and dynamics of non-isolated quantum systems.",
    lessons: [],
  },
  {
    slug: "decoherence-et-mesure-quantique",
    number: 6,
    titleFr: "Décohérence et mesure quantique",
    titleEn: "Decoherence and Quantum Measurement",
    descriptionFr:
      "Transition vers le classique, problème de la mesure et rôle de l'environnement.",
    descriptionEn:
      "Classical emergence, the measurement problem, and the role of the environment.",
    lessons: [],
  },
];

export function getTheme(slug: string): Theme | undefined {
  return themes.find((theme) => theme.slug === slug);
}

export function getTotalLessonsCount(): number {
  return themes.reduce((count, theme) => count + theme.lessons.length, 0);
}
