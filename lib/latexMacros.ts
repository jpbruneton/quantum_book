export const KATEX_MACROS: Record<string, string> = {
  // Core sets
  "\\R": "\\mathbb{R}",
  "\\C": "\\mathbb{C}",
  "\\Q": "\\mathbb{Q}",
  "\\Z": "\\mathbb{Z}",
  "\\N": "\\mathbb{N}",
  "\\E": "\\mathbb{E}",

  // Common spaces/operators
  "\\Hilb": "\\mathcal{H}",
  "\\Dom": "\\mathcal{D}",
  "\\L": "\\mathcal{L}",
  "\\G": "\\mathcal{G}",
  "\\H": "\\mathcal{H}",
  "\\ham": "\\hat{H}",
  "\\X": "\\hat{X}",
  "\\PP": "\\hat{P}",

  // Greek/custom aliases
  "\\eps": "\\varepsilon",
  "\\epsilon": "\\varepsilon",
  "\\phi": "\\varphi",
  "\\psip": "\\tilde{\\psi}",

  // Dirac notation (physics-like helpers)
  "\\ket": "\\left|#1\\right\\rangle",
  "\\bra": "\\left\\langle#1\\right|",
  "\\kebra": "\\ket{#1}\\bra{#2}",
  "\\braket": "\\left\\langle #1 \\middle| #2 \\right\\rangle",
  "\\kphi": "\\ket{\\phi}",
  "\\kpsi": "\\ket{\\psi}",
  "\\kspi": "\\ket{\\psi}",
  "\\bphi": "\\bra{\\phi}",
  "\\bpsi": "\\bra{\\psi}",

  // Differential helpers
  "\\dr": "\\frac{\\partial #1}{\\partial #2}",
  "\\drp": "\\left(\\frac{\\partial #1}{\\partial #2}\\right)_{#3}",
  "\\drsp": "\\left(\\frac{\\partial^2 #1}{\\partial #2^2}\\right)_{#3}",

  // Norm / gradient
  "\\bignorm": "\\left\\lVert#1\\right\\rVert",
  "\\norm": "\\left\\lVert#1\\right\\rVert",
  "\\grad": "\\vec{\\nabla}",

  // Misc textual helpers
  "\\rev": "\\textrm{rev}",
  "\\irrev": "\\textrm{irrev}",
  "\\pr": "\\textrm{Pr}",
  "\\given": "\\vert",

  // Simple operator-like helpers
  "\\dagg": "\\hat{#1}^{\\dagger}",
  "\\transpose": "{#1}^{\\top}",
  // Mirror header_fr/header_en renewcommand for web KaTeX rendering.
  "\\equiv": "\\;\\stackrel{\\text{def}}{=}\\;",
  "\\Aboxed": "\\boxed{#1}",

  // Practical fallback for custom independence symbol
  "\\independent": "\\perp\\!\\!\\!\\perp",
  "\\centernot": "\\not",
};

