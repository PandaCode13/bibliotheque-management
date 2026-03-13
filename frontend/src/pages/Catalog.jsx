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
      } catch (error) {
        console.error("Erreur chargement catégories:", error);
      }
    };

    loadCategories();
    load();
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      load();
    }, 500);
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">

        {/* HEADER */}
        <header className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F4C5C]">
            Catalogue
          </h1>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Explorez notre collection de livres
          </p>
        </header>

        {/* FILTRES */}
        <section
          className="
          bg-white rounded-xl shadow-sm
          p-4 sm:p-6
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
        >

          <input
            type="text"
            placeholder="Titre, auteur ou ISBN"
            value={filters.q}
            onChange={(e) =>
              setFilters({ ...filters, q: e.target.value })
            }
            className="
            w-full h-[48px] sm:h-[52px]
            px-4 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]
          "
          />

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="
            w-full h-[48px] sm:h-[52px]
            px-4 border border-gray-300 rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]
          "
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
            className="
            w-full h-[48px] sm:h-[52px]
            px-4 border border-gray-300 rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]
          "
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

        </section>

        {/* LIVRES */}
        <section>

          {books.length === 0 ? (
            <div className="bg-white rounded-xl p-8 sm:p-10 text-center text-gray-500 shadow-sm">
              Aucun livre trouvé.
            </div>
          ) : (

            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-6 sm:gap-8
            "
            >

              {books.map((b) => (

                <div
                  key={b._id}
                  className="
                  bg-white rounded-xl shadow-sm
                  hover:shadow-lg hover:-translate-y-1
                  transition duration-300
                  overflow-hidden
                "
                >

                  <img
                    src={b.coverImage || "/placeholder-book.svg"}
                    alt={b.title}
                    className="h-56 sm:h-60 w-full object-cover"
                  />

                  <div className="p-4 space-y-2">

                    <h3 className="font-semibold text-[#0F4C5C] text-sm sm:text-base truncate">
                      {b.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {b.authors?.join(", ") || "Auteur inconnu"}
                    </p>

                    <Link
                      to={`/book/${b._id}`}
                      className="
                      block text-center
                      bg-[#0F4C5C] text-white
                      py-2 rounded-lg
                      hover:bg-[#0C3A45]
                      transition
                      text-sm
                    "
                    >
                      Voir les détails
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