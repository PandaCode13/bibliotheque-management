const changePasswordController = require("../controllers/changePassword.controller");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware"); 
// Changement de mot de passe pour utilisateur connecté
router.post("/change-password", auth, changePasswordController.changePassword);
