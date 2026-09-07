# Travail sur Quantum

- Lire `docs/architecture.md`, `docs/languages.md` et `docs/translation-prompt.md` avant une évolution du contenu ou des langues.
- Conserver la hiérarchie thème → leçons/fiches. Les clés incluent le thème et la référence : `lesson-1` et `fiche-1` sont distincts.
- `content/tex` est un sous-module privé. Préserver les modifications préexistantes ; committer les ressources dans ce dépôt, puis la référence du sous-module dans le site. Ne pousser que sur demande.
- Précompiler les pages, les formules et le sommaire ; ne pas importer KaTeX dans un composant client ni lire `headers()` dans les layouts.
- Les catalogues `lib/locales/*.json` sont chargés au serveur. Envoyer seulement l'interface et les métadonnées de la langue demandée au navigateur.
- Utiliser `SITE_LANGS`/`SUPPORTED_LANGS`, `localizedPath` et les fonctions de disponibilité. Ne pas remplacer une leçon ou un exercice manquant par une autre langue.
- La leçon 2 du thème 1 en français est temporairement masquée par `lib/publication.ts`. Conserver sa source, ne pas la republier sans demande.
- Exercices : `content/tex/exos_<lang>/exo_themeN.tex`, identifiants stables entre langues, `\lecon{M}` facultatif. Lire les consignes de `exos_fr`.
- Figures : sources dans `content/tex/figs-src/<lang>/`, images dans `content/tex/site-assets/figs/<lang>/`. `prebuild` les copie dans `public/figs`. Une figure localisée manquante peut utiliser l'original français ; ne pas présenter une copie française comme une traduction.
- Exercice indexable uniquement après validation explicite `\seoready{true}` ; les quiz restent en noindex. Ne pas ajouter une langue aux alternates de contenu sans traduction réelle.
- Vérifier les traductions avec `node scripts/check-translations.mjs --write-manifest` et `node scripts/check-interface-translations.mjs --write-index`.
- Vérifier `npm run build`, `npm run check:static`, `npm run check:assets` et `node scripts/check-content-contracts.cjs`. Définir `NEXT_PUBLIC_SITE_URL=https://quantumlectures.org` pour le build.
