import { useEffect, useState } from "react";
import {
  getBooksAdmin,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService";
import { getCategories } from "../services/categoryService";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    isbn: "",
    category: "",
    language: "",
    publisher: "",
  });

  /* ======================
        LOAD DATA
  ====================== */
  const loadData = async () => {
    try {
      setLoading(true);
      const [booksRes, categoriesRes] = await Promise.all([
        getBooksAdmin(),
        getCategories(),
      ]);
      setBooks(booksRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error("Erreur chargement", err);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ======================
        HANDLE FORM CHANGE
  ====================== */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ======================
        CREATE/UPDATE BOOK
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const bookData = {
        ...formData,
        authors: formData.authors.split(",").map((a) => a.trim()),
      };

      if (editingBook) {
        // Modification
        const res = await updateBook(editingBook._id, bookData);
        setBooks(
          books.map((b) =>
            b._id === editingBook._id ? res.data : b
          )
        );
        setSuccess("Livre modifié avec succès !");
      } else {
        // Création
        const res = await createBook(bookData);
        setBooks([...books, res.data]);
        setSuccess("Livre créé avec succès !");
      }

      setFormData({
        title: "",
        authors: "",
        isbn: "",
        category: "",
        language: "",
        publisher: "",
      });
      setEditingBook(null);
      setShowForm(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'opération");
    }
  };

  /* ======================
        EDIT BOOK
  ====================== */
  const startEditBook = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      authors: book.authors.join(", "),
      isbn: book.isbn,
      category: book.category?._id || "",
      language: book.language || "",
      publisher: book.publisher || "",
    });
    setShowForm(true);
  };

  /* ======================
        DELETE BOOK
  ====================== */
  const removeBook = async (id) => {
    if (!window.confirm("Supprimer ce livre ? Cette action est irréversible.")) return;

    try {
      setError("");
      await deleteBook(id);
      setBooks(books.filter((b) => b._id !== id));
      setSuccess("Livre supprimé avec succès !");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  /* ======================
        PAGINATION
  ====================== */
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedBooks = books.slice(startIdx, endIdx);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Retour à la première page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-10 m-5">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F4C5C]">
          Gestion des livres
        </h2>
        <p className="text-gray-600 mt-1">
          Créer, modifier et supprimer des livres
        </p>
      </div>

      {/* MESSAGES */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* FORMULAIRE AJOUTER/MODIFIER */}
      <div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingBook(null);
            setFormData({
              title: "",
              authors: "",
              isbn: "",
              category: "",
              language: "",
              publisher: "",
            });
          }}
          className="mb-5 px-4 py-2 bg-[#0F4C5C] text-white rounded-lg hover:bg-[#0D3D4A]"
        >
          {showForm ? "Fermer" : "+ Ajouter un livre"}
        </button>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">
              {editingBook ? "Modifier le livre" : "Ajouter un nouveau livre"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Titre"
                value={formData.title}
                onChange={handleFormChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#0F4C5C]"
              />
              <input
                type="text"
                name="authors"
                placeholder="Auteurs (séparés par ,)"
                value={formData.authors}
                onChange={handleFormChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#0F4C5C]"
              />
              <input
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#0F4C5C]"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#0F4C5C]"
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <input
                type="text"
                name="language"
                placeholder="Langue"
                value={formData.language}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#0F4C5C]"
              />
              <input
                type="text"
                name="publisher"
                placeholder="Éditeur"
                value={formData.publisher}
                onChange={handleFormChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#0F4C5C]"
              />
              <div className="flex gap-2 md:col-span-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingBook ? "Modifier" : "Créer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBook(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#E6F1F0] text-[#0F4C5C]">
            <tr>
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Auteurs</th>
              <th className="p-3 text-left">ISBN</th>
              <th className="p-3 text-left">Catégorie</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Chargement...
                </td>
              </tr>
            )}

            {!loading && books.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Aucun livre
                </td>
              </tr>
            )}

            {paginatedBooks.map((book) => (
              <tr key={book._id} className="border-t">
                <td className="p-3 font-semibold">
                  {book.title}
                </td>

                <td className="p-3 text-gray-600">
                  {book.authors.join(", ")}
                </td>

                <td className="p-3 text-gray-600">
                  {book.isbn || "-"}
                </td>

                <td className="p-3 text-gray-600">
                  {book.category?.name || "-"}
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => startEditBook(book)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => removeBook(book._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Éléments par page */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-semibold">Éléments par page :</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#0F4C5C]"
            >
              <option value={15}>15</option>
              <option value={35}>35</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>

          {/* Info pagination */}
          <div className="text-gray-600 text-sm">
            Affichage {startIdx + 1} à {Math.min(endIdx, books.length)} sur {books.length} livres
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#0F4C5C] text-white rounded-lg hover:bg-[#0D3D4A] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              ← Précédent
            </button>

            <div className="px-4 py-2 bg-gray-100 rounded-lg text-center min-w-20">
              Page {currentPage} / {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#0F4C5C] text-white rounded-lg hover:bg-[#0D3D4A] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
