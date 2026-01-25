const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect(["admin"]), controller.getAllBooksAdmin);
router.get("/:id", protect(["admin"]), controller.getBookById);
router.post("/", protect(["admin"]), controller.createBook);
router.put("/:id", protect(["admin"]), controller.updateBook);
router.delete("/:id", protect(["admin"]), controller.deleteBook);

router.get("/public", controller.getPublicBooks);
router.get("/public/:id", controller.getPublicBookById);

module.exports = router;
