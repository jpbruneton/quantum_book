# Architecture Quantum / Thermo

Alignement du 7 septembre 2026, puis publication multilingue du contenu Quantum.

| Sujet | Architecture retenue |
|---|---|
| HTML | Document par `[lang]`, paramètres statiques, `dynamic = "error"` pour détecter une régression vers le rendu dynamique |
| Formules | KaTeX au serveur, titres et exercices compris ; HTML mathématique disponible sans JavaScript |
| Sommaire | Titres, ancres et références préparés au serveur |
| Ressources | Polices `next/font` et CSS KaTeX empaquetés et servis localement |
| Charge utile | Corps de la leçon active, exercices de la langue demandée et un seul catalogue d'interface |
| Langues | Même registre de 20 langues que Thermo ; catalogues JSON chargés uniquement au serveur |
| Indexation | Disponibilité commune aux métadonnées et au sitemap ; exercices sous validation éditoriale, quiz et contenus manquants en noindex |
| Exercices | Une banque `exos_<lang>/exo_themeN.tex`, identifiants stables, rattachement facultatif à une leçon |
| Figures | Sources privées `figs-src/<lang>/`, rendus privés `site-assets/figs/<lang>/`, copie vers `public/figs` au prebuild |
| Quiz | Infrastructure et interface multilingue, clés par thème et leçon ; aucune question Thermo importée |

## Plusieurs leçons par thème

Quantum conserve plusieurs leçons et fiches par thème. Les URL françaises utilisent
`/fr/chapitres/<thème>/lecon-M` et `fiche-M`. Une clé associe le thème à `lesson-M`
ou `fiche-M` ; les deux sortes d'unités ne partagent pas une numérotation ambiguë.
Les anciens liens et redirections des fiches restent pris en charge.

Les références figurent en fin de cours, sans onglet séparé. Chaque source non
vide termine par une `\section{Références}` (titre traduit dans sa langue) et un
`\input{ref_N_M}`. Les fiches utilisent `\input{ref_N_fiche_M}` pour préserver leur
identité distincte. Les fichiers bibliographiques sont à la racine de `content/tex`.
Le serveur lit le fichier désigné par cet input ; le titre appartient au sommaire
préparé au serveur et la liste est visible dès le HTML initial. Un fichier de
références vide affiche le message localisé prévu. Les sources vides restent vides.

La leçon 2 du thème 1 en français est temporairement retirée par `lib/publication.ts` :
aucune page de cours générée, aucun lien de navigation ni entrée de sitemap.
Son URL renvoie 404. La source privée est conservée. Cette règle ne retire pas
automatiquement une version existante dans une autre langue.

## Interface et disponibilité

`lib/locales/fr.json` définit le schéma de référence. Chaque catalogue contient
l'interface (`ui`) et les titres, descriptions et mots-clés des thèmes et leçons
(`themes`). `lib/localizedChapters.server.ts` prépare les métadonnées localisées.
Le contexte client reçoit seulement la langue active ; les autres catalogues
ne sont pas importés dans le navigateur ni dans le middleware.

La disponibilité d'une leçon dépend de sa source TeX et de la règle de publication.
Un corps absent n'est jamais remplacé par le français ou l'anglais. Les catalogues
peuvent décrire les futurs thèmes sans prétendre que leurs leçons sont publiées.

## Exercices et quiz

Une banque par thème contient plusieurs environnements `exo`, titres, mots-clés,
indications et solutions. Le classement vient du nom du fichier ; `\theme{N}`
historique est conservé et `\lecon{M}` permet une association plus fine.
Sans `\seoready{true}`, un exercice reste accessible mais en noindex et hors sitemap.
La traduction des cours ne valide pas les banques d'exercices. Le générateur PDF
lit ces mêmes banques ; sa compilation est séparée et actuellement limitée à FR/EN.
Les quiz restent en préparation et en noindex tant que la banque est vide.

## Figures

Les onze leçons françaises du thème 3 sont enregistrées dans le site.
Les leçons 1 à 8 sont publiées ; les suivantes restent dans le dépôt privé et sont
exclues des pages, de la navigation et du sitemap par `lib/publication.ts`.
Les leçons françaises du thème 3, sauf la première, portent l'encart « Leçon en cours de réécriture ».
Leurs fragments TikZ restent dans `content/tex/figs-src/fr/theme3/`, avec `parametres.tex`.
`node scripts/build-theme3-figures.cjs` compile les 33 figures utilisées vers
`content/tex/site-assets/figs/fr/theme3/` (MiKTeX/TeX et `pdftoppm` nécessaires).
Le convertisseur associe ces inputs aux PNG ; le prebuild prépare les variantes
responsives. La compilation des figures est séparée du build du site.
Les métadonnées du nouveau plan sont renseignées en français et en anglais ; les
autres catalogues réutilisent le libellé localisé de traduction en préparation.
Cela ne rend disponible aucune traduction du corps des leçons du thème 3.

Le résolveur utilise l'image de la langue demandée si elle existe, sinon l'original
français, conformément à la consigne de publication. Ce repli concerne uniquement
les figures. Les images françaises ne sont pas dupliquées sous un autre code langue
pour simuler une traduction.

`scripts/build-theme1-figures.mjs` génère les sources TikZ localisées à partir des
sources françaises et du lexique `figs-src/theme1-translations.json`. Il compile
avec LuaLaTeX ou XeLaTeX selon l'écriture, vérifie les glyphes et débordements, puis
produit les PNG. Les quatre figures de la première leçon disposent aussi d'alias
compatibles avec les anciens noms cités dans le cours. La figure symbolique de la
seconde leçon est préparée sans republier sa page française.

`scripts/build-riesz-figure.mjs` applique le même principe à la carte de Riesz du
thème 2. Les 20 versions utilisent les libellés de leur leçon, avec formules
explicitement isolées en LTR pour les trois langues RTL, puis sont servies depuis
`figs/<lang>/theme2/rieszfig.png`.

`scripts/build-structures-figure.mjs` reconstruit et localise dans les 20 langues
la carte des structures du thème 2, leçon 1. Les sources utilisent le catalogue
`figs-src/theme2-structures-translations.json`; les rendus sont servis depuis
`figs/<lang>/theme2/structures.png`.

## Vérification

### Environnements des leçons

La convention est `\begin{theorem}[Titre]{label}` (nom `theorem`, pas
`theoreme`). Le titre et le label sont facultatifs ; la forme
`\begin{theorem}[Titre]\label{label}` est également acceptée. Les labels
techniques restent invisibles et servent aux renvois et aux ancres du site.
La forme `{label}` est une extension de notre préambule et du convertisseur,
pas un argument des environnements `amsthm`/`newmdtheoremenv` standards. La leçon 1
du thème 3 emploie donc `\label{label}` pour rester portable vers le préambule
du livre. L'environnement `exemple` accepte aussi un label facultatif sans
consommer le début de son texte lorsqu'il est absent.
Le préambule français fournit les environnements manquants `theorem`,
`definition`, `remark` et `postulat`, sans remplacer ceux d'un document maître.
Il charge `amsthm` et `mdframed` et définit le style de cadre `cours`.
Les réglages de ce cadre et les commandes usuelles des ensembles, de Dirac,
de norme, de trace et d'équations proviennent du préambule autonome fourni.
Les conventions existantes `\Dom` (D calligraphique), `\grad` (nabla vectoriel)
et `\transpose` (exposant top) sont conservées. Le préambule du livre utilise
respectivement D droit, grad et T : ces variantes ne sont pas imposées aux cours
déjà publiés. La classe, la pagination, les compteurs du livre et son input TikZ
restent propres au document maître ; `header_fr.tex` demeure un fragment.

Le convertisseur serveur conserve le titre `frametitle` des cadres `mdframed`
et numérote séparément les blocs `postulat`. Le libellé vient du catalogue de
la langue active. Les variantes `\ref*` sont résolues comme `\ref` ; les
liens `\hyperref` ne ciblent que des contenus disponibles. Un renvoi explicite
vers un chapitre absent conserve son texte sans créer de lien cassé.
Les notes contenant des équations sont protégées avant la découpe en paragraphes.

### Commandes de contrôle

```powershell
node scripts/check-translations.mjs --write-manifest
node scripts/check-interface-translations.mjs --write-index
$env:NEXT_PUBLIC_SITE_URL = 'https://quantumlectures.org'
npm run build
npm run check:static
npm run check:assets
node scripts/check-content-contracts.cjs
# Avec un serveur local démarré sur le port 3100 :
node scripts/check-static-pages.mjs http://localhost:3100
```

Initialiser le sous-module avant le build. Les contrôles portent sur la structure
des traductions, les formules, la précompilation, les langues/RTL, les ancres,
l'indexation, les figures et les polices locales. Ils ne remplacent pas une
relecture scientifique humaine.

Les bibliographies partagées regroupent toutes les références sans distinction de
langue, avec une numérotation continue identique aux appels `\cite`.
