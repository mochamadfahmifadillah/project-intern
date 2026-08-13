import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";

interface Permission {
  id: number;
  name: string;
  description: string | null;
}

function Permissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

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

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });

    setEditingPermission(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (permission: Permission) => {
    setEditingPermission(permission);

    setForm({
      name: permission.name,
      description: permission.description ?? "",
    });

    setShowModal(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      if (editingPermission) {
        await api.put(`/permissions/${editingPermission.id}`, form);
      } else {
        await api.post("/permissions", form);
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

  const handleDelete = async (permission: Permission) => {
    const confirmed = window.confirm(`Hapus permission "${permission.name}"?`);

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/permissions/${permission.id}`);

      await fetchPermissions();
    } catch (err: any) {
      console.error("Gagal menghapus permission:", err);

      setError(err.response?.data?.message || "Gagal menghapus permission.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Permissions</h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola permission sistem.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Permission
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-black">
                Name
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-black">
                Description
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {permissions.map((permission) => (
              <tr
                key={permission.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-6 py-4 text-sm font-medium text-black">
                  {permission.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {permission.description || "-"}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(permission)}
                    className="mr-3 text-sm font-medium text-black hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(permission)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {permissions.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-sm text-gray-400"
                >
                  Belum ada permission.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black">
                {editingPermission ? "Edit Permission" : "Add Permission"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-xl text-gray-400 hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="contoh: users.view"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="Deskripsi permission"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
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
