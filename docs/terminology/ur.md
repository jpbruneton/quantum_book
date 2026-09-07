# Glossaire et choix éditoriaux — ur

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | کلاسیکی پیش گوئی | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | مسلسل پٹی | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | تجرباتی نتیجہ | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | دو دھبے | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | بھٹی | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | مسدود | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |
| moment magnétique | مقناطیسی مومنٹ | Thème 1, leçon 1 | Retenu lors de la reprise |
| symétrique | متناظر | Ne pas confondre avec متناسب (proportionnel) | Retenu lors de la reprise |
| moment cinétique | زاویائی معیار حرکت | Thème 1, leçon 1 | Retenu lors de la reprise |
| couple de forces | قوتی مومنٹ | À distinguer du moment magnétique | Retenu lors de la reprise |
| précession | تقدیمی حرکت | Mouvement du dipôle | Retenu lors de la reprise |
| pulsation | زاویائی تعدد | Fréquence angulaire, pas fréquence ordinaire | Retenu lors de la reprise |
| rapport gyromagnétique | جائرو مقناطیسی تناسب | Thème 1, leçon 1 | Retenu lors de la reprise |
| faisceau | شہتیر | Faisceau atomique | Retenu lors de la reprise |
| préparation | تیاری | Préparation d'un état | Retenu lors de la reprise |
| état | حالت | État quantique | Retenu lors de la reprise |
| hasard | اتفاقیت | Distinguer de بے ترتیبی (désordre) | Retenu lors de la reprise |
| probabilité | احتمال | Pluriel احتمالات | Retenu lors de la reprise |
| superposition | سپرپوزیشن | Combinaison d'amplitudes | Retenu lors de la reprise |
| mélange statistique | شماریاتی آمیزہ | À distinguer de la superposition | Retenu lors de la reprise |
| amplitude | ایمپلی ٹیوڈ | Amplitude de probabilité | Retenu lors de la reprise |
| phase | فیز | Phase d'une amplitude complexe | Retenu lors de la reprise |
| espace vectoriel | سمتی فضا | Cohérent avec thème 2, leçon 1 | Retenu lors de la reprise |
| produit scalaire | اندرونی ضرب | Cohérent avec thème 2, leçon 1 | Retenu lors de la reprise |
| norme | نورم | Cohérent avec thème 2, leçon 1 | Retenu lors de la reprise |
| espace de Hilbert complexe | مختلط ہلبرٹ فضا | Transition vers thème 2 | Retenu lors de la reprise |
| spin | سپن | Moment cinétique intrinsèque | Retenu lors de la reprise |

## Indices descriptifs

Utiliser les indices descriptifs anglais de [en.md](en.md), en caractères latins. Traduire leur explication dans la langue cible et recopier ici les correspondances utilisées.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|
| énergie potentielle | `p` | `p` (potential) | `E_p` | Leçon 1 ; repli anglais |
| précession | `p` | `p` (precession) | `\omega_p` | Leçon 1 ; repli anglais |
| spin | `s` | `s` (spin) | `\mu_s`, `\gamma_s` | Leçon 1 ; repli anglais |

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `ریس` ; action : `عمل` ; composition : `ترکیب` ; identité fondamentale : `بنیادی شناخت` | `figs-src/ur/theme2/rieszfig.tex`, cohérent avec `theme2_ur/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |
| Four | Employer بھٹی, comme les TikZ, plutôt que تندور | Thème 1, leçon 1 et figures SG | Harmonisé |
| Vocabulaire mathématique | Conserver نورم, اندرونی ضرب et سمتی فضا pour assurer la transition vers le thème 2 | Thème 2, leçon 1 consulté | Retenu |
| Notation | Conserver axes, étiquettes d'états, `L` (Larmor), `B` (Bohr) et symboles mathématiques en caractères latins | Leçon 1 | Vérifié |

| Carte des structures | الجبری ساختیں؛ ٹوپولوجیکل فضا؛ ہموار منی فولڈ؛ گروپ لی اور الجبرا لی؛ محدود البعاد، قابل علیحدگی اور ناقابل علیحدگی ہلبرٹ فضائیں | figs-src/ur/theme2/structures.tex, cohérent avec theme2_ur/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- 2026-09-07 : reprise intégrale de la leçon 1 sur la source française finalisée ; contrôles des équations, références, environnements et ordre des titres réussis.
- Les quatre TikZ de la leçon 1 utilisent les six libellés ourdous du lexique existant ; pas de modification ni compilation nécessaire. Les rasters historiques `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png`, `SGimage.jpg` restent les originaux français, avec chemins de repli explicites. Pas de nouvelle vérification visuelle des rendus.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|
