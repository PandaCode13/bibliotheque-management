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

    resume: { type: String },

    tags: [{ type: String }],

    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    likesCount: { type: Number, default: 0 },

    dislikesCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },
    
  },
  { timestamps: true },
  
);

module.exports = mongoose.model("Book", bookSchema);
