const express = require("express");
const cors = require("cors");
const path = require("path");
const router = express.Router();
require("dotenv").config();
const app = express();

const connectDB = require("./config/database");
connectDB();
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const categoryRoutes = require("./routes/category.routes");
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (_, res) => {
  res.json({ status: "OK" });
});

const statsRoutes = require("./routes/stats");
app.use("/api", statsRoutes);

app.use("/api/admin", require("./routes/admin.routes"));

module.exports = app;
