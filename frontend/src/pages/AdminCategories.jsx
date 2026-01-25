import { useEffect, useState } from "react";
import { getCategories, createCategory } from "../services/categoryService";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    parent: "",
  });

  const load = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createCategory({ ...form, parent: form.parent || null });
    setForm({ name: "", slug: "", description: "", parent: "" });
    load();
  };

  return (
    <div>
      <h2>Catégories</h2>

      <form onSubmit={submit}>
        <input placeholder="Nom" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Slug" value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <select
          value={form.parent}
          onChange={(e) => setForm({ ...form, parent: e.target.value })}
        >
          <option value="">Aucune (racine)</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button>Ajouter</button>
      </form>

      <ul>
        {categories.map((c) => (
          <li key={c._id}>
            {c.name}
            {c.parent && ` → ${c.parent.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
