const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect(["admin"]), controller.getCategories);
router.post("/", protect(["admin"]), controller.createCategory);
router.put("/:id", protect(["admin"]), controller.updateCategory);
router.delete("/:id", protect(["admin"]), controller.deleteCategory);

module.exports = router;
