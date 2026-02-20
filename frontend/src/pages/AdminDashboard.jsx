import { useEffect, useState } from "react";
import { getStats } from "../services/userService";
import { Link } from "react-router-dom";


// frontend/src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, books: 0, categories: 0, addedBooks: [], dashboardData: [] });
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* TITRE */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Admin</h2>
        <p className="text-gray-500 mt-2">
          Gestion des livres, utilisateurs et statistiques globales
        </p>

        {/* OPTIONNEL : ajouter un fil d’Ariane (breadcrumb) */}
        <p className="text-sm text-gray-400 mt-1">
          Accueil / Admin / Dashboard
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* CARD UTILISATEURS */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Utilisateurs</h3>

          {loading ? (
            <p className="mt-4 text-gray-400 animate-pulse">Chargement...</p>
          ) : error ? (
            <p className="mt-4 text-red-500">Erreur : {error.message}</p>
          ) : (
            <p className="mt-4 text-4xl font-bold text-[#0F4C5C]">
              {stats.users}
            </p>
          )}
          {/* OPTIONNEL : lien rapide */}
          <Link to="/dashboard/admin/users" className="mt-4 text-sm text-[#0F4C5C] hover:underline">
            Gérer les utilisateurs →
          </Link>
        </div>

        {/* CARD LIVRES */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Livres</h3>

          {!loading && !error ? (
            <p className="mt-4 text-4xl font-bold text-[#0F4C5C]">
              {stats.books}
            </p>
          ) : (
            <p className="mt-4 text-gray-400">Chargement...</p>
          )}

          {/* OPTIONNEL : lien rapide */}
          <Link to="/dashboard/admin/books" className="mt-4 text-sm text-[#0F4C5C] hover:underline">
            Voir tous les livres →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Catégories</h3>

          {!loading && !error ? (
            <p className="mt-4 text-4xl font-bold text-[#0F4C5C]">
              {stats.categories}
            </p>
          ) : (
            <p className="mt-4 text-gray-400">Chargement...</p>
          )}
        </div>
      </div>

    </div>
  );
}
