const Book = require("../models/book.model");

exports.getDashboardStats = async (req, res) => {
  try {
    // Regrouper les livres par mois
    const monthlyBooks = await Book.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Convertir numéro mois → nom
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatted = monthlyBooks.map(item => ({
      month: monthNames[item._id.month - 1],
      count: item.count
    }));

    res.json({
      monthlyBooks: formatted
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajoute ceci dans admin.controller.js

const Category = require("../models/category.model");

exports.getDashboardStats = async (req, res) => {
  try {
    // Nombre total d'utilisateurs, livres, catégories
    const users = await require("../models/user.model").countDocuments();
    const books = await require("../models/book.model").countDocuments();
    const categories = await require("../models/category.model").countDocuments();

    // Livres par catégorie
    const addedBooks = await require("../models/book.model").aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $unwind: "$categoryInfo"
      },
      {
        $project: {
          category: "$categoryInfo.name",
          count: 1
        }
      }
    ]);

    res.json({
      users,
      books,
      categories,
      addedBooks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};