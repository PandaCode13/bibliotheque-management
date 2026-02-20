const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// Changement de mot de passe pour utilisateur connecté
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Champs requis manquants." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: "Ancien mot de passe incorrect." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Mot de passe changé avec succès !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};
