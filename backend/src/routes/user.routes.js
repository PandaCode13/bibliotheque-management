const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");
const User = require("../models/user.model");

/* ===== UTILISATEUR CONNECTÉ (avant les routes :id) ===== */
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

router.put("/me", auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/* ===== FAVORIS (avant les routes :id) ===== */
router.get("/favorites", auth, controller.getFavorites);
router.post("/favorites/:id", auth, controller.toggleFavorite);

/* ===== ROUTES ADMIN (après les routes /me et /favorites) ===== */
router.get("/", auth, isAdmin, controller.getAllUsers);
router.post("/", auth, isAdmin, controller.createUser);
router.put("/:id", auth, isAdmin, controller.updateUser);
router.put("/:id/role", auth, isAdmin, controller.updateUserRole);
router.patch("/:id/status", auth, isAdmin, controller.toggleUserStatus);
router.delete("/:id", auth, isAdmin, controller.deleteUser);

const changePasswordController = require("../controllers/changePassword.controller");
// Changement de mot de passe pour utilisateur connecté
router.post("/change-password", auth, changePasswordController.changePassword);

module.exports = router;
