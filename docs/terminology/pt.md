# Glossaire et choix éditoriaux — pt

Lire les [règles communes](README.md) avant utilisation. Ce fichier évolue à chaque reprise de traduction.

## Termes techniques et vocabulaire

Inventaire initial issu de `content/tex/figs-src/theme1-translations.json` ; ces usages existants ne sont pas encore une validation terminologique de tout l'ouvrage. Ajouter les termes rencontrés dans les cours au fil de leur reprise.

| Français / concept | Forme cible retenue | Contexte et source | Statut |
|---|---|---|---|
| prédiction classique | previsão clássica | Figure SG, lexique thème 1, entrée 1 | Usage existant, à relire |
| bande continue | faixa contínua | Figure SG, lexique thème 1, entrée 2 | Usage existant, à relire |
| résultat expérimental | resultado experimental | Figure SG, lexique thème 1, entrée 3 | Usage existant, à relire |
| deux traces | duas manchas | Figure SG, lexique thème 1, entrée 4 | Usage existant, à relire |
| four | forno | Figure SG, lexique thème 1, entrée 5 | Usage existant, à relire |
| bloqué | bloqueado | Figure SG, lexique thème 1, entrée 6 | Usage existant, à relire |

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
| 2026-09-07 | Reprise complète ; produit interne aligné sur le thème 2 | Thème 1, leçon 1 ; comparaison thème 2, leçon 1 | Relecture humaine native non effectuée |

## Choix relus dans la leçon 1 du thème 1

| Français / concept | Portugais retenu | Précision |
|---|---|---|
| moment magnétique ; moment cinétique | momento magnético ; momento angular | Grandeurs distinctes |
| couple de forces | momento de forças | Usage du rappel classique |
| rapport gyromagnétique | razão giromagnética | Ne pas alterner avec relação dans cette unité |
| pulsation ; précession | frequência angular ; precessão | Angular explicite |
| champ inhomogène ; champs de bord | campo não homogéneo ; campos de bordo | effets de bord : efeitos de bordo |
| faisceau ; voie | feixe ; via | analisador pour analyseur |
| préparation ; filtrage ; tri | preparação ; filtragem ; triagem | Physique des sélections SG |
| quantifié ; hasard | quantizado ; acaso | caráter aleatório ; acaso fundamental |
| reproductibilité ; incompatibilité | reprodutibilidade ; incompatibilidade | observáveis incompatíveis |
| superposition ; mélange statistique | sobreposição ; mistura estatística | Sobreposição conservé comme dans l'introduction |
| amplitude ; module ; phase | amplitude ; módulo ; fase | quadrado do módulo |
| produit scalaire ; norme | produto interno ; norma | Produit interne retenu pour correspondre exactement au thème 2 |
| espace vectoriel complexe abstrait | espaço vetorial complexo abstrato | Forme déjà utilisée au thème 2 |
| espace de Hilbert complexe | espaço de Hilbert complexo | Continuité mathématique |
| électron non apparié | eletrão desemparelhado | Spin conservé |

Indices : `p` reste inchangé dans `E_p` (potencial) et `omega_p` (precessão).
Les indices conventionnels `s` (spin), `L` (Larmor), `B` (Bohr), `e` (eletrão),
les axes et les nombres sont conservés. Aucun indice abrégé propre au français
ne subsiste dans cette leçon.

Portugais européen cohérent avec l'existant : eletrão, íman, ecrã, experiência,
secção. Titre bibliographique : Referências. Préférer produto interno dans la
suite de l'ouvrage ; produto escalar est un synonyme, mais créerait ici une
variation inutile avant le thème 2. Les six libellés des quatre TikZ SG sont
traduits et cohérents (faixa contínua, duas manchas, forno, bloqueado).
Rendu non recompilé. Quatre rasters historiques en repli `figs/fr/` non traduit,
quatre schémas SG localisés en `figs/pt/`.
