import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface Permission {
  id: number;
  name: string;
  description: string | null;
}

interface PermissionForm {
  name: string;
  description: string;
}

function Permissions() {
  const { hasPermission } = useAuth();

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null,
  );

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [form, setForm] = useState<PermissionForm>({
    name: "",
    description: "",
  });

  const canCreate = hasPermission("permissions.create");
  const canEdit = hasPermission("permissions.edit");
  const canDelete = hasPermission("permissions.delete");

  /**
   * Mengambil semua permission.
   */
  const fetchPermissions = async () => {
    try {
      setError("");

      const response = await api.get("/permissions");

      setPermissions(response.data);
    } catch (err: any) {
      console.error("Gagal mengambil permissions:", err);

      setError(
        err.response?.data?.message || "Gagal mengambil data permissions.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  /**
   * Reset form.
   */
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });

    setEditingPermission(null);
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
   * Buka modal tambah permission.
   */
  const handleAdd = () => {
    if (!canCreate) {
      return;
    }

    resetForm();
    setShowModal(true);
  };

  /**
   * Buka modal edit permission.
   */
  const handleEdit = (permission: Permission) => {
    if (!canEdit) {
      return;
    }

    setEditingPermission(permission);

    setForm({
      name: permission.name,
      description: permission.description ?? "",
    });

    setShowModal(true);
  };

  /**
   * Submit tambah / edit permission.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingPermission && !canEdit) {
      return;
    }

    if (!editingPermission && !canCreate) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
      };

      if (editingPermission) {
        await api.put(`/permissions/${editingPermission.id}`, payload);
      } else {
        await api.post("/permissions", payload);
      }

      setShowModal(false);
      resetForm();

      await fetchPermissions();
    } catch (err: any) {
      console.error("Gagal menyimpan permission:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal menyimpan permission.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Hapus permission.
   */
  const handleDelete = async (permission: Permission) => {
    if (!canDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Yakin ingin menghapus permission "${permission.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(permission.id);
      setError("");

      await api.delete(`/permissions/${permission.id}`);

      await fetchPermissions();
    } catch (err: any) {
      console.error("Gagal menghapus permission:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal menghapus permission.");
      }
    } finally {
      setDeleting(null);
    }
  };

  /**
   * Loading skeleton.
   */
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-200" />
          </div>

          {canCreate && (
            <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="grid grid-cols-3 gap-4 px-6 py-5">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />

                <div className="flex gap-3">
                  <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Access Control</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-black">
            Permissions
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Kelola permission yang digunakan untuk mengatur akses sistem.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={handleAdd}
            className="shrink-0 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            + Add Permission
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-4"
        >
          <div>
            <p className="text-sm font-semibold text-red-700">
              Terjadi kesalahan
            </p>

            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 text-lg leading-none text-red-400 hover:text-red-700"
            aria-label="Tutup pesan error"
          >
            ×
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Description
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {permissions.map((permission) => {
                const isDeleting = deleting === permission.id;

                return (
                  <tr
                    key={permission.id}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs font-medium text-gray-800">
                        {permission.name}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {permission.description || (
                        <span className="text-gray-400">No description</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => handleEdit(permission)}
                            disabled={isDeleting}
                            className="text-sm font-semibold text-black transition hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Edit
                          </button>
                        )}

                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => handleDelete(permission)}
                            disabled={isDeleting}
                            className="text-sm font-semibold text-red-600 transition hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        )}

                        {!canEdit && !canDelete && (
                          <span className="text-sm text-gray-400">
                            View only
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Empty State */}
              {permissions.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    <div className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-xl text-gray-500">✓</span>
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-gray-900">
                        Belum ada permission
                      </h3>

                      <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                        Belum ada permission yang tersedia di sistem.
                      </p>

                      {canCreate && (
                        <button
                          type="button"
                          onClick={handleAdd}
                          className="mt-5 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                          + Add Permission
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="permission-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="permission-modal-title"
                  className="text-xl font-semibold text-black"
                >
                  {editingPermission ? "Edit Permission" : "Add Permission"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingPermission
                    ? "Perbarui informasi permission."
                    : "Tambahkan permission baru ke sistem."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="rounded-lg p-1 text-xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-black disabled:opacity-40"
                aria-label="Tutup modal"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="permission-name"
                  className="mb-1.5 block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>

                <input
                  id="permission-name"
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  required
                  disabled={submitting}
                  autoFocus
                  placeholder="contoh: users.view"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <p className="mt-1.5 text-xs text-gray-500">
                  Gunakan format resource.action, misalnya users.view.
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="permission-description"
                  className="mb-1.5 block text-sm font-semibold text-gray-800"
                >
                  Description
                </label>

                <textarea
                  id="permission-description"
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  rows={3}
                  disabled={submitting}
                  placeholder="Deskripsi permission"
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingPermission
                      ? "Save Changes"
                      : "Add Permission"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Permissions;
