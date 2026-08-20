import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-white text-[#171717]">
      <Navbar />

      <main className="border-b border-[#d9d5e5]">
        <div className="mx-auto flex max-w-[1340px] gap-6 px-6 py-9 lg:px-8">
          {/* ============================================================
              SIDEBAR
          ============================================================ */}

          <DirectoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            loading={loadingCategories}
          />

          {/* ============================================================
              CONTENT
          ============================================================ */}

          <section className="min-w-0 flex-1">
            {/* Breadcrumb */}

            <div className="flex items-center gap-3 text-[13px]">
              <span className="text-[#403b4c]">Home</span>

              <span className="text-[#777184]">›</span>

              <span className="font-medium">Software Directory</span>
            </div>

            {/* Title */}

            <h1 className="mt-2 text-[34px] font-semibold tracking-[-1px]">
              Software Directory
            </h1>

            {/* Search */}

            <div className="mt-6">
              <DirectorySearch search={search} setSearch={handleSearchChange} />
            </div>

            {/* ==========================================================
                CARDS
            ========================================================== */}

            <div className="mt-8 grid gap-4 xl:grid-cols-2">
              {/* Loading */}

              {loadingSoftwares && (
                <div className="col-span-full border border-[#ddd9e3] p-10 text-center">
                  <p className="text-[#777184]">Loading software...</p>
                </div>
              )}

              {/* Error */}

              {!loadingSoftwares && error && (
                <div className="col-span-full border border-red-200 bg-red-50 p-10 text-center">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Empty */}

              {!loadingSoftwares && !error && softwares.length === 0 && (
                <div className="col-span-full border border-[#ddd9e3] p-10 text-center">
                  <p className="text-[#777184]">No software found.</p>
                </div>
              )}

              {/* Software */}

              {!loadingSoftwares &&
                !error &&
                softwares.map((software) => (
                  <SoftwareCard key={software.id} software={software} />
                ))}
            </div>

            {/* ==========================================================
                PAGINATION
            ========================================================== */}

            {!loadingSoftwares && softwares.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={12}
                onPageChange={setCurrentPage}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default SoftwareDirectory;
