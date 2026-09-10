# Glossaire et choix éditoriaux — sw

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | utabiri wa kiklasiki | Figure SG, lexique thème 1, entrée 1 | Relu avec la leçon 1, 2026-09-07 |
| bande continue | ukanda endelevu | Figure SG, lexique thème 1, entrée 2 | Relu avec la leçon 1, 2026-09-07 |
| résultat expérimental | matokeo ya jaribio | Figure SG, lexique thème 1, entrée 3 | Relu avec la leçon 1, 2026-09-07 |
| deux traces | madoa mawili | Figure SG, lexique thème 1, entrée 4 | Relu avec la leçon 1, 2026-09-07 |
| four | tanuru | Figure SG, lexique thème 1, entrée 5 | Relu avec la leçon 1, 2026-09-07 |
| bloqué | imezuiwa | Figure SG, lexique thème 1, entrée 6 | Relu avec la leçon 1, 2026-09-07 |
| moment magnétique | momenti ya sumaku | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| moment cinétique | momentamu ya pembe | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| rapport gyromagnétique | uwiano wa jairosumaku | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| précession | presesheni | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| pulsation | marudio ya pembe | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| énergie potentielle | nishati ya potenshali | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| état | hali | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| préparation | utayarishaji | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| incompatibilité | kutopatana | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| superposition | superposisheni | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| amplitude de probabilité | amplitudo ya uwezekano | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| phase | awamu | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| produit scalaire | zao la ndani | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| norme | norma | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| espace de Hilbert complexe | nafasi changamano ya Hilbert | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| mélange statistique | mchanganyiko wa kitakwimu | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|
| potentiel | `p` | `p` | `E_p` | Thème 1, leçon 1 ; vérifié |
| précession | `p` | `p` | `\omega_p` | Thème 1, leçon 1 ; vérifié |
| spin | `s` | `s` | `\mu_s`, `\gamma_s`, `\mu_{s,z}` | Thème 1, leçon 1 ; vérifié |

`p` reste l’initiale de `potenshali` et de `presesheni` ; `s` celle de `spini`.

Les indices des axes `x`, `y`, `z`, les noms propres `L` (Larmor), `B` (Bohr), `e` (électron), `0` et les étiquettes des états sont conservés.

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Riesz` ; action : `kitendo` ; composition : `utungaji` ; identité fondamentale : `Utambulisho wa msingi` | `figs-src/sw/theme2/rieszfig.tex`, cohérent avec `theme2_sw/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | miundo ya kialjebra; nafasi ya kitopolojia; manifoldu laini; kundi na aljebra ya Lie; nafasi za Hilbert zenye vipimo vya ukomo, tenganifu na zisizotenganika | figs-src/sw/theme2/structures.tex, cohérent avec theme2_sw/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 — 2026-09-07

Distinguer `momenti ya sumaku` du `momentamu ya pembe`. Corriger `migongo` (dos) en `migongano` (impacts). Employer `nishati ya potenshali` pour l'énergie potentielle ; l'ancien `nishati fiche` évoque la chaleur latente et n'est pas retenu. Employer `norma`, comme au thème 2, et non `noma`. `Zao la ndani` et `nafasi ya Hilbert` concordent également avec le thème 2. Ces choix swahilis techniques bénéficieraient d'une validation terminologique par un enseignant natif.

Les six termes visibles des quatre TikZ `figs-src/sw/theme1/lecon1_fig{1,2,3,4}.tex` et leur lexique `theme1-translations.json` ont été relus : déjà traduits, sans modification nécessaire. Géométrie et symboles SG/axes inchangés. Les quatre PNG SG localisés existants sont utilisés. `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent des originaux français sous `figs/fr/` : leur contenu visible n’est pas déclaré traduit. Aucun TikZ recompilé ; glyphes, débordements et rendu visuel restent à vérifier lors de la prochaine compilation autorisée.

Contrôle ciblé de structure, formules, références et images passé ; rendu serveur KaTeX, sommaire et section bibliographique vérifiés sans build. Les trois notions produit scalaire/norme/Hilbert ont été comparées au thème 2 existant ; pas de modification du thème 2. Les occurrences `section XXX` de la source sont conservées sous leur traduction, sans inventer de référence.

Projection : retenir `projeksheni`, déjà utilisé au thème 2, leçon 1 ; réserver `makadirio` aux estimations/approximations. L’usage `makadirio ya kiothogonali` observé dans le thème 2, leçon 2 reste à harmoniser lors de sa reprise. Combinaison linéaire : `muunganiko wa mstari`, distincte du mélange statistique `mchanganyiko wa kitakwimu`.

## Interface mobile — 2026-09-10

Partager cette page : « Shiriki ukurasa huu ». Confirmation de copie : « Kiungo kimenakiliwa! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/sw.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « Nakili kiungo » (copier le lien), « Barua pepe » (courriel). Noms des plateformes conservés.

### Renvois du thème 2 — 2026-09-10

Renvoi de section : « tazama sehemu ». Cible indisponible : « haipatikani katika lugha hii ».
Les cinq renvois des leçons 1 et 2 reprennent les labels français ; les deux identités adjointes sont numérotées séparément. Aucun texte de figure ni indice mathématique modifié.
