const express = require("express");
const router = express.Router();

const controller = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

/* =========================
   ROUTES PUBLIQUES
========================= */

// Récupérer les catégories pour le catalogue
router.get("/public", controller.getPublicCategories);


/* =========================
   ROUTES ADMIN
========================= */

// Récupérer toutes les catégories (admin)
router.get(
  "/",
  auth,
  isAdmin,
  controller.getAllCategories
);

// Créer une catégorie
router.post(
  "/",
  auth,
  isAdmin,
  controller.createCategory
);

// Modifier une catégorie
router.put(
  "/:id",
  auth,
  isAdmin,
  controller.updateCategory
);

// Supprimer une catégorie
router.delete(
  "/:id",
  auth,
  isAdmin,
  controller.deleteCategory
);

module.exports = router;
