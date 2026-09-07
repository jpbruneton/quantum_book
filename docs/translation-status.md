# Notes et suivi des traductions Quantum

## Reprise de la leçon 1 finalisée — 7 septembre 2026

Les 19 traductions de la leçon 1 du thème 1 ont été réalignées sur la source
française finalisée, qui est restée inchangée. Les passages avant la section 4
ont été vérifiés et ajustés ; la suite a été reprise intégralement, notamment
les séquences d'analyseurs, les probabilités, la superposition et la transition
vers les espaces de Hilbert. Les glossaires par langue consignent ces choix.

Les textes des quatre figures TikZ SG localisées ont été vérifiés. Les quatre
images historiques restent des replis français explicites. Les indices
descriptifs suivent les consignes linguistiques ; les correspondances
vietnamiennes sont documentées dans `terminology/math-indices.json` et prises
en compte par le contrôle des formules, sans assouplir les autres comparaisons.

Les 95 traductions suivies passent le contrôle de structure, formules, références
et figures ; le manifeste a été régénéré. Le rendu HTML et KaTeX de cette leçon,
le sommaire, la section de références et les huit chemins d'images ont été
contrôlés dans les 20 langues. Les contrôles d'interface et de contrats de contenu
passent également. Aucun build ni nouvelle compilation TikZ n'a été lancé ;
aucune validation visuelle dans un navigateur ou relecture humaine native
n'est revendiquée pour cette reprise.

## Références en fin de cours — 7 septembre 2026

Les 135 sources non vides ont reçu un titre de section localisé et un input vers
leur bibliographie. Les corps des cours et les sources vides ont été préservés.
Les titres proviennent des catalogues existants ; cela ne constitue pas une
actualisation des traductions du corps des leçons. Les tests contrôlent le
sommaire et la présence des références dans le HTML initial pour les 20 langues.
Les 19 catalogues d'interface passent leur contrôle. À cette étape, le contrôle
global échouait dès la leçon 1 anglaise du thème 1, encore en retard sur les
révisions françaises ; le manifeste n'avait donc pas été régénéré. Ce décalage
est résolu par la reprise décrite ci-dessus. Aucun build ni contrôle visuel du
rendu navigateur n'a été lancé.

## Campagne initiale

Campagne du 7 septembre 2026. Traduction directe par les agents, sans API de
traduction externe, depuis les sources françaises actuelles. Trois groupes :
EN/DE/ES/PT/IT/PL, RU/ZH/JA/KO/HI/VI et AR/ID/TR/BN/UR/SW/FA.
Chaque groupe avance dans l'ordre : thème 1 leçon 1, thème 2 leçons 1 et 2, fiches 1 et 2.
L'agent principal a également traduit le thème 2 en bengali et terminé la seconde
leçon et les fiches en swahili, ainsi que la fiche 2 en vietnamien ; le groupe européen a repris les derniers fichiers
ourdous et les fiches persanes pour équilibrer le travail.

Le manifeste `translation-manifest.json` enregistre les empreintes SHA-256 de chaque
source française et de chaque traduction. Il est produit seulement lorsque les
fins de ligne sont normalisées en LF pour obtenir les mêmes empreintes sous
Windows et Linux, et lorsque les
95 fichiers passent le contrôle de structure, de références, de figures et de formules.
Les commits du sous-module et du site donnent les révisions de livraison.

| Périmètre | Langues | Traitement et limites |
|---|---|---|
| Thème 1, leçon 1 actuelle | 19 langues cibles | Traduction intégrale depuis la source française actuelle |
| Thème 2, leçons 1 et 2 | 19 langues cibles | Traduction intégrale, notations mathématiques conservées |
| Thème 2, fiches 1 et 2 | 19 langues cibles | Traduction intégrale, fiches distinctes des leçons |
| Interface, thèmes et métadonnées | 20 langues avec FR | Catalogues de même structure, un seul envoyé au navigateur |
| TikZ thème 1 | 19 langues cibles | 95 sources compilées ; lexique localisé, polices adaptées, inspection visuelle |
| Figures raster thème 2 | Toutes | Repli français autorisé en attendant les versions localisées |
| Thème 1, leçon 2 française | fr | Temporairement masquée, source conservée |
| Autres cours | Selon les fichiers existants | Disponibilité antérieure conservée ; pas de traduction du corps implicite |
| Exercices | fr/en existants | Banques conservées, aucune nouvelle validation SEO |
| Quiz | Toutes | Banque vide, pages en préparation et noindex |

Les contrôles techniques et l'inspection des figures sont effectués par les agents.
Aucune relecture humaine native ou validation scientifique indépendante n'est
revendiquée. Les mots descriptifs dans les formules peuvent être traduits ; les
symboles, labels et références doivent rester identiques.

Le rapport `content/tex/figs-src/theme1-build-report.json` consigne les compilations
TikZ et leurs erreurs éventuelles. Les écritures RTL utilisent XeLaTeX avec une
police arabe adaptée ; les autres écritures sont rendues avec LuaLaTeX et leurs
polices Unicode. Les figures sans source TikZ restent dans leur langue d'origine.

Le build peut émettre des avertissements KaTeX de métriques pour des caractères
Unicode dans les mots traduits à l'intérieur des formules. Le contrôle du HTML
vérifie l'absence de blocs `katex-error`. Le navigateur intégré n'était pas
disponible lors de cette campagne ; les routes ont été vérifiées par HTTP et
par inspection du HTML statique, et les PNG TikZ ont été inspectés visuellement.

Après toute modification d'une source française, relancer les contrôles et mettre
à jour les traductions concernées avant de régénérer le manifeste. Ne pas utiliser
une ancienne traduction anglaise comme source autoritaire.
