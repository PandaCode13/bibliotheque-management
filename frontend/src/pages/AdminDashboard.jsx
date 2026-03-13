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

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (stats.users || stats.books || stats.categories) {
      setLoading(false);
    }
  }, [stats]);

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
              👤
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
            Gérer les utilisateurs →
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
              📚
            </div>
          </div>

          {!loading && !error ? (
            <p className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800">
              {stats.books}
            </p>
          ) : (
            <p className="mt-6 text-gray-400">Chargement...</p>
          )}

          <Link
            to="/dashboard/admin/books"
            className="inline-block mt-6 text-sm font-medium text-green-600 hover:text-green-800 transition"
          >
            Voir tous les livres →
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
            <h3 className="text-gray-500 font-medium">Catégories</h3>

            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              🏷️
            </div>
          </div>

          {!loading && !error ? (
            <p className="mt-6 text-3xl sm:text-4xl font-bold text-gray-800">
              {stats.categories}
            </p>
          ) : (
            <p className="mt-6 text-gray-400">Chargement...</p>
          )}

          <Link
            to="/dashboard/admin/categories"
            className="inline-block mt-6 text-sm font-medium text-purple-600 hover:text-purple-800 transition"
          >
            Voir toutes les catégories →
          </Link>
        </div>
      </div>

      {/* DERNIERS LIVRES */}
      <div className="mt-10 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Derniers livres ajoutés
          </h3>

          <Link
            to="/dashboard/admin/books"
            className="text-sm text-blue-600 hover:text-blue-800 transition"
          >
            Voir tous →
          </Link>
        </div>

        {!stats.addedBooks?.data || stats.addedBooks.data.length === 0 ? (
          <p className="text-gray-400">Aucun livre ajouté récemment</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {stats.addedBooks.data.map((book) => (
              <li
                key={book._id}
                className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-2
              py-3
              hover:bg-gray-50
              px-2
              rounded
              transition
            "
              >
                <div>
                  <p className="font-medium text-gray-700">{book.title}</p>

                  {book.category && (
                    <p className="text-xs text-gray-400">
                      Catégorie : {book.category.name}
                    </p>
                  )}
                </div>

                <Link
                  to={`/dashboard/admin/books/edit/${book._id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Modifier
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
