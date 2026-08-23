import { ChevronUp } from "lucide-react";
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
  /*
  |--------------------------------------------------------------------------
  | Clear Filters
  |--------------------------------------------------------------------------
  */

  const handleClearAll = () => {
    onCategoryChange("");
    onPricingChange("");
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <aside
      className="
        w-full
        shrink-0
        self-start
        rounded-xl
        border
        border-[#E2E8F0]
        bg-white
        lg:w-[250px]
        xl:w-[270px]
      "
    >
      {/* ================================================================
          HEADER
      ================================================================= */}

      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="text-[15px] font-bold text-[#0F172A]">Filters</h2>

        <button
          type="button"
          onClick={handleClearAll}
          className="
            text-[11px]
            font-semibold
            text-[#0D47A1]
            transition-colors
            hover:text-[#083A84]
          "
        >
          Clear all
        </button>
      </div>

      <div className="border-t border-[#EEF2F7]" />

      {/* ================================================================
          CATEGORIES
      ================================================================= */}

      <section className="px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold text-[#172554]">Categories</h3>

          <ChevronUp size={15} strokeWidth={1.8} className="text-[#64748B]" />
        </div>

        <div className="mt-3 space-y-2.5">
          {/* All Categories */}

          <label className="group flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={() => onCategoryChange("")}
              className="peer sr-only"
            />

            <span
              className="
                flex
                h-[15px]
                w-[15px]
                shrink-0
                items-center
                justify-center
                rounded-[3px]
                border
                border-[#CBD5E1]
                bg-white
                transition-all
                peer-checked:border-[#0D47A1]
                peer-checked:bg-[#0D47A1]
              "
            >
              {selectedCategory === "" && (
                <svg
                  viewBox="0 0 12 12"
                  className="h-2.5 w-2.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M2 6l2.5 2.5L10 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>

            <span className="text-[11px] text-[#475569] transition-colors group-hover:text-[#0F172A]">
              All Categories
            </span>
          </label>

          {/* Loading */}

          {loading && (
            <p className="py-1 text-[11px] text-[#94A3B8]">
              Loading categories...
            </p>
          )}

          {/* Empty */}

          {!loading && categories.length === 0 && (
            <p className="py-1 text-[11px] text-[#94A3B8]">
              No categories available.
            </p>
          )}

          {/* Categories */}

          {!loading &&
            categories.map((category) => {
              const isSelected = selectedCategory === category.slug;

              return (
                <label
                  key={category.id}
                  className="
                    group
                    flex
                    cursor-pointer
                    items-center
                    gap-2.5
                  "
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.slug}
                    checked={isSelected}
                    onChange={() => onCategoryChange(category.slug)}
                    className="peer sr-only"
                  />

                  <span
                    className="
                      flex
                      h-[15px]
                      w-[15px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[3px]
                      border
                      border-[#CBD5E1]
                      bg-white
                      transition-all
                      peer-checked:border-[#0D47A1]
                      peer-checked:bg-[#0D47A1]
                    "
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-2.5 w-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M2 6l2.5 2.5L10 3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>

                  <span
                    className="
                      min-w-0
                      truncate
                      text-[11px]
                      text-[#475569]
                      transition-colors
                      group-hover:text-[#0F172A]
                    "
                  >
                    {category.name}
                  </span>
                </label>
              );
            })}
        </div>
      </section>

      <div className="mx-4 border-t border-[#EEF2F7]" />

      {/* ================================================================
          PRICING MODEL
      ================================================================= */}

      <section className="px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold text-[#172554]">
            Pricing Model
          </h3>

          <ChevronUp size={15} strokeWidth={1.8} className="text-[#64748B]" />
        </div>

        <div className="mt-3 space-y-2.5">
          {/* All Pricing */}

          <label className="group flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              name="pricing"
              value=""
              checked={selectedPricing === ""}
              onChange={() => onPricingChange("")}
              className="peer sr-only"
            />

            <span
              className="
                flex
                h-[15px]
                w-[15px]
                shrink-0
                items-center
                justify-center
                rounded-[3px]
                border
                border-[#CBD5E1]
                bg-white
                transition-all
                peer-checked:border-[#0D47A1]
                peer-checked:bg-[#0D47A1]
              "
            >
              {selectedPricing === "" && (
                <svg
                  viewBox="0 0 12 12"
                  className="h-2.5 w-2.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M2 6l2.5 2.5L10 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>

            <span className="text-[11px] text-[#475569]">All Pricing</span>
          </label>

          {/* Pricing Options */}

          {pricingOptions.map((pricing) => {
            const isSelected = selectedPricing === pricing.value;

            return (
              <label
                key={pricing.value}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-2.5
                "
              >
                <input
                  type="radio"
                  name="pricing"
                  value={pricing.value}
                  checked={isSelected}
                  onChange={() => onPricingChange(pricing.value)}
                  className="peer sr-only"
                />

                <span
                  className="
                    flex
                    h-[15px]
                    w-[15px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[3px]
                    border
                    border-[#CBD5E1]
                    bg-white
                    transition-all
                    peer-checked:border-[#0D47A1]
                    peer-checked:bg-[#0D47A1]
                  "
                >
                  {isSelected && (
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                <span className="text-[11px] text-[#475569] transition-colors group-hover:text-[#0F172A]">
                  {pricing.label}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <div className="mx-4 border-t border-[#EEF2F7]" />

      {/* ================================================================
          RATING
      ================================================================= */}

      <section className="px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold text-[#172554]">Rating</h3>

          <ChevronUp size={15} strokeWidth={1.8} className="text-[#64748B]" />
        </div>

        <div className="mt-3 space-y-2.5">
          {["4.5 & above", "4.0 & above", "3.5 & above"].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <input
                type="checkbox"
                className="
                  h-[15px]
                  w-[15px]
                  rounded-[3px]
                  border-[#CBD5E1]
                  text-[#0D47A1]
                  focus:ring-0
                  focus:ring-offset-0
                "
              />

              <span className="flex items-center gap-0.5 text-[11px] text-[#475569]">
                <span className="text-[#F59E0B]">★</span>
                <span>{rating}</span>
              </span>
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default DirectoryFilters;
