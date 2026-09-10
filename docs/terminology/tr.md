# Glossaire et choix éditoriaux — tr

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | klasik öngörü | Figure SG, lexique thème 1, entrée 1 | Relu avec la leçon 1, 2026-09-07 |
| bande continue | sürekli şerit | Figure SG, lexique thème 1, entrée 2 | Relu avec la leçon 1, 2026-09-07 |
| résultat expérimental | deneysel sonuç | Figure SG, lexique thème 1, entrée 3 | Relu avec la leçon 1, 2026-09-07 |
| deux traces | iki iz | Figure SG, lexique thème 1, entrée 4 | Relu avec la leçon 1, 2026-09-07 |
| four | fırın | Figure SG, lexique thème 1, entrée 5 | Relu avec la leçon 1, 2026-09-07 |
| bloqué | engellenmiş | Figure SG, lexique thème 1, entrée 6 | Relu avec la leçon 1, 2026-09-07 |
| moment magnétique | manyetik moment | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| moment cinétique | açısal momentum | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| rapport gyromagnétique | jiromanyetik oran | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| précession | presesyon | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| pulsation | açısal frekans | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| énergie potentielle | potansiyel enerji | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| état | durum | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| préparation | hazırlama | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| incompatibilité | bağdaşmazlık | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| superposition | süperpozisyon | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| amplitude de probabilité | olasılık genliği | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| phase | faz | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| produit scalaire | iç çarpım | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| norme | norm | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| espace de Hilbert complexe | karmaşık Hilbert uzayı | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| mélange statistique | istatistiksel karışım | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|
| potentiel | `p` | `p` | `E_p` | Thème 1, leçon 1 ; vérifié |
| précession | `p` | `p` | `\omega_p` | Thème 1, leçon 1 ; vérifié |
| spin | `s` | `s` | `\mu_s`, `\gamma_s`, `\mu_{s,z}` | Thème 1, leçon 1 ; vérifié |

`p` reste l’initiale de `potansiyel` et de `presesyon` ; `s` celle de `spin`.

Les indices des axes `x`, `y`, `z`, les noms propres `L` (Larmor), `B` (Bohr), `e` (électron), `0` et les étiquettes des états sont conservés.

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Riesz` ; action : `etki` ; composition : `bileşke` ; identité fondamentale : `Temel özdeşlik` | `figs-src/tr/theme2/rieszfig.tex`, cohérent avec `theme2_tr/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | cebirsel yapılar; topolojik uzay; düzgün manifold; Lie grubu ve Lie cebiri; sonlu boyutlu, ayrılabilir ve ayrılabilir olmayan Hilbert uzayları | figs-src/tr/theme2/structures.tex, cohérent avec theme2_tr/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 — 2026-09-07

Employer `iz` pour les taches, comme le lexique TikZ (`iki iz`), et `kol` pour une voie. Garder `süperpozisyon`, `hazırlama`, `bağdaşmazlık`. `İç çarpım`, `norm` et `Hilbert uzayı` concordent avec le thème 2. Les flexions turques sont appliquées aux mots, sans modifier les labels LaTeX.

Les six termes visibles des quatre TikZ `figs-src/tr/theme1/lecon1_fig{1,2,3,4}.tex` et leur lexique `theme1-translations.json` ont été relus : déjà traduits, sans modification nécessaire. Géométrie et symboles SG/axes inchangés. Les quatre PNG SG localisés existants sont utilisés. `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent des originaux français sous `figs/fr/` : leur contenu visible n’est pas déclaré traduit. Aucun TikZ recompilé ; glyphes, débordements et rendu visuel restent à vérifier lors de la prochaine compilation autorisée.

Contrôle ciblé de structure, formules, références et images passé ; rendu serveur KaTeX, sommaire et section bibliographique vérifiés sans build. Les trois notions produit scalaire/norme/Hilbert ont été comparées au thème 2 existant ; pas de modification du thème 2. Les occurrences `section XXX` de la source sont conservées sous leur traduction, sans inventer de référence.

## Interface mobile — 2026-09-10

Partager cette page : « Bu sayfayı paylaş ». Confirmation de copie : « Bağlantı kopyalandı! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/tr.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « Bağlantıyı kopyala » (copier le lien), « E-posta » (courriel). Noms des plateformes conservés.

### Renvois du thème 2 — 2026-09-10

Renvoi de section : « bkz. bölüm ». Cible indisponible : « bu dilde mevcut değil ».
Les cinq renvois des leçons 1 et 2 reprennent les labels français ; les deux identités adjointes sont numérotées séparément. Aucun texte de figure ni indice mathématique modifié.
