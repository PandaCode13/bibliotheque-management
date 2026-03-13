const Book = require("../models/book.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const uploadsRoot = path.join(__dirname, "../../uploads");

const toPublicUploadPath = (file, folder) => {
  if (!file?.filename) return undefined;
  return `uploads/${folder}/${file.filename}`;
};

const toAbsoluteUploadPath = (storedPath) => {
  if (!storedPath) return null;
  if (path.isAbsolute(storedPath)) return storedPath;
  const normalized = storedPath.replace(/^uploads[\\/]/, "");
  return path.join(uploadsRoot, normalized);
};

const normalizeBookPayload = (payload) => {
  const data = { ...payload };

  if (typeof data.isbn === "string" && data.isbn.trim() === "") {
    data.isbn = undefined;
  }

  if (typeof data.category === "string" && data.category.trim() === "") {
    data.category = undefined;
  }

  if (typeof data.publishedDate === "string" && data.publishedDate.trim() === "") {
    data.publishedDate = undefined;
  }

  return data;
};

/* =========================
   CREATE BOOK
========================= */
const createBook = async (req, res) => {
  try {
    const data = normalizeBookPayload(req.body);

    // Convert authors string -> array
    if (req.body.authors) {
      data.authors = JSON.parse(req.body.authors);
    }

    // Upload cover
    if (req.files && req.files.cover) {
      data.coverImage = toPublicUploadPath(req.files.cover[0], "covers");
    }

    // Upload PDF
    if (req.files && req.files.pdfBook) {
      data.pdfBook = toPublicUploadPath(req.files.pdfBook[0], "books");
    }

    const book = await Book.create(data);

    const populatedBook = await Book.findById(book._id).populate("category");

    res.status(201).json(populatedBook);

  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "ISBN deja utilise",
        error: error.message,
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Donnees invalides pour la creation du livre",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Erreur lors de la création du livre",
      error: error.message,
    });
  }
};

/* =========================
   UPDATE BOOK
========================= */
const updateBook = async (req, res) => {
  try {
    const data = normalizeBookPayload(req.body);

    if (req.body.authors) {
      data.authors = JSON.parse(req.body.authors);
    }

    const existingBook = await Book.findById(req.params.id);

    if (!existingBook) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    // Nouvelle cover
    if (req.files && req.files.cover) {

      // supprimer ancienne cover
      const oldCoverPath = toAbsoluteUploadPath(existingBook.coverImage);
      if (oldCoverPath && fs.existsSync(oldCoverPath)) {
        fs.unlinkSync(oldCoverPath);
      }

      data.coverImage = toPublicUploadPath(req.files.cover[0], "covers");
    }

    // Nouveau PDF
    if (req.files && req.files.pdfBook) {

      // supprimer ancien pdf
      const oldPdfPath = toAbsoluteUploadPath(existingBook.pdfBook);
      if (oldPdfPath && fs.existsSync(oldPdfPath)) {
        fs.unlinkSync(oldPdfPath);
      }

      data.pdfBook = toPublicUploadPath(req.files.pdfBook[0], "books");
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    ).populate("category");

    res.json(updatedBook);

  } catch (error) {
    console.error("UPDATE BOOK ERROR:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "ISBN deja utilise",
        error: error.message,
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Donnees invalides pour la modification du livre",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Erreur lors de la modification du livre",
      error: error.message,
    });
  }
};

/* =========================
   DELETE BOOK
========================= */
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    // Supprimer image si existante
    const oldCoverPath = toAbsoluteUploadPath(book.coverImage);
    if (oldCoverPath && fs.existsSync(oldCoverPath)) {
      fs.unlinkSync(oldCoverPath);
    }

    res.json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du livre",
      error: error.message,
    });
  }
};

/* =========================
   ADMIN - GET ALL
========================= */
const getAllBooksAdmin = async (_, res) => {
  try {
    const books = await Book.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du chargement des livres",
      error: error.message,
    });
  }
};

/* =========================
   GET BY ID
========================= */
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category");

    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération livre",
      error: error.message,
    });
  }
};

/* =========================
   PUBLIC BOOKS
========================= */
const getPublicBooks = async (req, res) => {
  try {
    const { q, category, language } = req.query;
    const filter = {};

    if (q && q.trim() !== "") {
      const searchRegex = { $regex: q, $options: "i" };
      filter.$or = [
        { title: searchRegex },
        { authors: searchRegex },
        { isbn: searchRegex },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (language && language.trim() !== "") {
      filter.language = { $regex: language, $options: "i" };
    }

    const books = await Book.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    const visibleBooks = books.filter((b) => b.visible);

    res.json(visibleBooks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur catalogue" });
  }
};

const getPublicBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category");

    if (!book) {
      return res.status(404).json({ message: "Livre introuvable" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur livre" });
  }
};

/* =========================
   LIKE / DISLIKE
========================= */
const likeBook = async (req, res) => {
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Livre introuvable" });

  const existingVote = user.votes.find(
    (v) => v.book.toString() === book._id.toString(),
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

const dislikeBook = async (req, res) => {
  const user = await User.findById(req.user.id);
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Livre introuvable" });

  const existingVote = user.votes.find(
    (v) => v.book.toString() === book._id.toString(),
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

/* =========================
   COMMENTS
========================= */
const addComment = async (req, res) => {
  const comment = await Comment.create({
    book: req.params.id,
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json(comment);
};

const getCommentsByBook = async (req, res) => {
  const comments = await Comment.find({ book: req.params.id })
    .populate("user", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  res.json(comments);
};

const importBooksFromCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Fichier requis" });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        try {
          for (const row of results) {
            // 🔥 FIX COVER IMAGE
            let coverImage = row.coverImage;

            if (coverImage && !coverImage.startsWith("http" || "https")) {
              coverImage = `uploads/${coverImage}`;
            }

            await Book.create({
              title: row.title,
              authors: row.authors ? row.authors.split("|") : [],
              isbn: row.isbn || undefined,
              description: row.description || "",
              coverImage,
              fileUrl: row.fileUrl || "",
              fileType: row.fileType || undefined,
              category: row.category || null,
              language: row.language || "",
              resume: row.resume || "",
              publisher: row.publisher || "",
              publishedDate: row.publishedDate || null,
              tags: row.tags ? row.tags.split("|") : [],
              likesCount: Number(row.likesCount) || 0,
              dislikesCount: Number(row.dislikesCount) || 0,
              dateAdded: row.dateAdded ? new Date(row.dateAdded) : Date.now(),
              addedBy: mongoose.Types.ObjectId(req.user.id),
            });
          }

          fs.unlinkSync(req.file.path);

          res.json({
            message: `${results.length} livres importés avec succès`,
          });
        } catch (err) {
          res.status(500).json({
            message: "Erreur insertion livres",
            error: err.message,
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      message: "Erreur import CSV",
      error: error.message,
    });
  }
};

const LastBookAdded = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .select("title coverImage createdAt category")
      .limit(5);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur récupération derniers livres",
      error: error.message
    });
  }
};

/* =========================
   EXPORTS
========================= */
module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getAllBooksAdmin,
  getBookById,
  getPublicBooks,
  getPublicBookById,
  likeBook,
  dislikeBook,
  addComment,
  getCommentsByBook,
  importBooksFromCSV,
  LastBookAdded
};
