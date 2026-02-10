const Book = require("../models/book.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    const populatedBook = await Book.findById(book._id).populate("category");
    res.status(201).json(populatedBook);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du livre", error: error.message });
  }
};

exports.getAllBooksAdmin = async (_, res) => {
  try {
    const books = await Book.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du chargement des livres", error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category");
    if (!book) return res.status(404).json({ message: "Livre introuvable" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du livre", error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category");

    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification du livre", error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    res.json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du livre", error: error.message });
  }
};

exports.getPublicBooks = async (req, res) => {
  try {
    const { q, category, language } = req.query;
    const filter = {};

    // 🔍 Recherche texte
    if (q && q.trim() !== "") {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { authors: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } },
      ];
    }

    // 🏷️ Catégorie
    if (category) {
      filter.category = category;
    }

    // 🌍 Langue
    if (language && language.trim() !== "") {
      filter.language = { $regex: language, $options: "i" };
    }

    const books = await Book.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    console.error("PUBLIC BOOK ERROR:", error);
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

exports.likeBook = async (req, res) => {
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Livre introuvable" });

  const existingVote = user.votes.find(
    (v) => v.book.toString() === book._id.toString()
  );

  if (existingVote?.value === 1)
    return res.status(400).json({ message: "Déjà liké" });

  if (existingVote?.value === -1) {
    book.dislikesCount--;
    existingVote.value = 1;
  } else {
    user.votes.push({ book: book._id, value: 1 });
  }

  book.likesCount++;
  await user.save();
  await book.save();

  res.json({ likes: book.likesCount, dislikes: book.dislikesCount });
};

exports.dislikeBook = async (req, res) => {
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Livre introuvable" });

  const existingVote = user.votes.find(
    (v) => v.book.toString() === book._id.toString()
  );

  if (existingVote?.value === -1)
    return res.status(400).json({ message: "Déjà disliké" });

  if (existingVote?.value === 1) {
    book.likesCount--;
    existingVote.value = -1;
  } else {
    user.votes.push({ book: book._id, value: -1 });
  }

  book.dislikesCount++;
  await user.save();
  await book.save();

  res.json({ likes: book.likesCount, dislikes: book.dislikesCount });
};

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    book: req.params.id,
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json(comment);
};

exports.getCommentsByBook = async (req, res) => {
  const comments = await Comment.find({ book: req.params.id })
    .populate("user", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  res.json(comments);
};
