const Book = require("../models/book.model");

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getAllBooksAdmin = async (_, res) => {
  const books = await Book.find()
    .populate("category")
    .sort({ createdAt: -1 });
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("category");
  if (!book) return res.status(404).json({ message: "Livre introuvable" });
  res.json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Livre supprimé" });
};

exports.getPublicBooks = async (req, res) => {
  try {
    const { q, category, language } = req.query;
    const isAdmin = req.user?.role === "admin";
    const isUser = req.user?.role === "user";

    const filter = {};

    // 🔍 Recherche texte
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { authors: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } },
        { category: {$regex: q, $options: "i"}}
      ];
    }

    // 🏷️ Catégorie
    if (category) {
      filter.category = category;
    }

    // 🌍 Langue
    if (language) {
      filter.language = { $regex: language, $options: "i" };
    }

    let books;

    if (isAdmin || isUser) {
      // ADMIN → TOUS LES LIVRES AVEC FILTRES
      books = await Book.find(filter)
        .populate("category")
        .sort({ createdAt: -1 });
    } else {
      // USER / PUBLIC → FILTRÉS + RANDOM
      books = await Book.aggregate([
        { $match: filter },
        { $sample: { size: 12 } },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
    }

    res.json(books);
  } catch (error) {
    console.error("CATALOG FILTER ERROR:", error);
    res.status(500).json({ message: "Erreur serveur catalogue" });
  }
};

exports.getPublicBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category");
    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }
    res.json(book);
  } catch (error) {
    console.error("GET PUBLIC BOOK ERROR:", error);
    res.status(500).json({ message: "Erreur serveur livre" });
  }
};
