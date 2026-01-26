import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicBooks } from "../services/bookService";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicBooks()
      .then((res) => setBooks(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HERO */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bibliothèque Numérique
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Découvrez et empruntez des livres en ligne
          </p>

          <Link
            to="/login"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            Connectez-vous
          </Link>
        </div>
      </section>

      {/* LIVRES */}
      <section className="container mx-auto px-6 py-14 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Nouveautés
          </h2>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={
                  book.coverImage ||
                  "https://via.placeholder.com/200x300?text=Livre"
                }
                alt={book.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-800 truncate">
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
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © 2026 Bibliothèque Numérique — Tous droits réservés
      </footer>
    </div>
  );
}
