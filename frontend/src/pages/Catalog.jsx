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
    <div>
      <h2>Catalogue</h2>

      <input
        placeholder="Recherche (titre, auteur, ISBN)"
        value={filters.q}
        onChange={(e) => setFilters({ ...filters, q: e.target.value })}
      />

      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Langue"
        value={filters.language}
        onChange={(e) => setFilters({ ...filters, language: e.target.value })}
      />

      <button onClick={load}>Filtrer</button>

      <hr />

      <ul>
        {books.map((b) => (
          <li key={b._id}>
            <strong>{b.title}</strong> — {b.authors.join(", ")}
            <Link to={`/books/${b._id}`}> Détails</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
