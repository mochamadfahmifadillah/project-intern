import { FormEvent, useMemo, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const passwordMatch = useMemo(() => {
    if (!passwordConfirmation) {
      return null;
    }

    return password === passwordConfirmation;
  }, [password, passwordConfirmation]);

  const passwordValid = password.length >= 8;

  const formValid =
    currentPassword.length > 0 &&
    passwordValid &&
    passwordConfirmation.length >= 8 &&
    passwordMatch === true;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!currentPassword) {
      setError("Password saat ini wajib diisi.");
      return;
    }

    if (password.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password baru tidak sesuai.");
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

  const getInitial = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola informasi akun dan keamanan password Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Account Information */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-semibold text-white">
                {getInitial()}
              </div>

              <h2 className="mt-4 text-lg font-semibold text-black">
                {user?.name || "User"}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {user?.email || "-"}
              </p>
            </div>

            <div className="my-6 border-t border-gray-100" />

            {/* Account Details */}
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Name
                </p>

                <p className="mt-1 text-sm font-medium text-black">
                  {user?.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-medium text-black">
                  {user?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Role
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {user?.roles?.length ? (
                    user.roles.map((role) => (
                      <span
                        key={role.id}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
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
        </div>

        {/* Change Password */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
            {/* Section Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <svg
                    className="h-5 w-5 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-black">
                    Change Password
                  </h2>

                  <p className="mt-0.5 text-sm text-gray-500">
                    Perbarui password untuk menjaga keamanan akun.
                  </p>
                </div>
              </div>
            </div>

            {/* Success */}
            {message && (
              <div
                role="status"
                className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <p className="text-sm font-medium text-green-700">{message}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M12 8v5" />
                  <path strokeLinecap="round" d="M12 16h.01" />
                </svg>

                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Current Password */}
              <div>
                <label
                  htmlFor="current-password"
                  className="mb-1.5 block text-sm font-medium text-gray-900"
                >
                  Current Password
                </label>

                <div className="relative">
                  <input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    placeholder="Masukkan password saat ini"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/5"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label={
                      showCurrentPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showCurrentPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="new-password"
                  className="mb-1.5 block text-sm font-medium text-gray-900"
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password baru"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/5"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p
                    className={`text-xs ${
                      password.length === 0
                        ? "text-gray-400"
                        : passwordValid
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {password.length === 0
                      ? "Minimal 8 karakter"
                      : passwordValid
                        ? "✓ Password memenuhi panjang minimum"
                        : `${password.length}/8 karakter`}
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-1.5 block text-sm font-medium text-gray-900"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showPasswordConfirmation ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(event) =>
                      setPasswordConfirmation(event.target.value)
                    }
                    placeholder="Ulangi password baru"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className={`w-full rounded-xl border bg-white px-4 py-2.5 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                      passwordMatch === null
                        ? "border-gray-300 focus:border-black focus:ring-black/5"
                        : passwordMatch
                          ? "border-green-400 focus:border-green-500 focus:ring-green-500/10"
                          : "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswordConfirmation((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label={
                      showPasswordConfirmation
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPasswordConfirmation ? "🙈" : "👁"}
                  </button>
                </div>

                {passwordMatch !== null && (
                  <p
                    className={`mt-2 text-xs font-medium ${
                      passwordMatch ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {passwordMatch
                      ? "✓ Password cocok"
                      : "Password belum cocok"}
                  </p>
                )}
              </div>

              {/* Password Notice */}
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs leading-5 text-gray-500">
                  Gunakan password yang sulit ditebak dan jangan menggunakan
                  password yang sama dengan akun lain.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  disabled={loading || !formValid}
                  className="inline-flex min-w-[150px] items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
