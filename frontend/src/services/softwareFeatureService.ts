import api from "./api";

export interface SoftwareFeature {
  id: number;
  software_id: number;
  name: string;
  description: string | null;
  software?: {
    id: number;
    name: string;
    slug: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface SoftwareFeatureResponse {
  message: string;
  data: SoftwareFeature[];
}

export interface SoftwareFeatureDetailResponse {
  message: string;
  data: SoftwareFeature;
}

export interface SoftwareFeaturePayload {
  software_id: number;
  name: string;
  description?: string;
}

export const getSoftwareFeatures = async () => {
  const response = await api.get<SoftwareFeatureResponse>("/software-features");

  return response.data;
};

export const getSoftwareFeature = async (id: number) => {
  const response = await api.get<SoftwareFeatureDetailResponse>(
    `/software-features/${id}`,
  );

  return response.data;
};

export const createSoftwareFeature = async (data: SoftwareFeaturePayload) => {
  const response = await api.post<SoftwareFeatureDetailResponse>(
    "/software-features",
    data,
  );

  return response.data;
};

export const updateSoftwareFeature = async (
  id: number,
  data: SoftwareFeaturePayload,
) => {
  const response = await api.put<SoftwareFeatureDetailResponse>(
    `/software-features/${id}`,
    data,
  );

  return response.data;
};

export const deleteSoftwareFeature = async (id: number) => {
  const response = await api.delete(`/software-features/${id}`);

  return response.data;
};
