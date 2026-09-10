# Glossaire et choix éditoriaux — de

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | klassische Vorhersage | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | kontinuierliches Band | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | experimentelles Ergebnis | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | zwei Spuren | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | Ofen | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | blockiert | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Riesz` ; action : `Wirkung` ; composition : `Komposition` ; identité fondamentale : `Fundamentale Identität` | `figs-src/de/theme2/rieszfig.tex`, cohérent avec `theme2_de/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | algebraische Strukturen; topologischer Raum; glatte Mannigfaltigkeit; Lie-Gruppe und Lie-Algebra; endlichdimensionaler, separabler und nichtseparabler Hilbertraum | figs-src/de/theme2/structures.tex, cohérent avec theme2_de/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|
| 2026-09-07 | Reprise complète depuis le français final ; comparaison lexicale avec thème 2 | Thème 1, leçon 1 | Relecture humaine native non effectuée |

## Choix relus dans la leçon 1 du thème 1

| Français / concept | Allemand retenu | Précision |
|---|---|---|
| moment magnétique ; moment cinétique | magnetisches Moment ; Drehimpuls | Deux grandeurs distinctes |
| couple de forces | Drehmoment | Ne pas confondre avec Drehimpuls |
| rapport gyromagnétique ; précession | gyromagnetisches Verhältnis ; Präzession | pulsation : Kreisfrequenz |
| champs de bord | Randfelder | effets de bord : Randeffekte |
| faisceau ; voie | Strahl ; Kanal | SG-Apparat, Analysator |
| préparation ; filtrage ; tri | Präparation ; Filterung ; Sortierung | Physique de la préparation, pas connaissance de l'observateur |
| quantifié ; hasard | quantisiert ; Zufall | Zufallscharakter pour le caractère aléatoire |
| reproductibilité | Reproduzierbarkeit | Mesure idéale sans évolution intermédiaire |
| incompatibilité | Unverträglichkeit | unverträgliche Observablen ; cohérent avec l'introduction |
| superposition ; mélange statistique | Superposition ; statistisches Gemisch | Quantensuperposition dans les titres |
| amplitude ; module au carré ; phase | Amplitude ; Betragsquadrat ; Phase | Modul n'est pas retenu pour la valeur absolue complexe |
| produit scalaire ; norme | Skalarprodukt ; Norm | Identiques au thème 2, leçon 1 |
| espace vectoriel complexe abstrait | abstrakter komplexer Vektorraum | Adjectifs fléchis dans le texte |
| espace de Hilbert complexe | komplexer Hilbertraum | Identique au thème 2 |
| électron non apparié | ungepaartes Elektron | Spin ; Bahndrehimpuls |
| tache ; trace | Fleck ; Spur | Deux taches : zwei Flecken ; figure existante zwei Spuren décrit les traces |

Indices : `E_p` conserve `p` pour potenziell ; `omega_p` conserve `p` pour
Präzession. Les indices conventionnels `s` (Spin), `L` (Larmor), `B` (Bohr), `e`
(Elektron), les axes et les nombres sont conservés. Aucun indice français
descriptif ne nécessite ici une abréviation différente.

Titre bibliographique : Literatur (catalogue). Les quatre TikZ SG et leurs six
libellés sont traduits ; « zwei Spuren » désigne les traces et reste compatible
avec les Flecken du texte. Aucun changement de géométrie ou compilation.
Les quatre rasters historiques restent explicitement en `figs/fr/` (replis
non traduits) ; les quatre schémas SG utilisent `figs/de/`.

## Interface mobile — 2026-09-10

Partager cette page : « Diese Seite teilen ». Confirmation de copie : « Link kopiert! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/de.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « Link kopieren » (copier le lien), « E-Mail » (courriel). Noms des plateformes conservés.

### Renvois du thème 2 — 2026-09-10

Renvoi de section : « siehe Abschnitt ». Cible indisponible : « in dieser Sprache nicht verfügbar ».
Les cinq renvois des leçons 1 et 2 reprennent les labels français ; les deux identités adjointes sont numérotées séparément. Aucun texte de figure ni indice mathématique modifié.
