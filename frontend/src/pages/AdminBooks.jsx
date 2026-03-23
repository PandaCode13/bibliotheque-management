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
  const [Messagepdf, setMessagepdf] = useState(
    "Erreur de type de fichier! Le type de pdf doit être PDF ou ePub.",
  );
  const [MessageImage, setMessageImage] = useState(
    "Erreur de type de fichier! Le type de pdf doit être PNG, JPG ou JPEG uniquement.",
  );
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    isbn: "",
    category: "",
    language: "",
    cover: "",
    publisher: "",
    pdfBook: null,
    publishedDate: "",
    resume: "",
    tags: "",
  });
  const [preview, setPreview] = useState(null);

  const languages = [
    "Français",
    "Anglais",
    "Espagnol",
    "Allemand",
    "Italien",
    "Portugais",
    "Arabe",
    "Chinois",
    "Japonais",
    "Coréen",
    "Russe",
    "Hindi",
    "Turc",
    "Néerlandais",
    "Polonais",
    "Suédois",
    "Norvégien",
    "Finnois",
    "Danois",
    "Grec",
    "Hébreu",
    "Thaï",
    "Vietnamien",
    "Indonésien",
    "Malais",
    "Ukrainien",
    "Roumain",
    "Tchèque",
    "Hongrois",
    "Slovaque",
    "Croate",
    "Serbe",
    "Bulgare",
    "Catalan",
    "Persan",
  ];

  var fileTypes = ["application/pdf", "application/epub+zip"];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  var imageTypes = ["image/png", "image/jpg", "image/jpeg"];

  function validImgaeType(image) {
    return imageTypes.includes(image.type);
  }

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

  const handleCoverChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!validImgaeType(file)) {
      setMessageImage(
        "Type d'image incorrect. Autorisé : PNG, JPG, JPEG uniquement.",
      );
      return;
    }

    setMessageImage("");
    setCover(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!validFileType(file)) {
      setMessagepdf("Type de fichier invalide (PDF ou EPUB uniquement)");
      return;
    }

    setMessagepdf("");
    setFormData({ ...formData, pdfBook: file });
  };

  /* ======================
        CREATE/UPDATE BOOK
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const bookData = new FormData();

      /* ======================
        VALIDATION COVER
    ====================== */

      if (!cover) {
        setError("La couverture du livre est obligatoire");
        return;
      }

      if (!validImgaeType(cover)) {
        setMessageImage(
          "Type d'image incorrect. Autorisé : PNG, JPG ou JPEG uniquement.",
        );
        return;
      }

      /* ======================
        VALIDATION PDF
    ====================== */

      if (!formData.pdfBook) {
        setError("Le fichier du livre est obligatoire");
        return;
      }

      if (!validFileType(formData.pdfBook)) {
        setMessagepdf("Type de fichier invalide (PDF ou EPUB uniquement)");
        return;
      }

      /* ======================
        APPEND DATA
    ====================== */

      bookData.append("title", formData.title);
      bookData.append("isbn", formData.isbn);
      bookData.append("category", formData.category);
      bookData.append("language", formData.language);
      bookData.append("publisher", formData.publisher);

      bookData.append(
        "authors",
        JSON.stringify(formData.authors.split(",").map((a) => a.trim())),
      );

      bookData.append("coverImage", cover);
      bookData.append("pdfBook", formData.pdfBook);

      bookData.append("publishedDate", formData.publishedDate);
      bookData.append("resume", formData.resume);
      bookData.append("tags", formData.tags);

      /* ======================
        CREATE / UPDATE
    ====================== */

      let res;

      if (editingBook) {
        res = await updateBook(editingBook._id, bookData);

        setBooks(books.map((b) => (b._id === editingBook._id ? res.data : b)));

        setSuccess("Livre modifié avec succès !");
      } else {
        res = await createBook(bookData);

        setBooks([...books, res.data]);

        setSuccess("Livre ajouté avec succès !");
      }

      /* ======================
        RESET FORM
    ====================== */

      setFormData({
        title: "",
        authors: "",
        isbn: "",
        category: "",
        language: "Français",
        publisher: "",
        pdfBook: null,
        publishedDate: "",
        resume: "",
        tags: "",
      });

      setCover(null);
      setPreview(null);

      setEditingBook(null);
      setShowForm(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Erreur lors de l'enregistrement",
      );
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
      pdfBook: book.pdfBook || "",
      publishedDate: book.publishedDate || "",
      resume: book.resume || "",
      tags: book.tags || "",
    });
    setShowForm(true);
  };

  /* ======================
        DELETE BOOK
  ====================== */
  const removeBook = async (id) => {
    if (!window.confirm("Supprimer ce livre ? Cette action est irréversible."))
      return;

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

  const toggleBookVisibility = async (id, currentlyVisible) => {
    try {
      setError("");
      const updatedData = new FormData();
      updatedData.append("visible", !currentlyVisible);
      const res = await updateBook(id, updatedData);
      setBooks(books.map((b) => (b._id === id ? res.data : b)));
      setSuccess(
        `Livre ${!currentlyVisible ? "affiché" : "caché"} avec succès !`,
      );
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Erreur lors de la mise à jour de la visibilité`,
      );
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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-[#0F4C5C] mb-6 text-center">
                {editingBook ? "Modifier le livre" : "Ajouter un livre"}
              </h3>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Titre du livre"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  className="input-style"
                />

                <input
                  type="text"
                  name="authors"
                  placeholder="Auteurs (séparés par ,)"
                  value={formData.authors}
                  onChange={handleFormChange}
                  required
                  className="input-style"
                />

                <input
                  type="text"
                  name="isbn"
                  placeholder="ISBN"
                  value={formData.isbn}
                  onChange={handleFormChange}
                  required
                  className="input-style"
                />

                {/* CATEGORY */}
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                  className="input-style"
                >
                  <option value="">Choisir une catégorie</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {/* LANGUAGES */}
                <select
                  name="language"
                  value={formData.language || "Français"}
                  onChange={handleFormChange}
                  className="input-style"
                >
                  {languages.map((lang, i) => (
                    <option key={i} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="publisher"
                  placeholder="Éditeur"
                  value={formData.publisher}
                  onChange={handleFormChange}
                  required
                  className="input-style"
                />

                {/* COVER */}
                <div className="flex flex-col">
                  <label className="font-semibold">Couverture</label>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleCoverChange}
                    className="input-style"
                  />

                  {MessageImage && (
                    <p className="text-red-500 text-sm mt-1">{MessageImage}</p>
                  )}
                </div>

                {/* PDF */}
                <div className="flex flex-col">
                  <label className="font-semibold">PDF / EPUB</label>

                  <input
                    type="file"
                    accept=".pdf,.epub"
                    onChange={handlePdfChange}
                    className="input-style"
                  />

                  {Messagepdf && (
                    <p className="text-red-500 text-sm mt-1">{Messagepdf}</p>
                  )}
                </div>

                <input
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleFormChange}
                  required
                  className="input-style"
                />

                <textarea
                  name="resume"
                  placeholder="Résumé du livre"
                  value={formData.resume}
                  onChange={handleFormChange}
                  className="input-style md:col-span-2"
                />

                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (ex: programmation, PHP)"
                  value={formData.tags}
                  onChange={handleFormChange}
                  className="input-style md:col-span-2"
                />

                <div className="flex gap-4 md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  >
                    {editingBook ? "Modifier" : "Créer"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
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
              <th className="p-3 text-left">Cover</th>
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
                <td className="p-3 font-semibold">{book.title}</td>

                <td className="p-3 text-gray-600">{book.authors.join(", ")}</td>

                <td className="p-3 text-gray-600">{book.isbn || "-"}</td>

                <td className="p-3 text-gray-600">
                  {book.category?.name || "-"}
                </td>

                <td className="p-3">
                  {book.coverImage && (
                    <img
                      src={
                        book.coverImage.startsWith("http")
                          ? book.coverImage
                          : `http://localhost:5000/${book.coverImage}`
                      }
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                  )}
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

                  <button
                    onClick={() => toggleBookVisibility(book._id, book.visible)}
                    className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Afficher/Désafficher
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
            <label className="text-gray-700 font-semibold">
              Éléments par page :
            </label>
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
            Affichage {startIdx + 1} à {Math.min(endIdx, books.length)} sur{" "}
            {books.length} livres
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
