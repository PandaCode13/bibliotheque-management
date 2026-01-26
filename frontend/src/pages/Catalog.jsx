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

  const load = async (customFilters = filters) => {
    const params = {};

    if (customFilters.q) params.q = customFilters.q;
    if (customFilters.category) params.category = customFilters.category;
    if (customFilters.language) params.language = customFilters.language;

    const res = await getPublicBooks(params);
    setBooks(res.data);
  };

  useEffect(() => {
    load();
    getCategories().then((r) => setCategories(r.data));
  }, []);

  return (
    <div className="min-h-screen bg-orange-100 p-6">
      <h2 className="text-4xl font-extrabold text-red-600 mb-6">
        Catalogue
      </h2>

      {/* FILTRES TEXTE */}
      <div className="bg-white border-4 border-red-500 rounded-lg p-4 mb-6 space-y-4">
        <input
          placeholder="Recherche (titre, auteur, ISBN)"
          value={filters.q}
          onChange={(e) =>
            setFilters({ ...filters, q: e.target.value })
          }
          className="w-full px-4 py-3 border-2 border-orange-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-400"
        />

        <input
          placeholder="Langue"
          value={filters.language}
          onChange={(e) =>
            setFilters({ ...filters, language: e.target.value })
          }
          className="w-full px-4 py-3 border-2 border-orange-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-400"
        />

        <button
          onClick={() => load()}
          className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition"
        >
          FILTRER
        </button>
      </div>

      {/* LIVRES */}
      <div className="space-y-4">
        {books.map((b) => (
          <div
            key={b._id}
            className="bg-white border-l-8 border-orange-500 rounded-lg p-4 shadow"
          >
            <h3 className="text-xl font-bold text-red-600">
              {b.title}
            </h3>

            <p className="text-gray-700">
              {b.authors?.join(", ") || "Auteur inconnu"}
            </p>

            <Link
              to={`/books/${b._id}`}
              className="inline-block mt-2 text-orange-600 font-semibold hover:underline"
            >
              Détails →
            </Link>
          </div>
        ))}

        {books.length === 0 && (
          <div className="bg-white p-6 rounded-lg text-center text-gray-500">
            Aucun livre trouvé pour cette catégorie.
          </div>
        )}
      </div>
    </div>
  );
}
