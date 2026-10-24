# TP4 - Gestion des commandes

Petite application JavaScript qui affiche des commandes à partir de trois fichiers JSON : clients, produits et commandes.

## Structure

- index.html
- css/style.css
- data/ : customers.json, products.json, orders.json
- js/ : app.js, state.js, dataService.js, selectors.js, view.js

## Ce que fait l'application

- charge les 3 fichiers JSON avec fetch
- relie les commandes aux clients et aux produits grâce aux id
- calcule le total de chaque commande
- affiche des indicateurs (clients, produits, commandes, montant total)
- recherche par nom de client
- filtres par statut et par catégorie
- bouton Détail pour voir une commande dans un modal
- message d'erreur si un fichier ne se charge pas

## Lancer le projet

Ouvrir le dossier dans VS Code et lancer index.html avec Live Server
(ça ne marche pas en ouvrant le fichier directement).
