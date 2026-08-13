import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login", { replace: true });
  };

  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-xl font-bold text-black">Project Magang</h1>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="cursor-pointer text-sm font-medium text-black hover:underline"
        >
          {user?.name || "User"}
        </button>

        <button
          type="button"
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
