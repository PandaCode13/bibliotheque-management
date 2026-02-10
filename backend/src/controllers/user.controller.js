const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (_, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Cet email existe déjà" });
    }

    // Hasher le mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      role: role || "user",
    });

    // Retourner sans le mot de passe
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const userId = req.params.id;

    // Vérifier si l'email existe déjà (pour un autre utilisateur)
    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      return res.status(400).json({ message: "Cet email existe déjà" });
    }

    const updateData = { firstName, lastName, email, role };

    // Si un nouveau mot de passe est fourni, le hasher
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getAllLastestUsers = async (_, res) => {
  const latestUsers = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .limit(10);
  res.json(latestUsers);
};

exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-password");

  res.json(user);
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    user.isActive = !user.isActive;
    await user.save();

    const updatedUser = await User.findById(req.params.id).select("-password");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  const bookId = req.params.id;

  const index = user.favoriteBooks.findIndex(
    (b) => b.toString() === bookId
  );

  let isFavorite;

  if (index === -1) {
    user.favoriteBooks.push(bookId);
    isFavorite = true;
  } else {
    user.favoriteBooks.splice(index, 1);
    isFavorite = false;
  }

  await user.save();
  res.json({ isFavorite });
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("favoriteBooks");

  res.json(user.favoriteBooks);
};