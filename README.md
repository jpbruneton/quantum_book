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

## License

© 2026 Jean-Philippe Bruneton. All rights reserved.
