import api from "./api";

/* ADMIN */
export const getBooksAdmin = () => api.get("/books");
export const createBook = (data) => api.post("/books", data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);

/* PUBLIC */
export const getPublicBooks = (params = {}) =>
  api.get("/books/public", { params });

export const getPublicBookById = (id) =>
  api.get(`/books/public/${id}`);


/* NOUVEAU */
export const likeBook = (id) =>
  api.post(`/books/${id}/like`);

export const dislikeBook = (id) =>
  api.post(`/books/${id}/dislike`);

export const getCommentsByBook = (id) =>
  api.get(`/books/${id}/comments`);

export const addComment = (id, text) =>
  api.post(`/books/${id}/comments`, { text });