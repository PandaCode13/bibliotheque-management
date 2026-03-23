# Frontend Biblio

Application cliente du projet Biblio. Elle fournit les pages publiques, l'espace utilisateur et l'espace administrateur.

## Stack

- React
- React Router
- Axios
- Tailwind CSS
- Vite

## Demarrage

Depuis le dossier `frontend/` :

```bash
npm install
npm run dev
```

Application accessible en general sur `http://localhost:5173`.

## Build

```bash
npm run build 

```

OU 

```bash
npm run dev

```

Pour previsualiser le build :

```bash
npm run preview
```

## Communication avec le backend

Le client API Axios est defini dans `src/services/api.js` avec cette base :

```text
http://localhost:5000/api
```

Le token JWT est recupere depuis `localStorage` puis ajoute automatiquement dans l'en-tete `Authorization`.

## Structure

```text
frontend/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- services/
|   |-- App.jsx
|   |-- main.jsx
|-- public/
|-- Dockerfile
|-- vite.config.js
|-- tailwind.config.js
|-- postcss.config.js
```

## Pages principales

### Pages publiques

- `Home`
- `Catalog`
- `PublicBookDetail`
- `Login`
- `Register`
- `ForgotPassword`
- `ResetPassword`

### Espace utilisateur

- `UserDashboard`
- `UserCatalogue`
- `UserBookDetails`
- `UserFavorites`
- `UserProfiles`

### Espace administrateur

- `AdminDashboard`
- `AdminBooks`
- `AdminImportBooks`
- `AdminGestionCategories`
- `AdminGestionUtilisateurs`

## Navigation et protection

- `App.jsx` declare l'ensemble des routes
- `ProtectedRoute.jsx` protege les pages reservees aux roles `user` et `admin`
- `Navbar.jsx` gere la navigation principale

## Services frontend

Les appels API sont regroupes par domaine :

- `src/services/authService.js`
- `src/services/bookService.js`
- `src/services/categoryService.js`
- `src/services/userService.js`

## Styles

- `src/index.css` : styles globaux
- `src/App.css` : styles applicatifs
- Tailwind CSS est configure via `tailwind.config.js` et `postcss.config.js`

## Fonctionnalites couvertes

- authentification et gestion de session
- affichage du catalogue public
- detail d'un livre
- favoris utilisateur
- commentaires, likes et dislikes
- gestion admin des livres
- import CSV des livres
- gestion des categories
- gestion des utilisateurs
- tableau de bord administrateur
