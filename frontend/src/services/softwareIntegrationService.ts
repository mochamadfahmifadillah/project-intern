import api from "../services/api";

export interface SoftwareIntegration {
  id: number;
  software_id: number;
  name: string;
  type: string | null;
  description: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  software?: {
    id: number;
    name: string;
  };
}

export interface SoftwareIntegrationPayload {
  software_id: number;
  name: string;
  type?: string | null;
  description?: string | null;
  website_url?: string | null;
  is_active?: boolean;
}

interface SoftwareIntegrationListResponse {
  data: SoftwareIntegration[];
}

interface SoftwareIntegrationResponse {
  data: SoftwareIntegration;
  message?: string;
}

interface DeleteResponse {
  message: string;
}

export async function getSoftwareIntegrations(): Promise<SoftwareIntegrationListResponse> {
  const response = await api.get<SoftwareIntegrationListResponse>(
    "/software-integrations",
  );

  return response.data;
}

export async function getSoftwareIntegration(
  id: number,
): Promise<SoftwareIntegrationResponse> {
  const response = await api.get<SoftwareIntegrationResponse>(
    `/software-integrations/${id}`,
  );

  return response.data;
}

export async function createSoftwareIntegration(
  data: SoftwareIntegrationPayload,
): Promise<SoftwareIntegrationResponse> {
  const response = await api.post<SoftwareIntegrationResponse>(
    "/software-integrations",
    data,
  );

  return response.data;
}

export async function updateSoftwareIntegration(
  id: number,
  data: Partial<SoftwareIntegrationPayload>,
): Promise<SoftwareIntegrationResponse> {
  const response = await api.put<SoftwareIntegrationResponse>(
    `/software-integrations/${id}`,
    data,
  );

  return response.data;
}

export async function deleteSoftwareIntegration(
  id: number,
): Promise<DeleteResponse> {
  const response = await api.delete<DeleteResponse>(
    `/software-integrations/${id}`,
  );

  return response.data;
}
