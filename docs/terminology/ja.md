# Glossaire et choix éditoriaux — ja

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | 古典論の予測 | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | 連続した帯 | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | 実験結果 | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | 二つの斑点 | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | 原子線オーブン | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | 遮断 | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Utiliser les indices descriptifs anglais de [en.md](en.md), en caractères latins. Traduire leur explication dans la langue cible et recopier ici les correspondances utilisées.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `リース` ; action : `作用` ; composition : `合成` ; identité fondamentale : `基本恒等式` | `figs-src/ja/theme2/rieszfig.tex`, cohérent avec `theme2_ja/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | 代数的構造；位相空間；滑らかな多様体；リー群とリー代数；有限次元・可分・非可分ヒルベルト空間 | figs-src/ja/theme2/structures.tex, cohérent avec theme2_ja/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 du thème 1 — 2026-09-07

Traduction directe relue depuis `content/tex/theme1_fr/lecon1.tex` finalisée ; source cible `content/tex/theme1_ja/lesson1.tex`. Choix retenus pour cette unité, sans prétendre à une validation humaine native.

| Français / concept | Forme retenue | Statut |
|---|---|---|
| moment magnétique | 磁気モーメント | Retenu dans cette reprise |
| moment cinétique | 角運動量 | Retenu dans cette reprise |
| rapport gyromagnétique | 磁気回転比 | Retenu dans cette reprise |
| précession | 歳差運動 | Retenu dans cette reprise |
| pulsation | 角振動数 | Retenu dans cette reprise |
| dissipation | 散逸 | Retenu dans cette reprise |
| champs de bord | 端部の磁場 | Retenu dans cette reprise |
| préparation | 準備 | Retenu dans cette reprise |
| voie | 経路 | Retenu dans cette reprise |
| filtrage | フィルタリング | Retenu dans cette reprise |
| superposition | 重ね合わせ | Retenu dans cette reprise |
| amplitude de probabilité | 確率振幅 | Retenu dans cette reprise |
| phase | 位相 | Retenu dans cette reprise |
| produit scalaire | 内積 | Retenu dans cette reprise |
| norme | ノルム | Retenu dans cette reprise |
| espace de Hilbert complexe | 複素ヒルベルト空間 | Retenu dans cette reprise |
| mélange statistique | 統計的混合 | Retenu dans cette reprise |
| observables incompatibles | 両立しない観測量 | Retenu dans cette reprise |
| spin | スピン | Retenu dans cette reprise |
| électron non apparié | 不対電子 | Retenu dans cette reprise |

### Indices effectivement employés

| Sens français | Indice FR | Repli anglais retenu | Exemple |
|---|---|---|---|
| énergie potentielle | p | p, potential | $E_p$ |
| précession | p | p, precession | $\omega_p$ |
| spin | s | s, spin | $\mu_s$, $\gamma_s$, $\mu_{s,z}$ |

E_p の p は位置エネルギー（potential）、omega_p の p は歳差運動（precession）、s はスピン（spin）を表す。

Les indices `x`, `y`, `z` (axes), `L` (Larmor), `B` (Bohr), `e` (électron) et les étiquettes de kets restent inchangés. Les indices descriptifs ne changent pas les clés des labels et références.

### Choix éditoriaux et figures

Style académique en forme neutre ; シュテルン＝ゲルラッハ, 内積, ノルム. Ne pas traduire amplitude par intensité. Titre final « 参考文献 ».

原子線オーブン dans les figures, 炉 dans la prose ; 遮断 et 二つの斑点 conservés. 古典論の予測 et 古典的な予測 sont variantes grammaticales compatibles.

Les quatre sources TikZ `figs-src/ja/theme1/lecon1_fig1.tex` à `lecon1_fig4.tex` ont été inspectées : textes visibles traduits, symboles physiques conservés ; aucun changement géométrique. Les quatre rendus SG localisés existants sont utilisés. Les quatre images historiques `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent explicitement en repli `figs/fr/`, sans les déclarer traduites. Pas de nouvelle compilation ni validation visuelle du rendu dans cette reprise.

Continuité vérifiée avec `theme2_ja/lesson1.tex` pour produit scalaire, norme et espace de Hilbert ; thème 2 non modifié. La relecture de toutes les autres unités reste à poursuivre au fil des reprises. Les renvois provisoires « XXX » sont conservés comme dans la source française.

## Interface mobile — 2026-09-10

Partager cette page : « このページを共有 ». Confirmation de copie : « リンクをコピーしました！ ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/ja.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « リンクをコピー » (copier le lien), « メール » (courriel). Noms des plateformes conservés.
