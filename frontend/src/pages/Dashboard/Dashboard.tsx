import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  KeyRound,
  Loader2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface DashboardStatistics {
  users: number | null;
  roles: number | null;
  permissions: number | null;
}

interface DashboardResponse {
  statistics: DashboardStatistics;
}

/*
|--------------------------------------------------------------------------
| Dashboard Card Type
|--------------------------------------------------------------------------
*/

interface StatisticCard {
  title: string;
  value: number | null;
  description: string;
  path: string;
  permission: string;
  icon: typeof Users;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

function Dashboard() {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const [statistics, setStatistics] = useState<DashboardStatistics | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Dashboard
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<DashboardResponse>("/dashboard");

        if (!mounted) {
          return;
        }

        setStatistics(response.data.statistics);
      } catch (err: unknown) {
        console.error("Gagal mengambil statistik dashboard:", err);

        if (!mounted) {
          return;
        }

        setStatistics(null);

        if (typeof err === "object" && err !== null && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: {
                message?: string;
              };
            };
          };

          setError(
            axiosError.response?.data?.message ||
              "Gagal mengambil data dashboard.",
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Gagal mengambil data dashboard.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Statistic Cards
  |--------------------------------------------------------------------------
  */

  const statisticCards: StatisticCard[] = useMemo(
    () => [
      {
        title: "Total Pengguna",
        value: statistics?.users ?? null,
        description: "Pengguna yang terdaftar dalam sistem",
        path: "/users",
        permission: "users.view",
        icon: Users,
      },
      {
        title: "Total Role",
        value: statistics?.roles ?? null,
        description: "Role yang tersedia dalam sistem",
        path: "/roles",
        permission: "roles.view",
        icon: ShieldCheck,
      },
      {
        title: "Total Permission",
        value: statistics?.permissions ?? null,
        description: "Permission yang tersedia dalam sistem",
        path: "/permissions",
        permission: "permissions.view",
        icon: KeyRound,
      },
    ],
    [statistics],
  );

  /*
  |--------------------------------------------------------------------------
  | Visible Cards
  |--------------------------------------------------------------------------
  |
  | Hanya tampilkan card jika user memiliki permission view.
  |
  */

  const visibleCards = useMemo(() => {
    return statisticCards.filter((card) => hasPermission(card.permission));
  }, [statisticCards, hasPermission]);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        min-h-full
        rounded-3xl
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-8
        lg:py-10
      "
      style={{
        backgroundColor: "var(--primary)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">
          <div
            className="
              rounded-3xl
              border
              px-6
              py-7
              shadow-xl
              sm:px-8
              sm:py-9
            "
            style={{
              backgroundColor: "rgba(255,255,255,0.10)",
              borderColor: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
              "
              style={{
                color: "var(--accent-yellow)",
              }}
            >
              Ringkasan Sistem
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Selamat datang kembali,{" "}
              <span className="font-semibold text-white">
                {user?.name || "User"}
              </span>
              . Pantau dan kelola data utama sistem Anda dari satu tempat.
            </p>
          </div>
        </div>

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <div
            role="alert"
            className="
              mb-6
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
            style={{
              backgroundColor: "#FFF7ED",
              borderColor: "#FED7AA",
            }}
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
              className="
                shrink-0
                rounded-xl
                border
                border-red-200
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-red-700
                transition
                hover:bg-red-50
              "
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <section aria-labelledby="statistics-heading">
          <div className="mb-5">
            <h2
              id="statistics-heading"
              className="text-xl font-bold text-white"
            >
              Statistik Sistem
            </h2>

            <p className="mt-1 text-sm text-white/60">
              Ringkasan data utama yang dapat Anda akses.
            </p>
          </div>

          {/* =================================================
              LOADING
          ================================================== */}

          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    animate-pulse
                    rounded-3xl
                    border
                    bg-white/10
                    p-6
                  "
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/20" />

                  <div className="mt-6 h-4 w-28 rounded bg-white/20" />

                  <div className="mt-4 h-10 w-20 rounded-lg bg-white/20" />

                  <div className="mt-3 h-4 w-40 rounded bg-white/20" />

                  <div className="mt-6 h-px w-full bg-white/10" />
                </div>
              ))}
            </div>
          ) : error ? (
            /* =================================================
               ERROR STATE
            ================================================== */

            <div
              className="
                rounded-3xl
                border
                bg-white/10
                px-6
                py-12
                text-center
              "
              style={{
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <p className="text-sm font-semibold text-white">
                Statistik tidak dapat dimuat
              </p>

              <p className="mt-1 text-sm text-white/60">
                Silakan coba kembali beberapa saat lagi.
              </p>
            </div>
          ) : visibleCards.length > 0 ? (
            /* =================================================
               STATISTIC CARDS
            ================================================== */

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleCards.map((card) => {
                const Icon = card.icon;

                return (
                  <button
                    key={card.title}
                    type="button"
                    onClick={() => navigate(card.path)}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-3xl
                      border
                      bg-white
                      p-6
                      text-left
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-2xl
                      focus:outline-none
                      focus:ring-2
                      focus:ring-white/50
                    "
                    style={{
                      borderColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    {/* Decorative Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-12
                        -top-12
                        h-32
                        w-32
                        rounded-full
                        opacity-0
                        blur-3xl
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                      style={{
                        backgroundColor: "var(--lavender)",
                      }}
                    />

                    <div className="relative">
                      {/* Top */}

                      <div className="flex items-start justify-between">
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                          "
                          style={{
                            backgroundColor: "var(--lavender-soft)",
                            color: "var(--primary)",
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                          "
                          style={{
                            backgroundColor: "var(--accent-yellow)",
                            color: "var(--primary-dark)",
                          }}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Title */}

                      <p
                        className="
                          mt-6
                          text-sm
                          font-semibold
                        "
                        style={{
                          color: "#666666",
                        }}
                      >
                        {card.title}
                      </p>

                      {/* Value */}

                      <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                        {card.value ?? 0}
                      </p>

                      {/* Description */}

                      <p className="mt-2 text-sm leading-5 text-slate-500">
                        {card.description}
                      </p>

                      {/* Footer */}

                      <div
                        className="
                          mt-6
                          border-t
                          pt-4
                        "
                        style={{
                          borderColor: "#EEEEEE",
                        }}
                      >
                        <span
                          className="
                            text-xs
                            font-semibold
                            transition-colors
                          "
                          style={{
                            color: "var(--primary)",
                          }}
                        >
                          Kelola {card.title.toLowerCase()} →
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* =================================================
               NO PERMISSION
            ================================================== */

            <div
              className="
                rounded-3xl
                border
                bg-white
                px-6
                py-14
                text-center
              "
              style={{
                borderColor: "rgba(255,255,255,0.15)",
              }}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  backgroundColor: "var(--lavender-soft)",
                  color: "var(--primary)",
                }}
              >
                <ShieldCheck className="h-6 w-6" />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                Tidak ada statistik tersedia
              </p>

              <p className="mx-auto mt-1 max-w-md text-sm leading-5 text-slate-500">
                Akun Anda belum memiliki permission untuk melihat statistik
                sistem.
              </p>
            </div>
          )}
        </section>

        {/* =====================================================
            QUICK ACCESS
        ====================================================== */}

        {!loading && !error && visibleCards.length > 0 && (
          <section
            className="
              mt-6
              rounded-3xl
              border
              bg-white/10
              p-6
              shadow-lg
              sm:p-7
            "
            style={{
              borderColor: "rgba(255,255,255,0.14)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div>
                <h2 className="text-base font-bold text-white">Akses Cepat</h2>

                <p className="mt-1 text-sm text-white/60">
                  Akses langsung ke pengelolaan sistem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {hasPermission("users.view") && (
                  <button
                    type="button"
                    onClick={() => navigate("/users")}
                    className="
                      rounded-xl
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-lg
                    "
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    Pengguna
                  </button>
                )}

                {hasPermission("roles.view") && (
                  <button
                    type="button"
                    onClick={() => navigate("/roles")}
                    className="
                      rounded-xl
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-lg
                    "
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    Role
                  </button>
                )}

                {hasPermission("permissions.view") && (
                  <button
                    type="button"
                    onClick={() => navigate("/permissions")}
                    className="
                      rounded-xl
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-lg
                    "
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    Permission
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            LOADING OVERLAY / INFORMATION
        ====================================================== */}

        {loading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Mengambil data terbaru...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
