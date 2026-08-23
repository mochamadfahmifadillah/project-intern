import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  Headphones,
  Megaphone,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "CRM",
    count: 124,
    icon: Users,
  },
  {
    name: "ERP",
    count: 98,
    icon: BarChart3,
  },
  {
    name: "Accounting",
    count: 86,
    icon: Calculator,
  },
  {
    name: "HR Software",
    count: 72,
    icon: Users,
  },
  {
    name: "Marketing",
    count: 66,
    icon: Megaphone,
  },
  {
    name: "Project Management",
    count: 58,
    icon: BriefcaseBusiness,
  },
  {
    name: "Help Desk",
    count: 45,
    icon: Headphones,
  },
];

const software = [
  {
    name: "Zoho CRM",
    rating: "4.6",
    price: "$14",
    logo: "∞",
  },
  {
    name: "HubSpot CRM",
    rating: "4.5",
    price: "$15",
    logo: "●",
  },
  {
    name: "Salesforce",
    rating: "4.4",
    price: "$25",
    logo: "☁",
  },
  {
    name: "Odoo ERP",
    rating: "4.3",
    price: "$24.90",
    logo: "odoo",
  },
  {
    name: "Microsoft 365",
    rating: "4.6",
    price: "$6",
    logo: "▦",
  },
];

function SoftwareShowcase() {
  return (
    <section className="bg-white px-5 py-12 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-0">
          {/* ============================================================
              TOP CATEGORIES
          ============================================================ */}

          <div className="lg:border-r lg:border-[#E5EAF1] lg:pr-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#0F172A]">
                Top Categories
              </h2>

              <Link
                to="/categories"
                className="flex items-center gap-1 text-[10px] font-semibold text-[#0D47A1]"
              >
                View all categories
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.name}
                    to="/software-directory"
                    className="group rounded-lg border border-[#E2E8F0] bg-white px-1.5 py-4 text-center transition hover:-translate-y-1 hover:border-[#BFD0E8] hover:shadow-sm"
                  >
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#EFF5FF] text-[#0D47A1]">
                      <Icon size={17} strokeWidth={1.7} />
                    </div>

                    <p className="mt-3 line-clamp-2 min-h-[24px] text-[9px] font-semibold leading-3 text-[#0F172A]">
                      {category.name}
                    </p>

                    <p className="mt-1 text-[8px] text-[#64748B]">
                      {category.count} Software
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ============================================================
              POPULAR SOFTWARE
          ============================================================ */}

          <div className="lg:pl-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#0F172A]">
                Popular Software
              </h2>

              <Link
                to="/software-directory"
                className="flex items-center gap-1 text-[10px] font-semibold text-[#0D47A1]"
              >
                View all software
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Software Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {software.map((item) => (
                <article
                  key={item.name}
                  className="rounded-lg border border-[#E1E7EF] bg-white p-3.5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Logo */}
                  <div className="flex h-10 items-center">
                    <div className="text-xl font-bold text-[#0D47A1]">
                      {item.logo}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="mt-3 line-clamp-1 text-[10px] font-bold text-[#0F172A]">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-[8px] tracking-tight text-[#F5A623]">
                      ★★★★★
                    </span>

                    <span className="text-[8px] text-[#64748B]">
                      {item.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <p className="mt-4 text-[8px] text-[#64748B]">
                    Starting from
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[9px] font-bold text-[#0F172A]">
                    {item.price} / user / month
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SoftwareShowcase;
