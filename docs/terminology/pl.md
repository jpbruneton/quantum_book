# Glossaire et choix éditoriaux — pl

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | przewidywanie klasyczne | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | ciągłe pasmo | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | wynik doświadczalny | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | dwa ślady | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | piec | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | zablokowana | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |
| moment magnétique | moment magnetyczny | Thème 1, leçon 1 | Retenu lors de la reprise |
| moment cinétique | moment pędu | À distinguer du moment des forces | Retenu lors de la reprise |
| couple de forces | moment sił | Thème 1, leçon 1 | Retenu lors de la reprise |
| précession | precesja | Mouvement du dipôle | Retenu lors de la reprise |
| pulsation | częstość kołowa | Fréquence angulaire | Retenu lors de la reprise |
| rapport gyromagnétique | stosunek żyromagnetyczny | Thème 1, leçon 1 | Retenu lors de la reprise |
| faisceau | wiązka | Faisceau atomique | Retenu lors de la reprise |
| voie | gałąź | Branche d'un dispositif SG | Retenu lors de la reprise |
| tache | plamka | Impact collectif sur l'écran ; ślad pour trace | Retenu lors de la reprise |
| préparation | przygotowanie | Préparation de l'état | Retenu lors de la reprise |
| hasard | losowość | Hasard et imprévisibilité | Retenu lors de la reprise |
| probabilité | prawdopodobieństwo | Thème 1, leçon 1 | Retenu lors de la reprise |
| superposition | superpozycja | Combinaison d'amplitudes | Retenu lors de la reprise |
| mélange statistique | mieszanina statystyczna | À distinguer de la superposition | Retenu lors de la reprise |
| amplitude | amplituda | Amplitude de probabilité | Retenu lors de la reprise |
| phase | faza | Phase d'une amplitude complexe | Retenu lors de la reprise |
| produit scalaire | iloczyn skalarny | Cohérent avec thème 2 | Retenu lors de la reprise |
| norme | norma | Cohérent avec thème 2 | Retenu lors de la reprise |
| espace vectoriel complexe | zespolona przestrzeń wektorowa | Cohérent avec thème 2 | Retenu lors de la reprise |
| espace de Hilbert | przestrzeń Hilberta | Transition vers thème 2 | Retenu lors de la reprise |
| spin | spin | Moment cinétique intrinsèque | Retenu lors de la reprise |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|
| énergie potentielle | `p` | `p` (potencjalna) | `E_p` | Leçon 1 ; conservé après traduction |
| précession | `p` | `p` (precesja) | `\omega_p` | Leçon 1 ; conservé après traduction |
| spin | `s` | `s` (spin) | `\mu_s`, `\gamma_s` | Leçon 1 ; conservé après traduction |

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Riesz` ; action : `działanie` ; composition : `złożenie` ; identité fondamentale : `Tożsamość podstawowa` | `figs-src/pl/theme2/rieszfig.tex`, cohérent avec `theme2_pl/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |
| Références | Titre Źródła comme dans le catalogue de l'interface | Fin de leçon | Harmonisé |
| Figures | dwa ślady dans la figure pour « deux traces », dwie plamki dans la prose pour « deux taches » ; sens compatibles | Lexique existant et leçon 1 | Relu |
| Notation | Conserver les axes, étiquettes d'états et noms propres `L` (Larmor), `B` (Bohr) | Leçon 1 | Vérifié |

| Carte des structures | struktury algebraiczne; przestrzeń topologiczna; rozmaitość gładka; grupa i algebra Liego; przestrzenie Hilberta skończeniewymiarowa, ośrodkowa i nieośrodkowa | figs-src/pl/theme2/structures.tex, cohérent avec theme2_pl/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- 2026-09-07 : reprise de toute la leçon 1 sur la source française finalisée ; contrôles des formules, environnements, références et titres réussis. Terminologie mathématique comparée au thème 2, leçon 1.
- Les quatre TikZ SG utilisent les six libellés polonais existants ; sources relues sans besoin de modification. Les quatre rasters historiques restent en repli français explicite. Aucune compilation ni nouvelle vérification visuelle des rendus.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|
