# Langues et disponibilité

Même liste que Thermo : une route ou un titre traduit ne signifie pas que tous les
contenus de cette langue sont publiés.

| Code | Langue |
|---|---|
| fr | Français, source de référence |
| en | Anglais |
| de | Allemand |
| es | Espagnol |
| pt | Portugais |
| it | Italien |
| pl | Polonais |
| ru | Russe |
| zh | Chinois |
| ja | Japonais |
| ko | Coréen |
| hi | Hindi |
| vi | Vietnamien |
| ar | Arabe |
| id | Indonésien |
| tr | Turc |
| bn | Bengali |
| ur | Ourdou |
| sw | Swahili |
| fa | Persan |

`lib/i18n.ts` pilote les codes et les slugs publics des sections. Arabe, ourdou et
persan utilisent `dir="rtl"` ; les formules restent isolées en LTR. Le changement
de langue conserve le thème, la leçon, la fiche ou l'exercice courant. Les thèmes
gardent leurs slugs publics français/anglais ; les autres langues utilisent les
slugs anglais pour préserver les liens existants.

Les catalogues `lib/locales/<code>.json` couvrent l'accueil, la navigation, les
thèmes, le glossaire, les exercices, les messages de disponibilité et les blocs
du cours. `lib/quizTranslations.ts` fournit l'interface des quiz dans les 20 langues.
La banque de questions Quantum reste vide.

Une leçon `themeN_fr/leconM.tex` se traduit dans `themeN_<lang>/lessonM.tex` ; une
fiche conserve `ficheM.tex`. Ne déposer que des traductions complètes. La présence
du fichier détermine la disponibilité au build, sous réserve de `lib/publication.ts`.
La leçon 2 du thème 1 français est actuellement masquée, source conservée.

La livraison multilingue demandée couvre la leçon 1 du thème 1, les deux leçons et
les deux fiches du thème 2. Le détail vérifiable des sources et traductions figure
dans `translation-manifest.json`, généré après le contrôle des 95 traductions.
Les autres leçons conservent leur disponibilité réelle antérieure ; leurs titres
traduits ne constituent pas une traduction du corps.

Les figures TikZ du thème 1 ont un lexique par langue et des rendus localisés.
Lorsqu'une illustration localisée n'existe pas, le site sert la figure française.
Les figures raster historiques du thème 2 restent françaises, à l'exception de la
carte de Riesz de la leçon 2, reconstruite depuis sa source TikZ et localisée dans
les 20 langues.

Les exercices et quiz ont une disponibilité indépendante. Une traduction de cours
n'active aucun marqueur `\seoready{true}`. Les contenus absents sont en noindex et
exclus des alternates de contenu et du sitemap.
