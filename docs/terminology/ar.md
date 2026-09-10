# Glossaire et choix éditoriaux — ar

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | التنبؤ الكلاسيكي | Figure SG, lexique thème 1, entrée 1 | Relu avec la leçon 1, 2026-09-07 |
| bande continue | شريط متصل | Figure SG, lexique thème 1, entrée 2 | Relu avec la leçon 1, 2026-09-07 |
| résultat expérimental | النتيجة التجريبية | Figure SG, lexique thème 1, entrée 3 | Relu avec la leçon 1, 2026-09-07 |
| deux traces | بقعتان | Figure SG, lexique thème 1, entrée 4 | Relu avec la leçon 1, 2026-09-07 |
| four | فرن | Figure SG, lexique thème 1, entrée 5 | Relu avec la leçon 1, 2026-09-07 |
| bloqué | محجوب | Figure SG, lexique thème 1, entrée 6 | Relu avec la leçon 1, 2026-09-07 |
| moment magnétique | العزم المغناطيسي | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| moment cinétique | الزخم الزاوي | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| rapport gyromagnétique | النسبة الجيرومغناطيسية | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| précession | المبادرة | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| pulsation | التردد الزاوي | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| énergie potentielle | طاقة الوضع | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| état | الحالة | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| préparation | التحضير | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| incompatibilité | عدم التوافق | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| superposition | التراكب | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| amplitude de probabilité | سعة الاحتمال | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| phase | الطور | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| produit scalaire | الجداء الداخلي | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| norme | المعيار | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| espace de Hilbert complexe | فضاء هيلبرت مركب | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |
| mélange statistique | مزيج إحصائي | Thème 1, leçon 1 ; reprise du français final | Retenu le 2026-09-07 |

## Indices descriptifs

Utiliser les indices descriptifs anglais de [en.md](en.md), en caractères latins. Traduire leur explication dans la langue cible et recopier ici les correspondances utilisées.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|
| potentiel | `p` | `p` | `E_p` | Thème 1, leçon 1 ; vérifié |
| précession | `p` | `p` | `\omega_p` | Thème 1, leçon 1 ; vérifié |
| spin | `s` | `s` | `\mu_s`, `\gamma_s`, `\mu_{s,z}` | Thème 1, leçon 1 ; vérifié |

Repli anglais conformément à `en.md` : `p` de potential pour طاقة الوضع, `p` de precession pour المبادرة, `s` de spin. Explications dans la prose cible ; aucune abréviation française résiduelle dans cette leçon.

Les indices des axes `x`, `y`, `z`, les noms propres `L` (Larmor), `B` (Bohr), `e` (électron), `0` et les étiquettes des états sont conservés.

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `ريس` ; action : `فعل` ; composition : `تركيب` ; identité fondamentale : `الهوية الأساسية` | `figs-src/ar/theme2/rieszfig.tex`, cohérent avec `theme2_ar/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | البنى الجبرية؛ الفضاء الطوبولوجي؛ المتشعب الأملس؛ زمرة لي وجبر لي؛ فضاءات هيلبرت المنتهية البعد والقابلة وغير القابلة للفصل | figs-src/ar/theme2/structures.tex, cohérent avec theme2_ar/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|

## Reprise de la leçon 1 — 2026-09-07

Distinguer `العزم المغناطيسي`, `عزم القوة` et `الزخم الزاوي`. Le spin est `اللف المغزلي`, sans l'assimiler à une rotation classique. `الجداء الداخلي`, `المعيار` et `فضاء هيلبرت` concordent avec le thème 2. Les formules et labels restent en écriture latine LTR au sein de la prose RTL.

Les six termes visibles des quatre TikZ `figs-src/ar/theme1/lecon1_fig{1,2,3,4}.tex` et leur lexique `theme1-translations.json` ont été relus : déjà traduits, sans modification nécessaire. Géométrie et symboles SG/axes inchangés. Les quatre PNG SG localisés existants sont utilisés. `magnetsmall.png`, `magnetorque.jpg`, `precessionmag.png` et `SGimage.jpg` restent des originaux français sous `figs/fr/` : leur contenu visible n’est pas déclaré traduit. Aucun TikZ recompilé ; glyphes, débordements et rendu visuel restent à vérifier lors de la prochaine compilation autorisée.

Contrôle ciblé de structure, formules, références et images passé ; rendu serveur KaTeX, sommaire et section bibliographique vérifiés sans build. Les trois notions produit scalaire/norme/Hilbert ont été comparées au thème 2 existant ; pas de modification du thème 2. Les occurrences `section XXX` de la source sont conservées sous leur traduction, sans inventer de référence.

## Interface mobile — 2026-09-10

Partager cette page : « مشاركة هذه الصفحة ». Confirmation de copie : « تم نسخ الرابط! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/ar.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « نسخ الرابط » (copier le lien), « البريد الإلكتروني » (courriel). Noms des plateformes conservés.

### Renvois du thème 2 — 2026-09-10

Renvoi de section : « انظر القسم ». Cible indisponible : « غير متاح بهذه اللغة ».
Les cinq renvois des leçons 1 et 2 reprennent les labels français ; les deux identités adjointes sont numérotées séparément. Aucun texte de figure ni indice mathématique modifié.
