import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // A chaque déconnexion, on nettoie le localStorage et on redirige vers l'accueil
  const logout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <nav className="bg-[#FAFAF9] border-b border-[#DDE5E4] px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="flex gap-1 items-center">
          <img
            src="/favicon.png"
            alt="Library Digital logo"
            className="w-10 h-10 object-contain"
          />
          <Link
            to="/"
            className="text-xl font-bold tracking-wide text-[#0F4C5C]"
          >
            Digital Library
          </Link>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          {/* PUBLIC */}
          {!token && (
            <>
              <Link to="/home" className="nav-link">
                Accueil
              </Link>
              <Link to="catalog" className="nav-link">
                {" "}
                Catalogue
              </Link>
              <Link to="/login" className="nav-link">
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full border border-[#9DBEBB] text-[#0F4C5C]"
              >
                {" "}
                Inscription{" "}
              </Link>
            </>
          )}

          {/* USER */}
          {token && role === "user" && (
            <>
              <Link to="/dashboard/user" className="nav-link">
                Dashboard
              </Link>
              <Link to="/dashboard/user/catalog" className="nav-link">
                Catalogue
              </Link>
              <Link to="/dashboard/user/favorites" className="nav-link">
                Favoris
              </Link>
              <Link to="/dashboard/user/profiles" className="nav-link">
                Profil
              </Link>
              <button onClick={logout} className="btn-primary">
                Déconnexion
              </button>
            </>
          )}

          {/* ADMIN */}
          {token && role === "admin" && (
            <>
              <Link to="/dashboard/admin" className="nav-link">
                Dashboard
              </Link>
              <Link to="/dashboard/admin/users" className="nav-link">
                Utilisateurs
              </Link>
              <Link to="/dashboard/admin/books" className="nav-link">
                Livres
              </Link>
              <Link to="/dashboard/admin/categories" className="nav-link">
                Catégories
              </Link>
              <Link to="/dashboard/admin/import-books" className="nav-link">
                Importer Livres
              </Link>
              <button onClick={logout} className="btn-primary">
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
