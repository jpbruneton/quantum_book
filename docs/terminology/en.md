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

- 2026-10-05 : métadonnées anglaises du thème 3 réalignées sur les onze entrées
  françaises (titres, descriptions et mots-clés). Cela ne rend disponibles que
  les corps réellement présents : les leçons 1 à 7 en anglais à cette date.

- 2026-09-21 : titres du nouveau plan du thème 3 dans le catalogue uniquement :
  « impulsion » → momentum ; « puits de potentiel » → potential wells ;
  « effet tunnel » → tunneling ; « électrons délocalisés » → delocalized electrons ;
  « moment cinétique » → angular momentum ; « battements » → beats.
  Ces métadonnées ne constituent pas une traduction des cours.

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

## Theme 3, Lessons 1--7 — 2026-10-05

| Français / concept | Anglais retenu | Précision |
|---|---|---|
| opérateur auto-adjoint | self-adjoint operator | Employer `self-adjoint`, non `Hermitian`, lorsque le domaine d'un opérateur non borné intervient |
| sous-espace propre | eigenspace | `eigenstate` pour un état propre normalisé ; `eigenvector` pour le vecteur mathématique |
| réduction du paquet d'onde | wave-function collapse | Trait d'union conservé dans `wave-function` employé comme nom composé |
| règle de Born | Born rule | Capitalisation standard |
| valeur moyenne d'une observable | expectation value of an observable | Éviter `average value` dans les énoncés formels |
| écart-type | standard deviation | À distinguer de la variance (`variance`) |
| rayon ; espace projectif | ray; projective space | Identification des états à une phase globale près |
| groupe unitaire fortement continu | strongly continuous unitary group | Terminologie de Stone |
| état stationnaire | stationary state | État propre d'énergie à phase globale dépendant du temps |
| matrices de Pauli | Pauli matrices | `Pauli operator` lorsque l'accent porte sur l'observable |
| représentation position | position-space representation | Même convention pour `momentum-space representation` |
| fonction d'onde en position | position-space wave function | `wave function` dans la prose ; `wave-function` dans un composé adjectival |
| densité / courant de probabilité | probability density / probability current | Continuité avec l'équation de conservation locale |
| paquet d'ondes gaussien | Gaussian wave packet | `wave packet`, en deux mots |
| puits de potentiel | potential well | `infinite square well`, `finite square well` selon le cas |
| potentiel delta | delta potential | Distribution de Dirac conservée comme `Dirac delta distribution` |
| état lié ; état de diffusion | bound state; scattering state | Distinction spectrale et asymptotique |
| queue évanescente | evanescent tail | Région classiquement interdite |
| effet tunnel | tunnelling | Orthographe britannique à deux `l` |
| coefficient de réflexion / transmission | reflection / transmission coefficient | Probabilités sans dimension |
| oscillateur harmonique | harmonic oscillator | Modèle quadratique classique et quantique |
| opérateurs d'échelle | ladder operators | Terme générique pour les opérateurs de montée et de descente |
| opérateur d'annihilation / de création | annihilation / creation operator | Respectivement $a$ et $a^\dagger$ |
| opérateur nombre | number operator | $N=a^\dagger a$ |
| état fondamental ; état excité | ground state; excited state | `ground-state energy` dans un composé adjectival |
| énergie de point zéro | zero-point energy | Énergie $\hbar\omega/2$ du fondamental |
| fonctions / polynômes de Hermite | Hermite functions / polynomials | Capitalisation du nom propre conservée |
| état cohérent | coherent state | Paquet gaussien oscillant sans se déformer |
| phonon | phonon | Quantum d'un mode de vibration du cristal |

Registre retenu : anglais académique britannique (`normalised`, `localised`,
`tunnelling`) et traduction directe proche de la syntaxe française lorsqu'elle
reste naturelle. Les titres de sections et les légendes sont traduits sans
résumé ni ajout explicatif. Les labels, citations et noms de fichiers
bibliographiques restent inchangés.

Indice descriptif traduit : `M_{\text{prêt}}` devient `M_{\text{ready}}` dans la
leçon 3 pour l'état initial prêt de l'appareil de mesure. La correspondance est
enregistrée dans `math-indices.json`. Dans la leçon 6, les indices de parité sont
également traduits : `\phi_{\rm pair}` / `C_{\rm p}` deviennent
`\phi_{\rm even}` / `C_{\rm e}`, et `\phi_{\rm impair}` / `C_{\rm i}` deviennent
`\phi_{\rm odd}` / `C_{\rm o}`. Les indices `cl`, `inc`, `refl`, `trans` et `ext`
restent inchangés : leurs abréviations conviennent également à `classical`,
`incident`, `reflected`, `transmitted` et `external`. Les indices d'axes, d'états
et de sommation ainsi que les autres symboles conventionnels restent inchangés.

## Theme 2 exercises — 2026-10-05

| Français / concept | Anglais retenu | Précision |
|---|---|---|
| espace pré-hilbertien ; norme sup | pre-Hilbert space; supremum norm | Avec `parallelogram identity` pour le critère associé |
| opérateur de décalage à droite | right-shift operator | `shift operator` admis dans les titres courts |
| représentant de Riesz ; forme linéaire | Riesz representative; linear functional | Convention du produit scalaire antilinéaire dans le premier argument |
| opérateurs de création et d'annihilation ; opérateur nombre | creation and annihilation operators; number operator | Terminologie de l'oscillateur harmonique |
| transconjuguée ; adjoint | conjugate transpose; adjoint | `self-adjoint operator`, mais `Hermitian matrix` dans le contexte matriciel |
| projecteur orthogonal ; projecteur oblique | orthogonal projector; oblique projector | Avec `complementary projector` et `best approximation` |
| procédé de Gram--Schmidt | Gram--Schmidt procedure | Orthographe et double trait d'union LaTeX conservés |
| relation de fermeture | closure relation | Résolution de l'identité dans une base orthonormée |
| réflexion de Householder | Householder reflection | `orthogonal reflection` pour la transformation géométrique |
| rotation du plan ; axe de rotation | plane rotation; rotation axis | Avec `circular polarisation`, orthographe britannique |
| croisement évité ; répulsion des niveaux | avoided crossing; level repulsion | Diagonalisation d'une matrice hermitienne dépendant d'un paramètre |
| bloc de Jordan ; matrice nilpotente | Jordan block; nilpotent matrix | Avec `nondiagonalisable matrix` dans la prose |
| calcul fonctionnel ; polynôme minimal | functional calculus; minimal polynomial | Fonctions polynomiales et exponentielle d'une matrice |
| ensemble complet d'observables qui commutent | complete set of commuting observables | Forme développée conservée ; sigle `CSCO` non ajouté |
| produit scalaire / norme de Hilbert--Schmidt | Hilbert--Schmidt inner product / norm | `Frobenius norm` comme synonyme de la norme matricielle |
| opérateur positif ; valeurs singulières | positive operator; singular values | Avec `positive square root` et `operator norm` |
| base hilbertienne ; identité de Parseval | Hilbert basis; Parseval's identity | Avec `Bessel's inequality` et `Fourier series` |

Registre : anglais académique britannique (`diagonalise`, `normalised`,
`polarisation`). Les 32 exercices conservent toutes les expressions mathématiques
de la source ; aucun indice descriptif n'a dû être traduit et aucune entrée n'est
donc ajoutée à `math-indices.json`.

## Theme 3 exercises — 2026-10-05

| Français / concept | Anglais retenu | Précision |
|---|---|---|
| inversion de la molécule d'ammoniac | ammonia inversion | Modèle à deux niveaux et couplage tunnel |
| battement quantique | quantum beat | Interférence entre deux fréquences de Bohr |
| puits infini | infinite square well | `infinite well` admis dans les titres courts |
| précession de Larmor | Larmor precession | `pi pulse` pour une impulsion qui retourne le spin |
| densité radiale de probabilité | radial probability density | À distinguer de la densité volumique $|\psi|^2$ |
| région classiquement interdite | classically forbidden region | Pénétration de la fonction d'onde |
| représentation en impulsion | momentum-space representation | Cohérent avec `position-space representation` |
| fonction lorentzienne au carré | squared Lorentzian function | Distribution en impulsion de l'exercice 10 |
| étalement du paquet d'ondes | wave-packet spreading | `wave packet` dans la prose, trait d'union dans le composé adjectival |
| respiration d'un paquet | wave-packet breathing | Oscillation périodique de sa largeur |
| modèle de Hückel ; radical allyle | Hückel model; allyl radical | Chimie quantique, orthographe britannique conservée ailleurs |
| énergie de délocalisation | delocalisation energy | Avec `electron population` et `bond order` |
| puits delta | delta well | `matching condition` et `discontinuity condition` aux raccordements |
| polarisabilité | polarisability | Orthographe britannique |
| approximation soudaine | sudden approximation | Avec `wave-function overlap` |

Choix éditoriaux : `spin retourné` devient `spin flipped`; `théorème de
Plancherel` devient `Plancherel's theorem`; `méthode variationnelle` devient
`variational method`; `temps de retour` devient `revival period`. Les libellés
visibles dans les formules sont traduits (`pour` → `for`, `soit` → `that is`,
et les en-têtes du tableau de Hückel). La contrainte de sommation
`n\,\mathrm{impair}` devient `n\,\mathrm{odd}` et sa correspondance est
consignée dans `math-indices.json`. Les étiquettes d'états $G$, $D$, $S$ et
$AS$ restent inchangées, conformément à la règle sur les labels d'état.

## Interface mobile — 2026-09-10

Partager cette page : « Share this page ». Confirmation de copie : « Link copied! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/en.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « Copy link » (copier le lien), « Email » (courriel). Noms des plateformes conservés.

### Renvois du thème 2 — 2026-09-10

Renvoi de section : « see Section ». Cible indisponible : « unavailable in this language ».
Les cinq renvois des leçons 1 et 2 reprennent les labels français ; les deux identités adjointes sont numérotées séparément. Aucun texte de figure ni indice mathématique modifié.

### Blocs de cours — 2026-09-20

Postulat : « Postulate » (`ui.blocks.postulate`). Libellé numéroté de l'environnement `postulat`, traduit directement du français ; relecture humaine native non effectuée.

### Appel à l'action des exercices — 2026-10-05

« Aller aux exercices » devient « Go to exercises » (`ui.exercises.open`).
Libellé explicite du bouton placé au bas des cartes de thèmes disponibles.
