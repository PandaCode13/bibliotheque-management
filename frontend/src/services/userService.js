import api from "./api";

export const getUsers = () => api.get("/users");

export const updateUserRole = (id, role) =>
  api.patch(`/users/${id}/role`, { role });

export const toggleUserStatus = (id) =>
  api.patch(`/users/${id}/status`);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`);

// ⭐ FAVORIS (CORRECT)
export const getFavorites = () =>
  api.get("/users/favorites");

export const toggleFavorite = (bookId) =>
  api.post(`/users/favorites/${bookId}`);

export const getMe = () => api.get("/users/me");
export const updateMe = (data) => api.put("/users/me", data);

// Récupère les statistiques globales (users, books)
export const getStats = () => api.get("/stats");

export const getStatsFavorites = () => api.get("/dashboard");