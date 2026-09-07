# Glossaire et choix éditoriaux — id

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | prediksi klasik | Figure SG, lexique thème 1, entrée 1 | Relu avec la leçon 1, 2026-09-07 |
| bande continue | pita kontinu | Figure SG, lexique thème 1, entrée 2 | Relu avec la leçon 1, 2026-09-07 |
| résultat expérimental | hasil eksperimen | Figure SG, lexique thème 1, entrée 3 | Relu avec la leçon 1, 2026-09-07 |
| deux traces | dua bercak | Figure SG, lexique thème 1, entrée 4 | Relu avec la leçon 1, 2026-09-07 |
| four | oven | Figure SG, lexique thème 1, entrée 5 | Relu avec la leçon 1, 2026-09-07 |
| bloqué | dihalangi | Figure SG, lexique thème 1, entrée 6 | Relu avec la leçon 1, 2026-09-07 |
| moment magnétique | momen magnetik | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| moment cinétique | momentum sudut | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| rapport gyromagnétique | rasio giromagnetik | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| précession | presesi | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| pulsation | frekuensi sudut | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| énergie potentielle | energi potensial | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| état | keadaan | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| préparation | persiapan | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| incompatibilité | ketidakcocokan | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| superposition | superposisi | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| amplitude de probabilité | amplitudo probabilitas | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| phase | fase | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| produit scalaire | hasil kali dalam | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| norme | norma | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| espace de Hilbert complexe | ruang Hilbert kompleks | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| mélange statistique | campuran statistik | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|
| potentiel | `p` | `p` | `E_p` | Thème 1, leçon 1 ; vérifié |
| précession | `p` | `p` | `\omega_p` | Thème 1, leçon 1 ; vérifié |
| spin | `s` | `s` | `\mu_s`, `\gamma_s`, `\mu_{s,z}` | Thème 1, leçon 1 ; vérifié |

`p` reste l’initiale de `potensial` et de `presesi` ; `s` celle de `spin`.

Les indices des axes `x`, `y`, `z`, les noms propres `L` (Larmor), `B` (Bohr), `e` (électron), `0` et les étiquettes des états sont conservés.

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Riesz` ; action : `aksi` ; composition : `komposisi` ; identité fondamentale : `Identitas fundamental` | `figs-src/id/theme2/rieszfig.tex`, cohérent avec `theme2_id/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 — 2026-09-07

Préférer `oven` pour le four atomique, comme dans les TikZ, à la variante `tungku`. Employer `berkas` pour le faisceau et `jalur` pour une voie. `Hasil kali dalam`, `norma` et `ruang Hilbert` concordent avec le thème 2. `Ketidakcocokan` est le nom, `tidak kompatibel` l'adjectif appliqué aux observables.

Les six termes visibles des quatre TikZ `figs-src/id/theme1/lecon1_fig{1,2,3,4}.tex` et leur lexique `theme1-translations.json` ont été relus : déjà traduits, sans modification nécessaire. Géométrie et symboles SG/axes inchangés. Les quatre PNG SG localisés existants sont utilisés. `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent des originaux français sous `figs/fr/` : leur contenu visible n’est pas déclaré traduit. Aucun TikZ recompilé ; glyphes, débordements et rendu visuel restent à vérifier lors de la prochaine compilation autorisée.

Contrôle ciblé de structure, formules, références et images passé ; rendu serveur KaTeX, sommaire et section bibliographique vérifiés sans build. Les trois notions produit scalaire/norme/Hilbert ont été comparées au thème 2 existant ; pas de modification du thème 2. Les occurrences `section XXX` de la source sont conservées sous leur traduction, sans inventer de référence.
