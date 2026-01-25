const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    avatar: { type: String },

    isActive: { type: Boolean, default: true },

    favoriteBooks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ],

    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
