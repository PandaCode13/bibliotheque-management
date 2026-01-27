import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserFavorites() {
  // 🔧 MOCK (sera remplacé par API)
  const [favorites, setFavorites] = useState([
    {
      _id: "1",
      title: "Eloquent JavaScript",
      authors: ["Marijn Haverbeke"],
      coverImage: "https://eloquentjavascript.net/img/cover.jpg",
    },
    {
      _id: "2",
      title: "Sherlock Holmes Vol.1",
      authors: ["Arthur Conan Doyle"],
      coverImage: "",
    },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((b) => b._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <header>
          <h1 className="text-3xl font-bold text-[#0F4C5C]">
            ⭐ Mes favoris
          </h1>
          <p className="text-gray-600 mt-2">
            Retrouvez tous les livres que vous avez ajoutés à vos favoris
          </p>
        </header>

        {/* EMPTY STATE */}
        {favorites.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-sm 
                           hover:shadow-lg hover:-translate-y-1 
                           transition overflow-hidden"
              >
                <img
                  src={
                    book.coverImage && book.coverImage.trim() !== ""
                      ? book.coverImage
                      : "/placeholder-book.png"
                  }
                  alt={book.title}
                  className="h-60 w-full object-cover bg-gray-100"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-[#0F4C5C] truncate">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-500 truncate">
                    {book.authors?.join(", ") || "Auteur inconnu"}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <Link
                      to={`/books/${book._id}`}
                      className="text-sm font-medium 
                                 text-[#0F4C5C] hover:text-[#6FAFB0]"
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
