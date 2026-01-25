const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    authors: [{ type: String, required: true }],

    isbn: { type: String, unique: true },

    description: { type: String },

    coverImage: { type: String },

    fileUrl: { type: String },

    fileType: {
      type: String,
      enum: ["pdf", "epub"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    language: { type: String },

    publisher: { type: String },

    publishedDate: { type: Date },

    totalCopies: { type: Number, default: 1 },

    availableCopies: { type: Number, default: 1 },

    tags: [{ type: String }],

    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
