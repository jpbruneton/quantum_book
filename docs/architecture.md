# Alignement Quantum / Thermo

Comparaison et adaptation du 7 septembre 2026.

| Sujet | Quantum avant | Thermo / adaptation retenue |
|---|---|---|
| Document HTML | Langue issue de `headers()` dans le layout racine : rendu dynamique | Document par `[lang]`, params statiques, `dynamic = "error"` pour d?tecter une r?gression |
| Formules | Le?ons rendues au serveur, exercices recalcul?s au navigateur | KaTeX uniquement au serveur, titres compris |
| Sommaire | Calcul dans le composant client | Titres, ancres et sommaire pr?par?s au serveur |
| Ressources | CSS Google Fonts et KaTeX via imports distants | `next/font` et CSS KaTeX empaquet?s, polices servies localement |
| Charge utile | Exercices FR et EN envoy?s ensemble | Uniquement les exercices de la langue demand?e ; une seule le?on porte le corps rendu |
| Langues | FR / EN | M?me registre de 20 langues que Thermo ; contenu r?el FR et partiellement EN, autres langues r?serv?es |
| Indexation | Alternates FR/EN m?me en cas d'absence ; exercices sans validation | Disponibilit? commune aux m?tadonn?es et sitemap, exercices sous validation ?ditoriale, quiz et coquilles en noindex |
| Exercices | Fichiers isol?s `exercises_library_*` | Banque `exos_<lang>/exo_themeN.tex`, identifiants conserv?s, toutes les entr?es analys?es |
| Figures | `public/figs` et sources dispers?es | Sources priv?es `figs-src/<lang>/`, rendus priv?s `site-assets/figs/<lang>/`, synchronisation prebuild |
| Quiz | Absents | Infrastructure, interface Thermo traduite et pages par th?me + le?on ; aucune question Thermo import?e |

## Diff?rence conserv?e

Thermo utilise principalement une le?on par chapitre. Quantum garde plusieurs le?ons
et fiches par th?me. Les URL restent `/fr/chapitres/<th?me>/lecon-M` ou `fiche-M`.
Les quiz utilisent `/fr/quiz/<th?me>/lesson-M` et conservent aussi les fiches.
Une question a une cl? stable, un `theme` et un `lessonRef` ; aucun num?ro de le?on
global ambigu. Les anciens liens, slugs et redirections de fiches restent pris en charge.

## Exercices et publication

Une banque par th?me contient plusieurs environnements `exo`, avec leurs titres,
mots-cl?s, indications et solutions. `\theme{N}` historique est conserv? mais le
classement vient du nom du fichier. `\lecon{M}` permet un rattachement plus fin.
Les exercices existants n'ont pas ?t? r??crits ni valid?s artificiellement : sans
`\seoready{true}`, la page reste accessible, mais en noindex et hors sitemap.
Le g?n?rateur PDF lit la m?me banque ; la compilation PDF reste une commande s?par?e
n?cessitant une installation LaTeX (FR/EN actuellement).

## Figures

Les anciennes images partag?es r?sident dans `site-assets/figs/fr/`. Le parseur r?sout
les anciens chemins sans locale vers ce dossier ; les anciens fichiers publics restent
accessibles pour les liens d?j? diffus?s. Les figures TikZ du th?me 1 sont rang?es sous
`figs-src/fr/theme1/`, avec leurs PNG dans `site-assets/figs/fr/theme1/`.
Les nouveaux chemins doivent ?tre explicites : `figs/<lang>/...`. Une illustration
avec texte doit ?tre traduite avant de revendiquer une version localis?e.

## V?rification

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://quantumlectures.org'
npm run build
npm run check:static
npm run check:assets
node scripts/check-content-contracts.cjs
# Facultatif, apr?s next start -p 3100 :
node scripts/check-static-pages.mjs http://localhost:3100
```

Le build synchronise les ressources priv?es et produit les pages HTML/RSC.
Les contr?les v?rifient la pr?compilation, la langue/RTL, les ancres, le noindex,
les images et polices locales. Initialiser le sous-module avant toute construction.
Le site trace les banques et sources de le?ons pour la sortie standalone.
