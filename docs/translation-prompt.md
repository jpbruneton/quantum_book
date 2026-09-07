# Instructions et prompt de traduction

Adapté du protocole Thermo. Lire aussi `languages.md` et `translation-status.md`.
La source de référence est le français actuel. Traduire uniquement les unités
demandées, leçon par leçon, avec des groupes de langues lorsqu'ils sont demandés.

## Chemins

- Leçon : `content/tex/themeN_fr/leconM.tex` → `themeN_<code>/lessonM.tex`.
- Fiche : `themeN_fr/ficheM.tex` → `themeN_<code>/ficheM.tex`.
- Exercices : `exos_fr/exo_themeN.tex` → `exos_<code>/exo_themeN.tex`.
- TikZ : `figs-src/fr/themeN/` → `figs-src/<code>/themeN/`.
- Images : `site-assets/figs/<code>/themeN/`.
- Interface : `lib/locales/fr.json` → `lib/locales/<code>.json`.
- Quiz : `lib/quizzes.ts`, `quizQuestionTranslations[code][questionId]`.

Chaque cours non vide se termine par une section de références et un
`\input{ref_N_M}` (ou `ref_N_fiche_M` pour une fiche). Traduire le titre de section
avec le libellé du catalogue de la langue cible ; conserver le nom du fichier
bibliographique partagé, sauf si une bibliographie localisée est explicitement
fournie. Les références s'affichent à la suite du cours, sans onglet séparé.

## Prompt

Lire d'abord [les règles terminologiques](terminology/README.md), puis
`terminology/<lang>.md` et `terminology/en.md` pour les indices anglais de repli.
Enrichir ces fichiers pendant chaque reprise de traduction : ils constituent la
mémoire des choix de vocabulaire pour tout l'ouvrage.

> Translate the supplied current French LaTeX into fluent, natural academic
> [language], using standard terminology in quantum mechanics and mathematical
> physics. Translate directly; do not call an external translation API.
>
> Preserve all equations, signs, variables, assumptions, environments, macros,
> labels, references, citations, exercise identifiers, lesson numbers and document
> structure. Translate prose, captions and natural-language labels. Do not add,
> remove, reorder, summarize or solve content. Preserve custom command names.
>
> Keep state labels, basis names, summation indices, operator notation, bras and
> kets, normalization and physical units unchanged. Translate descriptive words
> inside equations consistently across text, figures, exercises and solutions.
> Never apply thermodynamics-specific notation changes to quantum mechanics.
>
> Descriptive subscripts derived from French words or abbreviations must be
> translated. For languages written in the Latin alphabet, use the target-language
> abbreviation recorded in the glossary. For other scripts, use the English
> subscript recorded in the English glossary, and explain it in the target language.
> This does not apply to mathematical indices, axis names or conventional symbols.
> Translate all reader-visible text in TikZ figures too, including nodes, legends,
> annotations, axis titles and descriptive text inside formulas. Consult and update
> the target-language terminology and editorial choices throughout the work.
>
> Preserve editorial seoready markers exactly. Use localized figure paths only
> when the corresponding assets exist. Respect the target language's punctuation
> and quotation marks. Output complete translated LaTeX, without commentary.

## Contrôles et notes

- Vérifier chaque paragraphe et la correspondance scientifique avec la source.
  Le contrôle structurel ne détecte pas à lui seul un contresens ou une omission.
- Conserver le nombre et l'ordre des environnements, titres, références et figures.
  `scripts/check-translations.mjs` compare aussi les formules en tolérant l'ordre
  grammatical des expressions et la traduction des mots dans `\text{}`.
- Garder exactement les clés, longueurs de tableaux et variables `{time}`, `{year}`,
  `{author}` des catalogues. Exécuter `check-interface-translations.mjs --write-index`
  après leur traduction pour mettre à jour le registre serveur.
- Pour les quiz : mêmes choix, explications et réponse correcte ; aucune publication
  d'une banque partiellement traduite.
- Pour les TikZ : conserver géométrie et formules, compiler chaque source, vérifier
  les glyphes, les débordements et le texte RTL. Le repli vers la figure française
  est autorisé tant que son remplacement localisé n'existe pas.
- Vérifier explicitement les textes visibles de chaque TikZ, y compris ceux définis
  dans des macros ou un lexique de génération. Une légende traduite dans le cours
  ne suffit pas si la figure contient encore du français. Consigner toute figure
  restant en repli français comme non traduite.
- Vérifier les indices descriptifs dans le texte, les équations, les exercices,
  les solutions et les figures selon `terminology/README.md`. Les changements
  autorisés doivent être recensés dans les glossaires ; un contrôle automatique
  d'égalité des formules ne remplace pas cette vérification sémantique.
- Écrire en UTF-8. Éviter les scripts Unicode transmis par un pipe PowerShell dont
  l'encodage remplace silencieusement les caractères par `?`.
- Consigner les empreintes source/cible dans `translation-manifest.json`, la méthode,
  la date et les limites de validation dans `translation-status.md`.
- Une traduction ne constitue pas une validation éditoriale d'exercice. Ne pas
  activer `\seoready{true}` sans validation explicite.
