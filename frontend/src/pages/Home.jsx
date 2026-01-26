import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicBooks } from "../services/bookService";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicBooks()
      .then((res) => setBooks(res.data.slice(0, 5)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bibliothèque Numérique
        </h1>
        <p className="text-lg mb-6">
          Découvrez et empruntez des livres en ligne
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/catalog"
            className="bg-white text-indigo-600 px-6 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Explorer le catalogue
          </Link>
        </div>
      </section>

      {/* LIVRES */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Nouveautés
          </h2>
          <Link
            to="/catalog"
            className="text-indigo-600 hover:underline"
          >
            Voir tout →
          </Link>
        </div>

        {loading && (
          <p className="text-gray-500">Chargement des livres...</p>
        )}

        {!loading && books.length === 0 && (
          <p className="text-gray-500">
            Aucun livre disponible pour le moment.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded shadow hover:shadow-lg transition"
            >
              <img
                src={
                  book.coverImage ||
                  "https://via.placeholder.com/200x300?text=Livre"
                }
                alt={book.title}
                className="h-48 w-full object-cover rounded-t"
              />

              <div className="p-4">
                <h3 className="font-semibold text-sm truncate">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {book.authors.join(", ")}
                </p>

                <Link
                  to={`/books/${book._id}`}
                  className="inline-block mt-2 text-sm text-indigo-600 hover:underline"
                >
                  Détails →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        © 2026 Bibliothèque Numérique — Tous droits réservés
      </footer>
    </div>
  );
}
