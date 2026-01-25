import { useEffect, useState } from "react";
import {
  getBooksAdmin,
  createBook,
  deleteBook,
} from "../services/bookService";
import { getCategories } from "../services/categoryService";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    authors: "",
    isbn: "",
    category: "",
    language: "",
    publisher: "",
    totalCopies: 1,
  });

  const load = async () => {
    const [b, c] = await Promise.all([
      getBooksAdmin(),
      getCategories(),
    ]);
    setBooks(b.data);
    setCategories(c.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createBook({
      ...form,
      authors: form.authors.split(","),
    });
    setForm({
      title: "",
      authors: "",
      isbn: "",
      category: "",
      language: "",
      publisher: "",
      totalCopies: 1,
    });
    load();
  };

  const remove = async (id) => {
    if (confirm("Supprimer ce livre ?")) {
      await deleteBook(id);
      load();
    }
  };

  return (
    <div>
      <h2>Gestion des Livres</h2>

      <form onSubmit={submit}>
        <input placeholder="Titre" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <input placeholder="Auteurs (séparés par ,)" value={form.authors}
          onChange={(e) => setForm({ ...form, authors: e.target.value })} />

        <input placeholder="ISBN" value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })} />

        <select value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">Catégorie</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input placeholder="Langue" value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })} />

        <input placeholder="Éditeur" value={form.publisher}
          onChange={(e) => setForm({ ...form, publisher: e.target.value })} />

        <input type="number" value={form.totalCopies}
          onChange={(e) => setForm({ ...form, totalCopies: e.target.value })} />

        <button>Ajouter</button>
      </form>

      <hr />

      <ul>
        {books.map((b) => (
          <li key={b._id}>
            <strong>{b.title}</strong> — {b.authors.join(", ")}
            <button onClick={() => remove(b._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
