import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Check,
  ChevronDown,
  Info,
  Menu,
  Plus,
  Search,
  Share2,
  Star,
  X,
} from "lucide-react";

interface Feature {
  name: string;
  status: "yes" | "partial" | "no";
}

interface Software {
  id: number;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  reviews: number;
  price: string;
  bestFor: string;
  deployment: string;
  freeTrial: string;
  userLimit: string;
  integrations: string;
  support: string;
  features: Feature[];
}

const SOFTWARE_DATA: Software[] = [
  {
    id: 1,
    name: "Zoho CRM",
    slug: "zoho-crm",
    logo: "https://www.zohowebstatic.com/sites/default/files/styles/product-page/public/crm/zoho-crm-logo.png",
    rating: 4.6,
    reviews: 2456,
    price: "$14",
    bestFor: "Small & Medium Business",
    deployment: "Cloud",
    freeTrial: "15 Days",
    userLimit: "No Limit",
    integrations: "500+",
    support: "Email, Chat, Phone",
    features: [
      { name: "Contact Management", status: "yes" },
      { name: "Lead Management", status: "yes" },
      { name: "Email Tracking", status: "yes" },
      { name: "Sales Automation", status: "yes" },
      { name: "Marketing Automation", status: "partial" },
      { name: "Workflow Automation", status: "yes" },
      { name: "Reports & Dashboards", status: "yes" },
      { name: "Mobile App", status: "yes" },
    ],
  },
  {
    id: 2,
    name: "HubSpot CRM",
    slug: "hubspot-crm",
    logo: "https://cdn.worldvectorlogo.com/logos/hubspot.svg",
    rating: 4.5,
    reviews: 1892,
    price: "$15",
    bestFor: "SMB & Growing Business",
    deployment: "Cloud",
    freeTrial: "14 Days",
    userLimit: "No Limit",
    integrations: "1500+",
    support: "Email, Chat, Phone",
    features: [
      { name: "Contact Management", status: "yes" },
      { name: "Lead Management", status: "yes" },
      { name: "Email Tracking", status: "yes" },
      { name: "Sales Automation", status: "yes" },
      { name: "Marketing Automation", status: "yes" },
      { name: "Workflow Automation", status: "yes" },
      { name: "Reports & Dashboards", status: "yes" },
      { name: "Mobile App", status: "yes" },
    ],
  },
  {
    id: 3,
    name: "Salesforce Sales Cloud",
    slug: "salesforce-sales-cloud",
    logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
    rating: 4.4,
    reviews: 3210,
    price: "$25",
    bestFor: "Medium & Large Business",
    deployment: "Cloud",
    freeTrial: "30 Days",
    userLimit: "No Limit",
    integrations: "3000+",
    support: "Email, Chat, Phone",
    features: [
      { name: "Contact Management", status: "yes" },
      { name: "Lead Management", status: "yes" },
      { name: "Email Tracking", status: "partial" },
      { name: "Sales Automation", status: "yes" },
      { name: "Marketing Automation", status: "partial" },
      { name: "Workflow Automation", status: "yes" },
      { name: "Reports & Dashboards", status: "yes" },
      { name: "Mobile App", status: "yes" },
    ],
  },
  {
    id: 4,
    name: "Odoo ERP",
    slug: "odoo-erp",
    logo: "https://cdn.worldvectorlogo.com/logos/odoo.svg",
    rating: 4.3,
    reviews: 1112,
    price: "$24.90",
    bestFor: "Small & Medium Business",
    deployment: "Cloud / On-Premise",
    freeTrial: "15 Days",
    userLimit: "No Limit",
    integrations: "1000+",
    support: "Email, Community, Ticket",
    features: [
      { name: "Contact Management", status: "yes" },
      { name: "Lead Management", status: "yes" },
      { name: "Email Tracking", status: "partial" },
      { name: "Sales Automation", status: "yes" },
      { name: "Marketing Automation", status: "no" },
      { name: "Workflow Automation", status: "yes" },
      { name: "Reports & Dashboards", status: "yes" },
      { name: "Mobile App", status: "yes" },
    ],
  },
];

const FEATURE_NAMES = [
  "Contact Management",
  "Lead Management",
  "Email Tracking",
  "Sales Automation",
  "Marketing Automation",
  "Workflow Automation",
  "Reports & Dashboards",
  "Mobile App",
];

function StatusIcon({ status }: { status: "yes" | "partial" | "no" }) {
  if (status === "yes") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
      </span>
    );
  }

  if (status === "partial") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      </span>
    );
  }

  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
      <X className="h-2.5 w-2.5 text-white" />
    </span>
  );
}

function SoftwareComparison() {
  const [softwares, setSoftwares] = useState<Software[]>(SOFTWARE_DATA);

  const [activeTab, setActiveTab] = useState("Summary");

  const removeSoftware = (id: number) => {
    if (softwares.length <= 2) {
      return;
    }

    setSoftwares((current) => current.filter((software) => software.id !== id));
  };

  const addSoftware = () => {
    const available = SOFTWARE_DATA.find(
      (software) => !softwares.some((current) => current.id === software.id),
    );

    if (!available || softwares.length >= 4) {
      return;
    }

    setSoftwares((current) => [...current, available]);
  };

  const shareComparison = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Clipboard tidak tersedia, tidak masalah.
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#14244a]">
      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <header className="border-b border-[#e5eaf2] bg-white">
        <div className="mx-auto flex h-[58px] max-w-[1500px] items-center px-5 lg:px-8">
          {/* Logo */}

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#173b82]">
              <span className="text-[10px] font-black text-white">SE</span>
            </div>

            <div className="hidden leading-none sm:block">
              <p className="text-[12px] font-extrabold text-[#173b82]">
                SOFTWARE
              </p>

              <p className="text-[11px] font-extrabold tracking-[0.18em] text-[#f59e0b]">
                EMPIRE
              </p>
            </div>
          </Link>

          {/* Navigation */}

          <nav className="ml-10 hidden items-center gap-7 lg:flex">
            <button className="flex items-center gap-1 text-[11px] text-slate-700">
              Software
              <ChevronDown className="h-3 w-3" />
            </button>

            <button className="flex items-center gap-1 text-[11px] text-slate-700">
              Categories
              <ChevronDown className="h-3 w-3" />
            </button>

            <Link
              to="/software-comparison"
              className="relative py-[21px] text-[11px] font-semibold text-[#1748c8]"
            >
              Compare
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1748c8]" />
            </Link>

            <button className="text-[11px] text-slate-700">Recommend</button>

            <button className="flex items-center gap-1 text-[11px] text-slate-700">
              Learn
              <ChevronDown className="h-3 w-3" />
            </button>

            <button className="text-[11px] text-slate-700">For Vendors</button>
          </nav>

          {/* Right */}

          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden h-8 w-[145px] items-center gap-2 rounded-md border border-[#dfe5ee] px-2.5 md:flex">
              <input
                type="text"
                placeholder="Search software..."
                className="w-full bg-transparent text-[9px] outline-none placeholder:text-slate-400"
              />

              <Search className="h-3.5 w-3.5 text-slate-500" />
            </div>

            <button className="hidden rounded-md border border-[#dfe5ee] px-3.5 py-1.5 text-[10px] font-medium sm:block">
              Login
            </button>

            <button className="rounded-md bg-[#1748c8] px-3.5 py-1.5 text-[10px] font-semibold text-white">
              Sign Up
            </button>

            <Menu className="h-4 w-4 lg:hidden" />
          </div>
        </div>
      </header>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-4 lg:px-8">
        {/* Breadcrumb */}

        <div className="mb-2 flex items-center gap-2 text-[9px] text-slate-400">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Compare Software</span>
        </div>

        {/* Header */}

        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-[24px] font-bold tracking-tight text-[#14244a]">
              Compare Software
            </h1>

            <p className="mt-1 text-[10px] text-slate-500">
              Compare up to 4 software solutions side by side
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 rounded-md border border-[#dfe5ee] px-3.5 py-2 text-[9px] font-semibold text-slate-700">
              <Bookmark className="h-3 w-3" />
              Save Comparison
            </button>

            <button
              onClick={shareComparison}
              className="flex items-center gap-1.5 rounded-md border border-[#dfe5ee] px-3.5 py-2 text-[9px] font-semibold text-slate-700"
            >
              <Share2 className="h-3 w-3" />
              Share
            </button>
          </div>
        </div>

        {/* ======================================================
            SOFTWARE CARDS
        ====================================================== */}

        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {softwares.map((software) => (
            <div
              key={software.id}
              className="flex min-h-[62px] items-center gap-2.5 rounded-lg border border-[#dfe5ee] bg-white px-3"
            >
              <img
                src={software.logo}
                alt={software.name}
                className="h-8 w-8 shrink-0 object-contain"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-bold text-slate-800">
                  {software.name}
                </p>

                <button
                  onClick={() => removeSoftware(software.id)}
                  className="mt-1 text-[8px] font-semibold text-[#1748c8]"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {softwares.length < 4 && (
            <button
              onClick={addSoftware}
              className="flex min-h-[62px] flex-col items-center justify-center rounded-lg border border-dashed border-[#b9c4d6] text-[#1748c8]"
            >
              <Plus className="h-4 w-4" />

              <span className="mt-0.5 text-[9px] font-semibold">
                Add Software
              </span>

              <span className="text-[7px] text-slate-400">Up to 4</span>
            </button>
          )}
        </div>

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="grid gap-4 lg:grid-cols-[165px_minmax(0,1fr)]">
          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <aside className="hidden lg:block">
            <div className="overflow-hidden rounded-lg border border-[#e0e6ef]">
              {[
                "Summary",
                "Features",
                "Pricing",
                "Integrations",
                "Reviews",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[9px] ${
                    activeTab === tab
                      ? "bg-[#edf3ff] font-semibold text-[#1748c8]"
                      : "text-slate-600"
                  }`}
                >
                  <span>
                    {tab === "Summary" && "▣"}
                    {tab === "Features" && "♧"}
                    {tab === "Pricing" && "♙"}
                    {tab === "Integrations" && "☆"}
                    {tab === "Reviews" && "▢"}
                  </span>

                  {tab}
                </button>
              ))}
            </div>

            {/* AI */}

            <div className="mt-4 rounded-lg border border-[#e0e6ef] p-3.5">
              <h3 className="text-[10px] font-bold">Not sure yet?</h3>

              <p className="mt-1.5 text-[8px] leading-4 text-slate-500">
                Get AI-powered recommendation based on your business needs.
              </p>

              <button className="mt-2.5 flex w-full items-center justify-center gap-1 rounded-md border border-[#dfe5ee] py-1.5 text-[8px] font-semibold text-[#1748c8]">
                ✨ Get Recommendation
              </button>
            </div>

            {/* Legend */}

            <div className="mt-4 rounded-lg border border-[#e0e6ef] p-3.5">
              <h3 className="text-[10px] font-bold">Legend</h3>

              <div className="mt-3 space-y-2 text-[8px] text-slate-500">
                <div className="flex items-center gap-2">
                  <StatusIcon status="yes" />
                  Yes / Included
                </div>

                <div className="flex items-center gap-2">
                  <StatusIcon status="partial" />
                  Partial / Limited
                </div>

                <div className="flex items-center gap-2">
                  <StatusIcon status="no" />
                  No / Not Included
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">−</span>
                  Not Available
                </div>

                <div className="flex items-center gap-2">
                  <Info className="h-3 w-3" />
                  More info
                </div>
              </div>
            </div>
          </aside>

          {/* ====================================================
              TABLE
          ==================================================== */}

          <section className="min-w-0">
            <div className="overflow-hidden rounded-lg border border-[#dfe5ee]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-20 w-[150px] min-w-[150px] border-r border-b border-[#e5e9f0] bg-white px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                        Feature
                      </th>

                      {softwares.map((software) => (
                        <th
                          key={software.id}
                          className="min-w-[170px] border-r border-b border-[#e5e9f0] bg-white px-3 py-3 text-left last:border-r-0"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={software.logo}
                              alt={software.name}
                              className="h-8 w-8 object-contain"
                            />

                            <div>
                              <p className="text-[9px] font-bold text-slate-800">
                                {software.name}
                              </p>

                              <div className="mt-1 flex items-center gap-1">
                                <Star className="h-2.5 w-2.5 fill-[#f59e0b] text-[#f59e0b]" />

                                <span className="text-[8px] font-semibold">
                                  {software.rating}
                                </span>

                                <span className="text-[7px] text-slate-400">
                                  ({software.reviews.toLocaleString()} reviews)
                                </span>
                              </div>
                            </div>
                          </div>

                          <Link
                            to={`/software-directory/${software.slug}`}
                            className="mt-3 block rounded-md bg-[#1748c8] py-1.5 text-center text-[8px] font-semibold text-white"
                          >
                            View Details
                          </Link>

                          <div className="mt-2.5">
                            <p className="text-[7px] text-slate-400">
                              Starting from
                            </p>

                            <p className="text-[15px] font-bold text-slate-900">
                              {software.price}
                            </p>

                            <p className="text-[7px] text-slate-400">
                              / user / month
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Summary */}

                    <tr>
                      <td
                        colSpan={softwares.length + 1}
                        className="bg-[#edf3ff] px-3 py-2 text-[9px] font-bold text-[#1748c8]"
                      >
                        Summary
                      </td>
                    </tr>

                    {[
                      {
                        label: "Best For",
                        key: "bestFor",
                      },
                      {
                        label: "Starting Price",
                        key: "price",
                      },
                      {
                        label: "Deployment",
                        key: "deployment",
                      },
                      {
                        label: "Free Trial",
                        key: "freeTrial",
                      },
                      {
                        label: "User Limit",
                        key: "userLimit",
                      },
                    ].map((row) => (
                      <tr key={row.label} className="border-b border-[#e5e9f0]">
                        <td className="sticky left-0 z-10 border-r border-[#e5e9f0] bg-white px-3 py-2 text-[8px] font-medium text-slate-600">
                          {row.label}
                        </td>

                        {softwares.map((software) => (
                          <td
                            key={software.id}
                            className="border-r border-[#e5e9f0] px-3 py-2 text-[8px] text-slate-600 last:border-r-0"
                          >
                            {software[row.key as keyof Software] as string}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Features */}

                    <tr>
                      <td
                        colSpan={softwares.length + 1}
                        className="bg-[#edf3ff] px-3 py-2 text-[9px] font-bold text-[#1748c8]"
                      >
                        Features
                      </td>
                    </tr>

                    {FEATURE_NAMES.map((featureName) => (
                      <tr
                        key={featureName}
                        className="border-b border-[#e5e9f0]"
                      >
                        <td className="sticky left-0 z-10 border-r border-[#e5e9f0] bg-white px-3 py-2 text-[8px] text-slate-600">
                          {featureName}
                        </td>

                        {softwares.map((software) => {
                          const feature = software.features.find(
                            (item) => item.name === featureName,
                          );

                          return (
                            <td
                              key={software.id}
                              className="border-r border-[#e5e9f0] px-3 py-2 text-center last:border-r-0"
                            >
                              {feature ? (
                                <StatusIcon status={feature.status} />
                              ) : (
                                <span className="text-[10px] text-slate-300">
                                  —
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Integrations */}

                    <tr>
                      <td
                        colSpan={softwares.length + 1}
                        className="bg-[#edf3ff] px-3 py-2 text-[9px] font-bold text-[#1748c8]"
                      >
                        Integrations
                      </td>
                    </tr>

                    <tr className="border-b border-[#e5e9f0]">
                      <td className="sticky left-0 z-10 border-r border-[#e5e9f0] bg-white px-3 py-2 text-[8px] text-slate-600">
                        Integrations
                      </td>

                      {softwares.map((software) => (
                        <td
                          key={software.id}
                          className="border-r border-[#e5e9f0] px-3 py-2 text-[8px] text-slate-600 last:border-r-0"
                        >
                          {software.integrations}
                        </td>
                      ))}
                    </tr>

                    {/* Customer Support */}

                    <tr className="border-b border-[#e5e9f0]">
                      <td className="sticky left-0 z-10 border-r border-[#e5e9f0] bg-white px-3 py-2 text-[8px] text-slate-600">
                        Customer Support
                      </td>

                      {softwares.map((software) => (
                        <td
                          key={software.id}
                          className="border-r border-[#e5e9f0] px-3 py-2 text-[8px] text-slate-600 last:border-r-0"
                        >
                          {software.support}
                        </td>
                      ))}
                    </tr>

                    {/* Overall Score */}

                    <tr>
                      <td className="sticky left-0 z-10 border-r border-[#e5e9f0] bg-white px-3 py-3 text-[8px] font-bold text-slate-700">
                        Overall Score
                      </td>

                      {softwares.map((software) => (
                        <td
                          key={software.id}
                          className="border-r border-[#e5e9f0] px-3 py-3 last:border-r-0"
                        >
                          <div>
                            <span className="text-[16px] font-bold text-slate-900">
                              {software.rating}
                            </span>

                            <span className="ml-1 text-[7px] text-slate-400">
                              / 5
                            </span>
                          </div>

                          <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{
                                width: `${software.rating * 20}%`,
                              }}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-2 text-[8px] text-slate-400">
              Scores are based on user reviews and feature completeness. Your
              experience may vary.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SoftwareComparison;
