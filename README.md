# Quantum Mechanics Book Website

A Next.js website for hosting your quantum mechanics book — free online reading with KaTeX math rendering + per-chapter PDF download.

## Tech Stack

- **Next.js 14** (App Router) — framework
- **TypeScript** — type safety
- **Tailwind CSS** — utility styling
- **KaTeX** — math rendering (via CDN in globals.css)
- **Vercel** — deployment target
- **GitHub** — source hosting

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/quantum-mechanics-book.git
cd quantum-mechanics-book
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customising the Book

### Update Book Metadata

Edit **`lib/chapters.ts`** — the `bookMeta` object at the top:

```ts
export const bookMeta = {
  title: "Quantum Mechanics",
  subtitle: "A Modern Introduction",
  author: "Jean-Philippe Bruneton",
  affiliation: "Université Paris Cité, France",
  year: "2026",
  description: "...",
  keywords: ["quantum mechanics", "..."],
};
```

### Add / Edit Chapters

Each chapter is an object in the `chapters` array in `lib/chapters.ts`:

```ts
{
  slug: "my-chapter-slug",         // URL: /chapters/my-chapter-slug
  number: 6,
  title: "Perturbation Theory",
  subtitle: "Time-independent methods",
  description: "Short description shown on cards",
  topics: ["First-order", "Second-order", "Degenerate"],
  pdfFile: "chapter-06-perturbation.pdf",   // place PDF in /public/pdfs/
  readingTime: "50 min",
  content: `<p>HTML content with inline math $E = mc^2$ and display math ...</p>`,
}
```

### Add PDFs

Place your PDF files in **`public/pdfs/`**:

```
public/
  pdfs/
    chapter-01-mathematical-foundations.pdf
    chapter-02-wave-mechanics.pdf
    ...
```

The filename must match the `pdfFile` field in `lib/chapters.ts`.

### Convert LaTeX to HTML Content (Web version)

Use **pandoc** to convert your `.tex` files:

```bash
# Install pandoc: https://pandoc.org/installing.html

pandoc chapter-01.tex -o chapter-01.html \
  --mathml \
  --standalone=false

# Or with KaTeX-compatible output:
pandoc chapter-01.tex -o chapter-01.html \
  --mathjax \
  --standalone=false
```

Then paste the output HTML into the `content` field of the chapter object.

For **full KaTeX rendering** in the browser, the project loads the KaTeX CSS globally. To enable server-side rendering of math, install `react-katex`:

```bash
npm install katex react-katex
```

And update the `ChapterContent.tsx` component to use `<InlineMath>` and `<BlockMath>` components.

### Update the Author Bio

Edit **`app/about/page.tsx`** — find the author bio section and replace with your own text.

### Add a Book Cover

Replace the placeholder cover on the homepage by adding your image to `public/images/cover.jpg` and updating `app/page.tsx`:

```tsx
// Replace the placeholder div with:
<Image src="/images/cover.jpg" alt="Book cover" fill style={{ objectFit: 'cover' }} />
```

---

## Deployment (Vercel + GitHub)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Leave all settings as default (Next.js is auto-detected)
5. Click **"Deploy"**

That's it — Vercel auto-deploys on every `git push` to `main`.

---

## Project Structure

```
quantum-mechanics-book/
├── app/
│   ├── page.tsx              # Homepage (hero, chapters preview)
│   ├── layout.tsx            # Root layout (navbar, footer)
│   ├── globals.css           # Global styles, fonts, animations
│   ├── not-found.tsx         # 404 page
│   ├── about/
│   │   └── page.tsx          # About the book + author
│   ├── chapters/
│   │   ├── page.tsx          # Chapter listing
│   │   ├── ChapterContent.tsx # Web/PDF tab switcher (client)
│   │   └── [slug]/
│   │       └── page.tsx      # Individual chapter page
│   └── components/
│       ├── NavBar.tsx
│       └── Footer.tsx
├── lib/
│   └── chapters.ts           # ← ALL your book data lives here
├── public/
│   ├── pdfs/                 # ← Place your PDF files here
│   └── images/               # ← Book cover, author photo, etc.
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## Math Rendering Notes

- The site loads **KaTeX CSS** via Google Fonts CDN in `globals.css`
- Web chapter content uses HTML with inline `$...$` and display `$$...$$` notation
- For full client-side rendering, consider adding the `katex` npm package and rendering math expressions in a `useEffect` hook, or use `react-katex`

---

## Exercise PDFs (library + legacy `exo.tex`)

The script merges, for a given book theme number `N`, all exercise sources in order: legacy `content/tex/themeN_fr/exo.tex` (or `_en`) if present, then every `exercices*.tex` in `exercises_library_fr` (or `_en`) whose `\theme{N}` matches. It runs `pdflatex`, writes first under `scripts/latex-tmp/`, then copies the PDF to `public/pdfs/`.

**Outputs**

| File | Meaning |
|------|---------|
| `public/pdfs/exo_themeN_fr.pdf` | French, with solutions (default) |
| `public/pdfs/exo_themeN_fr_sans_solutions.pdf` | French, statements only: strips `solution`, `indice`, `indication`, `hint` |
| `public/pdfs/exo_themeN_en.pdf` | English, with solutions |
| `public/pdfs/exo_themeN_en_sans_solutions.pdf` | English, statements only (same stripping as FR `_sans_solutions`) |

For a single theme, build both variants with `--both`. For `--all`, both variants are produced by default (unless you pass `--sans-solutions` only).

**Requirements**

- A LaTeX install (e.g. MiKTeX) with `pdflatex` on your `PATH`, **or** set `PDFLATEX` / `MIKTEX_PDFLATEX` to the full path of `pdflatex.exe` (PowerShell: `$env:PDFLATEX = "C:\...\pdflatex.exe"`).
- Close the target PDF in viewers (Adobe, IDE preview) before rebuilding; otherwise the copy step to `public/pdfs/` can fail on Windows.

**Commands** (from repo root)

```bash
# One theme, French (default), with solutions
npm run build:exo-pdf -- 2 fr

# One theme, English
npm run build:exo-pdf -- 2 en

# French, statements only
npm run build:exo-pdf -- 2 fr --sans-solutions

# With solutions + without (two PDFs for FR)
npm run build:exo-pdf -- 2 fr --both

# All non-empty themes: FR + EN, and for each theme×language two PDFs by default
# (with solutions, and statements-only with solutions + hints/indications stripped)
npm run build:exo-pdf -- --all

# All themes, statements-only PDFs only (no “avec corrigés” pass)
npm run build:exo-pdf -- --all --sans-solutions

# All themes, French only (or English only) — still produces avec + sans per theme
npm run build:exo-pdf -- --all fr
npm run build:exo-pdf -- --all en
```

Equivalent without npm: `node scripts/build-exercises-pdf.mjs …` with the same arguments after `--` when using `npm run`.

Commit generated PDFs under `public/pdfs/` if the site should offer downloads in production (the app checks that files exist at build time).

## License

© 2026 Jean-Philippe Bruneton. All rights reserved.
