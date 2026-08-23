import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  Handshake,
  Laptop,
  Loader2,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

import { type DashboardResponse, type DashboardStatistics } from "./types";

function Dashboard() {
  const { user } = useAuth();

  const [statistics, setStatistics] = useState<DashboardStatistics | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH DASHBOARD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<DashboardResponse>("/dashboard");

        if (!mounted) return;

        setStatistics(response.data.statistics);
      } catch (err: unknown) {
        console.error("Gagal mengambil statistik dashboard:", err);

        if (!mounted) return;

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
  | DASHBOARD DATA
  |--------------------------------------------------------------------------
  |
  | Data fallback sementara supaya UI tetap tampil.
  | Nanti angka ini tinggal diganti dari response API.
  |
  */

  const dashboardData = useMemo(
    () => ({
      software: (statistics as any)?.software ?? 1248,

      vendors: (statistics as any)?.vendors ?? 356,

      partners: (statistics as any)?.partners ?? 189,

      reviews: (statistics as any)?.reviews ?? 2845,

      leads: (statistics as any)?.leads ?? 432,
    }),
    [statistics],
  );

  /*
  |--------------------------------------------------------------------------
  | STATISTIC CARDS
  |--------------------------------------------------------------------------
  */

  const statCards = [
    {
      title: "Total Software",
      value: dashboardData.software.toLocaleString(),
      growth: "12.5%",
      icon: Package,
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      title: "Total Vendors",
      value: dashboardData.vendors.toLocaleString(),
      growth: "8.1%",
      icon: Building2,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Implementation Partners",
      value: dashboardData.partners.toLocaleString(),
      growth: "15.3%",
      icon: Handshake,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Total Reviews",
      value: dashboardData.reviews.toLocaleString(),
      growth: "11.7%",
      icon: Star,
      iconClass: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Leads",
      value: dashboardData.leads.toLocaleString(),
      growth: "9.4%",
      icon: Target,
      iconClass: "bg-rose-100 text-rose-600",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | PLATFORM TRAFFIC
  |--------------------------------------------------------------------------
  */

  const visitors = [8, 14, 12, 22, 16, 16, 24];

  const pageViews = [19, 28, 24, 33, 26, 30, 34];

  /*
  |--------------------------------------------------------------------------
  | TOP SOFTWARE
  |--------------------------------------------------------------------------
  */

  const topSoftware = [
    {
      rank: 1,
      name: "Zoho CRM",
      views: "24,560",
      growth: "18.2%",
      icon: "Z",
    },
    {
      rank: 2,
      name: "HubSpot CRM",
      views: "18,230",
      growth: "14.7%",
      icon: "H",
    },
    {
      rank: 3,
      name: "Salesforce Sales Cloud",
      views: "15,890",
      growth: "10.1%",
      icon: "S",
    },
    {
      rank: 4,
      name: "Odoo ERP",
      views: "13,450",
      growth: "9.3%",
      icon: "O",
    },
    {
      rank: 5,
      name: "Microsoft Dynamics 365",
      views: "11,230",
      growth: "8.7%",
      icon: "M",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | RECENT ACTIVITY
  |--------------------------------------------------------------------------
  */

  const recentActivities = [
    {
      icon: Plus,
      title: 'New software "Monday CRM" submitted',
      description: "by Vendor: Monday.com",
      time: "2m ago",
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      icon: Star,
      title: "New review for Zoho CRM",
      description: "by John Doe",
      time: "15m ago",
      iconClass: "bg-orange-50 text-orange-500",
    },
    {
      icon: Users,
      title: "Lead #LE-2024-0518 assigned",
      description: "to Partner: Solusi Digital",
      time: "32m ago",
      iconClass: "bg-violet-50 text-violet-600",
    },
    {
      icon: Check,
      title: 'Vendor "TechSolutions Inc." verified',
      description: "by Admin",
      time: "1h ago",
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: FileText,
      title: "New article published",
      description: '"Best CRM for Small Business 2024"',
      time: "2h ago",
      iconClass: "bg-purple-50 text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Commission paid to Partner",
      description: "Amount: $1,250",
      time: "3h ago",
      iconClass: "bg-green-50 text-green-600",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | LEADS
  |--------------------------------------------------------------------------
  */

  const leadStatuses = [
    {
      label: "New",
      value: 156,
      percentage: "36.1%",
      width: "36.1%",
      className: "bg-blue-500",
    },
    {
      label: "In Progress",
      value: 112,
      percentage: "25.9%",
      width: "25.9%",
      className: "bg-violet-400",
    },
    {
      label: "Contacted",
      value: 78,
      percentage: "18.1%",
      width: "18.1%",
      className: "bg-indigo-300",
    },
    {
      label: "Proposal Sent",
      value: 54,
      percentage: "12.5%",
      width: "12.5%",
      className: "bg-orange-300",
    },
    {
      label: "Closed Won",
      value: 22,
      percentage: "5.1%",
      width: "5.1%",
      className: "bg-emerald-300",
    },
    {
      label: "Closed Lost",
      value: 10,
      percentage: "2.3%",
      width: "2.3%",
      className: "bg-rose-400",
    },
  ];

  const recentLeads = [
    {
      id: "LE-2024-0518",
      client: "PT Maju Bersama",
      software: "CRM Software",
      status: "In Progress",
      assigned: "Solusi Digital",
      date: "May 18, 2024",
    },
    {
      id: "LE-2024-0517",
      client: "CV Kreatif Utama",
      software: "Accounting Software",
      status: "Contacted",
      assigned: "Digital Partner ID",
      date: "May 17, 2024",
    },
    {
      id: "LE-2024-0516",
      client: "PT Sukses Makmur",
      software: "ERP Software",
      status: "New",
      assigned: "—",
      date: "May 16, 2024",
    },
    {
      id: "LE-2024-0515",
      client: "UD Sejahtera",
      software: "HR Software",
      status: "Proposal Sent",
      assigned: "Solusi Digital",
      date: "May 15, 2024",
    },
    {
      id: "LE-2024-0514",
      client: "PT Inovasi Teknologi",
      software: "Project Management",
      status: "Closed Won",
      assigned: "Digipartner",
      date: "May 14, 2024",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-full bg-[#f8fafc]">
      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-7">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-[#0f1b3d]">
              Welcome back, {user?.name || "User"}! 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here’s what’s happening with Software Empire platform.
            </p>
          </div>

          <button
            type="button"
            className="
              flex
              h-10
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              font-medium
              text-slate-700
              shadow-sm
              transition
              hover:border-slate-300
            "
          >
            <CalendarDays className="h-4 w-4 text-slate-500" />

            <span>May 12 - May 18, 2024</span>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {error}
          </div>
        )}

        {/* ==================================================
            MAIN GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_315px]">
          {/* =================================================
              LEFT MAIN COLUMN
          ================================================= */}

          <div className="min-w-0">
            {/* ================================================
                STATISTICS
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {statCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                      shadow-sm
                    "
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconClass}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mt-3 text-[12px] font-medium text-slate-500">
                      {card.title}
                    </p>

                    <div className="mt-1 flex items-end justify-between">
                      <p className="text-[22px] font-bold tracking-tight text-[#0f1b3d]">
                        {loading ? (
                          <span className="inline-block h-6 w-20 animate-pulse rounded bg-slate-100" />
                        ) : (
                          card.value
                        )}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-[11px]">
                      <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />

                      <span className="font-semibold text-emerald-600">
                        {card.growth}
                      </span>

                      <span className="text-slate-400">vs last 7 days</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================================================
                TRAFFIC + TOP SOFTWARE
            ================================================= */}

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_1fr]">
              {/* PLATFORM TRAFFIC */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm font-bold text-[#0f1b3d]">
                        Platform Traffic
                      </h2>

                      <CircleHelp className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>

                  <div className="flex gap-7">
                    <div>
                      <p className="text-[10px] text-slate-400">Visitors</p>

                      <p className="mt-1 text-base font-bold text-[#0f1b3d]">
                        78,540
                      </p>

                      <p className="mt-0.5 text-[10px] font-semibold text-emerald-600">
                        ↑ 14.6%
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400">Page Views</p>

                      <p className="mt-1 text-base font-bold text-[#0f1b3d]">
                        215,350
                      </p>

                      <p className="mt-0.5 text-[10px] font-semibold text-emerald-600">
                        ↑ 22.1%
                      </p>
                    </div>
                  </div>
                </div>

                {/* LEGEND */}

                <div className="mt-5 flex items-center gap-5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-3 rounded-full bg-blue-600" />
                    Visitors
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-3 rounded-full bg-sky-300" />
                    Page Views
                  </div>
                </div>

                {/* CHART */}

                <div className="relative mt-3 h-[190px]">
                  <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-400">
                    <span>40K</span>
                    <span>30K</span>
                    <span>20K</span>
                    <span>10K</span>
                    <span>0</span>
                  </div>

                  <div className="ml-8 h-full">
                    <svg
                      viewBox="0 0 700 190"
                      className="h-full w-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      {[20, 60, 100, 140, 180].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          y1={y}
                          x2="700"
                          y2={y}
                          stroke="#e8edf5"
                          strokeWidth="1"
                        />
                      ))}

                      <polyline
                        points="0,135 115,100 230,110 345,58 460,94 575,95 700,65"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <polyline
                        points="0,78 115,42 230,63 345,25 460,51 575,38 700,19"
                        fill="none"
                        stroke="#7dd3fc"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {visitors.map((_, index) => {
                        const points = [
                          [0, 135],
                          [115, 100],
                          [230, 110],
                          [345, 58],
                          [460, 94],
                          [575, 95],
                          [700, 65],
                        ];

                        const point = points[index];

                        return (
                          <circle
                            key={`visitor-${index}`}
                            cx={point[0]}
                            cy={point[1]}
                            r="4"
                            fill="#2563eb"
                          />
                        );
                      })}

                      {pageViews.map((_, index) => {
                        const points = [
                          [0, 78],
                          [115, 42],
                          [230, 63],
                          [345, 25],
                          [460, 51],
                          [575, 38],
                          [700, 19],
                        ];

                        const point = points[index];

                        return (
                          <circle
                            key={`views-${index}`}
                            cx={point[0]}
                            cy={point[1]}
                            r="4"
                            fill="#7dd3fc"
                          />
                        );
                      })}
                    </svg>

                    <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                      <span>May 12</span>
                      <span>May 13</span>
                      <span>May 14</span>
                      <span>May 15</span>
                      <span>May 16</span>
                      <span>May 17</span>
                      <span>May 18</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOP SOFTWARE */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[#0f1b3d]">
                    Top Software by Views
                  </h2>

                  <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">
                    View All
                  </button>
                </div>

                <div className="mt-4">
                  {topSoftware.map((software) => (
                    <div
                      key={software.rank}
                      className="
                        flex
                        items-center
                        gap-3
                        border-b
                        border-slate-100
                        py-3
                        last:border-0
                      "
                    >
                      <span className="w-5 text-center text-[11px] font-semibold text-slate-400">
                        {software.rank}
                      </span>

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-xs font-bold text-slate-600">
                        {software.icon}
                      </div>

                      <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-[#0f1b3d]">
                        {software.name}
                      </p>

                      <div className="text-right">
                        <p className="text-[11px] font-semibold text-[#0f1b3d]">
                          {software.views}
                        </p>

                        <p className="text-[9px] font-semibold text-emerald-600">
                          ↑ {software.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================================================
                LEADS OVERVIEW + LEADS TREND
            ================================================= */}

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.25fr]">
              {/* LEADS OVERVIEW */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold text-[#0f1b3d]">
                    Leads Overview
                  </h2>

                  <CircleHelp className="h-3.5 w-3.5 text-slate-400" />
                </div>

                <div className="mt-5 flex items-center gap-6">
                  {/* DONUT */}

                  <div className="relative h-36 w-36 shrink-0">
                    <div
                      className="
                        h-full
                        w-full
                        rounded-full
                      "
                      style={{
                        background:
                          "conic-gradient(#2563eb 0% 36.1%, #a78bfa 36.1% 62%, #93c5fd 62% 80.1%, #fdba74 80.1% 92.6%, #6ee7b7 92.6% 97.7%, #fb7185 97.7% 100%)",
                      }}
                    />

                    <div className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-2xl font-bold text-[#0f1b3d]">
                        432
                      </span>

                      <span className="text-[9px] text-slate-400">
                        Total Leads
                      </span>
                    </div>
                  </div>

                  {/* LEGEND */}

                  <div className="min-w-0 flex-1 space-y-2">
                    {leadStatuses.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${item.className}`}
                        />

                        <span className="flex-1 truncate text-[10px] text-slate-600">
                          {item.label}
                        </span>

                        <span className="text-[10px] font-medium text-slate-500">
                          {item.value}
                        </span>

                        <span className="w-9 text-right text-[9px] text-slate-400">
                          {item.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* LEADS TREND */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-bold text-[#0f1b3d]">
                      Leads Trend
                    </h2>

                    <CircleHelp className="h-3.5 w-3.5 text-slate-400" />
                  </div>

                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-medium text-slate-600">
                    This Week
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <div className="relative mt-5 h-40">
                  <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-slate-400">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                  </div>

                  <div className="ml-7 flex h-full items-end justify-between gap-3 border-b border-slate-100 px-2">
                    {[45, 40, 52, 58, 64, 61, 45].map((height, index) => (
                      <div
                        key={index}
                        className="flex h-full flex-1 items-end justify-center"
                      >
                        <div
                          className="w-full max-w-8 rounded-t-md bg-violet-300 transition-all hover:bg-violet-400"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ml-7 mt-2 flex justify-between px-2 text-[9px] text-slate-400">
                  <span>May 12</span>
                  <span>May 13</span>
                  <span>May 14</span>
                  <span>May 15</span>
                  <span>May 16</span>
                  <span>May 17</span>
                  <span>May 18</span>
                </div>
              </div>
            </div>

            {/* ================================================
                RECENT LEADS
            ================================================= */}

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-bold text-[#0f1b3d]">
                  Recent Leads
                </h2>

                <button className="text-[11px] font-semibold text-blue-600">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <th className="px-5 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        Lead ID
                      </th>

                      <th className="px-3 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        Client Name
                      </th>

                      <th className="px-3 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        Software Interest
                      </th>

                      <th className="px-3 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-3 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        Assigned To
                      </th>

                      <th className="px-3 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        Date
                      </th>

                      <th className="px-5 py-2.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                      >
                        <td className="px-5 py-3 text-[10px] font-medium text-blue-700">
                          {lead.id}
                        </td>

                        <td className="px-3 py-3 text-[10px] text-slate-700">
                          {lead.client}
                        </td>

                        <td className="px-3 py-3 text-[10px] text-slate-600">
                          {lead.software}
                        </td>

                        <td className="px-3 py-3">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-2.5
                              py-1
                              text-[9px]
                              font-semibold
                              ${
                                lead.status === "In Progress"
                                  ? "bg-orange-50 text-orange-600"
                                  : lead.status === "Contacted"
                                    ? "bg-blue-50 text-blue-600"
                                    : lead.status === "New"
                                      ? "bg-violet-50 text-violet-600"
                                      : lead.status === "Proposal Sent"
                                        ? "bg-purple-50 text-purple-600"
                                        : "bg-emerald-50 text-emerald-600"
                              }
                            `}
                          >
                            {lead.status}
                          </span>
                        </td>

                        <td className="px-3 py-3 text-[10px] text-slate-600">
                          {lead.assigned}
                        </td>

                        <td className="px-3 py-3 text-[10px] text-slate-500">
                          {lead.date}
                        </td>

                        <td className="px-5 py-3">
                          <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <aside className="space-y-5">
            {/* ================================================
                RECENT ACTIVITY
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-bold text-[#0f1b3d]">
                  Recent Activity
                </h2>

                <button className="text-[10px] font-semibold text-blue-600">
                  View All
                </button>
              </div>

              <div className="px-5">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div
                      key={index}
                      className="
                          flex
                          gap-3
                          border-b
                          border-slate-100
                          py-4
                          last:border-0
                        "
                    >
                      <div
                        className={`
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            ${activity.iconClass}
                          `}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold leading-4 text-[#0f1b3d]">
                          {activity.title}
                        </p>

                        <p className="mt-0.5 truncate text-[9px] text-slate-500">
                          {activity.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-[9px] text-slate-400">
                        {activity.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================================================
                SYSTEM STATUS
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-bold text-[#0f1b3d]">
                  System Status
                </h2>

                <button className="text-[10px] font-semibold text-blue-600">
                  View All
                </button>
              </div>

              <div className="space-y-3 px-5 py-4">
                {[
                  "Website",
                  "API",
                  "Recommendation Engine",
                  "Search Service",
                  "Database",
                  "File Storage",
                ].map((service) => (
                  <div key={service} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-2.5 w-2.5" />
                    </span>

                    <span className="flex-1 text-[10px] text-slate-600">
                      {service}
                    </span>

                    <span className="text-[9px] font-semibold text-emerald-600">
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================================================
                QUICK ACTIONS
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="px-5 py-4">
                <h2 className="text-sm font-bold text-[#0f1b3d]">
                  Quick Actions
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                {[
                  {
                    label: "Add Software",
                    icon: Package,
                  },
                  {
                    label: "Add Vendor",
                    icon: Building2,
                  },
                  {
                    label: "Add Partner",
                    icon: Users,
                  },
                  {
                    label: "Create Article",
                    icon: FileText,
                  },
                  {
                    label: "View Leads",
                    icon: UserPlus,
                  },
                  {
                    label: "System Settings",
                    icon: Settings,
                  },
                ].map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.label}
                      type="button"
                      className="
                        flex
                        min-h-[68px]
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-100
                        bg-white
                        text-center
                        transition
                        hover:border-blue-200
                        hover:bg-blue-50/40
                      "
                    >
                      <Icon className="h-4 w-4 text-blue-600" />

                      <span className="px-1 text-[8px] font-medium leading-3 text-slate-600">
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Mengambil data terbaru...
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
