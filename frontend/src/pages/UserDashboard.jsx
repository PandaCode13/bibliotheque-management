// frontend/src/pages/UserDashboard.jsx

import { Link } from "react-router-dom";

export default function UserDashboard() {
  // Données MOCK (frontend uniquement)
  const favoriteBooks = [];
  const readBooks = [];
  const searchedCategories = ["Philosophie", "Manga", "Roman policier"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <section>
          <h1 className="text-3xl font-bold text-gray-800">
            Mon espace
          </h1>
          <p className="text-gray-500 mt-1">
            Retrouvez vos livres, vos favoris et vos centres d’intérêt
          </p>
        </section>

        {/* FAVORIS */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              ⭐ Mes livres favoris
            </h2>
            <Link
              to="/catalog"
              className="text-sm text-indigo-600 hover:underline"
            >
              Explorer le catalogue →
            </Link>
          </div>

          {favoriteBooks.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-gray-500 text-center">
              Vous n’avez pas encore ajouté de livres en favoris.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Cartes livres favoris */}
            </div>
          )}
        </section>

        {/* LIVRES CONSULTÉS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            👀 Livres consultés
          </h2>

          {readBooks.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-gray-500 text-center">
              Vous n’avez pas encore consulté de livres.
            </div>
          ) : (
            <ul className="space-y-4">
              {/* Liste livres consultés */}
            </ul>
          )}
        </section>

        {/* CATÉGORIES RECHERCHÉES */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🏷️ Catégories recherchées
          </h2>

          {searchedCategories.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-gray-500 text-center">
              Aucune catégorie recherchée pour le moment.
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {searchedCategories.map((cat, index) => (
                <Link
                  key={index}
                  to={`/catalog?category=${cat}`}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
