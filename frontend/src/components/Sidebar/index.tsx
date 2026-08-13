import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Users",
      path: "/users",
    },
    {
      name: "Roles",
      path: "/roles",
    },
    {
      name: "Permissions",
      path: "/permissions",
    },
  ];

  return (
    <aside className="min-h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => (
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
