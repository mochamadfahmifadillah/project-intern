import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface DashboardStatistics {
  users: number;
  roles: number;
  permissions: number;
}

interface DashboardResponse {
  statistics: DashboardStatistics;
}

function Dashboard() {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const [statistics, setStatistics] = useState<DashboardStatistics | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<DashboardResponse>("/dashboard");

        setStatistics(response.data.statistics);
      } catch (err) {
        console.error("Gagal mengambil statistik dashboard:", err);
        setError("Gagal mengambil data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const statisticCards = [
    {
      title: "Total Users",
      value: statistics?.users ?? 0,
      description: "Pengguna terdaftar",
      path: "/users",
      permission: "users.view",
    },
    {
      title: "Total Roles",
      value: statistics?.roles ?? 0,
      description: "Role dalam sistem",
      path: "/roles",
      permission: "roles.view",
    },
    {
      title: "Total Permissions",
      value: statistics?.permissions ?? 0,
      description: "Permission tersedia",
      path: "/permissions",
      permission: "permissions.view",
    },
  ];

  const visibleCards = statisticCards.filter((card) => {
    return hasPermission(card.permission);
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div>
          <p className="text-sm font-medium text-gray-500">Overview</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-black">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Selamat datang kembali,{" "}
            <span className="font-semibold text-black">
              {user?.name || "User"}
            </span>
            . Berikut ringkasan data sistem saat ini.
          </p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-4"
        >
          <div>
            <p className="text-sm font-semibold text-red-700">
              Terjadi kesalahan
            </p>

            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Statistics */}
      <section aria-labelledby="statistics-heading">
        <div className="mb-4">
          <h2
            id="statistics-heading"
            className="text-base font-semibold text-black"
          >
            System Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Ringkasan data utama yang tersedia untuk akun Anda.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                <div className="mt-4 h-10 w-20 animate-pulse rounded-lg bg-gray-200" />

                <div className="mt-3 h-4 w-32 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : visibleCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.path)}
                className="group rounded-xl border border-gray-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>

                    <p className="mt-3 text-4xl font-bold tracking-tight text-black">
                      {card.value}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {card.description}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition group-hover:bg-black group-hover:text-white">
                    →
                  </span>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-gray-500 transition group-hover:text-black">
                    View {card.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
            <p className="text-sm font-medium text-gray-700">
              Tidak ada statistik yang tersedia.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Akun Anda belum memiliki permission untuk melihat data sistem.
            </p>
          </div>
        )}
      </section>

      {/* Quick Info */}
      {!loading && !error && (
        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-black">
                Quick Access
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Gunakan menu sidebar untuk mengelola sistem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {hasPermission("users.view") && (
                <button
                  type="button"
                  onClick={() => navigate("/users")}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 hover:text-black"
                >
                  Users
                </button>
              )}

              {hasPermission("roles.view") && (
                <button
                  type="button"
                  onClick={() => navigate("/roles")}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 hover:text-black"
                >
                  Roles
                </button>
              )}

              {hasPermission("permissions.view") && (
                <button
                  type="button"
                  onClick={() => navigate("/permissions")}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 hover:text-black"
                >
                  Permissions
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
