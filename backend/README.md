# 📚 Bibliothèque Management – Backend

## 🧩 Description

Ce backend fait partie du projet **Bibliothèque Management**, une application web de gestion de bibliothèque permettant de gérer les **livres**, les **utilisateurs** et les **emprunts** via une API REST.

Il est développé avec **Node.js** et fournit les services nécessaires au frontend (authentification, gestion des données, sécurité).

---

## 🛠️ Technologies utilisées

* **Node.js**
* **Express.js**
* **Nodemon** (en développement)
* **Base de données** : MySQL / MongoDB *(selon configuration)*
* **JWT** (authentification)
* **bcrypt** (hachage des mots de passe)

---

## 📁 Structure du backend

```
backend/
│── src/
│   ├── server.js        # Point d’entrée de l’application
│   ├── routes/          # Définition des routes API
│   ├── controllers/     # Logique métier
│   ├── models/          # Modèles de données
│   ├── middlewares/     # Middlewares (auth, sécurité, etc.)
│   └── config/          # Configuration (DB, env)
│
│── package.json
│── package-lock.json
│── README.md
```

---

## ⚙️ Installation

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/PandaCode13/bibliotheque-management.git
cd bibliotheque-management/backend
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Variables d’environnement

Créer un fichier `.env` à la racine du dossier `backend` :

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=****
DB_NAME=bibliotheque
JWT_SECRET=secret_key
```

⚠️ Ne jamais versionner le fichier `.env`.

---

## ▶️ Lancement du serveur

### Mode développement

```bash
npm run dev
```

Le serveur démarre par défaut sur :

```
http://localhost:3000
```

---

## 🔐 Sécurité

* Mots de passe hachés avec **bcrypt**
* Authentification via **JWT**
* Protection des routes sensibles par middleware
* Validation des entrées utilisateur
* Audit des dépendances avec `npm audit`

---

## 🔗 Exemples de routes API

| Méthode | Route                | Description           |
| ------- | -------------------- | --------------------- |
| POST    | `/api/auth/login`    | Connexion utilisateur |
| POST    | `/api/auth/register` | Inscription           |
| GET     | `/api/books`         | Liste des livres      |
| POST    | `/api/books`         | Ajouter un livre      |
| DELETE  | `/api/books/:id`     | Supprimer un livre    |

---

## 🧪 Tests

```bash
npm audit
```

Résultat attendu :

```
0 vulnerabilities found
```

---

## 🚀 Améliorations possibles

* Tests unitaires (Jest)
* Documentation Swagger / OpenAPI
* Rate limiting
* Logs sécurisés
* Conteneurisation Docker

---

## 👨‍🎓 Contexte

Projet réalisé dans un cadre **académique / stage**, mettant l’accent sur l’architecture backend et la sécurité applicative.

---

## 📄 Licence

Projet à but pédagogique.
