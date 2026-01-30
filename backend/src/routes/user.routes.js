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

// FAVORIS USER
router.get("/favorites", auth, controller.getFavorites);
router.post("/favorites/:id", auth, controller.toggleFavorite);

// utilisateur connecté
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

router.put("/me", auth, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(updatedUser);
});

module.exports = router;
