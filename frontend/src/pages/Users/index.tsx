import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";

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

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [form, setForm] = useState({
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
    } catch (err) {
      console.error("Gagal mengambil users:", err);
      setError("Gagal mengambil data users.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (err) {
      console.error("Gagal mengambil roles:", err);
      setError("Gagal mengambil data roles.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
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

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
      password_confirmation: "",
      role_id: user.roles.length > 0 ? String(user.roles[0].id) : "",
    });

    setShowModal(true);
  };

  const handleDelete = async (user: User) => {
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

      await fetchUsers();
    } catch (err: any) {
      console.error("Gagal menghapus user:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal menghapus user.");
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
        await api.put(`/users/${editingUser.id}`, {
          name: form.name,
          email: form.email,
          role_id: form.role_id ? Number(form.role_id) : null,
        });
      } else {
        await api.post("/users", {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
          role_id: form.role_id ? Number(form.role_id) : null,
        });
      }

      resetForm();
      setShowModal(false);

      await fetchUsers();
    } catch (err: any) {
      console.error("Gagal menyimpan user:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal menyimpan user.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Users</h1>

          <p className="mt-1 text-sm text-gray-500">Kelola pengguna sistem.</p>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add User
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
                Email
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-black">
                Role
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-6 py-4 text-sm text-black">{user.name}</td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.roles.length > 0 ? (
                    user.roles.map((role) => (
                      <span
                        key={role.id}
                        className="mr-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-black"
                      >
                        {role.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">No role</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(user)}
                    disabled={deleting === user.id}
                    className="mr-3 text-sm font-medium text-black hover:underline disabled:opacity-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user)}
                    disabled={deleting === user.id}
                    className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deleting === user.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black">
                {editingUser ? "Edit User" : "Add User"}
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
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Role
                </label>

                <select
                  value={form.role_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role_id: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                >
                  <option value="">No Role</option>

                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password hanya saat Add */}
              {!editingUser && (
                <>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black">
                      Password
                    </label>

                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      required
                      minLength={8}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                      placeholder="Minimal 8 karakter"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-black">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      value={form.password_confirmation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password_confirmation: e.target.value,
                        })
                      }
                      required
                      minLength={8}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                      placeholder="Ulangi password"
                    />
                  </div>
                </>
              )}

              {/* Buttons */}
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
