import api from "./api";

export const getUsers = () => api.get("/users");
export const updateUserRole = (id, role) =>
  api.patch(`/users/${id}/role`, { role });
export const toggleUserStatus = (id) =>
  api.patch(`/users/${id}/status`);
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);
