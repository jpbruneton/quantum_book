# Glossaire et choix éditoriaux — ru

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | классическое предсказание | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | непрерывная полоса | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | результат эксперимента | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | два пятна | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | печь | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | перекрыт | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Utiliser les indices descriptifs anglais de [en.md](en.md), en caractères latins. Traduire leur explication dans la langue cible et recopier ici les correspondances utilisées.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Рисс` ; action : `действие` ; composition : `композиция` ; identité fondamentale : `Основное тождество` | `figs-src/ru/theme2/rieszfig.tex`, cohérent avec `theme2_ru/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | алгебраические структуры; топологическое пространство; гладкое многообразие; группа и алгебра Ли; конечномерное, сепарабельное и несепарабельное гильбертовы пространства | figs-src/ru/theme2/structures.tex, cohérent avec theme2_ru/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 du thème 1 — 2026-09-07

Traduction directe relue depuis `content/tex/theme1_fr/lecon1.tex` finalisée ; source cible `content/tex/theme1_ru/lesson1.tex`. Choix retenus pour cette unité, sans prétendre à une validation humaine native.

| Français / concept | Forme retenue | Statut |
|---|---|---|
| moment magnétique | магнитный момент | Retenu dans cette reprise |
| moment cinétique | момент импульса | Retenu dans cette reprise |
| rapport gyromagnétique | гиромагнитное отношение | Retenu dans cette reprise |
| précession | прецессия | Retenu dans cette reprise |
| pulsation | угловая частота | Retenu dans cette reprise |
| dissipation | диссипация | Retenu dans cette reprise |
| champs de bord | краевые поля | Retenu dans cette reprise |
| préparation | приготовление | Retenu dans cette reprise |
| voie | канал | Retenu dans cette reprise |
| filtrage | фильтрация | Retenu dans cette reprise |
| superposition | суперпозиция | Retenu dans cette reprise |
| amplitude de probabilité | амплитуда вероятности | Retenu dans cette reprise |
| phase | фаза | Retenu dans cette reprise |
| produit scalaire | скалярное произведение | Retenu dans cette reprise |
| norme | норма | Retenu dans cette reprise |
| espace de Hilbert complexe | комплексное гильбертово пространство | Retenu dans cette reprise |
| mélange statistique | статистическая смесь | Retenu dans cette reprise |
| observables incompatibles | несовместимые наблюдаемые | Retenu dans cette reprise |
| spin | спин | Retenu dans cette reprise |
| électron non apparié | неспаренный электрон | Retenu dans cette reprise |

### Indices effectivement employés

| Sens français | Indice FR | Repli anglais retenu | Exemple |
|---|---|---|---|
| énergie potentielle | p | p, potential | $E_p$ |
| précession | p | p, precession | $\omega_p$ |
| spin | s | s, spin | $\mu_s$, $\gamma_s$, $\mu_{s,z}$ |

Индекс p в E_p означает потенциальную энергию (potential), а в omega_p — прецессию (precession); s означает спин (spin).

Les indices `x`, `y`, `z` (axes), `L` (Larmor), `B` (Bohr), `e` (électron) et les étiquettes de kets restent inchangés. Les indices descriptifs ne changent pas les clés des labels et références.

### Choix éditoriaux et figures

Prose académique directe, noms Штерн и Герлах ; « приготовление » pour préparation physique, distincte de la connaissance de l’expérimentateur. Titre final « Источники », conforme au catalogue.

печь / перекрыт / два пятна : mêmes formes que les TikZ et le lexique ; accords fléchis dans la prose.

Les quatre sources TikZ `figs-src/ru/theme1/lecon1_fig1.tex` à `lecon1_fig4.tex` ont été inspectées : textes visibles traduits, symboles physiques conservés ; aucun changement géométrique. Les quatre rendus SG localisés existants sont utilisés. Les quatre images historiques `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent explicitement en repli `figs/fr/`, sans les déclarer traduites. Pas de nouvelle compilation ni validation visuelle du rendu dans cette reprise.

Continuité vérifiée avec `theme2_ru/lesson1.tex` pour produit scalaire, norme et espace de Hilbert ; thème 2 non modifié. La relecture de toutes les autres unités reste à poursuivre au fil des reprises. Les renvois provisoires « XXX » sont conservés comme dans la source française.
