const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

/* ROUTES PROTÉGÉES (ADMIN) */
router.get("/", auth, isAdmin, controller.getCategories);
router.post("/", auth, isAdmin, controller.createCategory);
router.put("/:id", auth, isAdmin, controller.updateCategory);
router.delete("/:id", auth, isAdmin, controller.deleteCategory);

module.exports = router;
