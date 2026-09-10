# Glossaire et choix éditoriaux — ko

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | 고전적 예측 | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | 연속 띠 | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | 실험 결과 | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | 두 점 | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | 원자 오븐 | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | 차단 | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Utiliser les indices descriptifs anglais de [en.md](en.md), en caractères latins. Traduire leur explication dans la langue cible et recopier ici les correspondances utilisées.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `리스` ; action : `작용` ; composition : `합성` ; identité fondamentale : `기본 항등식` | `figs-src/ko/theme2/rieszfig.tex`, cohérent avec `theme2_ko/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | 대수적 구조; 위상 공간; 매끄러운 다양체; 리 군과 리 대수; 유한 차원·가분·비가분 힐베르트 공간 | figs-src/ko/theme2/structures.tex, cohérent avec theme2_ko/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 du thème 1 — 2026-09-07

Traduction directe relue depuis `content/tex/theme1_fr/lecon1.tex` finalisée ; source cible `content/tex/theme1_ko/lesson1.tex`. Choix retenus pour cette unité, sans prétendre à une validation humaine native.

| Français / concept | Forme retenue | Statut |
|---|---|---|
| moment magnétique | 자기 모멘트 | Retenu dans cette reprise |
| moment cinétique | 각운동량 | Retenu dans cette reprise |
| rapport gyromagnétique | 자기회전비 | Retenu dans cette reprise |
| précession | 세차 운동 | Retenu dans cette reprise |
| pulsation | 각진동수 | Retenu dans cette reprise |
| dissipation | 소산 | Retenu dans cette reprise |
| champs de bord | 가장자리 자기장 | Retenu dans cette reprise |
| préparation | 준비 | Retenu dans cette reprise |
| voie | 경로 | Retenu dans cette reprise |
| filtrage | 필터링 | Retenu dans cette reprise |
| superposition | 중첩 | Retenu dans cette reprise |
| amplitude de probabilité | 확률 진폭 | Retenu dans cette reprise |
| phase | 위상 | Retenu dans cette reprise |
| produit scalaire | 내적 | Retenu dans cette reprise |
| norme | 노름 | Retenu dans cette reprise |
| espace de Hilbert complexe | 복소 힐베르트 공간 | Retenu dans cette reprise |
| mélange statistique | 통계적 혼합 | Retenu dans cette reprise |
| observables incompatibles | 양립하지 않는 관측가능량 | Retenu dans cette reprise |
| spin | 스핀 | Retenu dans cette reprise |
| électron non apparié | 홀전자 | Retenu dans cette reprise |

### Indices effectivement employés

| Sens français | Indice FR | Repli anglais retenu | Exemple |
|---|---|---|---|
| énergie potentielle | p | p, potential | $E_p$ |
| précession | p | p, precession | $\omega_p$ |
| spin | s | s, spin | $\mu_s$, $\gamma_s$, $\mu_{s,z}$ |

E_p의 p는 퍼텐셜 에너지(potential), omega_p의 p는 세차 운동(precession), s는 스핀(spin)을 뜻한다.

Les indices `x`, `y`, `z` (axes), `L` (Larmor), `B` (Bohr), `e` (électron) et les étiquettes de kets restent inchangés. Les indices descriptifs ne changent pas les clés des labels et références.

### Choix éditoriaux et figures

Style académique déclaratif en 다 ; 슈테른–게를라흐. 내적 et 노름 suivent thème2. Titre final « 참고문헌 ».

Le TikZ abrège deux taches en 두 점, la prose précise 두 점무늬 ; 원자 오븐 et 가열로 désignent le même four. 차단 conservé.

Les quatre sources TikZ `figs-src/ko/theme1/lecon1_fig1.tex` à `lecon1_fig4.tex` ont été inspectées : textes visibles traduits, symboles physiques conservés ; aucun changement géométrique. Les quatre rendus SG localisés existants sont utilisés. Les quatre images historiques `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent explicitement en repli `figs/fr/`, sans les déclarer traduites. Pas de nouvelle compilation ni validation visuelle du rendu dans cette reprise.

Continuité vérifiée avec `theme2_ko/lesson1.tex` pour produit scalaire, norme et espace de Hilbert ; thème 2 non modifié. La relecture de toutes les autres unités reste à poursuivre au fil des reprises. Les renvois provisoires « XXX » sont conservés comme dans la source française.

## Interface mobile — 2026-09-10

Partager cette page : « 이 페이지 공유 ». Confirmation de copie : « 링크가 복사되었습니다! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/ko.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « 링크 복사 » (copier le lien), « 이메일 » (courriel). Noms des plateformes conservés.
