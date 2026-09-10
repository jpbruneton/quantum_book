# Glossaire et choix éditoriaux — en

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | classical prediction | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | continuous band | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | experimental result | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | two spots | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | oven | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | blocked | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|
| moyen | `moy` | `avg` | `A_{\mathrm{avg}}` | Convention de repli ; exemple, sans occurrence recensée |

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Riesz` ; action : `action` ; composition : `composition` ; identité fondamentale : `Fundamental identity` | `figs-src/en/theme2/rieszfig.tex`, cohérent avec `theme2_en/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | algebraic structures; topological space; smooth manifold; Lie group and Lie algebra; finite-dimensional, separable and non-separable Hilbert spaces | figs-src/en/theme2/structures.tex, cohérent avec theme2_en/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|
| 2026-09-07 | Reprise complète depuis le français final ; terminologie rapprochée du thème 2 | Thème 1, leçon 1 ; comparaison thème 2, leçon 1 | Relecture humaine native non effectuée |

## Choix relus dans la leçon 1 du thème 1

| Français / concept | Anglais retenu | Précision |
|---|---|---|
| moment magnétique | magnetic moment | À distinguer de angular momentum |
| moment cinétique | angular momentum | orbital angular momentum ; intrinsic angular momentum |
| couple de forces | torque | Éviter le calque couple of forces pour la grandeur vectorielle |
| rapport gyromagnétique | gyromagnetic ratio | Relation entre moment magnétique et moment cinétique |
| pulsation | angular frequency | Larmor angular frequency ; pas frequency seule |
| champ inhomogène | inhomogeneous field | Champ spatialement variable |
| champs de bord | fringe fields | Même sens que edge effects dans le rappel initial |
| faisceau ; voie | beam ; channel | Préparation et filtrage SG |
| préparation ; filtrage | preparation ; filtering | Simple tri : simple sorting |
| quantifié ; hasard | quantized ; randomness | Fundamental randomness distinct de l'ignorance thermique |
| observables incompatibles | incompatible observables | Aucune construction matricielle ajoutée |
| superposition ; mélange statistique | superposition ; statistical mixture | Deux notions distinctes |
| amplitude de probabilité ; module ; phase | probability amplitude ; modulus ; phase | Squared modulus, pas amplitude squared sans module |
| produit scalaire ; norme | inner product ; norm | Termes identiques au thème 2, leçon 1 |
| espace vectoriel complexe abstrait | abstract complex vector space | État distinct du vecteur spatial du dipôle |
| espace de Hilbert complexe | complex Hilbert space | Continuité avec thème 2 |
| électron non apparié | unpaired electron | Spin conservé comme terme technique |

Indices relus : `E_p` reste `E_p` (potential energy), `omega_p` reste `omega_p`
(precession), `mu_s` et `gamma_s` gardent `s` (spin, symbole conventionnel).
Ces indices anglais sont les replis pour les autres écritures. `L` (Larmor),
`B` (Bohr), `e` (electron), `x,y,z`, les indices numériques et les étiquettes
d'états sont conservés. Aucun indice abrégé propre au français ne subsiste.

Registre : anglais académique britannique (analyser, centre, behaviour), avec
les termes mathématiques usuels du thème 2. Titre bibliographique : References.
Les six expressions visibles dans les quatre TikZ SG sont déjà traduites et
cohérentes avec le cours ; sources inspectées, aucune recompilation.
Les quatre images historiques `magnetsmall.png`, `magnetorque.jpg`,
`precessionmag.png`, `SGimage.jpg` restent explicitement en `figs/fr/` : ce sont
des replis non traduits, distincts des quatre schémas SG localisés.

## Interface mobile — 2026-09-10

Partager cette page : « Share this page ». Confirmation de copie : « Link copied! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/en.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « Copy link » (copier le lien), « Email » (courriel). Noms des plateformes conservés.

### Renvois du thème 2 — 2026-09-10

Renvoi de section : « see Section ». Cible indisponible : « unavailable in this language ».
Les cinq renvois des leçons 1 et 2 reprennent les labels français ; les deux identités adjointes sont numérotées séparément. Aucun texte de figure ni indice mathématique modifié.
