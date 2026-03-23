# Backend Biblio

API REST du projet Biblio. Elle gere l'authentification, les livres, les categories, les utilisateurs, les statistiques et les uploads.

## Stack

- Node.js
- Express
- MongoDB avec Mongoose
- JWT pour l'authentification
- Multer pour les uploads

## Demarrage

Depuis le dossier `backend/` :

```bash
npm install
npm start
```

Le backend ecoute par defaut sur `http://localhost:5000`.

## Variables d'environnement

Fichier attendu : `backend/.env`

## Structure

```text
backend/
|-- src/
|   |-- app.js
|   |-- server.js
|   |-- config/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|-- uploads/
|-- Dockerfile
```

## Organisation du code

- `src/app.js` : configuration Express, middlewares, routes et connexion MongoDB
- `src/server.js` : point de lancement HTTP
- `src/config/database.js` : connexion a MongoDB
- `src/controllers/` : logique metier
- `src/models/` : schemas Mongoose
- `src/routes/` : declaration des endpoints
- `src/middlewares/` : auth, admin, upload

## Routes principales

### Authentification

Prefixe : `/api/auth`

- `POST /register`
- `POST /login`
- `POST /forgot-password`
- `POST /reset-password`
- `POST /change-password`

### Livres

Prefixe : `/api/books`

- `GET /public` : catalogue public avec filtres
- `GET /public/:id` : detail public d'un livre
- `GET /` : liste admin des livres
- `POST /` : creation d'un livre
- `PUT /:id` : modification d'un livre
- `DELETE /:id` : suppression d'un livre
- `POST /:id/like`
- `POST /:id/dislike`
- `POST /:id/comments`
- `GET /:id/comments`
- `POST /import` : import CSV
- `GET /latest` : derniers livres ajoutes

### Categories

Prefixe : `/api/categories`

- `GET /public`
- `GET /`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

### Utilisateurs

Prefixe : `/api/users`

- `GET /me`
- `PUT /me`
- `GET /favorites`
- `POST /favorites/:id`
- `GET /`
- `POST /`
- `PUT /:id`
- `PUT /:id/role`
- `PATCH /:id/status`
- `DELETE /:id`
- `POST /change-password`

### Statistiques et admin

- `GET /api/health`
- `GET /api/stats`
- `GET /api/admin/dashboard-stats`
- `GET /api/admin/monthly-books`

## Authentification et droits

- `auth.middleware.js` protege les routes reservees aux utilisateurs connectes
- `admin.middleware.js` restreint certaines routes aux administrateurs
- `auth.optional.js` permet d'utiliser un token facultatif sur certaines routes publiques

## Uploads

Les fichiers uploades sont servis via :

```text
/uploads
```

Le middleware `src/middlewares/upload.js` gere notamment les fichiers de couverture et les fichiers PDF.

## Sante de service

Pour verifier rapidement que l'API fonctionne :

```http
GET /api/health
```

Reponse attendue :

```json
{ "status": "OK" }
```
