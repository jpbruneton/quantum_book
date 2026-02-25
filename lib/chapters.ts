export interface Chapter {
  slug: string;
  number: number;
  titleFr: string;
  titleEn: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  pdfFile: string; // filename in /public/pdfs/
  pdfAvailable: boolean; // set to true only when the PDF file exists in public/pdfs/
  readingTime: string;
  content: string; // HTML or MDX content for web reading
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

export const chapters: Chapter[] = [
  {
    slug: "introduction",
    number: 1,
    titleFr: "Introduction",
    titleEn: "Introduction",
    title: "Introduction",
    subtitle: "Expérience de Stern et Gerlach",
    description:
      "Introduction expérimentale au spin, au moment magnétique, et à la quantification observée dans l'expérience de Stern et Gerlach.",
    topics: ["Moment magnétique", "Stern-Gerlach", "Spin", "Précession de Larmor", "Quantification"],
    pdfFile: "ch1.pdf",
    pdfAvailable: true,
    readingTime: "45 min",
    content: `
<p>Nous commençons notre présentation de la mécanique quantique par les expériences portant sur le spin, et l'introduction même de ce concept. C'est en réalité tardif dans le développement historique, puisque Otto Stern et Walther Gerlach réalisent leur expérience fondamentale en 1922; tandis Samuel Goudsmit et George Uhlenbeck proposent l'hypothèse du spin électronique en 1925.</p>

<p>Il faut d'abord anticiper sur le fait qu'un spin se comporte comme un moment magnétique. Les cours usuels de L2 en éléctromagnétisme sont toujours très dense car il y a beaucoup de choses à dire, et j'ai pu constater qu'en général la théorie des moments magnétiques classiques est souvent sacrifiée par manque de temps. Cela pose en général problème quand on passe en L3, à la fois en mécanique quantique mais aussi en physique statistique. Je commence donc par rappeler les notions classiques essentielles.</p>

<p>Un moment magnétique  $\\vec{\\mu}$, ou dipôle magnétique, est un vecteur. C'est la quantité fondamentale qui permet de quantifier l'intensité d'un aimant naturel, par exemple, ou d'un eléctro-aimant, c'est-à-dire d'une boucle de courant. Un aimant naturel possède un moment magnétique, qui par définition est dans la direction pôle Sud $\\to$ pôle Nord de l'aimant. C'est aussi la direction des lignes de champ magnétique générées par l'aimant à l'extérieur de celui-ci (elles sortent du pôle Nord et reviennent au pôle Sud ; à l'intérieur de l'aimant elles vont directement du Sud a Nord), cf figure \\ref{magnet}.</p>
    `,
  },
  {
    slug: "espaces-de-hilbert",
    number: 2,
    titleFr: "Espaces de Hilbert",
    titleEn: "Hilbert Spaces",
    title: "Espaces de Hilbert",
    subtitle: "Fondements mathématiques",
    description:
      "Espaces vectoriels, normes, produit scalaire, topologie forte, complétude et bases hilbertiennes pour établir le cadre formel de la mécanique quantique.",
    topics: ["Espaces vectoriels", "Normes", "Produit scalaire", "Topologie forte", "Espaces de Hilbert"],
    pdfFile: "ch2.pdf",
    pdfAvailable: true,
    readingTime: "55 min",
    content: `
<p>Les cours de mathématiques font souvent des maths sans s'expliquer, comme si les mathématiques se suffisaient à elles-même, ce qui n'est d'ailleurs pas faux. Les cours de physique les utilisent souvent sans les expliciter suffisamment. Dans ce chapitre, on essaiera de trouver au mieux cet équilibre entre mathématiques et physique. Ce chapitre est en particulier basé sur diverses notes de cours de mathématiques, de l'agrégation de mathématiques \\cite{hilbert_agreg, hilbert_agreg2} ou de notes de cours universitaires condensées \\cite{hilbert_lyon, hilbert_x}. La référence la plus complète est \\cite{hilbert_orsay}, où l'on y trouvera de nombreuses démonstrations.</p>

<p>La physique établit des correspondances entre le monde sensible et des espaces mathématiques abstraits. C'est la phase de formalisation du problème physique. Mais la démarche ne s’arrête pas là : il s’agit aussi de tracer le chemin inverse, en faisant revenir ces abstractions vers le réel, sous forme de prédictions expérimentales, où les propriétés mathématiques se traduisent en nombres. On doit donc impérativement équiper ces structures mathématiques d'application vers les nombres réels\\footnote{Ou autres : on peut sans doute se convaincre que tout résultat expérimental peut se décomposer en une série de réponses à des questions binaires oui/non ; par exemple : la particule est-elle à gauche ou à droite de ceci? Par processus dichotomique, on peut reconstruire les nombres réels à l'aide de cette question. En soi, il semble que les seules applications vraiment nécessaires soient des applications vers les booléens.}. Ces \\og moteurs de prédiction \\fg sont par exemple les projecteurs, traces, produits scalaires, normes, formes quadratiques, etc.</p>

<p>Cette étape est à peine nécessaire en mécanique classique qui manipule directement des nombres réels (ex : le temps) ou des vecteurs de nombres réels (ex : la position) qui sont supposées être directement accessibles expérimentalement; il y a tout au plus une étape de projection triviale à réaliser pour dire par exemple : \\og la particule à l'instant $t$ se trouve en $x$ sur l'axe $Ox$ \\fg. C'est donc suffisamment évident pour ne même pas être signalé.</p>
    `,
  },
  {
    slug: "postulats",
    number: 3,
    titleFr: "Postulats",
    titleEn: "Postulates",
    title: "Postulats",
    subtitle: "Mesure, dynamique et interprétation",
    description:
      "Présentation des postulats quantiques, de la règle de Born, de la réduction du paquet d'onde et de l'équation de Schrödinger.",
    topics: ["Postulats", "Règle de Born", "Mesure", "Évolution unitaire", "Théorème d'Ehrenfest"],
    pdfFile: "ch3.pdf",
    pdfAvailable: true,
    readingTime: "50 min",
    content: `
<p>Ce chapitre présente les postulats de la mécanique quantique et en propose une première discussion. L'objectif est double : établir le formalisme standard, et souligner à quel point ces postulats proposent une vision du monde radicalement différente de celle de la physique classique. Nous présenterons ici la version dite \\og orthodoxe\\fg, bien connue sous le nom d'« interprétation de Copenhague\\footnote{Du nom de l'école de pensée développée à l'Université de Copenhague dans les années 1920-1930, principalement par Bohr, qui y enseignait, et par Heisenberg, qui y était de passage.} », de la mécanique quantique. Cette formulation inclut notamment le postulat de la réduction du paquet d'onde (postulat 3) ainsi que le caractère fondamentalement probabiliste des résultats de mesure (postulat 4).</p>

<p>Cette précision prend tout son sens lorsque l'on sait qu'il existe d'autres interprétations de la mécanique quantique qui remettent en question certains des postulats énoncés ci-dessous. Une des plus connue, l'interprétation des mondes multiples d'Everett, par exemple, abandonne le postulat de réduction : dans ce cadre, toutes les issues possibles d'une mesure se réalisent dans des branches différentes de la fonction d'onde universelle. Le caractère aléatoire de la mesure devient alors relatif à l'observateur : depuis sa branche, il perçoit un résultat unique et \\emph{apparemment} aléatoire, bien que tous les résultats se produisent effectivement. C'est pourquoi, dans cette interprétation, la règle de Born (postulat 4) devrait pouvoir se dériver des autres postulats pour que la théorie soit pleinement satisfaisante\\footnote{Une telle dérivation n'a pas encore été trouvée ; c'est sujet à de vifs débats en fondements de la mécanique quantique.}. Nous couvrirons ces sujets dans la partie II [[[ref???]]].</p>

<p>Par ailleurs, l'émergence de l'informatique quantique et de la cryptographie quantique a renouvelé l'intérêt théorique pour les fondements, conduisant à des reformulations des axiomes sous une forme \\emph{complètement différente} de celle que l'on expose ci-dessous. Dans ces approches la structure de Hilbert n'est même pas postulée mais dérivée à partir d'une axiomatique informationnelle. Ces approches seront discutées en partie III ou IV [[[check later]]].</p>
    `,
  },
  {
    slug: "theorie-des-operateurs-lineaires",
    number: 4,
    titleFr: "Théorie des opérateurs linéaires",
    titleEn: "Linear Operator Theory",
    title: "Théorie des opérateurs linéaires",
    subtitle: "Structure et spectre",
    description:
      "Taxonomie des opérateurs linéaires en dimension infinie: bornés/non bornés, auto-adjoints, unitaires, compacts, et conséquences spectrales.",
    topics: ["Opérateurs linéaires", "Auto-adjonction", "Spectre", "Compacité", "Convergence forte/faible"],
    pdfFile: "ch4.pdf",
    pdfAvailable: true,
    readingTime: "60 min",
    content: `
<p>Remarque initiale : en algèbre linéaire, on parle généralement d'applications linéaires entre deux espaces vectoriels. En analyse fonctionnelle (et dans un cadre quantique), on les appelle plutôt \\emph{opérateurs linéaires}, mais il s'agit de la même notion mathématique.</p>

<p>Au premier regard, il ne semble pas nécessaire de savoir grand chose sur le sujet. La théorie des opérateurs étant difficile, un principe d'économie intellectuelle nous dit : ne suffit-il pas de savoir définir l'adjoint, et de savoir qu'un opérateur auto-adjoint a un spectre réel, ce qui le qualifie naturellement pour être une observable? Ne suffit-il pas de savoir qu'un opérateur unitaire conserve la norme et donc les probabilités, et sont en général associés soit à l'opérateur d'évolution, soit aux symétries du système?</p>

<p>D'une certaine manière, c'est vrai. C'est d'ailleurs la raison pour laquelle ce chapitre peut être passé en toute première lecture. Mais si l'on veut vraiment comprendre la mécanique quantique en profondeur, la maîtrise de la théorie des opérateurs et de la théorie spectrale devient incontournable. Les points suivants en sont autant d'illustrations. L'ensemble des notions mathématiques ci-dessous seront développées dans ce chapitre.</p>
    `,
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}
