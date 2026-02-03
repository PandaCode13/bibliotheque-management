import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminGestionCategories() {
  /* ======================
        STATES
  ====================== */
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  /* ======================
        LOAD CATEGORIES
  ====================== */
  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  /* ======================
        ADD CATEGORY
  ====================== */
  const handleAdd = async () => {
    if (!name.trim()) return;

    const slug = name
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    try {
      const res = await api.post("/categories", {
        name: name.trim(),
        slug,
        description: description.trim() || null,
        parent: null,
      });

      setCategories([...categories, res.data]);
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Erreur ajout catégorie", err);
    }
  };

  /* ======================
        DELETE CATEGORY
  ====================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;

    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Erreur suppression catégorie", err);
    }
  };

  /* ======================
        EDIT CATEGORY
  ====================== */
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setEditName(cat.name);
    setEditDescription(cat.description || "");
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;

    const slug = editName
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    try {
      const res = await api.put(`/categories/${id}`, {
        name: editName.trim(),
        slug,
        description: editDescription.trim() || null,
      });

      setCategories(
        categories.map((c) =>
          c._id === id ? res.data : c
        )
      );

      setEditId(null);
    } catch (err) {
      console.error("Erreur modification catégorie", err);
    }
  };

  return (
    <div className="space-y-10 m-5">

      {/* ======================
            AJOUT CATÉGORIE
      ====================== */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-[#0F4C5C]">
          Ajouter une catégorie
        </h2>

        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
        />

        <textarea
          placeholder="Description (optionnelle)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-[#9DBEBB]"
        />

        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-[#0F4C5C] text-white 
                     rounded-lg hover:bg-[#0C3E4B]"
        >
          Ajouter
        </button>
      </div>

      {/* ======================
            TABLEAU CATÉGORIES
      ====================== */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#E6F1F0] text-[#0F4C5C]">
            <tr>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  Aucune catégorie
                </td>
              </tr>
            )}

            {categories.map((cat) => (
              <tr key={cat._id} className="border-t">
                <td className="p-3">
                  {editId === cat._id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    cat.name
                  )}
                </td>

                <td className="p-3 text-gray-500">
                  {cat.slug}
                </td>

                <td className="p-3">
                  {editId === cat._id ? (
                    <textarea
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(e.target.value)
                      }
                      rows={2}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    cat.description || "—"
                  )}
                </td>

                <td className="p-3 text-center space-x-2">
                  {editId === cat._id ? (
                    <button
                      onClick={() => handleUpdate(cat._id)}
                      className="px-4 py-1 bg-green-600 text-white rounded"
                    >
                      Sauvegarder
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(cat)}
                      className="px-4 py-1 bg-blue-600 text-white rounded"
                    >
                      Modifier
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-4 py-1 bg-red-600 text-white rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
