import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { hasPermission } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      permission: null,
    },
    {
      name: "Users",
      path: "/users",
      permission: "users.view",
    },
    {
      name: "Roles",
      path: "/roles",
      permission: "roles.view",
    },
    {
      name: "Permissions",
      path: "/permissions",
      permission: "permissions.view",
    },
  ];

  const visibleMenuItems = menuItems.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return hasPermission(item.permission);
  });

  return (
    <aside className="min-h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white p-4">
      <nav className="space-y-1">
        {visibleMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
