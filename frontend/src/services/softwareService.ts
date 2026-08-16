import api from "./api";

export interface Software {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  website_url: string | null;
  logo: string | null;
  status: "active" | "inactive";
  category?: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };
  created_at?: string;
  updated_at?: string;
}

export interface SoftwarePayload {
  category_id: number;
  name: string;
  slug?: string;
  description?: string;
  website_url?: string;
  logo?: string;
  status?: "active" | "inactive";
}

export const getSoftwares = async () => {
  const response = await api.get("/softwares");
  return response.data;
};

export const getSoftware = async (id: number) => {
  const response = await api.get(`/softwares/${id}`);
  return response.data;
};

export const createSoftware = async (data: SoftwarePayload) => {
  const response = await api.post("/softwares", data);
  return response.data;
};

export const updateSoftware = async (id: number, data: SoftwarePayload) => {
  const response = await api.put(`/softwares/${id}`, data);
  return response.data;
};

export const deleteSoftware = async (id: number) => {
  const response = await api.delete(`/softwares/${id}`);
  return response.data;
};
