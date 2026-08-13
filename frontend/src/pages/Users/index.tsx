import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface Role {
  id: number;
  name: string;
  description: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_id: string;
}

function Users() {
  const { hasPermission } = useAuth();

  const canCreate = hasPermission("users.create");
  const canEdit = hasPermission("users.edit");
  const canDelete = hasPermission("users.delete");

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [loading, setLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role_id: "",
  });

  const fetchUsers = async () => {
    try {
      setError("");

      const response = await api.get("/users");

      setUsers(response.data);
    } catch (err: any) {
      console.error("Gagal mengambil users:", err);

      setError(err.response?.data?.message || "Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      setRolesLoading(true);

      const response = await api.get("/roles");

      setRoles(response.data);
    } catch (err: any) {
      console.error("Gagal mengambil roles:", err);

      setError(err.response?.data?.message || "Gagal mengambil data role.");
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([fetchUsers(), fetchRoles()]);
    };

    initialize();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: "",
    });

    setEditingUser(null);
  };

  const closeModal = () => {
    if (submitting) {
      return;
    }

    setShowModal(false);
    resetForm();
  };

  const handleAdd = () => {
    if (!canCreate) {
      return;
    }

    resetForm();
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    if (!canEdit) {
      return;
    }

    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
      password_confirmation: "",
      role_id: user.roles?.length ? String(user.roles[0].id) : "",
    });

    setShowModal(true);
  };

  const handleDelete = async (user: User) => {
    if (!canDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Yakin ingin menghapus user "${user.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(user.id);
      setError("");

      await api.delete(`/users/${user.id}`);

      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== user.id),
      );
    } catch (err: any) {
      console.error("Gagal menghapus user:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal menghapus pengguna.");
      }
    } finally {
      setDeleting(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      if (editingUser) {
        if (!canEdit) {
          return;
        }

        await api.put(`/users/${editingUser.id}`, {
          name: form.name,
          email: form.email,
          role_id: form.role_id ? Number(form.role_id) : null,
        });
      } else {
        if (!canCreate) {
          return;
        }

        await api.post("/users", {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
          role_id: form.role_id ? Number(form.role_id) : null,
        });
      }

      closeModal();
      await fetchUsers();
    } catch (err: any) {
      console.error("Gagal menyimpan user:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal menyimpan pengguna.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-52 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-4 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="grid grid-cols-4 gap-4 px-6 py-5">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-44 animate-pulse rounded bg-gray-200" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-950">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola pengguna dan akses mereka ke dalam sistem.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            <span className="text-lg leading-none">+</span>
            Add User
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
          <div>
            <p className="font-medium">Terjadi kesalahan</p>
            <p className="mt-1 text-red-600">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-lg leading-none text-red-400 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-950">
              Daftar Pengguna
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {users.length} pengguna terdaftar
            </p>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
              👤
            </div>

            <h3 className="text-sm font-semibold text-gray-950">
              Belum ada pengguna
            </h3>

            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Belum ada pengguna yang terdaftar di sistem.
            </p>

            {canCreate && (
              <button
                type="button"
                onClick={handleAdd}
                className="mt-5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                Tambah pengguna
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Role
                  </th>

                  {(canEdit || canDelete) && (
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((user) => {
                  const userRoles = Array.isArray(user.roles) ? user.roles : [];

                  return (
                    <tr
                      key={user.id}
                      className="transition hover:bg-gray-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-950">
                              {user.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID #{user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        {userRoles.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {userRoles.map((role) => (
                              <span
                                key={role.id}
                                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                              >
                                {role.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">No role</span>
                        )}
                      </td>

                      {(canEdit || canDelete) && (
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-3">
                            {canEdit && (
                              <button
                                type="button"
                                onClick={() => handleEdit(user)}
                                disabled={deleting === user.id}
                                className="text-sm font-medium text-gray-700 transition hover:text-black hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Edit
                              </button>
                            )}

                            {canDelete && (
                              <button
                                type="button"
                                onClick={() => handleDelete(user)}
                                disabled={deleting === user.id}
                                className="text-sm font-medium text-red-600 transition hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                {deleting === user.id
                                  ? "Deleting..."
                                  : "Delete"}
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-950">
                  {editingUser ? "Edit User" : "Add User"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingUser
                    ? "Perbarui informasi pengguna."
                    : "Tambahkan pengguna baru ke dalam sistem."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 px-6 py-6">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-900">
                    Name
                  </label>

                  <input
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
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                    placeholder="Masukkan nama"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-900">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                    required
                    disabled={submitting}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                    placeholder="nama@email.com"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-900">
                    Role
                  </label>

                  <select
                    value={form.role_id}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        role_id: event.target.value,
                      })
                    }
                    disabled={submitting || rolesLoading}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                  >
                    <option value="">
                      {rolesLoading ? "Loading roles..." : "No Role"}
                    </option>

                    {!rolesLoading &&
                      roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                  </select>

                  <p className="mt-1.5 text-xs text-gray-400">
                    Role menentukan permission yang dimiliki pengguna.
                  </p>
                </div>

                {/* Password */}
                {!editingUser && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-900">
                        Password
                      </label>

                      <input
                        type="password"
                        value={form.password}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            password: event.target.value,
                          })
                        }
                        required
                        minLength={8}
                        disabled={submitting}
                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                        placeholder="Minimal 8 karakter"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-900">
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        value={form.password_confirmation}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            password_confirmation: event.target.value,
                          })
                        }
                        required
                        minLength={8}
                        disabled={submitting}
                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                        placeholder="Ulangi password"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingUser
                      ? "Save Changes"
                      : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
