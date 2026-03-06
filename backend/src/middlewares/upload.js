const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsRoot = path.join(__dirname, "../../uploads");
const coversDir = path.join(uploadsRoot, "covers");
const booksDir = path.join(uploadsRoot, "books");

[uploadsRoot, coversDir, booksDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "cover") {
      cb(null, coversDir);
    } else if (file.fieldname === "pdfBook") {
      cb(null, booksDir);
    } else {
      cb(new Error(`Champ fichier non supporte: ${file.fieldname}`));
    }
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
