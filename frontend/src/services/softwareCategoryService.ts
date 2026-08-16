import api from "./api";

export interface SoftwareCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  softwares_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SoftwareCategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

export const getSoftwareCategories = async () => {
  const response = await api.get("/software-categories");
  return response.data;
};

export const getSoftwareCategory = async (id: number) => {
  const response = await api.get(`/software-categories/${id}`);
  return response.data;
};

export const createSoftwareCategory = async (data: SoftwareCategoryPayload) => {
  const response = await api.post("/software-categories", data);
  return response.data;
};

export const updateSoftwareCategory = async (
  id: number,
  data: SoftwareCategoryPayload,
) => {
  const response = await api.put(`/software-categories/${id}`, data);
  return response.data;
};

export const deleteSoftwareCategory = async (id: number) => {
  const response = await api.delete(`/software-categories/${id}`);
  return response.data;
};
