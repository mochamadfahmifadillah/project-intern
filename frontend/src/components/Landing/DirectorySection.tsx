import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, Software } from "../../types/software";

import SectionLabel from "./SectionLabel";
import SoftwareCard from "./SoftwareCard";
import SkeletonCard from "./SkeletonCard";

interface DirectorySectionProps {
  software: Software[];
  categories: Category[];
  loading: boolean;
  search: string;
  activeCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

export default function DirectorySection({
  software,
  categories,
  loading,
  search,
  activeCategory,
  onSearchChange,
  onCategoryChange,
  onClearFilters,
}: DirectorySectionProps) {
  const hasFilter = search.trim() !== "" || activeCategory !== "all";

  return (
    <section
      id="directory"
      className="
        relative
        overflow-hidden
        px-4
        py-24
        sm:px-6
        sm:py-28
        lg:px-8
        lg:py-32
      "
      style={{
        backgroundColor: "var(--off-white)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <div className="mb-12">
          <SectionLabel>Direktori Software</SectionLabel>

          <div
            className="
              mt-5
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div className="max-w-2xl">
              <h2
                className="
                  text-3xl
                  font-bold
                  leading-[1.1]
                  tracking-tight
                  sm:text-4xl
                  lg:text-5xl
                "
                style={{
                  color: "var(--text-primary)",
                }}
              >
                Temukan tools yang tepat
                <span
                  className="block"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  untuk bisnis Anda.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-7
                  sm:text-base
                "
                style={{
                  color: "#707070",
                }}
              >
                Jelajahi berbagai software berdasarkan kategori, kebutuhan,
                fitur, dan informasi yang membantu Anda membuat keputusan
                dengan lebih percaya diri.
              </p>
            </div>

            {/* Result Count */}
            {!loading && (
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  text-sm
                "
                style={{
                  color: "#777777",
                }}
              >
                <span
                  className="
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-full
                    px-2
                    font-semibold
                  "
                  style={{
                    backgroundColor: "var(--lavender-soft)",
                    color: "var(--primary)",
                  }}
                >
                  {software.length}
                </span>

                <span>software tersedia</span>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            SEARCH BAR
        ========================================================== */}
        <div
          className="
            mb-6
            rounded-2xl
            border
            bg-white
            p-2
            shadow-sm
            transition
            focus-within:shadow-md
          "
          style={{
            borderColor: "var(--gray)",
          }}
        >
          <div className="relative">
            <Search
              className="
                absolute
                left-4
                top-1/2
                h-5
                w-5
                -translate-y-1/2
              "
              style={{
                color: "var(--primary)",
              }}
            />

            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari software, kategori, atau fitur..."
              aria-label="Cari software"
              className="
                h-14
                w-full
                rounded-xl
                border-0
                bg-transparent
                pl-12
                pr-12
                text-sm
                outline-none
                sm:h-16
                sm:text-base
              "
              style={{
                color: "var(--text-primary)",
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Hapus pencarian"
                className="
                  absolute
                  right-4
                  top-1/2
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  transition
                  hover:bg-gray-100
                "
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================
            FILTER BAR
        ========================================================== */}
        <div
          className="
            mb-10
            flex
            items-center
            gap-2
            overflow-x-auto
            pb-2
          "
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div
            className="
              mr-1
              flex
              shrink-0
              items-center
              gap-2
              text-xs
              font-semibold
            "
            style={{
              color: "#777777",
            }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </div>

          <button
            type="button"
            onClick={() => onCategoryChange("all")}
            className="
              shrink-0
              rounded-full
              border
              px-4
              py-2
              text-xs
              font-semibold
              transition-all
            "
            style={
              activeCategory === "all"
                ? {
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary)",
                    color: "white",
                  }
                : {
                    backgroundColor: "white",
                    borderColor: "var(--gray)",
                    color: "#666666",
                  }
            }
          >
            Semua
          </button>

          {categories.map((category) => {
            const isActive = activeCategory === String(category.id);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(String(category.id))}
                className="
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  transition-all
                "
                style={
                  isActive
                    ? {
                        backgroundColor: "var(--primary)",
                        borderColor: "var(--primary)",
                        color: "white",
                      }
                    : {
                        backgroundColor: "white",
                        borderColor: "var(--gray)",
                        color: "#666666",
                      }
                }
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* =========================================================
            CONTENT
        ========================================================== */}
        {loading ? (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : software.length === 0 ? (
          /* =======================================================
             EMPTY STATE
          ======================================================== */
          <div
            className="
              rounded-3xl
              border
              bg-white
              px-6
              py-20
              text-center
            "
            style={{
              borderColor: "var(--gray)",
            }}
          >
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
              "
              style={{
                backgroundColor: "var(--lavender-soft)",
              }}
            >
              <Search
                className="h-6 w-6"
                style={{
                  color: "var(--primary)",
                }}
              />
            </div>

            <h3
              className="text-base font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Software tidak ditemukan
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-sm
                text-sm
                leading-6
              "
              style={{
                color: "#777777",
              }}
            >
              Coba gunakan kata kunci lain atau pilih kategori yang berbeda
              untuk menemukan software yang Anda cari.
            </p>

            {hasFilter && (
              <button
                type="button"
                onClick={onClearFilters}
                className="
                  mt-6
                  rounded-xl
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:brightness-110
                "
                style={{
                  backgroundColor: "var(--primary)",
                }}
              >
                Hapus semua filter
              </button>
            )}
          </div>
        ) : (
          <>
            {/* =====================================================
                SOFTWARE GRID
            ====================================================== */}
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {software.map((item) => (
                <SoftwareCard
                  key={item.id}
                  software={item}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}