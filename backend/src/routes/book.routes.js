const express = require("express");
const router = express.Router();
const cv = require("csv-parser");

const controller = require("../controllers/book.controller");
const authOptional = require("../middlewares/auth.optional");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload");


console.log("createBook:", typeof controller.createBook);
console.log("updateBook:", typeof controller.updateBook);
console.log("upload:", typeof upload);
console.log("auth:", typeof auth);
console.log("isAdmin:", typeof isAdmin);

/* =========================
   ROUTES PUBLIQUES
========================= */

// Catalogue public (avec filtres)
router.get("/public", authOptional, controller.getPublicBooks);

// Détail d’un livre public
router.get("/public/:id", controller.getPublicBookById);


/* =========================
   ROUTES ADMIN
========================= */

// Créer un livre (avec image cover)
router.post(
  "/",
  auth,
  isAdmin,
  upload.single("cover"),
  controller.createBook
);

// Récupérer tous les livres (admin)
router.get(
  "/",
  auth,
  isAdmin,
  controller.getAllBooksAdmin
);

// Modifier un livre (avec nouvelle cover optionnelle)
router.put(
  "/:id",
  auth,
  isAdmin,
  upload.single("cover"),
  controller.updateBook
);

// Supprimer un livre
router.delete(
  "/:id",
  auth,
  isAdmin,
  controller.deleteBook
);


/* =========================
   LIKES / DISLIKES
========================= */

router.post("/:id/like", auth, controller.likeBook);
router.post("/:id/dislike", auth, controller.dislikeBook);


/* =========================
   COMMENTS
========================= */

router.post("/:id/comments", auth, controller.addComment);
router.get("/:id/comments", controller.getCommentsByBook);

router.post(
  "/import",
  auth,
  isAdmin,
  upload.single("file"),
  controller.importBooksFromCSV
);

module.exports = router;
