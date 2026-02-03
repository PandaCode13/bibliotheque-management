import { useEffect, useState } from "react";
import { getStats } from "../services/userService";

// frontend/src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, books: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getStats()
      .then((res) => {
        if (mounted) {
          setStats(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, []);

  return (
    <div className="m-5">
      <h2>Dashboard Admin</h2>
      <p>Gestion des livres, utilisateurs, statistiques</p>

      <div className="stats-div">
          <div className="stats">
          <h3>Utilisateurs</h3>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur: {error.message}</p>
          ) : (
            <p>{stats.users} Utilisateurs</p>
          )}
        </div>

        <div className="stats">
          <h3>Livres</h3>
          {!loading && !error && <p>{stats.books} Livres</p>}
        </div>
      </div>
    </div>
  );
}
