import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface Permission {
  id: number;
  name: string;
  description: string | null;
}

interface Role {
  id: number;
  name: string;
  description: string | null;
  permissions: Permission[];
}

interface RoleForm {
  name: string;
  description: string;
  permission_ids: number[];
}

function Roles() {
  const { hasPermission } = useAuth();

  const canCreate = hasPermission("roles.create");
  const canEdit = hasPermission("roles.edit");
  const canDelete = hasPermission("roles.delete");

  const canManagePermissions = canCreate || canEdit;

  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [loading, setLoading] = useState(true);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [form, setForm] = useState<RoleForm>({
    name: "",
    description: "",
    permission_ids: [],
  });

  /**
   * Mengambil roles.
   */
  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");

      setRoles(response.data);
    } catch (err: any) {
      console.error("Gagal mengambil roles:", err);

      setError(err.response?.data?.message || "Gagal mengambil data roles.");
    }
  };

  /**
   * Mengambil permissions hanya ketika
   * user memang punya hak untuk mengelola role.
   */
  const fetchPermissions = async () => {
    if (!canManagePermissions) {
      return;
    }

    try {
      setPermissionsLoading(true);

      const response = await api.get("/permissions");

      setPermissions(response.data);
    } catch (err: any) {
      console.error("Gagal mengambil permissions:", err);

      setError(
        err.response?.data?.message || "Gagal mengambil data permissions.",
      );
    } finally {
      setPermissionsLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      await Promise.all([fetchRoles(), fetchPermissions()]);

      setLoading(false);
    };

    loadData();
  }, [canManagePermissions]);

  /**
   * Reset form.
   */
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      permission_ids: [],
    });

    setEditingRole(null);
  };

  /**
   * Buka modal Add.
   */
  const handleAdd = () => {
    if (!canCreate) {
      return;
    }

    resetForm();
    setShowModal(true);
  };

  /**
   * Buka modal Edit.
   */
  const handleEdit = (role: Role) => {
    if (!canEdit) {
      return;
    }

    setEditingRole(role);

    setForm({
      name: role.name,
      description: role.description ?? "",
      permission_ids: Array.isArray(role.permissions)
        ? role.permissions.map((permission) => permission.id)
        : [],
    });

    setShowModal(true);
  };

  /**
   * Toggle permission.
   */
  const handlePermissionChange = (permissionId: number) => {
    setForm((current) => {
      const exists = current.permission_ids.includes(permissionId);

      return {
        ...current,
        permission_ids: exists
          ? current.permission_ids.filter((id) => id !== permissionId)
          : [...current.permission_ids, permissionId],
      };
    });
  };

  /**
   * Pilih semua permission.
   */
  const handleSelectAll = () => {
    setForm((current) => ({
      ...current,
      permission_ids: permissions.map((permission) => permission.id),
    }));
  };

  /**
   * Hapus semua permission.
   */
  const handleClearAll = () => {
    setForm((current) => ({
      ...current,
      permission_ids: [],
    }));
  };

  /**
   * Submit Add / Edit.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ((editingRole && !canEdit) || (!editingRole && !canCreate)) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        permission_ids: form.permission_ids,
      };

      if (editingRole) {
        await api.put(`/roles/${editingRole.id}`, payload);
      } else {
        await api.post("/roles", payload);
      }

      await fetchRoles();

      closeModal();
    } catch (err: any) {
      console.error("Gagal menyimpan role:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal menyimpan role.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Delete role.
   */
  const handleDelete = async (role: Role) => {
    if (!canDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Yakin ingin menghapus role "${role.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(role.id);
      setError("");

      await api.delete(`/roles/${role.id}`);

      await fetchRoles();
    } catch (err: any) {
      console.error("Gagal menghapus role:", err);

      setError(err.response?.data?.message || "Gagal menghapus role.");
    } finally {
      setDeleting(null);
    }
  };

  /**
   * Tutup modal.
   */
  const closeModal = () => {
    if (submitting) {
      return;
    }

    setShowModal(false);
    resetForm();
  };

  /**
   * Loading skeleton.
   */
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-4 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="grid grid-cols-4 gap-6 px-6 py-5">
                {[1, 2, 3, 4].map((column) => (
                  <div
                    key={column}
                    className="h-4 animate-pulse rounded bg-gray-100"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Roles
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola role dan akses permission pengguna.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            + Add Role
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span className="font-medium">Error:</span>
          <span>{error}</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {roles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Description
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Permissions
                  </th>

                  {(canEdit || canDelete) && (
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {roles.map((role) => {
                  const rolePermissions = Array.isArray(role.permissions)
                    ? role.permissions
                    : [];

                  const isDeleting = deleting === role.id;

                  return (
                    <tr key={role.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-5 align-top">
                        <p className="text-sm font-semibold text-black">
                          {role.name}
                        </p>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <p className="max-w-xs text-sm leading-6 text-gray-600">
                          {role.description || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-5 align-top">
                        {rolePermissions.length > 0 ? (
                          <div className="flex max-w-md flex-wrap gap-1.5">
                            {rolePermissions.map((permission) => (
                              <span
                                key={permission.id}
                                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                              >
                                {permission.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No permission
                          </span>
                        )}
                      </td>

                      {(canEdit || canDelete) && (
                        <td className="px-6 py-5 text-right align-top">
                          <div className="inline-flex items-center gap-3">
                            {canEdit && (
                              <button
                                type="button"
                                onClick={() => handleEdit(role)}
                                disabled={isDeleting}
                                className="text-sm font-medium text-black transition hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Edit
                              </button>
                            )}

                            {canDelete && (
                              <button
                                type="button"
                                onClick={() => handleDelete(role)}
                                disabled={isDeleting}
                                className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <span className="text-lg font-semibold text-gray-500">R</span>
            </div>

            <h2 className="text-sm font-semibold text-black">Belum ada role</h2>

            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Belum ada role yang tersedia di sistem.
              {canCreate &&
                " Tambahkan role pertama untuk mulai mengatur akses pengguna."}
            </p>

            {canCreate && (
              <button
                type="button"
                onClick={handleAdd}
                className="mt-5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                + Add Role
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-modal-title"
          >
            {/* Modal Header */}
            <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="role-modal-title"
                    className="text-lg font-semibold text-black"
                  >
                    {editingRole ? "Edit Role" : "Add Role"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {editingRole
                      ? "Perbarui informasi dan akses role."
                      : "Buat role baru beserta aksesnya."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  aria-label="Tutup modal"
                  className="rounded-lg p-1 text-xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-black disabled:opacity-40"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="role-name"
                  className="mb-1.5 block text-sm font-medium text-black"
                >
                  Role name
                </label>

                <input
                  id="role-name"
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  required
                  autoFocus
                  disabled={submitting}
                  placeholder="Contoh: manager"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-50"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="role-description"
                  className="mb-1.5 block text-sm font-medium text-black"
                >
                  Description
                  <span className="ml-1 font-normal text-gray-400">
                    (opsional)
                  </span>
                </label>

                <textarea
                  id="role-description"
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  rows={3}
                  disabled={submitting}
                  placeholder="Jelaskan fungsi role ini..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-50"
                />
              </div>

              {/* Permissions */}
              {canManagePermissions && (
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <label className="block text-sm font-medium text-black">
                        Permissions
                      </label>

                      <p className="mt-0.5 text-xs text-gray-500">
                        Pilih akses yang dimiliki role ini.
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                      {form.permission_ids.length} dipilih
                    </span>
                  </div>

                  {permissionsLoading ? (
                    <div className="space-y-2 rounded-lg border border-gray-200 p-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-lg p-2"
                        >
                          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                          <div className="h-4 flex-1 animate-pulse rounded bg-gray-100" />
                        </div>
                      ))}
                    </div>
                  ) : permissions.length > 0 ? (
                    <>
                      <div className="mb-2 flex justify-end gap-3 text-xs">
                        <button
                          type="button"
                          onClick={handleSelectAll}
                          disabled={submitting}
                          className="font-medium text-black hover:underline disabled:opacity-40"
                        >
                          Pilih semua
                        </button>

                        <button
                          type="button"
                          onClick={handleClearAll}
                          disabled={submitting}
                          className="font-medium text-gray-500 hover:text-black hover:underline disabled:opacity-40"
                        >
                          Hapus pilihan
                        </button>
                      </div>

                      <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
                        {permissions.map((permission) => {
                          const checked = form.permission_ids.includes(
                            permission.id,
                          );

                          return (
                            <label
                              key={permission.id}
                              className={`flex cursor-pointer items-start gap-3 border-b border-gray-100 px-4 py-3 transition last:border-0 ${
                                checked ? "bg-gray-50" : "hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                  handlePermissionChange(permission.id)
                                }
                                disabled={submitting}
                                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-black"
                              />

                              <div className="min-w-0">
                                <p className="text-sm font-medium text-black">
                                  {permission.name}
                                </p>

                                {permission.description && (
                                  <p className="mt-0.5 text-xs leading-5 text-gray-500">
                                    {permission.description}
                                  </p>
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center">
                      <p className="text-sm font-medium text-gray-600">
                        Belum ada permission
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Buat permission terlebih dahulu sebelum mengaturnya ke
                        role.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Form Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    !form.name.trim() ||
                    (editingRole ? !canEdit : !canCreate)
                  }
                  className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingRole
                      ? "Save Changes"
                      : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;
