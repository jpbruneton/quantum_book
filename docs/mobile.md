# Affichage mobile

Adaptations reprises de `thermo-book` le 10 septembre 2026 :

- Texte non justifié jusqu'à 640 px, avec `text-align: start` pour les langues RTL.
- Ponctuation rattachée aux formules en ligne dans le rendu serveur KaTeX.
  La règle Thermo des parenthèses fermantes est étendue aux ouvrantes et aux
  ponctuations séparées par une espace, y compris insécable.
  Les expressions trop longues défilent dans leur propre zone sur petit écran.
- Partage dans la leçon et flottant après 400 px de défilement, sur mobile et
  ordinateur (y compris les derniers ajouts Thermo du même jour).
  Boutons bleu clair translucide, partage natif puis menu X, WhatsApp, Facebook,
  LinkedIn, courriel et copie du lien si nécessaire. Libellés dans `ui.share`.
  Le bouton respecte la zone réservée du téléphone et ne recouvre pas le retour
  en haut. Le menu se ferme avec Échap, un clic extérieur ou un changement de page.

La navigation compacte, le masquage de la couverture sur petit écran et les
ajustements du titre d'accueil étaient déjà présents dans Quantum.

Corrections complémentaires pour la structure propre à Quantum :

- Masquer aussi le conteneur des numéros et catégories des thèmes, pour supprimer
  la colonne vide. Empiler titre et lien d'ouverture sur téléphone.
- Autoriser les cartes d'accueil, les figures et les colonnes de formules,
  références et navigation entre leçons à se réduire à la largeur disponible.
- Afficher le pied de page sur une colonne sur téléphone.
- Rendre les menus défilables en hauteur et agrandir les commandes tactiles.
- Servir les styles du menu depuis la feuille globale pour éviter les erreurs
  d'hydratation causées par les apostrophes échappées dans un `<style>` React.

Les contenus, les routes, la distinction entre leçons et fiches et les règles
de publication restent pilotés par les mêmes sources et fonctions de disponibilité.

Vérification : compiler avec `NEXT_PUBLIC_SITE_URL=https://quantumlectures.org`,
puis lancer `npm run check:static`, `npm run check:assets` et
`node scripts/check-content-contracts.cjs`. Ce dernier contrôle aussi la ponctuation
des formules en ligne. Les catalogues se vérifient avec
`node scripts/check-interface-translations.mjs --write-index`.

Pour le contrôle visuel, couvrir 320, 375, 768 et 1280 px : accueil, thèmes,
leçons, fiches, exercices et quiz, avec des pages françaises, allemandes et arabes.
Vérifier l'absence de défilement horizontal de la page, les formules longues,
le partage et son menu de repli, le changement de langue et les commandes flottantes.

Validation effectuée le 10 septembre 2026 : build, contrôles statiques, ressources,
contrats de contenu et catalogues réussis. Chromium : 17 pages à chacune des
quatre largeurs ci-dessus, sans débordement horizontal ni erreur JavaScript.
Partage natif et copie testés avec les API simulées ; menus en paysage, changement
de langue et mode sombre également vérifiés.

Le contrôle des caractères LaTeX visibles a également permis de corriger les
espacements de prose (`\,`, `\;`, `\:`, espace échappée), les accolades échappées,
les renvois `\eqref`, les URL et les environnements `attention`. Les commandes
d'espacement restent intactes dans les mathématiques. Les titres de métadonnées
excluent désormais l'alternative MathML/TeX cachée de KaTeX.

Après correction des 65 occurrences trouvées sur 53 pages, l'audit des pages
générées ne relève plus de barre oblique inverse visible hors source mathématique
cachée. `check:static` contrôle désormais les commandes résiduelles dans la prose
et les titres de métadonnées. Les tests de mise en page vérifient aussi que les
parenthèses ouvrantes/fermantes et ponctuations espacées restent sur la ligne de
leur formule à 320, 375 et 1280 px.

Audit demandé des `\boxed{…\qquad…}` : 44 encadrés dans 42 fichiers TeX,
traductions comprises. En français : thème 1, leçon 2 (deux encadrés ; leçon
toujours masquée), thème 2, fiches 1 et 2 (un encadré chacune). Aucune modification
de ces équations ni ajout de règle de rendu spécifique, conformément à la demande.
