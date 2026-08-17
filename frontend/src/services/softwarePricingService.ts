import api from "./api";

export interface SoftwarePricing {
  id: number;
  software_id: number;
  pricing_type: "free" | "freemium" | "paid" | "custom";
  price: string | null;
  currency: string;
  billing_period: "monthly" | "yearly" | "one_time" | "custom" | null;
  description: string | null;

  software?: {
    id: number;
    name: string;
    slug: string;
  };

  created_at?: string;
  updated_at?: string;
}

export interface SoftwarePricingResponse {
  message: string;
  data: SoftwarePricing[];
}

export interface SoftwarePricingDetailResponse {
  message: string;
  data: SoftwarePricing;
}

export interface SoftwarePricingPayload {
  software_id: number;
  pricing_type: "free" | "freemium" | "paid" | "custom";
  price?: number;
  currency?: string;
  billing_period?: "monthly" | "yearly" | "one_time" | "custom";
  description?: string;
}

export const getSoftwarePricings = async () => {
  const response = await api.get<SoftwarePricingResponse>("/software-pricings");

  return response.data;
};

export const getSoftwarePricing = async (id: number) => {
  const response = await api.get<SoftwarePricingDetailResponse>(
    `/software-pricings/${id}`,
  );

  return response.data;
};

export const createSoftwarePricing = async (data: SoftwarePricingPayload) => {
  const response = await api.post<SoftwarePricingDetailResponse>(
    "/software-pricings",
    data,
  );

  return response.data;
};

export const updateSoftwarePricing = async (
  id: number,
  data: SoftwarePricingPayload,
) => {
  const response = await api.put<SoftwarePricingDetailResponse>(
    `/software-pricings/${id}`,
    data,
  );

  return response.data;
};

export const deleteSoftwarePricing = async (id: number) => {
  const response = await api.delete(`/software-pricings/${id}`);

  return response.data;
};
