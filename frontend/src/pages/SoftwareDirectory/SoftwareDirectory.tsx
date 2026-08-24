import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/landing/Navbar";
import DirectoryFilters from "../../components/directory/DirectoryFilters";
import DirectorySearch from "../../components/directory/DirectorySearch";
import SoftwareCard from "../../components/directory/SoftwareCard";
import Pagination from "../../components/directory/Pagination";

import type { Software, SoftwareCategory } from "../../types/software";

import {
  getPublicSoftwares,
  getPublicSoftwareCategories,
} from "../../services/softwareService";

function SoftwareDirectory() {
  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const navigate = useNavigate();

  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [categories, setCategories] = useState<SoftwareCategory[]>([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");
  const [selectedBusinessSize, setSelectedBusinessSize] = useState("");

  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const [currentPage, setCurrentPage] = useState(1);

  const [loadingSoftwares, setLoadingSoftwares] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | COMPARE STATE
  |--------------------------------------------------------------------------
  */

  const [compareSoftwares, setCompareSoftwares] = useState<Software[]>([]);

  const MAX_COMPARE = 4;

  /*
  |--------------------------------------------------------------------------
  | LOAD CATEGORIES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await getPublicSoftwareCategories();

        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOAD SOFTWARES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const loadSoftwares = async () => {
      try {
        setLoadingSoftwares(true);
        setError("");

        const response = await getPublicSoftwares({
          search: search || undefined,
          category: selectedCategory || undefined,
        });

        setSoftwares(response.data);
      } catch (error) {
        console.error("Failed to load softwares:", error);

        setSoftwares([]);
        setError("Failed to load software data.");
      } finally {
        setLoadingSoftwares(false);
      }
    };

    loadSoftwares();
  }, [search, selectedCategory]);

  /*
  |--------------------------------------------------------------------------
  | FILTER HANDLERS
  |--------------------------------------------------------------------------
  */

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePricingChange = (pricing: string) => {
    setSelectedPricing(pricing);
    setCurrentPage(1);
  };

  const handleBusinessSizeChange = (businessSize: string) => {
    setSelectedBusinessSize(businessSize);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | CLEAR FILTERS
  |--------------------------------------------------------------------------
  */

  const handleClearAllFilters = () => {
    setSelectedCategory("");
    setSelectedPricing("");
    setSelectedBusinessSize("");
    setCurrentPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | COMPARE HANDLERS
  |--------------------------------------------------------------------------
  */

  const handleToggleCompare = (software: Software) => {
    setCompareSoftwares((current) => {
      const alreadySelected = current.some((item) => item.id === software.id);

      if (alreadySelected) {
        return current.filter((item) => item.id !== software.id);
      }

      if (current.length >= MAX_COMPARE) {
        return current;
      }

      return [...current, software];
    });
  };

  const handleRemoveCompare = (softwareId: number | string) => {
    setCompareSoftwares((current) =>
      current.filter((item) => item.id !== softwareId),
    );
  };

  const handleCompare = () => {
    if (compareSoftwares.length < 2) {
      return;
    }

    const slugs = compareSoftwares
      .map((software) => software.slug)
      .filter(Boolean);

    if (slugs.length < 2) {
      return;
    }

    navigate(
      `/software-comparison?software=${encodeURIComponent(slugs.join(","))}`,
    );
  };

  /*
  |--------------------------------------------------------------------------
  | SELECTED SOFTWARE IDS
  |--------------------------------------------------------------------------
  */

  const selectedCompareIds = useMemo(
    () => compareSoftwares.map((software) => software.id),
    [compareSoftwares],
  );

  /*
  |--------------------------------------------------------------------------
  | LABELS
  |--------------------------------------------------------------------------
  */

  const selectedCategoryLabel =
    categories.find((category) => category.slug === selectedCategory)?.name ||
    selectedCategory;

  const selectedPricingLabel =
    selectedPricing === "free"
      ? "Free"
      : selectedPricing === "freemium"
        ? "Freemium"
        : selectedPricing === "paid"
          ? "Paid"
          : selectedPricing === "custom"
            ? "Custom"
            : selectedPricing;

  const selectedBusinessSizeLabel =
    selectedBusinessSize === "small"
      ? "Small Business"
      : selectedBusinessSize === "medium"
        ? "Medium Business"
        : selectedBusinessSize === "enterprise"
          ? "Enterprise"
          : selectedBusinessSize;

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-white text-[#101B3D]">
      <Navbar />

      <main>
        <div
          className="
            mx-auto
            max-w-[1400px]
            px-5
            py-7
            sm:px-6
            lg:px-8
            xl:px-10
          "
        >
          {/* ============================================================
              BREADCRUMB
          ============================================================ */}

          <div className="mb-3 flex items-center gap-2 text-[11px]">
            <span className="text-[#7A849B]">Home</span>

            <span className="text-[#B8C0CF]">/</span>

            <span className="font-medium text-[#475569]">Software</span>
          </div>

          {/* ============================================================
              PAGE HEADER
          ============================================================ */}

          <div className="mb-5">
            <h1
              className="
                text-[28px]
                font-bold
                tracking-[-0.7px]
                text-[#101B3D]
                sm:text-[32px]
              "
            >
              All Software
            </h1>

            <p className="mt-1 text-[12px] text-[#68728B]">
              Discover software solutions to grow your business
            </p>
          </div>

          {/* ============================================================
              SEARCH + SORT
          ============================================================ */}

          <div
            className="
              mb-5
              flex
              w-full
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
            "
          >
            <div className="min-w-0 flex-1">
              <DirectorySearch search={search} setSearch={handleSearchChange} />
            </div>

            <div className="flex h-[46px] shrink-0 items-center gap-2">
              <span className="whitespace-nowrap text-[11px] text-[#7A849B]">
                Sort by:
              </span>

              <div className="relative">
                <select
                  defaultValue="popular"
                  className="
                    h-[46px]
                    w-[150px]
                    appearance-none
                    border
                    border-[#D7DFEC]
                    bg-white
                    px-3
                    pr-9
                    text-[11px]
                    font-medium
                    text-[#475569]
                    outline-none
                    transition
                    focus:border-[#1749B8]
                  "
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                <ChevronDown
                  size={15}
                  strokeWidth={1.8}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#64748B]
                  "
                />
              </div>
            </div>
          </div>

          {/* ============================================================
              MAIN CONTENT
          ============================================================ */}

          <div className="flex items-start gap-5 lg:gap-6">
            {/* ========================================================
                FILTER SIDEBAR
            ========================================================= */}

            <aside
              className="
                hidden
                w-[240px]
                shrink-0
                lg:block
                xl:w-[250px]
              "
            >
              <DirectoryFilters
                categories={categories}
                selectedCategory={selectedCategory}
                selectedPricing={selectedPricing}
                selectedBusinessSize={selectedBusinessSize}
                onCategoryChange={handleCategoryChange}
                onPricingChange={handlePricingChange}
                onBusinessSizeChange={handleBusinessSizeChange}
                loading={loadingCategories}
              />
            </aside>

            {/* ========================================================
                SOFTWARE CONTENT
            ========================================================= */}

            <section className="min-w-0 flex-1">
              {/* MOBILE FILTER */}

              <button
                type="button"
                className="
                  mb-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  border
                  border-[#D7DFEC]
                  bg-white
                  px-4
                  py-2.5
                  text-[11px]
                  font-semibold
                  text-[#1749B8]
                  lg:hidden
                "
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              {/* ======================================================
                  FILTER SUMMARY
              ====================================================== */}

              <div
                className="
                  mb-4
                  flex
                  min-h-[40px]
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-[#EEF2F7]
                  pb-3
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    flex-1
                    flex-wrap
                    items-center
                    gap-x-5
                    gap-y-2
                  "
                >
                  {selectedPricing && (
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[11px] font-medium text-[#7A849B]">
                        Pricing:
                      </span>

                      <span className="text-[11px] font-semibold text-[#172554]">
                        {selectedPricingLabel}
                      </span>
                    </div>
                  )}

                  {selectedCategory && (
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[11px] font-medium text-[#7A849B]">
                        Category:
                      </span>

                      <span className="text-[11px] font-semibold text-[#172554]">
                        {selectedCategoryLabel}
                      </span>
                    </div>
                  )}

                  {selectedBusinessSize && (
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[11px] font-medium text-[#7A849B]">
                        Business Size:
                      </span>

                      <span className="text-[11px] font-semibold text-[#172554]">
                        {selectedBusinessSizeLabel}
                      </span>
                    </div>
                  )}

                  {!selectedPricing &&
                    !selectedCategory &&
                    !selectedBusinessSize && (
                      <span className="text-[11px] text-[#94A3B8]">
                        All software
                      </span>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  {(selectedPricing ||
                    selectedCategory ||
                    selectedBusinessSize) && (
                    <button
                      type="button"
                      onClick={handleClearAllFilters}
                      className="
                        whitespace-nowrap
                        text-[11px]
                        font-semibold
                        text-[#1749B8]
                        transition-colors
                        hover:text-[#0D47A1]
                      "
                    >
                      Clear all
                    </button>
                  )}

                  {/* VIEW TOGGLE */}

                  <div
                    className="
                      flex
                      h-[34px]
                      items-center
                      border
                      border-[#D7DFEC]
                      bg-white
                    "
                  >
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      aria-label="Grid view"
                      className={`
                        flex
                        h-full
                        w-[34px]
                        items-center
                        justify-center
                        border-r
                        border-[#D7DFEC]
                        transition-colors
                        ${
                          viewMode === "grid"
                            ? "bg-[#EFF5FF] text-[#1749B8]"
                            : "text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#475569]"
                        }
                      `}
                    >
                      <Grid2X2 size={15} strokeWidth={1.8} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      aria-label="List view"
                      className={`
                        flex
                        h-full
                        w-[34px]
                        items-center
                        justify-center
                        transition-colors
                        ${
                          viewMode === "list"
                            ? "bg-[#EFF5FF] text-[#1749B8]"
                            : "text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#475569]"
                        }
                      `}
                    >
                      <List size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </div>

              {/* ======================================================
                  RESULT COUNT
              ====================================================== */}

              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] text-[#7A849B]">
                  {loadingSoftwares
                    ? "Loading software..."
                    : `${softwares.length} software found`}
                </p>

                <div className="text-[10px] text-[#94A3B8]">
                  {compareSoftwares.length > 0
                    ? `${compareSoftwares.length}/${MAX_COMPARE} selected`
                    : "Showing results"}
                </div>
              </div>

              {/* ======================================================
                  SOFTWARE LIST / GRID
              ====================================================== */}

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-4 xl:grid-cols-2"
                    : "space-y-3.5"
                }
              >
                {/* LOADING */}

                {loadingSoftwares &&
                  Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="
                        h-[190px]
                        animate-pulse
                        rounded-xl
                        border
                        border-[#E2E7F0]
                        bg-[#F8FAFC]
                      "
                    />
                  ))}

                {/* ERROR */}

                {!loadingSoftwares && error && (
                  <div
                    className="
                      col-span-full
                      border
                      border-red-200
                      bg-red-50
                      px-6
                      py-12
                      text-center
                    "
                  >
                    <p className="text-sm font-medium text-red-600">{error}</p>
                  </div>
                )}

                {/* EMPTY */}

                {!loadingSoftwares && !error && softwares.length === 0 && (
                  <div
                    className="
                      col-span-full
                      border
                      border-[#E2E7F0]
                      bg-white
                      px-6
                      py-14
                      text-center
                    "
                  >
                    <p className="text-sm font-semibold text-[#101B3D]">
                      No software found
                    </p>

                    <p className="mt-1 text-xs text-[#7A849B]">
                      Try changing your search or filters.
                    </p>
                  </div>
                )}

                {/* SOFTWARE */}

                {!loadingSoftwares &&
                  !error &&
                  softwares.map((software) => (
                    <SoftwareCard
                      key={software.id}
                      software={software}
                      isCompared={selectedCompareIds.includes(software.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
              </div>

              {/* PAGINATION */}

              {!loadingSoftwares && !error && softwares.length > 0 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={12}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* ================================================================
          COMPARE BAR
      ================================================================= */}

      {compareSoftwares.length > 0 && (
        <div
          className="
            fixed
            inset-x-0
            bottom-0
            z-50
            border-t
            border-[#DCE3EF]
            bg-white
            shadow-[0_-8px_30px_rgba(15,23,42,0.10)]
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-[1400px]
              flex-col
              gap-3
              px-5
              py-3
              sm:px-6
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-8
              xl:px-10
            "
          >
            {/* SELECTED */}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#101B3D]">
                  Compare Software
                </span>

                <span
                  className="
                    rounded-full
                    bg-[#EFF5FF]
                    px-2
                    py-0.5
                    text-[10px]
                    font-semibold
                    text-[#1749B8]
                  "
                >
                  {compareSoftwares.length}/{MAX_COMPARE}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap gap-2">
                {compareSoftwares.map((software) => (
                  <button
                    key={software.id}
                    type="button"
                    onClick={() => handleRemoveCompare(software.id)}
                    className="
                      rounded-md
                      border
                      border-[#DCE3EF]
                      bg-[#F8FAFC]
                      px-2
                      py-1
                      text-[10px]
                      font-medium
                      text-[#475569]
                      transition
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    {software.name} ×
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION */}

            <button
              type="button"
              disabled={compareSoftwares.length < 2}
              onClick={handleCompare}
              className="
                flex
                h-10
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#1749B8]
                px-5
                text-[11px]
                font-semibold
                text-white
                transition
                hover:bg-[#103D9D]
                disabled:cursor-not-allowed
                disabled:bg-[#CBD5E1]
              "
            >
              Compare
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SoftwareDirectory;
