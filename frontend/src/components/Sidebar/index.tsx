import {
  BarChart3,
  Boxes,
  Building2,
  ChartNoAxesCombined,
  FileText,
  FolderTree,
  Handshake,
  LayoutDashboard,
  Link2,
  Network,
  Newspaper,
  Percent,
  Settings,
  ShieldCheck,
  Store,
  Tags,
  Users,
  UserPlus,
  Wrench,
  BriefcaseBusiness,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuSections = [
    {
      title: "CATALOG",
      items: [
        {
          name: "Software",
          path: "/softwares",
          icon: Boxes,
        },
        {
          name: "Vendors",
          path: "/vendors",
          icon: Store,
        },
        {
          name: "Categories",
          path: "/software-categories",
          icon: FolderTree,
        },
        {
          name: "Features",
          path: "/features",
          icon: Tags,
        },
        {
          name: "Industries",
          path: "/industries",
          icon: Building2,
        },
        {
          name: "Business Sizes",
          path: "/business-sizes",
          icon: BriefcaseBusiness,
        },
        {
          name: "Integrations",
          path: "/software-integrations",
          icon: Network,
        },
      ],
    },

    {
      title: "ENGAGEMENT",
      items: [
        {
          name: "Reviews",
          path: "/reviews",
          icon: FileText,
        },
        {
          name: "Implementation Leads",
          path: "/implementation-leads",
          icon: UserPlus,
        },
        {
          name: "Partners",
          path: "/partners",
          icon: Handshake,
        },
      ],
    },

    {
      title: "CONTENT",
      items: [
        {
          name: "Articles",
          path: "/articles",
          icon: Newspaper,
        },
        {
          name: "Tutorials",
          path: "/tutorials",
          icon: Wrench,
        },
        {
          name: "Case Studies",
          path: "/case-studies",
          icon: FileText,
        },
      ],
    },

    {
      title: "MONETIZATION",
      items: [
        {
          name: "Affiliate Programs",
          path: "/affiliate-programs",
          icon: Handshake,
        },
        {
          name: "Affiliate Links",
          path: "/affiliate-links",
          icon: Link2,
        },
        {
          name: "Commision",
          path: "/commision",
          icon: Percent,
        },
      ],
    },

    {
      title: "ANALYTICS",
      items: [
        {
          name: "Analytics",
          path: "/analytics",
          icon: ChartNoAxesCombined,
        },
      ],
    },

    {
      title: "SYSTEM",
      items: [
        {
          name: "Users & Roles",
          path: "/users",
          icon: Users,
        },
        {
          name: "Settings",
          path: "/settings",
          icon: Settings,
        },
        {
          name: "Audit Logs",
          path: "/audit-logs",
          icon: ShieldCheck,
        },
      ],
    },
  ];

  return (
    <aside
      className="
        sticky
        top-0
        flex
        h-screen
        w-64
        shrink-0
        flex-col
        overflow-hidden
      "
      style={{
        backgroundColor: "var(--primary)",
      }}
    >
      {/* =====================================================
          BRAND
      ====================================================== */}

      <div className="px-5 pb-6 pt-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
            "
            style={{
              backgroundColor: "var(--accent-yellow)",
            }}
          >
            <BarChart3
              className="h-5 w-5"
              style={{
                color: "var(--primary-dark)",
              }}
            />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-white">
              Software Empire
            </p>

            <p className="mt-0.5 text-[11px] text-white/50">Administration</p>
          </div>
        </div>
      </div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div
        className="mx-5 border-t"
        style={{
          borderColor: "rgba(255,255,255,0.10)",
        }}
      />

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {/* ===================================================
            DASHBOARD
        ==================================================== */}

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            [
              "group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5",
              "text-sm font-medium transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              isActive
                ? "text-white shadow-lg"
                : "text-white/65 hover:bg-white/10 hover:text-white",
            ].join(" ")
          }
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: "rgba(255,255,255,0.14)",
                }
              : undefined
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-6
                    w-1
                    -translate-y-1/2
                    rounded-r-full
                  "
                  style={{
                    backgroundColor: "var(--accent-yellow)",
                  }}
                />
              )}

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                "
                style={{
                  backgroundColor: isActive
                    ? "var(--accent-yellow)"
                    : "rgba(255,255,255,0.08)",
                  color: isActive
                    ? "var(--primary-dark)"
                    : "rgba(255,255,255,0.65)",
                }}
              >
                <LayoutDashboard className="h-4 w-4" />
              </span>

              <span>Dashboard</span>
            </>
          )}
        </NavLink>

        {/* ===================================================
            MENU SECTIONS
        ==================================================== */}

        <div className="mt-7 space-y-7">
          {menuSections.map((section) => (
            <div key={section.title}>
              {/* SECTION TITLE */}

              <p
                className="
                  mb-2
                  px-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                {section.title}
              </p>

              {/* SECTION ITEMS */}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        [
                          "group relative flex min-h-10 items-center gap-3 rounded-xl px-3 py-2",
                          "text-sm font-medium transition-all duration-200",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                          isActive
                            ? "text-white shadow-lg"
                            : "text-white/65 hover:bg-white/10 hover:text-white",
                        ].join(" ")
                      }
                      style={({ isActive }) =>
                        isActive
                          ? {
                              backgroundColor: "rgba(255,255,255,0.14)",
                            }
                          : undefined
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span
                              className="
                                absolute
                                left-0
                                top-1/2
                                h-5
                                w-1
                                -translate-y-1/2
                                rounded-r-full
                              "
                              style={{
                                backgroundColor: "var(--accent-yellow)",
                              }}
                            />
                          )}

                          <span
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              transition-all
                              duration-200
                            "
                            style={{
                              backgroundColor: isActive
                                ? "var(--accent-yellow)"
                                : "rgba(255,255,255,0.08)",
                              color: isActive
                                ? "var(--primary-dark)"
                                : "rgba(255,255,255,0.65)",
                            }}
                          >
                            <Icon className="h-4 w-4" />
                          </span>

                          <span className="truncate">{item.name}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* =====================================================
          BOTTOM INFO
      ====================================================== */}

      <div className="p-4 pt-2">
        <div
          className="
            rounded-2xl
            border
            px-4
            py-3.5
          "
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: "var(--accent-yellow)",
                boxShadow: "0 0 10px rgba(255,210,80,0.6)",
              }}
            />

            <p className="text-xs font-semibold text-white">Sistem Aktif</p>
          </div>

          <p className="mt-1.5 text-[11px] leading-5 text-white/45">
            Panel administrasi Software Empire
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
