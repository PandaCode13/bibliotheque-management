const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "Utilisateur existant" });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    firstName,
    lastName,
    email,
    password: hashed,
    role,
  });

  res.status(201).json({ message: "Inscription réussie" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Identifiants invalides" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Identifiants invalides" });

  // Vérifier si le compte est actif (sauf pour les admins)
  if (!user.isActive && user.role !== "admin")
    return res.status(403).json({ message: "Ce compte a été désactivé" });

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable" });
  }

  // Générer token
  const token = crypto.randomBytes(32).toString("hex");

  // Stocker version hashée
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min

  await user.save();

  // ⚠️ MODE DEV : on retourne le lien au lieu d’envoyer un email
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  res.json({
    message: "Lien de réinitialisation généré",
    resetLink,
  });
};

/* =====================================================
   RÉINITIALISATION
===================================================== */
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: "Token invalide ou expiré",
    });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Mot de passe réinitialisé avec succès" });
};