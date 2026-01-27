const User = require("../models/user.model");

exports.getAllUsers = async (_, res) => {
  const users = await User.find().select("-password");
  res.json(users);
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
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();

  res.json({ id: user._id, isActive: user.isActive });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Utilisateur supprimé" });
};

exports.toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  const bookId = req.params.id;

  const index = user.favoriteBooks.indexOf(bookId);

  if (index === -1) {
    user.favoriteBooks.push(bookId);
  } else {
    user.favoriteBooks.splice(index, 1);
  }

  await user.save();
  res.json(user.favoriteBooks);
};
