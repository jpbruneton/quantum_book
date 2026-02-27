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
        subtitleFr: "Fondements mathématiques",
        subtitleEn: "Mathematical Foundations",
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
        subtitleFr: "Théorie des opérateurs linéaires",
        subtitleEn: "Linear Operator Theory",
        descriptionFr:
          "Taxonomie des opérateurs linéaires en dimension infinie: bornés/non bornés, auto-adjoints, unitaires, compacts, et conséquences spectrales.",
        descriptionEn:
          "Taxonomy of linear operators in infinite dimension: bounded/unbounded, self-adjoint, unitary, compact, and spectral consequences.",
        topicsFr: [
          "Opérateurs linéaires",
          "Auto-adjonction",
          "Spectre",
          "Compacité",
          "Convergence forte/faible",
        ],
        topicsEn: [
          "Linear operators",
          "Self-adjointness",
          "Spectrum",
          "Compactness",
          "Strong/weak convergence",
        ],
        pdfFile: "ch4.pdf",
        pdfAvailable: true,
        readingTime: "60 min",
        texFile: "chp4.tex",
        content: `
<p>Remarque initiale : en algèbre linéaire, on parle généralement d'applications linéaires entre deux espaces vectoriels. En analyse fonctionnelle (et dans un cadre quantique), on les appelle plutôt \\emph{opérateurs linéaires}, mais il s'agit de la même notion mathématique.</p>

<p>Au premier regard, il ne semble pas nécessaire de savoir grand chose sur le sujet. La théorie des opérateurs étant difficile, un principe d'économie intellectuelle nous dit : ne suffit-il pas de savoir définir l'adjoint, et de savoir qu'un opérateur auto-adjoint a un spectre réel, ce qui le qualifie naturellement pour être une observable? Ne suffit-il pas de savoir qu'un opérateur unitaire conserve la norme et donc les probabilités, et sont en général associés soit à l'opérateur d'évolution, soit aux symétries du système?</p>

<p>D'une certaine manière, c'est vrai. C'est d'ailleurs la raison pour laquelle ce chapitre peut être passé en toute première lecture. Mais si l'on veut vraiment comprendre la mécanique quantique en profondeur, la maîtrise de la théorie des opérateurs et de la théorie spectrale devient incontournable. Les points suivants en sont autant d'illustrations. L'ensemble des notions mathématiques ci-dessous seront développées dans ce chapitre.</p>
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
