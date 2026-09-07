# Langues et ?tat r?el

M?me liste que Thermo. Une route disponible ne signifie pas que son contenu est traduit.

| Code | Langue | ?tat du contenu Quantum |
|---|---|---|
| fr | Fran?ais | Source de r?f?rence |
| en | Anglais | Partiel : fichiers existants seulement |
| de | Allemand | Pr?vu, contenu ? traduire |
| es | Espagnol | Pr?vu, contenu ? traduire |
| pt | Portugais | Pr?vu, contenu ? traduire |
| it | Italien | Pr?vu, contenu ? traduire |
| pl | Polonais | Pr?vu, contenu ? traduire |
| ru | Russe | Pr?vu, contenu ? traduire |
| zh | Chinois | Pr?vu, contenu ? traduire |
| ja | Japonais | Pr?vu, contenu ? traduire |
| ko | Cor?en | Pr?vu, contenu ? traduire |
| hi | Hindi | Pr?vu, contenu ? traduire |
| vi | Vietnamien | Pr?vu, contenu ? traduire |
| ar | Arabe | Pr?vu, contenu ? traduire |
| id | Indon?sien | Pr?vu, contenu ? traduire |
| tr | Turc | Pr?vu, contenu ? traduire |
| bn | Bengali | Pr?vu, contenu ? traduire |
| ur | Ourdou | Pr?vu, contenu ? traduire |
| sw | Swahili | Pr?vu, contenu ? traduire |
| fa | Farsi | Pr?vu, contenu ? traduire |

`lib/i18n.ts` pilote les 20 codes et les slugs publics. Arabe, ourdou et farsi ont
`dir="rtl"` ; les formules restent isol?es en LTR. La s?lection de langue conserve
le th?me, la le?on ou l'exercice courant. Les slugs de sections sont ceux de Thermo.
Les slugs de th?mes Quantum restent FR/EN, avec le slug anglais pour les autres langues.

La navigation principale reprend les libell?s de Thermo dans les 20 langues.
Le reste du chrome non traduit utilise les libell?s anglais. L'interface des quiz
vient de Thermo pour les 20 langues ; aucune question scientifique n'a ?t? copi?e.
Les titres de navigation Quantum restent FR/EN en attendant leur traduction.
Accueil ?ditorial, ? propos et glossaire des langues futures affichent un ?tat
explicite ; le corps des le?ons et des exercices ne se replie jamais sur FR/EN.

Une le?on `themeN_fr/leconM.tex` se traduit dans `themeN_<lang>/lessonM.tex` ;
une fiche garde `ficheM.tex`. La disponibilit? est d?tect?e au build. D?poser
uniquement des fichiers r?ellement traduits, jamais une copie fran?aise servant
? remplir une langue. Le m?me principe vaut pour `exos_<lang>/exo_themeN.tex`.

Les quiz sont disponibles seulement si toutes les questions et tous leurs choix
et explications sont traduits, avec m?mes identifiants et structure. La banque
Quantum est actuellement vide : hubs et pages sont en pr?paration et noindex.

Apr?s chaque traduction, mettre ? jour `translation-status.md`, reconstruire et
v?rifier les m?tadonn?es et ressources. Les langues sans contenu n'apparaissent pas
dans les alternates de contenu ni le sitemap.
