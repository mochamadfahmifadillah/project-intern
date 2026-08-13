import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;

      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-xl font-bold text-black">Project Magang</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-black">Admin</span>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
