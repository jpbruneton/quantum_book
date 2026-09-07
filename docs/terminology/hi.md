# Glossaire et choix éditoriaux — hi

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | शास्त्रीय पूर्वानुमान | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | सतत पट्टी | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | प्रायोगिक परिणाम | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | दो धब्बे | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | भट्ठी | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | अवरुद्ध | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Utiliser les indices descriptifs anglais de [en.md](en.md), en caractères latins. Traduire leur explication dans la langue cible et recopier ici les correspondances utilisées.

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

Traduction directe relue depuis `content/tex/theme1_fr/lecon1.tex` finalisée ; source cible `content/tex/theme1_hi/lesson1.tex`. Choix retenus pour cette unité, sans prétendre à une validation humaine native.

| Français / concept | Forme retenue | Statut |
|---|---|---|
| moment magnétique | चुंबकीय आघूर्ण | Retenu dans cette reprise |
| moment cinétique | कोणीय संवेग | Retenu dans cette reprise |
| rapport gyromagnétique | जाइरोचुंबकीय अनुपात | Retenu dans cette reprise |
| précession | पुरस्सरण | Retenu dans cette reprise |
| pulsation | कोणीय आवृत्ति | Retenu dans cette reprise |
| dissipation | क्षय | Retenu dans cette reprise |
| champs de bord | किनारों के क्षेत्र | Retenu dans cette reprise |
| préparation | तैयारी | Retenu dans cette reprise |
| voie | मार्ग | Retenu dans cette reprise |
| filtrage | छनन | Retenu dans cette reprise |
| superposition | अध्यारोपण | Retenu dans cette reprise |
| amplitude de probabilité | प्रायिकता आयाम | Retenu dans cette reprise |
| phase | कला | Retenu dans cette reprise |
| produit scalaire | आंतरिक गुणनफल | Retenu dans cette reprise |
| norme | नॉर्म | Retenu dans cette reprise |
| espace de Hilbert complexe | सम्मिश्र हिल्बर्ट समष्टि | Retenu dans cette reprise |
| mélange statistique | सांख्यिकीय मिश्रण | Retenu dans cette reprise |
| observables incompatibles | असंगत प्रेक्षणीय राशियाँ | Retenu dans cette reprise |
| spin | स्पिन | Retenu dans cette reprise |
| électron non apparié | अयुग्मित इलेक्ट्रॉन | Retenu dans cette reprise |

### Indices effectivement employés

| Sens français | Indice FR | Repli anglais retenu | Exemple |
|---|---|---|---|
| énergie potentielle | p | p, potential | $E_p$ |
| précession | p | p, precession | $\omega_p$ |
| spin | s | s, spin | $\mu_s$, $\gamma_s$, $\mu_{s,z}$ |

E_p में p स्थितिज ऊर्जा (potential), omega_p में p पुरस्सरण (precession), और s स्पिन (spin) को दर्शाता है।

Les indices `x`, `y`, `z` (axes), `L` (Larmor), `B` (Bohr), `e` (électron) et les étiquettes de kets restent inchangés. Les indices descriptifs ne changent pas les clés des labels et références.

### Choix éditoriaux et figures

Devânâgarî dans la prose, indices descriptifs anglais en latin. आंतरिक गुणनफल, नॉर्म et हिल्बर्ट समष्टि suivent thème2 (éviter अदिश गुणनफल dans cette transition). Titre final « संदर्भ ».

शास्त्रीय पूर्वानुमान, सतत पट्टी, प्रायोगिक परिणाम, दो धब्बे, भट्ठी et अवरुद्ध alignés sur le lexique TikZ.

Les quatre sources TikZ `figs-src/hi/theme1/lecon1_fig1.tex` à `lecon1_fig4.tex` ont été inspectées : textes visibles traduits, symboles physiques conservés ; aucun changement géométrique. Les quatre rendus SG localisés existants sont utilisés. Les quatre images historiques `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent explicitement en repli `figs/fr/`, sans les déclarer traduites. Pas de nouvelle compilation ni validation visuelle du rendu dans cette reprise.

Continuité vérifiée avec `theme2_hi/lesson1.tex` pour produit scalaire, norme et espace de Hilbert ; thème 2 non modifié. La relecture de toutes les autres unités reste à poursuivre au fil des reprises. Les renvois provisoires « XXX » sont conservés comme dans la source française.
