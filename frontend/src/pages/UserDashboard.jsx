// frontend/src/pages/UserDashboard.jsx

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFavorites, toggleFavorite } from "../services/userService";

export default function UserDashboard() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites()
      .then((res) => setFavorites(res.data))
      .catch(() => setFavorites([]));
  }, []);

  const removeFavorite = (bookId) => {
    toggleFavorite(bookId).then(() => {
      setFavorites((prev) => prev.filter((b) => b._id !== bookId));
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <section className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F4C5C]">
            Mon espace
          </h1>

          <p className="text-sm sm:text-base text-gray-600">
            Retrouvez vos livres, vos favoris et vos centres d’intérêt
          </p>
        </section>

        {/* FAVORIS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-[#0F4C5C]">
              ⭐ Mes livres favoris
            </h2>

            <Link
              to="/catalog"
              className="text-sm font-medium text-[#0F4C5C] hover:text-[#6FAFB0] transition"
            >
              Explorer le catalogue →
            </Link>
          </div>

          {/* EMPTY STATE */}
          {favorites.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 text-center text-gray-500">
              Vous n’avez encore ajouté aucun livre en favoris.
              <div className="mt-4">
                <Link
                  to="/catalog"
                  className="text-[#0F4C5C] font-semibold hover:underline"
                >
                  Explorer le catalogue →
                </Link>
              </div>
            </div>
          )}

          {/* FAVORITES GRID */}
          {favorites.length > 0 && (
            <div
              className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
        "
            >
              {favorites.map((book) => (
                <div
                  key={book._id}
                  className="
                bg-white
                rounded-2xl
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition
                overflow-hidden
                flex flex-col
              "
                >
                  <img
                    src={
                      book.coverImage && book.coverImage.trim() !== ""
                        ? book.coverImage
                        : "/placeholder-book.svg"
                    }
                    alt={book.title}
                    className="h-52 sm:h-56 w-full object-cover bg-gray-100"
                  />

                  <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
                    <div>
                      <h3 className="font-semibold text-[#0F4C5C] truncate">
                        {book.title}
                      </h3>

                      <p className="text-sm text-gray-500 truncate">
                        {book.authors?.join(", ") || "Auteur inconnu"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-3">
                      <Link
                        to={`/books/${book._id}`}
                        className="text-sm font-medium text-[#0F4C5C] hover:text-[#6FAFB0]"
                      >
                        Voir détails →
                      </Link>

                      <button
                        onClick={() => removeFavorite(book._id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* LIVRES CONSULTÉS */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#0F4C5C]">
            👀 Livres consultés
          </h2>
        </section>
      </div>
    </div>
  );
}
