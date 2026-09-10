# Glossaire et choix éditoriaux — it

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | previsione classica | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | banda continua | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | risultato sperimentale | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | due tracce | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | forno | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | bloccato | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

## Indices descriptifs

Traduire les indices descriptifs avec une abréviation de cette langue ; consigner chaque choix ci-dessous.

| Sens français développé | Indice français | Indice cible | Exemple LaTeX | Source / statut |
|---|---|---|---|---|

## Choix éditoriaux

À enrichir : registre, capitalisation, abréviations, titres, variantes à éviter et distinctions de sens.

| Sujet | Choix et raison | Exemple / source | Statut |
|---|---|---|---|
| Figure de Riesz | Riesz : `Riesz` ; action : `azione` ; composition : `composizione` ; identité fondamentale : `Identità fondamentale` | `figs-src/it/theme2/rieszfig.tex`, cohérent avec `theme2_it/lesson2.tex` | Retenu le 2026-09-07 ; compilation et rendu inspectés |

| Carte des structures | strutture algebriche; spazio topologico; varietà differenziabile; gruppo e algebra di Lie; spazi di Hilbert di dimensione finita, separabile e non separabile | figs-src/it/theme2/structures.tex, cohérent avec theme2_it/lesson1.tex | Retenu le 2026-09-07 ; compilation et rendu inspectés |

## Suivi des décisions et harmonisation

- 2026-09-07 : inventaire initial des six expressions des figures SG ; relecture lors de la prochaine reprise.
- Les autres termes techniques et les choix propres à cette langue restent à recenser.

| Date | Décision ou écart constaté | Unités concernées | Action restante |
|---|---|---|---|
| 2026-09-07 | Reprise complète depuis le français final ; comparaison avec thème 2 | Thème 1, leçon 1 | Relecture humaine native non effectuée |

## Choix relus dans la leçon 1 du thème 1

| Français / concept | Italien retenu | Précision |
|---|---|---|
| moment magnétique ; moment cinétique | momento magnetico ; momento angolare | Grandeurs distinctes |
| couple de forces | momento torcente | Ne pas confondre avec momento angolare |
| rapport gyromagnétique | rapporto giromagnetico | Cohérent avec le rappel |
| pulsation ; précession | pulsazione ; precessione | compiere un moto di precessione ; éviter precedere, ambigu |
| champ inhomogène ; champs de bord | campo disomogeneo ; campi di bordo | Cohérence avant/après section 4 |
| faisceau ; voie | fascio ; canale | analizzatore pour analyseur |
| préparation ; filtrage ; tri | preparazione ; filtraggio ; selezione | semplice selezione dans le modèle classique |
| quantifié ; hasard | quantizzato ; caso | casualità pour le caractère aléatoire |
| reproductibilité ; incompatibilité | riproducibilità ; incompatibilità | osservabili incompatibili |
| superposition ; mélange statistique | sovrapposizione ; miscela statistica | Distinction conservée |
| amplitude ; module ; phase | ampiezza ; modulo ; fase | quadrato del modulo |
| produit scalaire ; norme | prodotto scalare ; norma | Identiques au thème 2, leçon 1 |
| espace vectoriel complexe abstrait | spazio vettoriale complesso astratto | Distinct des vecteurs spatiaux |
| espace de Hilbert complexe | spazio di Hilbert complesso | Continuité avec thème 2 |
| électron non apparié | elettrone spaiato | spin ; momento angolare orbitale |
| tache ; trace | macchia ; traccia | Figure due tracce compatible avec les macchie du texte |

Indices : `p` reste inchangé dans `E_p` (potenziale) et `omega_p` (precessione).
Les indices conventionnels `s` (spin), `L` (Larmor), `B` (Bohr), `e` (elettrone),
les axes, nombres et étiquettes d'états sont conservés.

Titre bibliographique : Riferimenti. Les quatre TikZ SG ont leurs six libellés
traduits, cohérents avec la leçon ; due tracce désigne les traces observées et
n'impose pas de renommer macchie. Sources inspectées sans compilation.
Quatre rasters historiques restent des replis non traduits en `figs/fr/` ; les
quatre schémas SG sont explicitement localisés en `figs/it/`.

## Interface mobile — 2026-09-10

Partager cette page : « Condividi questa pagina ». Confirmation de copie : « Link copiato! ».
Libellés courts de commande et de retour utilisateur dans `lib/locales/it.json` (`ui.share`). Traduction directe du français ; relecture humaine native non effectuée.
Menu de partage : « Copia link » (copier le lien), « Email » (courriel). Noms des plateformes conservés.

### Renvois du thème 2 — 2026-09-10

Renvoi de section : « si veda la sezione ». Cible indisponible : « non disponibile in questa lingua ».
Les cinq renvois des leçons 1 et 2 reprennent les labels français ; les deux identités adjointes sont numérotées séparément. Aucun texte de figure ni indice mathématique modifié.
