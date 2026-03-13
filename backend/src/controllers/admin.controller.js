const Book = require("../models/book.model");

// Ajoute ceci dans admin.controller.js

const Category = require("../models/category.model");

exports.getDashboardStats = async (req, res) => {
  try {

    const users = await require("../models/user.model").countDocuments();
    const books = await Book.countDocuments();
    const categories = await Category.countDocuments();

    // 🔥 5 derniers livres ajoutés
    const addedBooks = await Book.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      users,
      books,
      categories,
      addedBooks
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};