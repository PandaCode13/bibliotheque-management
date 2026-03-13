import { use, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const params = {};

    if (filters.q.trim() !== "") params.q = filters.q.trim();
    if (filters.category) params.category = filters.category;
    if (filters.language.trim() !== "")
      params.language = filters.language.trim();

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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      load();
    }, 500); // délai de 500ms après la dernière frappe
    return () => clearTimeout(delayDebounce); // nettoyer le timeout si les filtres changent avant le délai
  }, [filters.q, filters.category, filters.language]);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-12">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F4C5C]">
            Catalogue
          </h1>

          <p className="text-sm sm:text-base text-gray-600">
            Explorez notre collection de livres
          </p>
        </header>

        {/* FILTRES */}
        <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4
      "
          >
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Titre, auteur ou ISBN"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              className="
            h-[50px]
            px-4
            border border-gray-300
            rounded-lg
            text-sm sm:text-base
            focus:outline-none
            focus:ring-2
            focus:ring-[#9DBEBB]
          "
            />

            {/* CATEGORY */}
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="
            h-[50px]
            px-4
            border border-gray-300
            rounded-lg
            bg-white
            text-sm sm:text-base
            focus:outline-none
            focus:ring-2
            focus:ring-[#9DBEBB]
          "
            >
              <option value="">Toutes les catégories</option>

              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* LANGUAGE */}
            <select
              value={filters.language}
              onChange={(e) =>
                setFilters({ ...filters, language: e.target.value })
              }
              className="
            h-[50px]
            px-4
            border border-gray-300
            rounded-lg
            bg-white
            text-sm sm:text-base
            focus:outline-none
            focus:ring-2
            focus:ring-[#9DBEBB]
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

            {/* BUTTON */}
            <button
              onClick={load}
              className="
            h-[50px]
            bg-[#0F4C5C]
            text-[#FAFAF9]
            rounded-full
            font-semibold
            text-sm sm:text-base
            hover:bg-[#0C3E4B]
            transition
          "
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
            <div
              className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
        "
            >
              {books.map((b) => (
                <div
                  key={b._id}
                  className="
                bg-white
                rounded-2xl
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition
                overflow-hidden
                flex flex-col
              "
                >
                  <img
                    src={
                      b.coverImage
                        ? b.coverImage.startsWith("http")
                          ? b.coverImage
                          : `http://localhost:5000/${b.coverImage}`
                        : "/placeholder-book.svg"
                    }
                    alt={b.title}
                    className="h-52 sm:h-56 w-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-book.svg";
                    }}
                  />

                  <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
                    <div>
                      <h3 className="font-semibold text-[#0F4C5C] truncate">
                        {b.title}
                      </h3>

                      <p className="text-sm text-gray-500 truncate">
                        {b.authors?.join(", ") || "Auteur inconnu"}
                      </p>
                    </div>

                    <Link
                      to={`/books/${b._id}`}
                      className="
                    inline-block
                    text-sm
                    font-medium
                    text-[#0F4C5C]
                    hover:text-[#6FAFB0]
                    transition
                  "
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
