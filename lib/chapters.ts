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
<h2>Le spin dans l'expérience de Stern et Gerlach</h2>
<p>Nous commençons notre présentation de la mécanique quantique par les expériences portant sur le spin. Un spin se comporte comme un moment magnétique, et cette idée est au coeur de l'interprétation de Stern-Gerlach.</p>

<h2>Rappels sur le moment magnétique classique</h2>
<p>Un moment magnétique $\\vec{\\mu}$ placé dans un champ magnétique externe $\\vec{B}$ subit un couple :</p>
<p style="text-align:center">$$\\vec{\\tau} = \\vec{\\mu} \\wedge \\vec{B}$$</p>
<p>Son énergie potentielle est donnée par :</p>
<p style="text-align:center">$$E_p = -\\vec{\\mu} \\cdot \\vec{B}$$</p>
<p>et donc la force globale associée vaut :</p>
<p style="text-align:center">$$\\vec{F} = \\grad \\left(\\vec{\\mu} \\cdot \\vec{B}\\right)$$</p>

<p>Dans un champ inhomogène, cette force entraîne une déviation mesurable des particules, ce qui est précisément exploité dans l'expérience de Stern et Gerlach.</p>

<p style="text-align:center"><img src="/figs/SGimage.jpg" alt="Expérience de Stern et Gerlach" style="max-width:100%;height:auto;" /></p>
<p><em>Expérience de Stern et Gerlach : le faisceau est séparé en impacts discrets.</em></p>
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
<h2>Espaces vectoriels et espaces de Hilbert</h2>
<p>Ce chapitre introduit les structures mathématiques nécessaires à la mécanique quantique : espaces vectoriels, normes, produits scalaires, topologie forte et complétude.</p>

<h2>Espace vectoriel</h2>
<p>Un espace vectoriel $E$ sur un corps $\\mathbb{K}$ est muni d'une addition et d'une multiplication par un scalaire, satisfaisant les axiomes usuels.</p>

<h2>Espace préhilbertien et Hilbert</h2>
<p>Un espace préhilbertien est un espace vectoriel muni d'un produit scalaire $\\langle \\cdot,\\cdot \\rangle$, qui induit la norme :</p>
<p style="text-align:center">$$\\|x\\| = \\sqrt{\\langle x,x \\rangle}$$</p>
<p>Un espace de Hilbert est un préhilbertien complet pour cette norme.</p>

<h2>Décomposition et base hilbertienne</h2>
<p>Pour une base hilbertienne $(e_i)$, on a la décomposition (cas dénombrable) :</p>
<p style="text-align:center">$$x = \\sum_i \\langle e_i, x \\rangle e_i$$</p>
<p>et l'identité de Parseval :</p>
<p style="text-align:center">$$\\|x\\|^2 = \\sum_i |\\langle e_i, x \\rangle|^2$$</p>
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
<h2>Postulats et étrangetés quantiques</h2>
<p>Ce chapitre présente les postulats standards de la mécanique quantique (version dite orthodoxe/Copenhague) et leurs implications conceptuelles.</p>

<h2>Postulat cinématique</h2>
<p>L'état d'un système quantique isolé est décrit par un vecteur $\\kpsi$ d'un espace de Hilbert $\\Hilb$.</p>

<h2>Mesure et règle de Born</h2>
<p>Pour une observable auto-adjointe $\\hat{A}$, les résultats de mesure possibles sont ses valeurs propres. Après mesure donnant $a_n$, l'état se projette sur le sous-espace propre associé, et la probabilité de Born est :</p>
<p style="text-align:center">$$P_{\\psi}(a_n) = |\\braket{a_n}{\\psi}|^2$$</p>

<h2>Dynamique de Schrödinger</h2>
<p>L'évolution temporelle est donnée par :</p>
<p style="text-align:center">$$i\\hbar \\frac{d}{dt}\\kpsi(t) = \\ham\\kpsi(t)$$</p>
<p>et, pour un Hamiltonien indépendant du temps :</p>
<p style="text-align:center">$$U(t,t_0)=e^{-i\\ham (t-t_0)/\\hbar}$$</p>
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
<h2>Théorie des opérateurs linéaires</h2>
<p>Ce chapitre cartographie les classes d'opérateurs utiles en mécanique quantique : bornés/non bornés, auto-adjoints, unitaires, compacts, et leurs propriétés spectrales.</p>

<h2>Pourquoi c'est crucial</h2>
<p>La théorie spectrale permet d'interpréter correctement observables, valeurs propres, spectre continu, et calcul fonctionnel d'opérateurs (comme $e^{-i\\ham t/\\hbar}$ ou $V(\\hat{X})$).</p>

<h2>Topologie forte et convergence</h2>
<p>Dans un espace normé, la convergence forte s'écrit :</p>
<p style="text-align:center">$$\\|x_n-x\\| \\to 0$$</p>
<p>La complétude de l'espace est essentielle pour garantir existence et stabilité des solutions d'évolution.</p>

<p><a href="/figs/taxo.pdf" target="_blank" rel="noopener noreferrer">Ouvrir la carte de taxonomie des opérateurs (PDF)</a></p>
    `,
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}
