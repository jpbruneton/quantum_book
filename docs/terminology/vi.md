# Glossaire et choix éditoriaux — vi

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | dự đoán cổ điển | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | dải liên tục | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | kết quả thực nghiệm | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | hai vết | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | lò | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | bị chặn | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 du thème 1 — 2026-09-07

Traduction directe relue depuis `content/tex/theme1_fr/lecon1.tex` finalisée ; source cible `content/tex/theme1_vi/lesson1.tex`. Choix retenus pour cette unité, sans prétendre à une validation humaine native.

| Français / concept | Forme retenue | Statut |
|---|---|---|
| moment magnétique | mômen từ | Retenu dans cette reprise |
| moment cinétique | mômen động lượng | Retenu dans cette reprise |
| rapport gyromagnétique | tỷ số hồi chuyển từ | Retenu dans cette reprise |
| précession | tiến động | Retenu dans cette reprise |
| pulsation | tần số góc | Retenu dans cette reprise |
| dissipation | tiêu tán | Retenu dans cette reprise |
| champs de bord | từ trường ở rìa | Retenu dans cette reprise |
| préparation | sự chuẩn bị | Retenu dans cette reprise |
| voie | nhánh | Retenu dans cette reprise |
| filtrage | phép lọc | Retenu dans cette reprise |
| superposition | chồng chập | Retenu dans cette reprise |
| amplitude de probabilité | biên độ xác suất | Retenu dans cette reprise |
| phase | pha | Retenu dans cette reprise |
| produit scalaire | tích vô hướng | Retenu dans cette reprise |
| norme | chuẩn | Retenu dans cette reprise |
| espace de Hilbert complexe | không gian Hilbert phức | Retenu dans cette reprise |
| mélange statistique | hỗn hợp thống kê | Retenu dans cette reprise |
| observables incompatibles | đại lượng quan sát không tương thích | Retenu dans cette reprise |
| spin | spin | Retenu dans cette reprise |
| électron non apparié | electron không ghép cặp | Retenu dans cette reprise |

### Indices effectivement employés

| Sens français | Indice FR | Indice VI | Exemple |
|---|---|---|---|
| énergie potentielle | p | t, thế năng | $E_t$ |
| précession | p | td, tiến động | $\omega_{td}$ |
| spin | s | s, spin | $\mu_s$, $\gamma_s$, $\mu_{s,z}$ |

Chỉ số t trong E_t chỉ thế năng; td trong omega_{td} chỉ tiến động; s chỉ spin.

Les indices `x`, `y`, `z` (axes), `L` (Larmor), `B` (Bohr), `e` (électron) et les étiquettes de kets restent inchangés. Les indices descriptifs ne changent pas les clés des labels et références.

### Choix éditoriaux et figures

Prose académique avec ta, termes mômen et vectơ conservés. tích vô hướng, chuẩn et không gian Hilbert suivent thème2. Titre final « Tài liệu tham khảo ».

hai vết retenu pour les taches comme dans les TikZ (ancienne variante hai đốm harmonisée ici). lò, bị chặn et dải liên tục conservés.

Les quatre sources TikZ `figs-src/vi/theme1/lecon1_fig1.tex` à `lecon1_fig4.tex` ont été inspectées : textes visibles traduits, symboles physiques conservés ; aucun changement géométrique. Les quatre rendus SG localisés existants sont utilisés. Les quatre images historiques `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent explicitement en repli `figs/fr/`, sans les déclarer traduites. Pas de nouvelle compilation ni validation visuelle du rendu dans cette reprise.

Continuité vérifiée avec `theme2_vi/lesson1.tex` pour produit scalaire, norme et espace de Hilbert ; thème 2 non modifié. La relecture de toutes les autres unités reste à poursuivre au fil des reprises. Les renvois provisoires « XXX » sont conservés comme dans la source française.
