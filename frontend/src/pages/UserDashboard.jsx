// frontend/src/pages/UserDashboard.jsx

import { Link } from "react-router-dom";

export default function UserDashboard() {
  // Données MOCK (frontend uniquement)
  const favoriteBooks = [];
  const readBooks = [];
  const searchedCategories = ["Philosophie", "Manga", "Roman policier"];

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* HEADER */}
        <section>
          <h1 className="text-3xl font-bold text-[#0F4C5C]">
            Mon espace
          </h1>
          <p className="text-gray-600 mt-2">
            Retrouvez vos livres, vos favoris et vos centres d’intérêt
          </p>
        </section>

        {/* FAVORIS */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#0F4C5C]">
              ⭐ Mes livres favoris
            </h2>
            <Link
              to="/catalog"
              className="text-sm font-medium text-[#0F4C5C] hover:text-[#6FAFB0] transition"
            >
              Explorer le catalogue →
            </Link>
          </div>

          {favoriteBooks.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-gray-500 text-center shadow-sm">
              Vous n’avez pas encore ajouté de livres en favoris.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Cartes livres favoris */}
            </div>
          )}
        </section>

        {/* LIVRES CONSULTÉS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0F4C5C]">
            👀 Livres consultés
          </h2>

          {readBooks.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-gray-500 text-center shadow-sm">
              Vous n’avez pas encore consulté de livres.
            </div>
          ) : (
            <ul className="space-y-4">
              {/* Liste livres consultés */}
            </ul>
          )}
        </section>

        {/* CATÉGORIES RECHERCHÉES */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0F4C5C]">
            🏷️ Catégories recherchées
          </h2>

          {searchedCategories.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-gray-500 text-center shadow-sm">
              Aucune catégorie recherchée pour le moment.
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {searchedCategories.map((cat, index) => (
                <Link
                  key={index}
                  to={`/catalog?category=${cat}`}
                  className="px-5 py-2 bg-[#E6F1F0] text-[#0F4C5C] 
                             rounded-full text-sm font-medium 
                             hover:bg-[#9DBEBB] hover:text-[#0F4C5C] transition"
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
