const User = require("../models/user.model");

exports.getAllUsers = async (_, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.getAllLastestUsers = async (_, res) => {

  sqlrequest = "SELECT` \* FROM users ORDER BY created_at DESC LIMIT 10;"

  const latestUsers = await User.find().select("")
}

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
