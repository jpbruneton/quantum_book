# Travail sur Quantum

- Lire `docs/architecture.md`, `docs/languages.md` et `docs/translation-prompt.md` avant une ?volution du contenu ou des langues.
- Conserver la hi?rarchie th?me ? le?ons/fiches. Les cl?s doivent inclure le th?me et la r?f?rence de le?on : `lesson-1` et `fiche-1` sont distincts.
- `content/tex` est un sous-module priv?. Pr?server les modifications pr?existantes ; committer les ressources adapt?es dans ce d?p?t puis la r?f?rence du sous-module dans le site. Ne pas pousser sans demande.
- Pr?compiler les pages, les formules et le sommaire ; ne pas importer KaTeX dans un composant client ni lire `headers()` dans les layouts.
- Utiliser `SITE_LANGS`/`SUPPORTED_LANGS`, `localizedPath` et les fonctions de disponibilit?. Ne pas remplacer un contenu manquant par une autre langue.
- Exercices : `content/tex/exos_<lang>/exo_themeN.tex`, identifiants stables entre langues, `\lecon{M}` facultatif pour l'association ? une le?on. Lire les consignes du dossier `exos_fr`.
- Figures : sources dans `content/tex/figs-src/<lang>/`, images dans `content/tex/site-assets/figs/<lang>/`. `prebuild` les copie dans `public/figs`.
- Exercice indexable uniquement apr?s validation explicite `\seoready{true}` ; les quiz restent en noindex. Ne pas ajouter une langue au sitemap sans contenu r?el.
- V?rifier `npm run build`, `npm run check:static`, `npm run check:assets` et `node scripts/check-content-contracts.cjs`. D?finir `NEXT_PUBLIC_SITE_URL=https://quantumlectures.org` pour le build.
