import { useEffect, useState } from "react";
import { getStats } from "../services/userService";
import { Link } from "react-router-dom";

// frontend/src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    categories: 0,
    addedBooks: [],
    dashboardData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recentBooks = Array.isArray(stats.addedBooks)
    ? stats.addedBooks
    : stats.addedBooks?.data || [];

  useEffect(() => {
    getStats()
      .then((res) => {
        setStats(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard Admin
        </h2>

        <p className="text-gray-500 text-sm sm:text-base">
          Gestion des livres, utilisateurs et statistiques globales
        </p>

        <p className="text-xs text-gray-400">Accueil / Admin / Dashboard</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* UTILISATEURS */}
        <div
          className="
      bg-white
      rounded-2xl
      border border-gray-100
      shadow-sm
      p-6
      transition
      hover:shadow-lg
      hover:-translate-y-1
    "
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Utilisateurs</h3>

            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              U
            </div>
          </div>

          {loading ? (
            <p className="mt-6 text-gray-400 animate-pulse">Chargement...</p>
          ) : error ? (
            <p className="mt-6 text-red-500">Erreur : {error.message}</p>
          ) : (
            <p className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800">
              {stats.users}
            </p>
          )}

          <Link
            to="/dashboard/admin/users"
            className="inline-block mt-6 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            Gerer les utilisateurs -
          </Link>
        </div>

        {/* LIVRES */}
        <div
          className="
      bg-white
      rounded-2xl
      border border-gray-100
      shadow-sm
      p-6
      transition
      hover:shadow-lg
      hover:-translate-y-1
    "
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Livres</h3>

            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
              L
            </div>
          </div>

          {loading ? (
            <p className="mt-6 text-gray-400">Chargement...</p>
          ) : error ? (
            <p className="mt-6 text-red-500">Erreur : {error.message}</p>
          ) : (
            <p className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800">
              {stats.books}
            </p>
          )}

          <Link
            to="/dashboard/admin/books"
            className="inline-block mt-6 text-sm font-medium text-green-600 hover:text-green-800 transition"
          >
            Voir tous les livres -
          </Link>
        </div>

        {/* CATEGORIES */}
        <div
          className="
      bg-white
      rounded-2xl
      border border-gray-100
      shadow-sm
      p-6
      transition
      hover:shadow-lg
      hover:-translate-y-1
    "
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Categories</h3>

            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              C
            </div>
          </div>

          {loading ? (
            <p className="mt-6 text-gray-400">Chargement...</p>
          ) : error ? (
            <p className="mt-6 text-red-500">Erreur : {error.message}</p>
          ) : (
            <p className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800">
              {stats.categories}
            </p>
          )}

          <Link
            to="/dashboard/admin/categories"
            className="inline-block mt-6 text-sm font-medium text-purple-600 hover:text-purple-800 transition"
          >
            Voir toutes les categories -
          </Link>
        </div>
      </div>

      {/* DERNIERS LIVRES */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Derniers livres ajoutes
          </h3>

          <Link
            to="/dashboard/admin/books"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Voir tous -
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-400">Chargement...</p>
        ) : error ? (
          <p className="text-red-500">Erreur : {error.message}</p>
        ) : recentBooks.length === 0 ? (
          <p className="text-gray-400">Aucun livre ajoute recemment</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recentBooks.slice(0, 5).map((book) => (
              <div
                key={book._id}
                className="
          bg-white
          border border-gray-100
          rounded-xl
          shadow-sm
          hover:shadow-lg
          transition
          overflow-hidden
        "
              >
                {/* IMAGE */}
                <img
                  src={
                    book.coverImage
                      ? book.coverImage.startsWith("http")
                        ? book.coverImage
                        : `http://localhost:5000/${book.coverImage}`
                      : "/placeholder-book.svg"
                  }
                  alt={book.title}
                  className="h-40 w-full object-cover"
                />

                {/* INFOS */}
                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {book.title}
                  </h4>

                  <p className="text-xs text-gray-500">
                    {book.authors?.join(", ") || "Auteur inconnu"}
                  </p>

                  {book.category && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {book.category.name}
                    </span>
                  )}

                  <Link
                    to={`/dashboard/admin/books/edit/${book._id}`}
                    className="
              block
              text-center
              text-sm
              mt-2
              bg-blue-600
              text-white
              py-1.5
              rounded
              hover:bg-blue-700
              transition
            "
                  >
                    Modifier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
