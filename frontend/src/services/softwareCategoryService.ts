import api from "./api";

export interface SoftwareCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
  softwares_count?: number;
}

export interface SoftwareCategoryResponse {
  message: string;
  data: SoftwareCategory[];
}

export interface SoftwareCategoryDetailResponse {
  message: string;
  data: SoftwareCategory;
}

export interface CreateSoftwareCategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

export interface UpdateSoftwareCategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

export const getSoftwareCategories = async () => {
  const response = await api.get<SoftwareCategoryResponse>(
    "/software-categories"
  );

  return response.data;
};

export const getSoftwareCategory = async (id: number) => {
  const response = await api.get<SoftwareCategoryDetailResponse>(
    `/software-categories/${id}`
  );

  return response.data;
};

export const createSoftwareCategory = async (
  data: CreateSoftwareCategoryPayload
) => {
  const response = await api.post<SoftwareCategoryDetailResponse>(
    "/software-categories",
    data
  );

  return response.data;
};

export const updateSoftwareCategory = async (
  id: number,
  data: UpdateSoftwareCategoryPayload
) => {
  const response = await api.put<SoftwareCategoryDetailResponse>(
    `/software-categories/${id}`,
    data
  );

  return response.data;
};

export const deleteSoftwareCategory = async (id: number) => {
  const response = await api.delete(`/software-categories/${id}`);

  return response.data;
};