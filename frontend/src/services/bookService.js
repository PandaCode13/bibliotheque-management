import api from "./api";

/* =========================
   ADMIN
========================= */

// Récupérer tous les livres (admin)
export const getBooksAdmin = () => api.get("/books");

// Créer un livre (upload cover + pdf)
export const createBook = (data) =>
  api.post("/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Modifier un livre
export const updateBook = (id, data) =>
  api.put(`/books/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Supprimer un livre
export const deleteBook = (id) => api.delete(`/books/${id}`);

/* =========================
   PUBLIC
========================= */

// Catalogue public
export const getPublicBooks = (params = {}) =>
  api.get("/books/public", { params });

// Détail d’un livre
export const getPublicBookById = (id) =>
  api.get(`/books/public/${id}`);

/* =========================
   LIKES / DISLIKES
========================= */

export const likeBook = (id) =>
  api.post(`/books/${id}/like`);

export const dislikeBook = (id) =>
  api.post(`/books/${id}/dislike`);

/* =========================
   COMMENTS
========================= */

export const getCommentsByBook = (id) =>
  api.get(`/books/${id}/comments`);

export const addComment = (id, text) =>
  api.post(`/books/${id}/comments`, { text });

/* =========================
   IMPORT CSV
========================= */

export const importBooks = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/books/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};