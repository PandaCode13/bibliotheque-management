import { useEffect, useState } from "react";
import { getPublicBooks } from "../services/bookService";
import { Link } from "react-router-dom";
import { getPublicCategories } from "../services/categoryService";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    language: "",
  });

const load = async () => {
  const params = {};

  if (filters.q.trim() !== "") params.q = filters.q.trim();
  if (filters.category) params.category = filters.category;
  if (filters.language.trim() !== "") params.language = filters.language.trim();

  const res = await getPublicBooks(params);
  setBooks(res.data);
};

// un useEffect pour les catégories
useEffect(() => {
  getPublicCategories()
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => {
      console.error("Erreur chargement catégories", err);
    });
}, []);


// un useEffect pour afficher les livres
useEffect(() => {
  load();
}, []);


  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* HEADER */}
        <header>
          <h1 className="text-3xl font-bold text-[#0F4C5C]">
            Catalogue
          </h1>
          <p className="text-gray-600 mt-2">
            Explorez notre collection de livres
          </p>
        </header>

        {/* FILTRES */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Titre, auteur ou ISBN"
              value={filters.q}
              onChange={(e) =>
                setFilters({ ...filters, q: e.target.value })
              }
              className="h-[52px] px-4 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
            />

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="h-[52px] px-4 border border-gray-300 rounded-lg bg-white
                         focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
                value={filters.language}
                onChange={(e) =>
                  setFilters({ ...filters, language: e.target.value })
                }
              className="h-[52px] px-4 border border-gray-300 rounded-lg bg-white
                        focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
            >
              <option value="">Toutes les langues</option>
              <option value="français">Français</option>
              <option value="anglais">Anglais</option>
              <option value="arabe">Arabe</option>
              <option value="allemand">Allemand</option>
              <option value="espagnol">Espagnol</option>
              <option value="afar">Afar</option>
              <option value="somali">Somali</option>
            </select>


            <button
              onClick={load}
              className="h-[52px] bg-[#0F4C5C] text-[#FAFAF9] 
                         rounded-full font-semibold 
                         hover:bg-[#0C3E4B] transition"
            >
              Filtrer
            </button>

          </div>
        </section>

        {/* LIVRES */}
        <section>
          {books.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow-sm">
              Aucun livre trouvé.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {books.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl shadow-sm 
                             hover:shadow-lg hover:-translate-y-1 
                             transition overflow-hidden"
                >
                  <img
                    src={
                      b.coverImage ||
                      "https://via.placeholder.com/300x400?text=Livre"
                    }
                    alt={b.title}
                    className="h-60 w-full object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-[#0F4C5C] truncate">
                      {b.title}
                    </h3>

                    <p className="text-sm text-gray-500 truncate">
                      {b.authors?.join(", ") || "Auteur inconnu"}
                    </p>

                    <Link
                      to={`/books/${b._id}`}
                      className="inline-block text-sm font-medium 
                                 text-[#0F4C5C] hover:text-[#6FAFB0] transition"
                    >
                      Voir détails →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
