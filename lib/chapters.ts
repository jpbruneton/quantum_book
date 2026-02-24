export interface Chapter {
  slug: string;
  number: number;
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
  year: "2025",
  edition: "First Edition",
  description:
    "A rigorous yet accessible treatment of quantum mechanics, bridging classical intuition and the mathematical formalism of Hilbert spaces, operators, and measurement theory. Designed for advanced undergraduates and graduate students.",
  isbn: "978-X-XXXX-XXXX-X",
  keywords: ["quantum mechanics", "wave functions", "Schrödinger equation", "Hilbert space", "quantum field theory"],
};

export const chapters: Chapter[] = [
  {
    slug: "mathematical-foundations",
    number: 1,
    title: "Mathematical Foundations",
    subtitle: "Linear Algebra & Hilbert Spaces",
    description:
      "We establish the mathematical scaffolding: complex vector spaces, inner products, operators, and the spectral theorem — the language quantum mechanics speaks.",
    topics: ["Complex vector spaces", "Hilbert spaces", "Linear operators", "Eigenvalues & eigenvectors", "Dirac notation"],
    pdfFile: "chapter-01-mathematical-foundations.pdf",
    pdfAvailable: false,
    readingTime: "45 min",
    content: `
<p>Quantum mechanics is, at its core, a theory about linear algebra over complex numbers. Before we can speak meaningfully about particles, waves, or measurements, we must first build the mathematical stage on which the quantum drama unfolds.</p>

<h2>1.1 Complex Vector Spaces</h2>
<p>A <strong>complex vector space</strong> $\\mathcal{V}$ is a set of vectors over the field $\\mathbb{C}$, equipped with addition and scalar multiplication satisfying the usual axioms. The central object of quantum mechanics is the <em>state vector</em> $|\\psi\\rangle \\in \\mathcal{H}$, where $\\mathcal{H}$ is a special kind of complex vector space called a <strong>Hilbert space</strong>.</p>

<h2>1.2 The Hilbert Space</h2>
<p>A Hilbert space $\\mathcal{H}$ is a complex inner product space that is also <em>complete</em> — every Cauchy sequence of vectors converges to a vector within the space. The inner product $\\langle \\phi | \\psi \\rangle \\in \\mathbb{C}$ satisfies:</p>
<ul>
  <li>Conjugate symmetry: $\\langle \\phi | \\psi \\rangle = \\langle \\psi | \\phi \\rangle^*$</li>
  <li>Linearity in the second argument</li>
  <li>Positive definiteness: $\\langle \\psi | \\psi \\rangle \\geq 0$, with equality iff $|\\psi\\rangle = 0$</li>
</ul>

<h2>1.3 Operators and Observables</h2>
<p>Physical observables correspond to <strong>self-adjoint (Hermitian) operators</strong> $\\hat{A} = \\hat{A}^\\dagger$ on $\\mathcal{H}$. The spectral theorem guarantees that such operators have real eigenvalues $a_n$ and orthonormal eigenvectors $|a_n\\rangle$:</p>
<p style="text-align:center">$$\\hat{A}|a_n\\rangle = a_n|a_n\\rangle$$</p>
<p>These eigenvalues are the only possible outcomes of measuring $\\hat{A}$.</p>
    `,
  },
  {
    slug: "wave-mechanics",
    number: 2,
    title: "Wave Mechanics",
    subtitle: "The Schrödinger Equation",
    description:
      "The wavefunction emerges as the central object of non-relativistic quantum mechanics. We derive and analyze the time-dependent and time-independent Schrödinger equations.",
    topics: ["Wavefunction interpretation", "Time-dependent Schrödinger equation", "Probability currents", "Stationary states", "Free particle"],
    pdfFile: "chapter-02-wave-mechanics.pdf",
    pdfAvailable: false,
    readingTime: "55 min",
    content: `
<p>In 1926, Erwin Schrödinger wrote down an equation whose solutions — wavefunctions $\\psi(\\mathbf{x}, t)$ — would transform our understanding of nature at the smallest scales.</p>

<h2>2.1 The Wavefunction</h2>
<p>The quantum state of a particle is encoded in a complex-valued function $\\psi: \\mathbb{R}^3 \\times \\mathbb{R} \\to \\mathbb{C}$. Born's rule tells us that $|\\psi(\\mathbf{x},t)|^2$ is a <em>probability density</em>:</p>
<p style="text-align:center">$$P(\\mathbf{x} \\in V, t) = \\int_V |\\psi(\\mathbf{x},t)|^2 \\, d^3x$$</p>
<p>The wavefunction must be normalized: $\\int_{\\mathbb{R}^3} |\\psi|^2 d^3x = 1$.</p>

<h2>2.2 The Time-Dependent Schrödinger Equation</h2>
<p>The dynamical evolution of $\\psi$ is governed by:</p>
<p style="text-align:center">$$i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\hat{H}\\psi = \\left(-\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{x},t)\\right)\\psi$$</p>
<p>This is a <em>linear, first-order</em> PDE in time — its linearity is what gives rise to superposition; its first-order nature in $t$ means the initial wavefunction completely determines the future evolution.</p>

<h2>2.3 Stationary States</h2>
<p>When the potential is time-independent, $V = V(\\mathbf{x})$, we may seek solutions of the form $\\psi(\\mathbf{x},t) = \\phi(\\mathbf{x})e^{-iEt/\\hbar}$. Substituting yields the <strong>time-independent Schrödinger equation</strong>:</p>
<p style="text-align:center">$$\\hat{H}\\phi = E\\phi$$</p>
    `,
  },
  {
    slug: "quantum-harmonic-oscillator",
    number: 3,
    title: "The Harmonic Oscillator",
    subtitle: "Ladder Operators & Energy Spectra",
    description:
      "Perhaps the most important exactly-solvable system in all of physics. The algebraic method reveals a beautiful structure that reappears throughout quantum field theory.",
    topics: ["Algebraic method", "Creation & annihilation operators", "Energy spectrum", "Coherent states", "Applications"],
    pdfFile: "chapter-03-harmonic-oscillator.pdf",
    pdfAvailable: false,
    readingTime: "50 min",
    content: `
<p>The quantum harmonic oscillator stands as a cornerstone of modern physics. Its exact solution, elegant algebraic structure, and ubiquitous appearance — from molecular vibrations to quantum fields — make it indispensable.</p>

<h2>3.1 The Hamiltonian</h2>
<p>We consider a particle of mass $m$ in a quadratic potential:</p>
<p style="text-align:center">$$\\hat{H} = \\frac{\\hat{p}^2}{2m} + \\frac{1}{2}m\\omega^2 \\hat{x}^2$$</p>

<h2>3.2 Ladder Operators</h2>
<p>The key insight is to introduce dimensionless <strong>creation and annihilation operators</strong>:</p>
<p style="text-align:center">$$\\hat{a} = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(\\hat{x} + \\frac{i\\hat{p}}{m\\omega}\\right), \\qquad \\hat{a}^\\dagger = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(\\hat{x} - \\frac{i\\hat{p}}{m\\omega}\\right)$$</p>
<p>These satisfy the canonical commutation relation $[\\hat{a}, \\hat{a}^\\dagger] = 1$, and rewrite the Hamiltonian as:</p>
<p style="text-align:center">$$\\hat{H} = \\hbar\\omega\\left(\\hat{a}^\\dagger\\hat{a} + \\frac{1}{2}\\right) = \\hbar\\omega\\left(\\hat{N} + \\frac{1}{2}\\right)$$</p>

<h2>3.3 The Energy Spectrum</h2>
<p>The number operator $\\hat{N} = \\hat{a}^\\dagger\\hat{a}$ has non-negative integer eigenvalues $n = 0, 1, 2, \\ldots$, yielding the discrete energy spectrum:</p>
<p style="text-align:center">$$E_n = \\hbar\\omega\\left(n + \\frac{1}{2}\\right)$$</p>
<p>The ground state energy $E_0 = \\hbar\\omega/2$ is famously non-zero — a direct consequence of the uncertainty principle.</p>
    `,
  },
  {
    slug: "angular-momentum",
    number: 4,
    title: "Angular Momentum",
    subtitle: "Rotational Symmetry & Spin",
    description:
      "Rotational symmetry gives birth to angular momentum quantization. We construct the general theory and encounter the radical concept of half-integer spin.",
    topics: ["Orbital angular momentum", "Commutation relations", "Spherical harmonics", "Spin-1/2 systems", "Clebsch-Gordan coefficients"],
    pdfFile: "chapter-04-angular-momentum.pdf",
    pdfAvailable: false,
    readingTime: "60 min",
    content: `
<p>Angular momentum is one of the most fundamental conserved quantities in physics. Its quantum theory reveals that angular momentum is quantized — and that nature harbors a surprising type that has no classical analogue: <em>spin</em>.</p>

<h2>4.1 Orbital Angular Momentum</h2>
<p>The orbital angular momentum operator is defined by analogy with classical mechanics:</p>
<p style="text-align:center">$$\\hat{\\mathbf{L}} = \\hat{\\mathbf{r}} \\times \\hat{\\mathbf{p}}$$</p>
<p>The components satisfy the fundamental commutation relations:</p>
<p style="text-align:center">$$[\\hat{L}_i, \\hat{L}_j] = i\\hbar \\varepsilon_{ijk} \\hat{L}_k$$</p>

<h2>4.2 Eigenvalues</h2>
<p>Using the algebraic method (ladder operators $\\hat{L}_\\pm = \\hat{L}_x \\pm i\\hat{L}_y$), one shows that $\\hat{\\mathbf{L}}^2$ and $\\hat{L}_z$ share eigenstates $|l, m\\rangle$:</p>
<p style="text-align:center">$$\\hat{\\mathbf{L}}^2|l,m\\rangle = \\hbar^2 l(l+1)|l,m\\rangle, \\qquad \\hat{L}_z|l,m\\rangle = \\hbar m|l,m\\rangle$$</p>
<p>where $l = 0, 1, 2, \\ldots$ and $m = -l, -l+1, \\ldots, l$.</p>
    `,
  },
  {
    slug: "measurement-and-entanglement",
    number: 5,
    title: "Measurement & Entanglement",
    subtitle: "The Quantum Postulates",
    description:
      "What happens when we look? The measurement postulate, collapse, and the EPR paradox lead us to the strangest phenomenon in physics: quantum entanglement.",
    topics: ["Measurement postulate", "Wavefunction collapse", "EPR paradox", "Bell inequalities", "Quantum entanglement"],
    pdfFile: "chapter-05-measurement-entanglement.pdf",
    pdfAvailable: false,
    readingTime: "65 min",
    content: `
<p>Of all the mysteries in quantum mechanics, measurement stands apart. Unlike the smooth, deterministic Schrödinger evolution, measurement is discontinuous, probabilistic, and deeply puzzling.</p>

<h2>5.1 The Measurement Postulate</h2>
<p>When observable $\\hat{A}$ is measured on state $|\\psi\\rangle = \\sum_n c_n |a_n\\rangle$, the outcome is eigenvalue $a_n$ with probability:</p>
<p style="text-align:center">$$P(a_n) = |c_n|^2 = |\\langle a_n | \\psi \\rangle|^2$$</p>
<p>Immediately after the measurement, the state <em>collapses</em> to $|a_n\\rangle$. This irreversible, non-unitary process sits at the heart of the measurement problem.</p>

<h2>5.2 Entanglement</h2>
<p>A two-particle state that <em>cannot</em> be written as a tensor product $|\\psi\\rangle = |\\phi\\rangle_A \\otimes |\\chi\\rangle_B$ is said to be <strong>entangled</strong>. The canonical example is the Bell state:</p>
<p style="text-align:center">$$|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}\\left(|{\\uparrow}\\rangle_A|{\\uparrow}\\rangle_B + |{\\downarrow}\\rangle_A|{\\downarrow}\\rangle_B\\right)$$</p>
<p>Measuring particle $A$ instantaneously determines the state of particle $B$, regardless of distance — what Einstein famously called "spooky action at a distance."</p>
    `,
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}
