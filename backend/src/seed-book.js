/**
 * Seed script to insert initial books into MongoDB
 * Usage: node src/seed-books.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book.model");

const books = [
  {
    title: "Eloquent JavaScript",
    authors: ["Marijn Haverbeke"],
    isbn: "9781593279509",
    description: "A modern introduction to JavaScript programming.",
    coverImage: "https://eloquentjavascript.net/img/cover.jpg",
    fileUrl: "https://eloquentjavascript.net/Eloquent_JavaScript.pdf",
    fileType: "pdf",
    language: "English",
    publisher: "No Starch Press",
    publishedDate: new Date("2018-12-04"),
    totalCopies: 10,
    availableCopies: 10,
    tags: ["javascript", "programming", "web"],
    ratings: { average: 0, count: 0 },
  },
  {
    title: "Pro Git",
    authors: ["Scott Chacon", "Ben Straub"],
    isbn: "9781484200773",
    description: "Everything about Git version control.",
    coverImage: "https://git-scm.com/images/progit2.png",
    fileUrl:
      "https://github.com/progit/progit2/releases/download/2.1.370/progit.pdf",
    fileType: "pdf",
    language: "English",
    publisher: "Apress",
    publishedDate: new Date("2014-11-18"),
    totalCopies: 8,
    availableCopies: 8,
    tags: ["git", "version-control", "devops"],
    ratings: { average: 0, count: 0 },
  },
  {
    title: "The Linux Command Line",
    authors: ["William E. Shotts Jr."],
    isbn: "9781593273897",
    description: "Introduction to the Linux command line.",
    coverImage: "https://linuxcommand.org/images/tlcl2_front.jpg",
    fileUrl:
      "https://sourceforge.net/projects/linuxcommand/files/TLCL/19.01/TLCL-19.01.pdf",
    fileType: "pdf",
    language: "English",
    publisher: "No Starch Press",
    publishedDate: new Date("2019-01-01"),
    totalCopies: 6,
    availableCopies: 6,
    tags: ["linux", "command-line", "system"],
    ratings: { average: 0, count: 0 },
  },
  {
    title: "Dive Into Python 3",
    authors: ["Mark Pilgrim"],
    isbn: "9781430224150",
    description: "A practical guide to Python 3.",
    coverImage:
      "https://diveintopython3.net/_static/diveintopython3.png",
    fileUrl: "https://diveintopython3.net/diveintopython3.pdf",
    fileType: "pdf",
    language: "English",
    publisher: "Apress",
    publishedDate: new Date("2009-10-01"),
    totalCopies: 7,
    availableCopies: 7,
    tags: ["python", "programming"],
    ratings: { average: 0, count: 0 },
  },
  {
    title: "Think Python",
    authors: ["Allen B. Downey"],
    isbn: "9781491939369",
    description: "How to think like a computer scientist.",
    coverImage:
      "https://greenteapress.com/thinkpython2/think_python2_medium.jpg",
    fileUrl:
      "https://greenteapress.com/thinkpython2/thinkpython2.pdf",
    fileType: "pdf",
    language: "English",
    publisher: "Green Tea Press",
    publishedDate: new Date("2015-01-01"),
    totalCopies: 5,
    availableCopies: 5,
    tags: ["python", "computer-science"],
    ratings: { average: 0, count: 0 },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Book.deleteMany({
      title: { $in: books.map((b) => b.title) },
    });

    await Book.insertMany(books);

    console.log("✅ Seed terminé : 5 livres insérés");
  } catch (error) {
    console.error("❌ Erreur seed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
