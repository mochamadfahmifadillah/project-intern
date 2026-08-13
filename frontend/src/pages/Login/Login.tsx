import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);

      setError(error.response?.data?.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">Project Magang</h1>

          <p className="mt-2 text-gray-500">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@projectmagang.test"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none transition focus:border-black"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none transition focus:border-black"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
