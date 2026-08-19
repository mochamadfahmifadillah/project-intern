import { useCallback, useEffect, useState } from "react";

import {
  createRole,
  deleteRole,
  getPermissions,
  getRoles,
  updateRole,
} from "../../services/roleService";

import type { Permission, Role, RolePayload } from "../../types/role";

interface UseRolesOptions {
  canManagePermissions: boolean;
}

export function useRoles({ canManagePermissions }: UseRolesOptions) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [loading, setLoading] = useState(true);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Error Handler
  |--------------------------------------------------------------------------
  */

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            errors?: Record<string, string[]>;
          };
        };
      };

      const validationErrors = axiosError.response?.data?.errors;

      if (validationErrors) {
        return Object.values(validationErrors).flat().join(" ");
      }

      return axiosError.response?.data?.message || fallback;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return fallback;
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch Roles
  |--------------------------------------------------------------------------
  */

  const fetchRoles = useCallback(async () => {
    try {
      const data = await getRoles();

      setRoles(data);
    } catch (error) {
      console.error("Gagal mengambil roles:", error);

      setError(getErrorMessage(error, "Gagal mengambil data roles."));
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch Permissions
  |--------------------------------------------------------------------------
  */

  const fetchPermissions = useCallback(async () => {
    if (!canManagePermissions) {
      return;
    }

    try {
      setPermissionsLoading(true);

      const data = await getPermissions();

      setPermissions(data);
    } catch (error) {
      console.error("Gagal mengambil permissions:", error);

      setError(getErrorMessage(error, "Gagal mengambil data permissions."));
    } finally {
      setPermissionsLoading(false);
    }
  }, [canManagePermissions]);

  /*
  |--------------------------------------------------------------------------
  | Load Data
  |--------------------------------------------------------------------------
  */

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    await Promise.all([fetchRoles(), fetchPermissions()]);

    setLoading(false);
  }, [fetchRoles, fetchPermissions]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  const handleCreate = async (payload: RolePayload) => {
    try {
      setSubmitting(true);
      setError("");

      await createRole(payload);

      await fetchRoles();
    } catch (error) {
      console.error("Gagal membuat role:", error);

      setError(getErrorMessage(error, "Gagal membuat role."));

      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  const handleUpdate = async (id: number, payload: RolePayload) => {
    try {
      setSubmitting(true);
      setError("");

      await updateRole(id, payload);

      await fetchRoles();
    } catch (error) {
      console.error("Gagal memperbarui role:", error);

      setError(getErrorMessage(error, "Gagal memperbarui role."));

      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (id: number) => {
    try {
      setDeleting(id);
      setError("");

      await deleteRole(id);

      await fetchRoles();
    } catch (error) {
      console.error("Gagal menghapus role:", error);

      setError(getErrorMessage(error, "Gagal menghapus role."));
    } finally {
      setDeleting(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Clear Error
  |--------------------------------------------------------------------------
  */

  const clearError = () => {
    setError("");
  };

  return {
    roles,
    permissions,

    loading,
    permissionsLoading,

    submitting,
    deleting,

    error,

    handleCreate,
    handleUpdate,
    handleDelete,

    refresh,
    clearError,
  };
}
