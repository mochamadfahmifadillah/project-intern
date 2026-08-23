import { useEffect, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

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
  | State
  |--------------------------------------------------------------------------
  */

  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [categories, setCategories] = useState<SoftwareCategory[]>([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [loadingSoftwares, setLoadingSoftwares] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load Categories
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
  | Load Softwares
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

          // Jangan dikirim kalau backend belum support.
          // Pricing tetap dipakai untuk UI filter.
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
  | Category Change
  |--------------------------------------------------------------------------
  */

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Pricing Change
  |--------------------------------------------------------------------------
  */

  const handlePricingChange = (pricing: string) => {
    setSelectedPricing(pricing);
    setCurrentPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Search Change
  |--------------------------------------------------------------------------
  */

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Render
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

          <div className="mb-6">
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
              MAIN LAYOUT

              IMPORTANT:
              Sidebar = fixed width
              Content = flex-1
              Software cards = ONE COLUMN
          ============================================================ */}

          <div
            className="
              flex
              items-start
              gap-5
              lg:gap-6
            "
          >
            {/* ========================================================
                FILTER SIDEBAR
            ========================================================= */}

            <div
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
                onCategoryChange={handleCategoryChange}
                onPricingChange={handlePricingChange}
                loading={loadingCategories}
              />
            </div>

            {/* ========================================================
                CONTENT
            ========================================================= */}

            <section className="min-w-0 flex-1">
              {/* ======================================================
                  SEARCH + SORT
              ====================================================== */}

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                "
              >
                {/* Search */}

                <div className="min-w-0 flex-1">
                  <DirectorySearch
                    search={search}
                    setSearch={handleSearchChange}
                  />
                </div>

                {/* Sort */}

                <button
                  type="button"
                  className="
                    flex
                    h-[42px]
                    shrink-0
                    items-center
                    justify-between
                    gap-5
                    rounded-lg
                    border
                    border-[#D7DFEC]
                    bg-white
                    px-4
                    text-[11px]
                    font-medium
                    text-[#475569]
                    transition
                    hover:border-[#1749B8]
                  "
                >
                  <span>Sort by</span>

                  <span className="font-semibold text-[#101B3D]">
                    Most Popular
                  </span>

                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              </div>

              {/* ======================================================
                  ACTIVE FILTERS
              ====================================================== */}

              {(selectedCategory || selectedPricing) && (
                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <span className="text-[10px] font-medium text-[#7A849B]">
                    Active filters:
                  </span>

                  {selectedCategory && (
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("")}
                      className="
                        rounded-full
                        bg-[#EFF5FF]
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-[#1749B8]
                      "
                    >
                      Category
                      <span className="ml-1">×</span>
                    </button>
                  )}

                  {selectedPricing && (
                    <button
                      type="button"
                      onClick={() => handlePricingChange("")}
                      className="
                        rounded-full
                        bg-[#EFF5FF]
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-[#1749B8]
                      "
                    >
                      {selectedPricing}
                      <span className="ml-1">×</span>
                    </button>
                  )}
                </div>
              )}

              {/* ======================================================
                  MOBILE FILTER BUTTON
              ====================================================== */}

              <button
                type="button"
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
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
                  RESULT COUNT
              ====================================================== */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#EEF2F7]
                  pb-3
                "
              >
                <p className="text-[11px] text-[#7A849B]">
                  {loadingSoftwares
                    ? "Loading software..."
                    : `${softwares.length} software found`}
                </p>

                <div className="text-[10px] text-[#94A3B8]">
                  Showing results
                </div>
              </div>

              {/* ======================================================
                  SOFTWARE LIST

                  IMPORTANT:
                  JANGAN pakai grid-cols-2 di sini.
              ====================================================== */}

              <div className="mt-4 space-y-3.5">
                {/* Loading */}

                {loadingSoftwares && (
                  <>
                    {Array.from({
                      length: 4,
                    }).map((_, index) => (
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
                  </>
                )}

                {/* Error */}

                {!loadingSoftwares && error && (
                  <div
                    className="
                        rounded-xl
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

                {/* Empty */}

                {!loadingSoftwares && !error && softwares.length === 0 && (
                  <div
                    className="
                        rounded-xl
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

                {/* Software */}

                {!loadingSoftwares &&
                  !error &&
                  softwares.map((software) => (
                    <SoftwareCard key={software.id} software={software} />
                  ))}
              </div>

              {/* ======================================================
                  PAGINATION
              ====================================================== */}

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
    </div>
  );
}

export default SoftwareDirectory;
