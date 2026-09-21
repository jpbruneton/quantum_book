# Audit Quantum / Thermo — 21 septembre 2026

Audit du code, du build de production et des réponses HTTP publiques. Les sources
de Thermo ont été consultées sans modification. Aucun navigateur pilotable n'était
connecté : ces mesures ne sont ni une trace de rendu, ni une mesure de FPS, INP ou
CLS. Elles ne permettent pas d'attribuer avec certitude les saccades à un facteur.

## Mesures avant cette deuxième passe

Les tailles transférées sont celles des corps HTTP compressés, hors en-têtes.
Les scripts indiqués sont les fichiers présents dans le HTML, sans les polyfills
`nomodule` ignorés par les navigateurs modernes. Ils excluent les scripts chargés
ensuite par Analytics, les préchargements de navigation et les polices demandées
pendant le rendu. Le nombre d'éléments vient du HTML, sans les scripts.

| Page | HTML transféré | HTML décompressé | JS initial transféré | Éléments HTML | Formules |
|---|---:|---:|---:|---:|---:|
| Quantum, thème 1 leçon 1 | 68,6 Kio | 1 015,9 Kio | 116,1 Kio | 8 628 | 237 |
| Quantum, thème 3 leçon 1 | 94,6 Kio | 1 529,0 Kio | 116,1 Kio | 15 000 | 216 |
| Quantum, thème 3 leçon 8 | 102,4 Kio | 1 577,2 Kio | 116,1 Kio | 16 058 | 349 |
| Thermo, premier principe | 100,7 Kio | 1 461,8 Kio | 117,3 Kio | 13 401 | 298 |
| Thermo, second principe | 120,0 Kio | 1 983,0 Kio | 117,3 Kio | 19 189 | 328 |

Le poids réseau et la densité du document sont donc comparables sur cet
échantillon. La différence de fluidité rapportée ne s'explique pas simplement par
un bundle JavaScript beaucoup plus lourd chez Quantum. Le HTML des formules est
présent dans le document et dans les données de navigation React ; cette
duplication existe aussi chez Thermo.

L'accueil et les index français (cours, glossaire, exercices, quiz) ont aussi été
contrôlés : environ 8,6 à 13,9 Kio de HTML transféré et 108,5 à 116,4 Kio de scripts
initiaux. Aucun de ces index ne présente le volume HTML des longues leçons.

Commande reproductible :

```powershell
node scripts/audit-page-payload.mjs https://quantumlectures.org/fr/chapitres/postulats/lecon-8 https://learnthermo.org/fr/chapitres/premier-principe
```

## Architecture et services

| Point | Quantum | Thermo / comparaison |
|---|---|---|
| Pages | Précompilées, layout `dynamic = "error"` | Même architecture statique |
| Mathématiques | KaTeX au build ; pas de calcul dans le navigateur | Même principe |
| Langues des leçons | Interface de la langue active ; corps de la leçon active | Même principe |
| Polices | Locales, `display: swap`, pas de préchargement global | Même principe ; police des titres différente |
| Images | WebP adaptatifs, dimensions explicites, chargement différé | Pas de grosse image observée expliquant à elle seule les saccades de Quantum |
| Analytics | Vercel Analytics et Speed Insights | Scripts identiques : 3 279 et 12 567 octets décompressés |
| Autre télémétrie | Pas de compteur de vues propre au site | Thermo envoie aussi un beacon `/api/views` |
| Navigation | Plusieurs leçons par thème, huit liens visibles pour le thème 3 | Organisation principalement par chapitre |
| Sommaire avant correction | Fixe sur grand écran, avec suivi de la section | Le CSS public de Thermo déclare également `sticky` au-dessus de 980 px ; son comportement effectif dépend de la largeur et des ancêtres |

Les codes et noms des 20 langues dans le sélecteur ne constituent pas le
chargement des 20 catalogues. Les catalogues des cours restent côté serveur.
Une exception existait dans le code client du quiz : l'ensemble de son interface
multilingue y était importé. Cette exception a été corrigée sans retraduction.

## Vercel

Les trois pages Quantum signalées répondent 200 avec Brotli via `cdg1`.
Sur deux passages après mise en cache : réception des en-têtes en 55–103 ms pour
Quantum et 56–107 ms pour le premier principe de Thermo. Le premier passage sur
deux pages Quantum était plus lent (423 et 645 ms, statut `PRERENDER`), puis les
réponses portaient `HIT`. Cet échantillon ne constitue pas une statistique de
performance à long terme, mais ne révèle pas de problème persistant du CDN.

Le statut GitHub du déploiement précédent était `Vercel: success`.
`public, max-age=0, must-revalidate` sur le HTML concerne le cache navigateur :
cela ne signifie pas que Vercel régénère le cours à chaque requête. Le manifeste
de production confirme la précompilation, et les réponses CDN indiquent `HIT`.
Les tableaux de bord privés de Speed Insights et les métriques de facturation
Vercel n'ont pas été consultés.

## Corrections appliquées

- Sommaire dans le flux normal : il disparaît avec le défilement. Sur écran
  étroit, il se place avant le cours. Suppression du suivi de section et de toute
  mesure des titres pendant la lecture.
- Bouton de retour en haut isolé du composant du cours. Ses changements d'état
  ne relancent plus le rendu React du cours. Les boutons flottants regroupent
  les événements par frame et ne changent d'état qu'au franchissement du seuil.
- Préchargement automatique désactivé sur les liens vers les leçons, fiches,
  exercices et filtres du glossaire dans les listes. Les liens restent de vraies
  navigations Next.js ; le coût éventuel se déplace vers le clic sur une page
  encore absente du cache, au lieu d'être payé pendant la lecture.
- Interface du quiz préparée uniquement dans la langue active au serveur.
- Frontière `server-only` explicite pour le moteur KaTeX afin d'empêcher sa
  réintroduction accidentelle dans les scripts du navigateur.
- Le flou de la barre de navigation fixe avait déjà été supprimé lors de la
  première passe.

## Points qui demandent encore une mesure dans le navigateur

Les figures des aimants utilisent des WebP légers (environ 12 à 23 Kio pour les
plus grandes variantes des images SG, couple et aimant). Elles n'embarquent pas
de visualiseur JavaScript. Le tableau des couches est un tableau HTML avec un
conteneur de débordement horizontal, sans bibliothèque interactive. Cela écarte
un gros téléchargement spécifique, pas un coût de peinture local.

Si les saccades persistent, enregistrer une trace Performance sur ordinateur aux
trois endroits signalés, après chargement et après le nouveau déploiement :

1. Distinguer les temps JavaScript, mise en page et peinture ; tester aussi les
   extensions du navigateur et le mode graphique, sans en présumer la cause.
2. Mesurer la texture SVG fixe de fond et la composition des grandes zones
   mathématiques. La texture existe sur les deux sites ; elle n'est donc pas une
   explication démontrée de leur différence.
3. Si la mise en page hors écran domine, expérimenter une segmentation par
   section et `content-visibility`. Vérifier alors les ancres, la recherche dans
   la page, les lecteurs d'écran et les sauts de position avant déploiement.
4. Si le chargement initial domine, évaluer une frontière serveur/client plus
   fine et le poids des données React. Ne pas retirer le MathML accessible ni
   charger les formules à la demande pour gagner artificiellement des points.

Le contrôle HTTP ne remplace pas cette trace. Aucun gain de FPS n'est revendiqué.

## Validation

Build de production, contrôles des pages statiques et ressources, contrats de
contenu et test des boutons de défilement. Un contrat vérifie qu'un seul corps de
leçon traverse la frontière client et que les sources intermédiaires n'y passent
pas. Les libellés numériques du quiz sont vérifiés dans les 20 langues.
La recherche dans les chunks produits ne retrouve ni moteur KaTeX, ni catalogue
allemand du quiz. Les textes des traductions et le contenu scientifique n'ont
pas été modifiés.
