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
  const { q, category, language } = req.query;

  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { authors: { $regex: q, $options: "i" } },
      { isbn: { $regex: q, $options: "i" } },
    ];
  }

  if (category) filter.category = category;
  if (language) filter.language = language;

  const books = await Book.find(filter)
    .populate("category")
    .sort({ createdAt: -1 });

  res.json(books);
};

exports.getPublicBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("category");
  if (!book) return res.status(404).json({ message: "Livre introuvable" });
  res.json(book);
};
