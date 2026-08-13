import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";

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

function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    permission_ids: [] as number[],
  });

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (err) {
      console.error("Gagal mengambil roles:", err);
      setError("Gagal mengambil data roles.");
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await api.get("/permissions");
      setPermissions(response.data);
    } catch (err) {
      console.error("Gagal mengambil permissions:", err);
      setError("Gagal mengambil data permissions.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchRoles(),
        fetchPermissions(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      permission_ids: [],
    });

    setEditingRole(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);

    setForm({
      name: role.name,
      description: role.description ?? "",
      permission_ids: role.permissions.map(
        (permission) => permission.id
      ),
    });

    setShowModal(true);
  };

  const handlePermissionChange = (permissionId: number) => {
    setForm((current) => {
      const exists = current.permission_ids.includes(permissionId);

      return {
        ...current,
        permission_ids: exists
          ? current.permission_ids.filter(
              (id) => id !== permissionId
            )
          : [...current.permission_ids, permissionId],
      };
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        name: form.name,
        description: form.description || null,
        permission_ids: form.permission_ids,
      };

      if (editingRole) {
        await api.put(`/roles/${editingRole.id}`, payload);
      } else {
        await api.post("/roles", payload);
      }

      await fetchRoles();

      setShowModal(false);
      resetForm();
    } catch (err: any) {
      console.error("Gagal menyimpan role:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(
          Object.values(errors)
            .flat()
            .join(" ")
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Gagal menyimpan role."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (role: Role) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus role "${role.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/roles/${role.id}`);

      await fetchRoles();
    } catch (err: any) {
      console.error("Gagal menghapus role:", err);

      setError(
        err.response?.data?.message ||
          "Gagal menghapus role."
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Roles
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola role dan permission pengguna.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Role
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
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
                Permissions
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-6 py-4 text-sm font-medium text-black">
                  {role.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {role.description || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.length > 0 ? (
                      role.permissions.map((permission) => (
                        <span
                          key={permission.id}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-black"
                        >
                          {permission.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">
                        No permission
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(role)}
                    className="mr-3 text-sm font-medium text-black hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(role)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black">
                {editingRole ? "Edit Role" : "Add Role"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="text-xl text-gray-400 hover:text-black"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
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
                  placeholder="Contoh: manager"
                />
              </div>

              {/* Description */}
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
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="Deskripsi role"
                />
              </div>

              {/* Permissions */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-black">
                    Permissions
                  </label>

                  <span className="text-xs text-gray-500">
                    {form.permission_ids.length} dipilih
                  </span>
                </div>

                <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
                  {permissions.length > 0 ? (
                    permissions.map((permission) => (
                      <label
                        key={permission.id}
                        className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-0 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={form.permission_ids.includes(
                            permission.id
                          )}
                          onChange={() =>
                            handlePermissionChange(
                              permission.id
                            )
                          }
                          className="h-4 w-4"
                        />

                        <div>
                          <p className="text-sm font-medium text-black">
                            {permission.name}
                          </p>

                          {permission.description && (
                            <p className="text-xs text-gray-500">
                              {permission.description}
                            </p>
                          )}
                        </div>
                      </label>
                    ))
                  ) : (
                    <p className="px-4 py-6 text-center text-sm text-gray-400">
                      Tidak ada permission.
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
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
                    : editingRole
                      ? "Save Changes"
                      : "Add Role"}
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

