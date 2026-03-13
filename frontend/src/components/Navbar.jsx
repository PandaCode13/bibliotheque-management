import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/home");
  };

  return (
    <nav className="bg-[#FAFAF9] border-b border-[#DDE5E4] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/favicon.png"
            alt="Library Digital logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />

          <Link
            to="/"
            onClick={closeMenu}
            className="text-lg sm:text-xl font-bold tracking-wide text-[#0F4C5C]"
          >
            Digital Library
          </Link>
        </div>

        {/* BOUTON MOBILE */}
        <button
          className="md:hidden text-[#0F4C5C] text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* MENU */}
        <div
          className={`
            absolute md:static
            top-full left-0
            w-full md:w-auto
            bg-[#FAFAF9] md:bg-transparent
            border-b md:border-0 border-[#DDE5E4]
            flex flex-col md:flex-row
            items-start md:items-center
            gap-4 md:gap-6
            text-sm font-medium
            px-6 md:px-0 py-4 md:py-0
            ${menuOpen ? "flex" : "hidden md:flex"}
          `}
        >

          {/* PUBLIC */}
          {!token && (
            <>
              <Link to="/home" onClick={closeMenu} className="nav-link">
                Accueil
              </Link>

              <Link to="/catalog" onClick={closeMenu} className="nav-link">
                Catalogue
              </Link>

              <Link to="/login" onClick={closeMenu} className="nav-link">
                Connexion
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="px-4 py-2 rounded-full border border-[#9DBEBB] text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white transition"
              >
                Inscription
              </Link>
            </>
          )}

          {/* USER */}
          {token && role === "user" && (
            <>
              <Link to="/dashboard/user" onClick={closeMenu} className="nav-link">
                Dashboard
              </Link>

              <Link to="/dashboard/user/catalog" onClick={closeMenu} className="nav-link">
                Catalogue
              </Link>

              <Link to="/dashboard/user/favorites" onClick={closeMenu} className="nav-link">
                Favoris
              </Link>

              <Link to="/dashboard/user/profiles" onClick={closeMenu} className="nav-link">
                Profil
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-[#0F4C5C] text-white hover:bg-[#0c3b47] transition"
              >
                Déconnexion
              </button>
            </>
          )}

          {/* ADMIN */}
          {token && role === "admin" && (
            <>
              <Link to="/dashboard/admin" onClick={closeMenu} className="nav-link">
                Dashboard
              </Link>

              <Link to="/dashboard/admin/users" onClick={closeMenu} className="nav-link">
                Utilisateurs
              </Link>

              <Link to="/dashboard/admin/books" onClick={closeMenu} className="nav-link">
                Livres
              </Link>

              <Link to="/dashboard/admin/categories" onClick={closeMenu} className="nav-link">
                Catégories
              </Link>

              <Link to="/dashboard/admin/import-books" onClick={closeMenu} className="nav-link">
                Importer Livres
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-[#0F4C5C] text-white hover:bg-[#0c3b47] transition"
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