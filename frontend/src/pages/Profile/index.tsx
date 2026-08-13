import { FormEvent, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password baru tidak sesuai.");
      return;
    }

    if (password.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put("/user/password", {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage(response.data.message);

      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (err: any) {
      console.error("Gagal mengubah password:", err);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;

        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal mengubah password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black">Profile</h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola informasi akun dan password Anda.
        </p>
      </div>

      {/* Informasi User */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-black">
          Informasi Akun
        </h2>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-sm font-medium text-black">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-sm font-medium text-black">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>

            <div className="mt-1 flex flex-wrap gap-2">
              {user?.roles?.length ? (
                user.roles.map((role) => (
                  <span
                    key={role.id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-black"
                  >
                    {role.name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">No Role</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-black">Change Password</h2>

          <p className="mt-1 text-sm text-gray-500">
            Masukkan password saat ini untuk membuat password baru.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder="Masukkan password saat ini"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimal 8 karakter"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Confirm New Password
            </label>

            <input
              type="password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              placeholder="Ulangi password baru"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
