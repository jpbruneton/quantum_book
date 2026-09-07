# Instructions et prompt de traduction

Adapt? du protocole Thermo. Lire aussi `languages.md` et `translation-status.md`.
La source de r?f?rence est fran?aise ; traduire uniquement les unit?s demand?es.

## Chemins

- Le?on : `content/tex/themeN_fr/leconM.tex` ? `themeN_<code>/lessonM.tex`.
- Fiche : `themeN_fr/ficheM.tex` ? `themeN_<code>/ficheM.tex`.
- Exercices : `exos_fr/exo_themeN.tex` ? `exos_<code>/exo_themeN.tex`.
- TikZ : `figs-src/fr/themeN/` ? `figs-src/<code>/themeN/`.
- Images : `site-assets/figs/<code>/themeN/`, r?f?renc?es par `figs/<code>/themeN/...`.
- Quiz : `lib/quizzes.ts`, `quizQuestionTranslations[code][questionId]`.

## Prompt

> You are an expert scientific translator and native speaker of [language], with
> a strong background in quantum mechanics and mathematical physics. Translate
> the supplied French LaTeX into fluent, natural academic [language].
>
> Preserve all equations, signs, variables, assumptions, environments, macros,
> labels, references, citations, exercise identifiers, lesson numbers and document
> structure. Translate prose, captions and natural-language labels. Do not add,
> remove, reorder, summarize or solve content. Shorten sentences only when this
> improves readability without changing meaning. Preserve custom command names.
>
> Keep state labels, basis names, summation indices, operator notation, bras and
> kets, normalization and physical units unchanged. Translate descriptive words
> inside equations consistently across text, figures, exercises and solutions;
> never substitute thermodynamics-specific notation conventions mechanically.
>
> Preserve editorial seoready markers exactly. Use the matching localized figure
> paths only after the corresponding assets exist. Respect the target language's
> punctuation and quotation marks. Output only translated LaTeX, no commentary.

## Contr?le et notes

- V?rifier la correspondance compl?te avec la source : ni paragraphe manquant ni
  ajout. Les donn?es scientifiques, identifiants et ordre des questions restent stables.
- Pour les quiz : m?me nombre de choix et d'explications, m?me r?ponse correcte.
  Une traduction partielle ne doit jamais produire un quiz m?lang?.
- Pour les figures : conserver g?om?trie et ?quations ; compiler les sources ?dit?es,
  inspecter les caract?res manquants, d?bordements et texte RTL. Ne pas renommer une
  image fran?aise comme si elle ?tait traduite.
- Ne pas utiliser la typographie fran?aise syst?matiquement pour CJK/RTL. Le parseur
  poss?de encore des conventions historiques FR/EN : v?rifier visuellement ces langues
  lors de la premi?re traduction r?elle.
- Consigner fichier source, r?vision Git, langue, date, m?thode, relecteur, figures,
  difficult?s et validation dans `translation-status.md`.
- Une traduction n'est pas une validation scientifique ou ?ditoriale automatique.
  N'activer `\seoready{true}` qu'apr?s validation de l'exercice.
