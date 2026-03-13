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
        console.log(res.data); // DEBUG
        setBooks(res.data.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      {/* HERO */}
      <section className="bg-[#0F4C5C] text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
            Bibliothèque Numérique
          </h1>

          <p className="text-base text-center sm:text-lg lg:text-xl mb-8 sm:mb-10 text-[#CFE6E5]">
            Explorez le savoir, <br />
            Découvrez de nouveaux horizons
          </p>

          <Link
            to="/catalog"
            className="inline-block bg-[#9DBEBB] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#8BAFAE] transition"
          >
            Commencer l’exploration
          </Link>
        </div>
      </section>

      {/* LIVRES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F4C5C]">
            Nouveautés
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Une sélection pour nourrir votre curiosité
          </p>
        </div>

        {loading && (
          <p className="text-gray-500 text-center">Chargement des livres...</p>
        )}

        {!loading && books.length === 0 && (
          <p className="text-gray-500 text-center">
            Aucun livre disponible pour le moment.
          </p>
        )}

        {/* GRID LIVRES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              <BookCover src={book.coverImage} title={book.title} />

              <div className="p-4">
                <h3 className="font-semibold text-sm sm:text-base text-[#0F4C5C] truncate">
                  {book.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">
                  {book.authors?.join(", ") || "Auteur inconnu"}
                </p>

                <Link
                  to={`/book/${book._id}`}
                  className="inline-block mt-2 text-xs sm:text-sm text-[#9DBEBB] hover:underline"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F4C5C] text-[#CFE6E5] text-center py-5 sm:py-6 text-xs sm:text-sm">
        © 2026 Bibliothèque Numérique — Tous droits réservés
      </footer>
    </div>
  );
}
