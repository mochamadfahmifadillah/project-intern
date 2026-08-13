import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Brand */}
      <h1 className="text-xl font-bold text-black">Software Empire</h1>

      {/* User */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-black">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-gray-500">{user?.email || ""}</p>
        </div>

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
