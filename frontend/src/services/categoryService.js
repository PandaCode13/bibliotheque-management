import api from "./api";

export const getCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const getPublicCategories = () =>
  api.get("/categories/public");
