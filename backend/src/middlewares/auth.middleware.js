const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le compte est actif (sauf pour les admins)
    if (!user.isActive && user.role !== "admin") {
      return res.status(403).json({ message: "Ce compte a été désactivé" });
    }

    req.user = user; // 🔥 USER COMPLET
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};
