const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

/* ROUTES ADMIN */
router.get("/", auth, isAdmin, controller.getAllUsers);
router.put("/:id/role", auth, isAdmin, controller.updateUserRole);
router.patch("/:id/status", auth, isAdmin, controller.toggleUserStatus);
router.delete("/:id", auth, isAdmin, controller.deleteUser);

module.exports = router;
