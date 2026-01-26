import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO / TITLE */}
        <span className="text-lg font-bold text-indigo-600">
          Biblio
        </span>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {/* NON CONNECTÉ */}
          {!token && (
            <>
              <Link to="/" className="text-gray-600 hover:text-indigo-600 transition">
                Accueil
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition">
                Connexion
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-indigo-600 transition">
                Inscription
              </Link>
            </>
          )}

          {/* USER CONNECTÉ */}
          {token && role === "user" && (
            <>
              <Link to="/dashboard/user" className="text-gray-600 hover:text-indigo-600 transition">
                Dashboard
              </Link>
              <Link to="/catalog" className="text-gray-600 hover:text-indigo-600 transition">
                Catalogue
              </Link>
              <Link to="/favorites" className="text-gray-600 hover:text-indigo-600 transition">
                Favoris
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition">
                Profil
              </Link>
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Déconnexion
              </button>
            </>
          )}

          {/* ADMIN CONNECTÉ */}
          {token && role === "admin" && (
            <>
              <Link to="/dashboard/admin" className="text-gray-600 hover:text-indigo-600 transition">
                Dashboard
              </Link>
              <Link to="/catalog" className="text-gray-600 hover:text-indigo-600 transition">
                Catalogue
              </Link>
              <Link to="/dashboard/admin/users" className="text-gray-600 hover:text-indigo-600 transition">
                Utilisateurs
              </Link>
              <Link to="/dashboard/admin/books" className="text-gray-600 hover:text-indigo-600 transition">
                Livres
              </Link>
              <Link to="/dashboard/admin/stats" className="text-gray-600 hover:text-indigo-600 transition">
                Stats
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition">
                Profil
              </Link>
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Déconnexion
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
