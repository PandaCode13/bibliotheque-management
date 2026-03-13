import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, toggleFavorite } from "../services/userService";

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites().then((res) => setFavorites(res.data));
  }, []);

  const removeFavorite = async (id) => {
    await toggleFavorite(id);
    setFavorites((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F4C5C]">
            ⭐ Mes favoris
          </h1>

          <p className="text-sm sm:text-base text-gray-600">
            Retrouvez tous les livres que vous avez ajoutés à vos favoris
          </p>
        </header>

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

                <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <h3 className="font-semibold text-[#0F4C5C] truncate">
                      {book.title}
                    </h3>

                    <p className="text-sm text-gray-500 truncate">
                      {book.authors?.join(", ") || "Auteur inconnu"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Link
                      to={`/books/${book._id}`}
                      className="
                    text-sm
                    font-medium
                    text-[#0F4C5C]
                    hover:text-[#6FAFB0]
                    transition
                  "
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
      </div>
    </div>
  );
}
