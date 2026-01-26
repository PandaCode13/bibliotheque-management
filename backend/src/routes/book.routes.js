const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

/* ROUTES PUBLIQUES */
router.get("/public", controller.getPublicBooks);
router.get("/public/:id", controller.getPublicBookById);

/* ROUTES PROTÉGÉES (ADMIN) */
router.post("/", auth, isAdmin, controller.createBook);
router.get("/", auth, isAdmin, controller.getAllBooksAdmin);
router.put("/:id", auth, isAdmin, controller.updateBook);
router.delete("/:id", auth, isAdmin, controller.deleteBook);

module.exports = router;
