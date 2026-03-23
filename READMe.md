# Biblio

Application web de gestion et de consultation de livres avec une partie publique, un espace utilisateur et un espace administrateur.

## Vue d'ensemble

Le projet est compose de trois briques principales :

- `frontend/` : application React + Vite + Tailwind CSS
- `backend/` : API REST Node.js + Express + MongoDB
- `docker-compose.yml` : orchestration simple de MongoDB, du backend et du frontend

L'application permet notamment :

- l'inscription et la connexion des utilisateurs
- la consultation du catalogue public
- l'affichage du detail d'un livre
- la gestion des favoris, commentaires, likes et dislikes
- l'administration des livres, categories et utilisateurs
- l'import de livres via CSV

## Architecture

```text
biblio/
|-- backend/
|-- frontend/
|-- docker-compose.yml
|-- .dockerignore
|-- .env.example
```

## Technologies

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express
- MongoDB / Mongoose
- JWT
- Multer

## Lancement en local

### 1. Prerequis

- Node.js 20+ ou 22+
- npm
- MongoDB local actif sur `mongodb://127.0.0.1:27017`

### 2. Backend

Depuis `backend/` :

```bash
npm install
npm start
```

Le serveur demarre par defaut sur `http://localhost:5000`.

### 3. Frontend

Depuis `frontend/` :

```bash
npm install
npm run dev
```

L'application Vite demarre en general sur `http://localhost:5173`.

## Lancement avec Docker

Depuis la racine du projet :

```bash
docker compose up --build
```

Services exposes :

- frontend : `http://localhost:5173`
- backend : `http://localhost:5000`
- mongo : `mongodb://localhost:27017`

## Variables d'environnement

Les variables backend actuellement utilisees sont :

```bash

- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `MONGO_URI`

```

## Documentation detaillee

- Documentation generale backend : [backend/README.md](/c:/Users/hp/Desktop/Mon%20Stage%20Teknosure/biblio/backend/README.md)
- Documentation generale frontend : [frontend/README.md](/c:/Users/hp/Desktop/Mon%20Stage%20Teknosure/biblio/frontend/README.md)

## Points utiles

- L'API frontend pointe actuellement vers `http://localhost:5000/api` dans `frontend/src/services/api.js`.
- Les fichiers uploades par le backend sont servis depuis `/uploads`.
- Le projet contient un espace admin protege ainsi qu'un espace utilisateur protege via `ProtectedRoute`.
