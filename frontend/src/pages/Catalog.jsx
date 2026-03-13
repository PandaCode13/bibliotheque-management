import { useEffect, useState, useRef } from "react";
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

  const debounceTimer = useRef(null);

  const load = async () => {
    try {
      const params = {};

      if (filters.q.trim()) params.q = filters.q.trim();
      if (filters.category) params.category = filters.category;
      if (filters.language.trim()) params.language = filters.language.trim();

      const res = await getPublicBooks(params);

      setBooks(res.data);
    } catch (error) {
      console.error("Erreur recherche:", error);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getPublicCategories();
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
    load();
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      load();
    }, 400);

    return () => clearTimeout(debounceTimer.current);
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-[#0F4C5C]">Catalogue</h1>
          <p className="text-gray-500">Découvrez tous nos livres disponibles</p>
        </div>

        {/* FILTRES */}
        <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="🔎 Rechercher un livre..."
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#9DBEBB]"
          />

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2"
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
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Toutes les langues</option>
            <option value="français">Français</option>
            <option value="anglais">Anglais</option>
            <option value="arabe">Arabe</option>
            <option value="allemand">Allemand</option>
            <option value="espagnol">Espagnol</option>
          </select>
        </div>

        {/* RESULTATS */}

        {books.length === 0 ? (
          <div className="text-center text-gray-500 bg-white rounded-xl p-10 shadow">
            Aucun livre trouvé.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {books.map((b) => {
              const cover = b.coverImage
                ? b.coverImage.startsWith("http")
                  ? b.coverImage
                  : `http://localhost:5000/${b.coverImage}`
                : "/placeholder-book.svg";

              return (
                <div
                  key={b._id}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
                >
                  <img
                    src={cover}
                    alt={b.title}
                    className="h-64 w-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-[#0F4C5C] line-clamp-2">
                      {b.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-1">
                      {b.authors?.join(", ") || "Auteur inconnu"}
                    </p>

                    <Link
                      to={`/books/${b._id}`}
                      className="block text-center bg-[#0F4C5C] text-white py-2 rounded-lg hover:bg-[#0c3c49]"
                    >
                      Voir le livre
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
