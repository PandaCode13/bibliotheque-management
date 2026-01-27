const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller");
const authOptional = require("../middlewares/auth.optional");

/* ROUTES PUBLIQUES */
router.get("/public", authOptional, controller.getPublicBooks);
router.get("/public/:id", controller.getPublicBookById);

/* ROUTES ADMIN */
router.post("/", authOptional, controller.createBook);
router.get("/", authOptional, controller.getAllBooksAdmin);
router.put("/:id", authOptional, controller.updateBook);
router.delete("/:id", authOptional, controller.deleteBook);

const auth = require("../middlewares/auth.middleware");

/* LIKES / DISLIKES */
router.post("/:id/like", auth, controller.likeBook);
router.post("/:id/dislike", auth, controller.dislikeBook);

/* COMMENTS */
router.post("/:id/comments", auth, controller.addComment);
router.get("/:id/comments", controller.getCommentsByBook);

module.exports = router;
