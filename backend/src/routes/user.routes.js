const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect(["admin"]), controller.getAllUsers);
router.patch("/:id/role", protect(["admin"]), controller.updateUserRole);
router.patch("/:id/status", protect(["admin"]), controller.toggleUserStatus);
router.delete("/:id", protect(["admin"]), controller.deleteUser);

module.exports = router;
