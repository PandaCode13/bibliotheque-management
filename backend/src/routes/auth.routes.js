
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const changePasswordController = require("../controllers/changePassword.controller");
const auth = require("../middlewares/auth.middleware");

// Changement de mot de passe pour utilisateur connecté (auth)
router.post("/change-password", auth, changePasswordController.changePassword);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
