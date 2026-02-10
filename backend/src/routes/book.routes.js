const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller");
const authOptional = require("../middlewares/auth.optional");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

/* ROUTES PUBLIQUES */
router.get("/public", authOptional, controller.getPublicBooks);
router.get("/public/:id", controller.getPublicBookById);

/* ROUTES ADMIN */
router.post("/", auth, isAdmin, controller.createBook);
router.get("/", auth, isAdmin, controller.getAllBooksAdmin);
router.put("/:id", auth, isAdmin, controller.updateBook);
router.delete("/:id", auth, isAdmin, controller.deleteBook);

/* LIKES / DISLIKES */
router.post("/:id/like", auth, controller.likeBook);
router.post("/:id/dislike", auth, controller.dislikeBook);

/* COMMENTS */
router.post("/:id/comments", auth, controller.addComment);
router.get("/:id/comments", controller.getCommentsByBook);

module.exports = router;
