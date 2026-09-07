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

## Prompt

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
- Écrire en UTF-8. Éviter les scripts Unicode transmis par un pipe PowerShell dont
  l'encodage remplace silencieusement les caractères par `?`.
- Consigner les empreintes source/cible dans `translation-manifest.json`, la méthode,
  la date et les limites de validation dans `translation-status.md`.
- Une traduction ne constitue pas une validation éditoriale d'exercice. Ne pas
  activer `\seoready{true}` sans validation explicite.
