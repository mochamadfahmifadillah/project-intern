// src/services/vendorService.ts

import api from "./api";

export interface Vendor {
  id: number;
  name: string;
  description?: string | null;
  website_url?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface VendorPayload {
  name: string;
  description: string;
  website_url: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
}

export async function getVendors() {
  return api.get("/vendors");
}

export async function getVendor(id: number) {
  return api.get(`/vendors/${id}`);
}

export async function createVendor(data: VendorPayload) {
  return api.post("/vendors", data);
}

export async function updateVendor(id: number, data: VendorPayload) {
  return api.put(`/vendors/${id}`, data);
}

export async function deleteVendor(id: number) {
  return api.delete(`/vendors/${id}`);
}
