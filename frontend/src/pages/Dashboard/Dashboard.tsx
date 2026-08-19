import { useEffect, useMemo, useState } from "react";
import { KeyRound, Loader2, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardError from "../../components/dashboard/DashboardError";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import StatisticCard from "../../components/dashboard/StatisticCard";
import QuickAccess from "../../components/dashboard/QuickAccess";

import {
  type DashboardResponse,
  type DashboardStatistics,
  type StatisticCard as StatisticCardType,
} from "./types";

function Dashboard() {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const [statistics, setStatistics] =
    useState<DashboardStatistics | null>(null);

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

        const response =
          await api.get<DashboardResponse>("/dashboard");

        if (!mounted) {
          return;
        }

        setStatistics(response.data.statistics);
      } catch (err: unknown) {
        console.error(
          "Gagal mengambil statistik dashboard:",
          err,
        );

        if (!mounted) {
          return;
        }

        setStatistics(null);

        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err
        ) {
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

  const statisticCards: StatisticCardType[] = useMemo(
    () => [
      {
        title: "Total Pengguna",
        value: statistics?.users ?? null,
        description:
          "Pengguna yang terdaftar dalam sistem",
        path: "/users",
        permission: "users.view",
        icon: Users,
      },
      {
        title: "Total Role",
        value: statistics?.roles ?? null,
        description:
          "Role yang tersedia dalam sistem",
        path: "/roles",
        permission: "roles.view",
        icon: ShieldCheck,
      },
      {
        title: "Total Permission",
        value: statistics?.permissions ?? null,
        description:
          "Permission yang tersedia dalam sistem",
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
  */

  const visibleCards = useMemo(() => {
    return statisticCards.filter((card) =>
      hasPermission(card.permission),
    );
  }, [statisticCards, hasPermission]);

  /*
  |--------------------------------------------------------------------------
  | Quick Access
  |--------------------------------------------------------------------------
  */

  const quickAccessItems = [
    {
      label: "Pengguna",
      path: "/users",
      permission: "users.view",
    },
    {
      label: "Role",
      path: "/roles",
      permission: "roles.view",
    },
    {
      label: "Permission",
      path: "/permissions",
      permission: "permissions.view",
    },
    {
      label: "Software",
      path: "/softwares",
      permission: "softwares.view",
    },
    {
      label: "Kategori",
      path: "/software-categories",
      permission: "software-categories.view",
    },
    {
      label: "Pricing",
      path: "/software-pricings",
      permission: "software-pricings.view",
    },
    {
      label: "Integrasi",
      path: "/software-integrations",
      permission: "software-integrations.view",
    },
    {
      label: "Vendor",
      path: "/vendors",
      permission: "vendors.view",
    },
  ];

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
        {/* Header */}

        <DashboardHeader user={user} />

        {/* Error */}

        {error && <DashboardError message={error} />}

        {/* Statistics */}

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

          {/* Loading */}

          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            /* Error State */

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
                borderColor:
                  "rgba(255,255,255,0.12)",
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
            /* Statistic Cards */

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {visibleCards.map((card) => (
                <StatisticCard
                  key={card.title}
                  card={card}
                  onNavigate={navigate}
                />
              ))}
            </div>
          ) : (
            /* No Permission */

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
                borderColor:
                  "rgba(255,255,255,0.15)",
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
                  backgroundColor:
                    "var(--lavender-soft)",
                  color: "var(--primary)",
                }}
              >
                <ShieldCheck className="h-6 w-6" />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                Tidak ada statistik tersedia
              </p>

              <p className="mx-auto mt-1 max-w-md text-sm leading-5 text-slate-500">
                Akun Anda belum memiliki permission
                untuk melihat statistik sistem.
              </p>
            </div>
          )}
        </section>

        {/* Quick Access */}

        {!loading && !error && visibleCards.length > 0 && (
          <QuickAccess
            items={quickAccessItems}
            hasPermission={hasPermission}
            onNavigate={navigate}
          />
        )}

        {/* Loading Information */}

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