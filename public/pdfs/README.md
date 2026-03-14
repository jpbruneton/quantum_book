# PDFs Folder

Store lesson PDFs in per-theme/per-language directories:

- `theme1_fr/`, `theme1_en/`
- `theme2_fr/`, `theme2_en/`
- ...
- `theme6_fr/`, `theme6_en/`

Naming convention:

- French lessons: `leconN.pdf` (example: `theme2_fr/lecon1.pdf`)
- English lessons: `lessonN.pdf` (example: `theme2_en/lesson1.pdf`)

The PDF viewer resolves links from the lesson `texFile` and current language:

- `themeX_fr/leconY.tex` -> `themeX_fr/leconY.pdf`
- `themeX_en/lessonY.tex` -> `themeX_en/lessonY.pdf`
