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

## Vérification

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
