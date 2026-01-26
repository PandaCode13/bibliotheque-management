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
    const books = await Book.aggregate([
      { $sample: { size: 5 } } // 🎯 5 livres AU HASARD
    ]);

    res.json(books);
  } catch (error) {
    console.error("GET RANDOM BOOKS ERROR:", error);
    res.status(500).json({ message: "Erreur serveur livres" });
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
