import api from "./api";
import type { Permission, Role, RolePayload } from "../types/role";

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>("/roles");

  return response.data;
};

export const getPermissions = async (): Promise<Permission[]> => {
  const response = await api.get<Permission[]>("/permissions");

  return response.data;
};

export const createRole = async (payload: RolePayload): Promise<void> => {
  await api.post("/roles", payload);
};

export const updateRole = async (
  id: number,
  payload: RolePayload,
): Promise<void> => {
  await api.put(`/roles/${id}`, payload);
};

export const deleteRole = async (id: number): Promise<void> => {
  await api.delete(`/roles/${id}`);
};
