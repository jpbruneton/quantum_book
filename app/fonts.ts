import { Cookie, Crimson_Pro, Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";

// next/font downloads the fonts at build time and serves versioned files from
// our own domain. Let CSS load the scripts and styles used on each page, rather
// than preloading normal and italic Latin faces for all twenty languages.
const headings = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
  fallback: ["serif"],
});

const text = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
  preload: false,
  fallback: ["serif"],
});

const interfaceFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const monospace = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
  fallback: ["monospace"],
  adjustFontFallback: false,
});

const signature = Cookie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cookie",
  display: "swap",
  preload: false,
  fallback: ["cursive"],
  adjustFontFallback: false,
});

export const fontVariables = [
  headings.variable,
  text.variable,
  interfaceFont.variable,
  monospace.variable,
  signature.variable,
].join(" ");
