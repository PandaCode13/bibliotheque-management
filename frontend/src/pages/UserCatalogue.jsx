import { useEffect, useState } from "react";
import { getPublicBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { Link } from "react-router-dom";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    language: "",
  });

  const load = async () => {
    const res = await getPublicBooks(filters);
    setBooks(res.data);
  };

  useEffect(() => {
    load();
    getCategories().then((r) => setCategories(r.data));
  }, []);

  return (
    <div className="min-h-screen bg-red-800">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* HEADER */}
        <header className="mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Catalogue
          </h1>
          <p className="text-gray-500 mt-1">
            Explorez notre collection de livres
          </p>
        </header>

        {/* FILTRES */}
        <section className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Titre, auteur ou ISBN"
              value={filters.q}
              onChange={(e) =>
                setFilters({ ...filters, q: e.target.value })
              }
              className="h-[52px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="h-[52px] px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Langue"
              value={filters.language}
              onChange={(e) =>
                setFilters({ ...filters, language: e.target.value })
              }
              className="h-[52px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={load}
              className="h-[52px] bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Filtrer
            </button>

          </div>
        </section>

        {/* LIVRES */}
        <section>
          {books.length === 0 ? (
            <div className="bg-white rounded-lg p-10 text-center text-gray-500">
              Aucun livre trouvé.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
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
                    <h3 className="font-semibold text-gray-800 truncate">
                      {b.title}
                    </h3>

                    <p className="text-sm text-gray-500 truncate">
                      {b.authors?.join(", ") || "Auteur inconnu"}
                    </p>

                    <Link
                      to={`/books/${b._id}`}
                      className="inline-block text-sm font-medium text-indigo-600 hover:underline"
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
