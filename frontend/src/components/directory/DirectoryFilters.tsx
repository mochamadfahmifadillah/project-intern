import { ChevronUp, SlidersHorizontal } from "lucide-react";
import type { SoftwareCategory } from "../../types/software";

interface DirectoryFiltersProps {
  categories: SoftwareCategory[];
  selectedCategory: string;
  selectedPricing: string;
  onCategoryChange: (category: string) => void;
  onPricingChange: (pricing: string) => void;
  loading?: boolean;
}

interface PricingOption {
  value: string;
  label: string;
}

const pricingOptions: PricingOption[] = [
  {
    value: "free",
    label: "Free",
  },
  {
    value: "freemium",
    label: "Freemium",
  },
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "custom",
    label: "Custom",
  },
];

function DirectoryFilters({
  categories,
  selectedCategory,
  selectedPricing,
  onCategoryChange,
  onPricingChange,
  loading = false,
}: DirectoryFiltersProps) {
  return (
    <aside className="w-full shrink-0 rounded border border-[#ddd9e3] bg-white p-6 lg:w-[300px]">
      {/* ================================================================
          TITLE
      ================================================================= */}

      <div className="flex items-center gap-3">
        <SlidersHorizontal size={21} strokeWidth={1.8} />

        <h2 className="text-[21px] font-semibold">Filters</h2>
      </div>

      {/* ================================================================
          CATEGORIES
      ================================================================= */}

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-semibold">Categories</h3>

          <ChevronUp size={18} />
        </div>

        <div className="mt-4 space-y-4">
          {/* All Categories */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={() => onCategoryChange("")}
              className="peer sr-only"
            />

            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-[#cfc9db] bg-white peer-checked:border-[#6846e8] peer-checked:bg-[#6846e8]">
              {selectedCategory === "" && (
                <span className="h-2 w-2 rounded-full bg-white" />
              )}
            </span>

            <span className="text-[15px] text-[#454052]">All Categories</span>
          </label>

          {/* Loading */}
          {loading && (
            <p className="text-[14px] text-[#777184]">Loading categories...</p>
          )}

          {/* Empty */}
          {!loading && categories.length === 0 && (
            <p className="text-[14px] text-[#777184]">
              No categories available.
            </p>
          )}

          {/* Categories */}
          {!loading &&
            categories.map((category) => (
              <label
                key={category.id}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={selectedCategory === category.slug}
                  onChange={() => onCategoryChange(category.slug)}
                  className="peer sr-only"
                />

                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-[#cfc9db] bg-white peer-checked:border-[#6846e8] peer-checked:bg-[#6846e8]">
                  {selectedCategory === category.slug && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>

                <span className="text-[15px] text-[#454052]">
                  {category.name}
                </span>
              </label>
            ))}
        </div>
      </div>

      <div className="my-5 border-t border-[#e2dfe6]" />

      {/* ================================================================
          PRICING MODEL
      ================================================================= */}

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-semibold">Pricing Model</h3>

          <ChevronUp size={18} />
        </div>

        <div className="mt-4 space-y-4">
          {/* All Pricing */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="pricing"
              value=""
              checked={selectedPricing === ""}
              onChange={() => onPricingChange("")}
              className="peer sr-only"
            />

            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-[#cfc9db] bg-white peer-checked:border-[#6846e8] peer-checked:bg-[#6846e8]">
              {selectedPricing === "" && (
                <span className="h-2 w-2 rounded-full bg-white" />
              )}
            </span>

            <span className="text-[15px] text-[#454052]">All Pricing</span>
          </label>

          {/* Pricing Options */}
          {pricingOptions.map((pricing) => (
            <label
              key={pricing.value}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="pricing"
                value={pricing.value}
                checked={selectedPricing === pricing.value}
                onChange={() => onPricingChange(pricing.value)}
                className="peer sr-only"
              />

              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-[#cfc9db] bg-white peer-checked:border-[#6846e8] peer-checked:bg-[#6846e8]">
                {selectedPricing === pricing.value && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>

              <span className="text-[15px] text-[#454052]">
                {pricing.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-[#e2dfe6]" />
    </aside>
  );
}

export default DirectoryFilters;
