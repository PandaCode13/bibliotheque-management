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
