import { FormEvent, useState } from "react";
import { Eye, EyeOff, LoaderPinwheel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!email.includes("@")) {
      setError("Masukkan email yang valid.");
      return;
    }

    if (!password) {
      setError("Password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);

      setError(error.response?.data?.message || "Email atau password salah.");

      setLoading(false);
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="login-loader-large">
          <div className="login-waves-large" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-100 bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/software-empire.webp')" }}
    >
      {/* MAIN CARD */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-2">
        {/* LEFT - LOGIN */}
        <div className="relative flex items-center justify-center p-8">
          {/* LOGO & BRAND */}
          <div className="absolute left-0 right-0 top-8 flex items-center justify-center gap-3">
            <LoaderPinwheel className="h-7 w-7 text-black" />

            <h1 className="text-xl font-bold text-black">Software Empire</h1>
          </div>

          <div className="w-full max-w-md">
            {/* WELCOME */}
            <div className="mb-8 text-center">
              <p className="text-2xl font-bold text-black">Selamat Datang</p>

              <p className="mt-2 text-gray-500">
                Masukkan email dan kata sandi untuk masuk
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Masukkan Email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none transition focus:border-black"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-black outline-none transition focus:border-black"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-black"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="hidden p-6 lg:block">
          <img
            src="/software-empire.webp"
            alt="Project Magang"
            className="h-full min-h-[500px] w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
