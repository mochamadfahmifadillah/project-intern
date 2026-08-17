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
    {
      name: "Softwares",
      path: "/softwares",
      permission: "softwares.view",
    },
    {
      name: "Software Categories",
      path: "/software-categories",
      permission: "software-categories.view",
    },
  ];

  const visibleMenuItems = menuItems.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return hasPermission(item.permission);
  });

  const dashboard = visibleMenuItems.find(
    (item) => item.path === "/dashboard",
  );

  const managementItems = visibleMenuItems.filter(
    (item) => item.path !== "/dashboard",
  );

  return (
    <aside className="min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col p-4">
        {/* Navigation */}
        <nav className="space-y-6">
          {/* Main */}
          {dashboard && (
            <div>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Main
              </p>

              <NavLink
                to={dashboard.path}
                className={({ isActive }) =>
                  [
                    "flex min-h-11 items-center rounded-lg px-3 py-2.5",
                    "text-sm font-medium transition-colors duration-150",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black",
                  ].join(" ")
                }
              >
                <span>{dashboard.name}</span>
              </NavLink>
            </div>
          )}

          {/* Management */}
          {managementItems.length > 0 && (
            <div>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Management
              </p>

              <div className="space-y-1">
                {managementItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "flex min-h-11 items-center rounded-lg px-3 py-2.5",
                        "text-sm font-medium transition-colors duration-150",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                        isActive
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-black",
                      ].join(" ")
                    }
                  >
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Bottom Info */}
        <div className="mt-auto pt-6">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
            <p className="text-xs font-medium text-gray-700">
              Software Empire
            </p>

            <p className="mt-0.5 text-[11px] text-gray-400">
              Administration Panel
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

