import { Link } from "react-router-dom";
import { Star, Database, Network, Archive } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Software {
  name: string;
  description: string;
  rating: string;
  reviews: string;
  price: string;
  icon: LucideIcon;
}

const featuredSoftware: Software[] = [
  {
    name: "Salesforce CRM",
    description: "Customer Relationship Management",
    rating: "4.8",
    reviews: "2,451 reviews",
    price: "$25/mo",
    icon: Database,
  },
  {
    name: "Asana",
    description: "Project Management",
    rating: "4.6",
    reviews: "1,890 reviews",
    price: "$10.99/mo",
    icon: Network,
  },
  {
    name: "NetSuite",
    description: "Enterprise Resource Planning",
    rating: "4.5",
    reviews: "950 reviews",
    price: "Custom",
    icon: Archive,
  },
];

function FeaturedSoftware() {
  return (
    <section id="directory" className="border-b border-[#d9d5e5] py-14">
      <div className="mx-auto max-w-[1030px] px-6">
        {/* Section Title */}
        <h2 className="text-center text-[30px] font-semibold tracking-[-0.8px]">
          Featured Software
        </h2>

        {/* Software Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featuredSoftware.map((software) => {
            const Icon = software.icon;

            return (
              <div
                key={software.name}
                className="border border-[#d7d2e0] bg-white p-[22px] transition hover:shadow-[0_8px_25px_rgba(30,20,70,0.07)]"
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-sm bg-[#e6e5e9]">
                    <Icon
                      size={22}
                      strokeWidth={1.7}
                      className="text-[#777484]"
                    />
                  </div>

                  {/* Information */}
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-semibold">
                      {software.name}
                    </h3>

                    <p className="mt-1 text-[13px] text-[#504b5c]">
                      {software.description}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-5 flex items-center gap-2 text-[13px]">
                  <Star
                    size={15}
                    fill="#f5b92f"
                    strokeWidth={1.5}
                    className="text-[#f5b92f]"
                  />

                  <span className="font-medium">{software.rating}</span>

                  <span className="text-[#777184]">({software.reviews})</span>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-[#e4e1e7]" />

                {/* Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[12px] text-[#777184]">Starting at</p>

                    <p className="mt-1 text-[13px] font-semibold">
                      {software.price}
                    </p>
                  </div>

                  {/* Compare Button */}
                  <button
                    type="button"
                    className="bg-[#ffd15c] px-5 py-3 text-[12px] font-semibold transition hover:bg-[#ffc63b]"
                  >
                    Compare
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/software-directory"
            className="border border-[#6846e8] px-7 py-3 text-[13px] font-semibold text-[#6846e8] transition hover:bg-[#6846e8] hover:text-white"
          >
            View All Software
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSoftware;
