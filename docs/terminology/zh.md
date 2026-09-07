# Glossaire et choix éditoriaux — zh

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | 经典预测 | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | 连续条带 | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | 实验结果 | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | 两个斑点 | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | 加热炉 | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | 阻挡 | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Utiliser les indices descriptifs anglais de [en.md](en.md), en caractères latins. Traduire leur explication dans la langue cible et recopier ici les correspondances utilisées.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `里斯` ; action : `作用` ; composition : `复合` ; identité fondamentale : `基本恒等式` | `figs-src/zh/theme2/rieszfig.tex`, cohérent avec `theme2_zh/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | 代数结构；拓扑空间；光滑流形；李群与李代数；有限维、可分与不可分希尔伯特空间 | figs-src/zh/theme2/structures.tex, cohérent avec theme2_zh/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 du thème 1 — 2026-09-07

Traduction directe relue depuis `content/tex/theme1_fr/lecon1.tex` finalisée ; source cible `content/tex/theme1_zh/lesson1.tex`. Choix retenus pour cette unité, sans prétendre à une validation humaine native.

| Français / concept | Forme retenue | Statut |
|---|---|---|
| moment magnétique | 磁矩 | Retenu dans cette reprise |
| moment cinétique | 角动量 | Retenu dans cette reprise |
| rapport gyromagnétique | 旋磁比 | Retenu dans cette reprise |
| précession | 进动 | Retenu dans cette reprise |
| pulsation | 角频率 | Retenu dans cette reprise |
| dissipation | 耗散 | Retenu dans cette reprise |
| champs de bord | 边缘磁场 | Retenu dans cette reprise |
| préparation | 制备 | Retenu dans cette reprise |
| voie | 通道 | Retenu dans cette reprise |
| filtrage | 筛选 | Retenu dans cette reprise |
| superposition | 叠加 | Retenu dans cette reprise |
| amplitude de probabilité | 概率振幅 | Retenu dans cette reprise |
| phase | 相位 | Retenu dans cette reprise |
| produit scalaire | 内积 | Retenu dans cette reprise |
| norme | 范数 | Retenu dans cette reprise |
| espace de Hilbert complexe | 复希尔伯特空间 | Retenu dans cette reprise |
| mélange statistique | 统计混合 | Retenu dans cette reprise |
| observables incompatibles | 不相容可观测量 | Retenu dans cette reprise |
| spin | 自旋 | Retenu dans cette reprise |
| électron non apparié | 未配对电子 | Retenu dans cette reprise |

### Indices effectivement employés

| Sens français | Indice FR | Repli anglais retenu | Exemple |
|---|---|---|---|
| énergie potentielle | p | p, potential | $E_p$ |
| précession | p | p, precession | $\omega_p$ |
| spin | s | s, spin | $\mu_s$, $\gamma_s$, $\mu_{s,z}$ |

E_p 中的 p 表示势能（potential），omega_p 中的 p 表示进动（precession）；s 表示自旋（spin）。

Les indices `x`, `y`, `z` (axes), `L` (Larmor), `B` (Bohr), `e` (électron) et les étiquettes de kets restent inchangés. Les indices descriptifs ne changent pas les clés des labels et références.

### Choix éditoriaux et figures

Chinois simplifié, ponctuation chinoise. 制备 désigne la préparation physique ; 内积 et 范数 assurent la continuité avec thème2. Titre final « 参考资料 », conforme au catalogue.

加热炉 dans les figures ; 炉子 / 炉体 dans la prose sont les formes courtes du même four. 阻挡 et 两个斑点 conservés.

Les quatre sources TikZ `figs-src/zh/theme1/lecon1_fig1.tex` à `lecon1_fig4.tex` ont été inspectées : textes visibles traduits, symboles physiques conservés ; aucun changement géométrique. Les quatre rendus SG localisés existants sont utilisés. Les quatre images historiques `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent explicitement en repli `figs/fr/`, sans les déclarer traduites. Pas de nouvelle compilation ni validation visuelle du rendu dans cette reprise.

Continuité vérifiée avec `theme2_zh/lesson1.tex` pour produit scalaire, norme et espace de Hilbert ; thème 2 non modifié. La relecture de toutes les autres unités reste à poursuivre au fil des reprises. Les renvois provisoires « XXX » sont conservés comme dans la source française.
