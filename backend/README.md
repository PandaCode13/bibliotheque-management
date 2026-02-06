# 📚 Bibliothèque Management – Backend

## 🧩 Description

Ce backend fait partie du projet **Bibliothèque Management**, une application web de gestion de bibliothèque permettant de gérer les **livres**, les **utilisateurs** et les **emprunts** via une API REST.

Il est développé avec **Node.js** et fournit les services nécessaires au frontend (authentification, gestion des données, sécurité).

---

## 🛠️ Technologies utilisées

* **Node.js**
* **Express.js**
* **Nodemon** (en développement)
* **Base de données** : MongoDB *(selon configuration)*
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

## 🧪 Tests

```bash
npm audit
```

Résultat attendu :

```
0 vulnerabilities found
```

---

## 👨‍🎓 Contexte

Projet réalisé dans un cadre **académique / stage**, mettant l’accent sur l’architecture backend et la sécurité applicative.

---

## 📄 Licence

Projet à but pédagogique.
