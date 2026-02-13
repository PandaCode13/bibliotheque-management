import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicBooks } from "../services/bookService";
import BookCover from "./BookCover";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicBooks()
      .then((res) => {
        const allBooks = res.data;
        // Mélanger le tableau
        const shuffled = allBooks.sort(() => 0.5 - Math.random());
        // Prendre seulement 5 livres
        const randomFive = shuffled.slice(0, 5);
        setBooks(randomFive);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      {/* HERO */}
      <section className="bg-[#0F4C5C] text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            Bibliothèque Numérique
          </h1>
          <p className="text-lg md:text-xl mb-10 text-[#CFE6E5]">
            Explorez le savoir, découvrez de nouveaux horizons
          </p>

          <Link
            to="/login"
            className="inline-block bg-[#9DBEBB] text-[#0F4C5C] px-10 py-3 rounded-full font-semibold shadow-md hover:bg-[#8BAFAE] transition"
          >
            Commencer l’exploration
          </Link>
        </div>
      </section>

      {/* LIVRES */}
      <section className="container mx-auto px-6 py-16 flex-1">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#0F4C5C]">
            Nouveautés
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Une sélection pour nourrir votre curiosité
          </p>
        </div>

        {loading && (
          <p className="text-gray-500 text-center">
            Chargement des livres...
          </p>
        )}

        {!loading && books.length === 0 && (
          <p className="text-gray-500 text-center">
            Aucun livre disponible pour le moment.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition overflow-hidden"
            >
            <BookCover src={book.coverImage} title={book.title} />
              <div className="p-4">
                <h3 className="font-semibold text-sm text-[#0F4C5C] truncate">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {book.authors?.join(", ") || "Auteur inconnu"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F4C5C] text-[#CFE6E5] text-center py-6 text-sm">
        © 2026 Bibliothèque Numérique — Tous droits réservés
      </footer>
    </div>
  );
}
