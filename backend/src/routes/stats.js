const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Book = require("../models/book.model");

// GET /api/stats
router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const books = await Book.countDocuments();

    res.json({ users, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
