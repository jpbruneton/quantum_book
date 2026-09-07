# Mémoire terminologique et éditoriale

Ce dossier conserve les choix de traduction communs à tout l'ouvrage : cours,
fiches, exercices, solutions, figures et interface. Un fichier `<lang>.md` est
prévu pour chacune des 19 langues cibles. Le français sert de référence dans les
tableaux. Ces fichiers sont à lire avant chaque traduction et à enrichir au fil
du travail, sans attendre la fin d'un thème.

## Utilisation

- Chercher le concept dans le glossaire avant de choisir sa traduction.
- Pour un nouveau terme, consigner la forme retenue, son contexte et le fichier
  où elle est employée. Distinguer les sens si un mot français est polysémique.
- Noter les variantes à éviter et les choix éditoriaux utiles : registre,
  capitalisation, abréviations, traduction des titres et conventions de notation.
- Distinguer un usage observé d'un choix relu. Une proposition incertaine porte
  le statut « à confirmer » ; ne pas présenter un inventaire comme une validation.
- En cas de changement, noter la raison et les passages à harmoniser. Ne pas
  remplacer silencieusement un terme seulement dans la leçon en cours.
- En fin de reprise, vérifier la cohérence avec les autres unités déjà traduites
  et consigner les éventuels écarts restant à corriger.

Les premières entrées proviennent du lexique existant des figures du thème 1,
`content/tex/figs-src/theme1-translations.json`. Elles documentent l'usage actuel,
sans prétendre à une nouvelle relecture linguistique. Lorsqu'un choix évolue,
mettre aussi à jour ce lexique et les sources concernées dans le travail autorisé.

## Indices descriptifs

Un indice correspondant à un mot français ou à son abréviation doit être traduit,
y compris s'il figure dans une formule. Identifier son sens avant de le modifier.

| Écriture de la langue cible | Règle |
|---|---|
| Alphabet latin : en, de, es, pt, it, pl, vi, id, tr, sw | Employer une abréviation de la langue cible, consignée dans son glossaire. |
| Autres écritures : ru, zh, ja, ko, hi, ar, bn, ur, fa | Employer l'indice anglais consigné dans `en.md`, en caractères latins ; expliquer son sens dans la langue cible. |

« Latin » désigne ici l'alphabet, et non la famille des langues romanes.
Le repli anglais concerne seulement les indices descriptifs : le texte courant
et les textes des figures restent traduits dans la langue cible.

Par exemple, un indice français `moy` signifiant « moyen » devient `avg` en
anglais et dans les langues utilisant ce repli. Enregistrer pour chaque cas le
mot français développé, l'indice source, l'indice retenu et un exemple LaTeX.
Conserver le même indice dans toutes les occurrences du même concept.

Ne pas traduire les indices de sommation (`i`, `j`, `n`), les axes (`x`, `y`, `z`),
les étiquettes d'états ou les symboles conventionnels (par exemple `B` dans le
magnéton de Bohr). Ne pas renommer les clés de références, labels ou macros.
Le critère est le sens de l'indice, pas sa seule apparence typographique.

## Textes dans les figures TikZ

La relecture doit couvrir chaque texte visible : nœuds, annotations, légendes,
titres d'axes, mots dans les formules et indices descriptifs. Inspecter aussi les
macros et lexiques qui produisent ces textes, ainsi que les TikZ intégrés au TeX.
Employer les mêmes termes que dans le cours et le glossaire de la langue.

Conserver la géométrie et le sens mathématique. Lors de la production des figures
localisées, vérifier le rendu des accents, glyphes, retours à la ligne et écritures
RTL. Une figure encore française utilisée en repli doit être signalée comme telle,
et non déclarée traduite. Respecter toute instruction de ne pas compiler ; dans
ce cas, indiquer que la vérification du rendu reste à faire.
