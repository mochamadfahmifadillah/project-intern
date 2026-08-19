import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import {
  getPublicSoftwareCategories,
  getPublicSoftwares,
  type Software,
  type SoftwareCategory,
} from "../../services/softwareService";

function SoftwareDirectory() {
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [categories, setCategories] = useState<SoftwareCategory[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Categories
  |--------------------------------------------------------------------------
  */

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      setCategoryError("");

      const response = await getPublicSoftwareCategories();

      setCategories(response?.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil kategori software:", error);

      setCategoryError("Gagal memuat kategori.");
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch Software
  |--------------------------------------------------------------------------
  */

  const fetchSoftwares = async (
    searchValue = search,
    categoryValue = category,
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await getPublicSoftwares({
        search: searchValue.trim() || undefined,
        category: categoryValue || undefined,
      });

      setSoftwares(response?.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data software:", error);

      setError("Gagal mengambil data software.");
      setSoftwares([]);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchCategories();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Search & Filter
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSoftwares(search, category);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, category]);

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const resetFilter = () => {
    setSearch("");
    setCategory("");
  };

  const retryFetch = () => {
    fetchSoftwares(search, category);
  };

  const retryCategories = () => {
    fetchCategories();
  };

  const hasFilter = Boolean(search || category);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--off-white)",
      }}
    >
      {/* ================================================================
          HERO / HEADER
      ================================================================= */}

      <section
        className="
          relative
          isolate
          overflow-hidden
          border-b
          px-4
          pb-16
          pt-28
          sm:px-6
          sm:pb-20
          sm:pt-32
          lg:px-8
          lg:pb-24
        "
        style={{
          backgroundColor: "var(--primary-dark)",
        }}
      >
        {/* Background Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            -top-40
            h-[420px]
            w-[420px]
            rounded-full
            blur-[130px]
          "
          style={{
            backgroundColor: "var(--lavender)",
            opacity: 0.18,
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-48
            -right-20
            h-[420px]
            w-[420px]
            rounded-full
            blur-[130px]
          "
          style={{
            backgroundColor: "var(--accent-yellow)",
            opacity: 0.08,
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}

          <div className="mb-7 flex items-center gap-2 text-xs text-white/45">
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>

            <span>/</span>

            <span className="text-white/70">Software Directory</span>
          </div>

          {/* Heading */}

          <div className="max-w-3xl">
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-4
                py-2
              "
              style={{
                borderColor: "rgba(255,255,255,0.16)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "var(--lavender)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />

              <span className="text-xs font-semibold">
                Software Discovery Platform
              </span>
            </div>

            <h1
              className="
                text-4xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Temukan software yang
              <span
                className="block"
                style={{
                  color: "var(--lavender)",
                }}
              >
                tepat untuk bisnis Anda.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                sm:text-base
                lg:text-lg
              "
              style={{
                color: "rgba(255,255,255,0.68)",
              }}
            >
              Jelajahi berbagai software bisnis berdasarkan kategori, kebutuhan,
              dan solusi yang ingin Anda temukan.
            </p>
          </div>

          {/* ============================================================
              SEARCH BOX
          ========================================================== */}

          <div
            className="
              mt-9
              max-w-4xl
              rounded-2xl
              border
              p-2
              shadow-2xl
            "
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.16)",
            }}
          >
            <div className="relative flex items-center">
              <Search
                className="
                  absolute
                  left-4
                  h-5
                  w-5
                "
                style={{
                  color: "var(--primary)",
                }}
              />

              <input
                id="search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari software, kategori, atau solusi..."
                autoComplete="off"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border-0
                  bg-white
                  pl-12
                  pr-12
                  text-sm
                  text-gray-900
                  outline-none
                  placeholder:text-gray-400
                  focus:ring-4
                  focus:ring-white/20
                  sm:h-16
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    absolute
                    right-3
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Categories */}

          {!loadingCategories && categories.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs text-white/40">Explore:</span>

              {categories.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.slug)}
                  className="
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-white/70
                    transition-all
                    hover:border-white/30
                    hover:bg-white/10
                    hover:text-white
                  "
                  style={{
                    borderColor:
                      category === item.slug
                        ? "var(--accent-yellow)"
                        : "rgba(255,255,255,0.12)",
                    backgroundColor:
                      category === item.slug
                        ? "rgba(255,211,97,0.12)"
                        : "rgba(255,255,255,0.04)",
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          MAIN CONTENT
      ================================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* ============================================================
            FILTER BAR
        ========================================================== */}

        <div
          className="
            mb-8
            rounded-2xl
            border
            bg-white
            p-4
            shadow-sm
            sm:p-5
          "
          style={{
            borderColor: "rgba(0,0,0,0.07)",
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            {/* Search */}

            <div className="flex-1">
              <label
                htmlFor="directory-search"
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-500
                "
              >
                <Search className="h-3.5 w-3.5" />
                Search
              </label>

              <div className="relative">
                <input
                  id="directory-search"
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search software..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-[var(--primary)]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[var(--primary)]/10
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-gray-700
                    "
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category */}

            <div className="w-full lg:w-64">
              <label
                htmlFor="category"
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-500
                "
              >
                <Filter className="h-3.5 w-3.5" />
                Category
              </label>

              {categoryError ? (
                <div className="flex h-11 gap-2">
                  <div className="flex flex-1 items-center rounded-xl border border-red-200 bg-red-50 px-3">
                    <span className="text-xs text-red-600">
                      {categoryError}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={retryCategories}
                    className="
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      text-xs
                      font-semibold
                      text-gray-700
                      transition
                      hover:bg-gray-50
                    "
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  disabled={loadingCategories}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    text-sm
                    text-gray-700
                    outline-none
                    transition
                    focus:border-[var(--primary)]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[var(--primary)]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <option value="">
                    {loadingCategories
                      ? "Loading categories..."
                      : "All Categories"}
                  </option>

                  {!loadingCategories &&
                    categories.map((item) => (
                      <option key={item.id} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                </select>
              )}
            </div>

            {/* Reset */}

            <button
              type="button"
              onClick={resetFilter}
              disabled={!hasFilter}
              className="
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-200
                px-5
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-40
                lg:w-auto
              "
            >
              <SlidersHorizontal className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        {/* ============================================================
            RESULT HEADER
        ========================================================== */}

        {!loading && !error && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {softwares.length > 0
                  ? "Software ditemukan"
                  : "Hasil pencarian"}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {softwares.length} software
                </h2>

                {hasFilter && (
                  <span
                    className="
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                    "
                    style={{
                      backgroundColor: "var(--lavender-soft)",
                      color: "var(--primary)",
                    }}
                  >
                    Filter aktif
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <CheckCircle2 className="h-4 w-4" />
              Verified software directory
            </div>
          </div>
        )}

        {/* ============================================================
            LOADING
        ========================================================== */}

        {loading && (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-6
                  shadow-sm
                "
              >
                <div className="flex justify-between">
                  <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-100" />

                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
                </div>

                <div className="mt-5 h-5 w-2/3 animate-pulse rounded bg-gray-100" />

                <div className="mt-3 h-5 w-24 animate-pulse rounded-full bg-gray-100" />

                <div className="mt-5 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                </div>

                <div className="mt-6 h-4 w-24 animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* ============================================================
            ERROR
        ========================================================== */}

        {!loading && error && (
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-white
              px-6
              py-16
              text-center
              shadow-sm
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
              "
              style={{
                backgroundColor: "#FEF2F2",
              }}
            >
              <X className="h-6 w-6 text-red-500" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-gray-900">
              Terjadi kesalahan
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={retryFetch}
              className="
                mt-6
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:-translate-y-0.5
              "
              style={{
                backgroundColor: "var(--primary)",
              }}
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* ============================================================
            EMPTY
        ========================================================== */}

        {!loading && !error && softwares.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-gray-100
              bg-white
              px-6
              py-20
              text-center
              shadow-sm
            "
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
              "
              style={{
                backgroundColor: "var(--lavender-soft)",
              }}
            >
              <Search
                className="h-7 w-7"
                style={{
                  color: "var(--primary)",
                }}
              />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              Software tidak ditemukan
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Tidak ada software yang cocok dengan pencarian atau kategori yang
              Anda pilih.
            </p>

            {hasFilter && (
              <button
                type="button"
                onClick={resetFilter}
                className="
                  mt-6
                  rounded-xl
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:-translate-y-0.5
                "
                style={{
                  backgroundColor: "var(--primary)",
                }}
              >
                Reset Filter
              </button>
            )}
          </div>
        )}

        {/* ============================================================
            SOFTWARE GRID
        ========================================================== */}

        {!loading && !error && softwares.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {softwares.map((software) => (
              <Link
                key={software.id}
                to={`/software-directory/${software.slug}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:border-purple-100
                  hover:shadow-xl
                  focus:outline-none
                  focus:ring-4
                  focus:ring-purple-100
                "
              >
                {/* Top Accent */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-1
                    w-0
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                  style={{
                    backgroundColor: "var(--primary)",
                  }}
                />

                {/* Header */}

                <div className="flex items-start justify-between gap-4">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                    "
                    style={{
                      backgroundColor: "var(--lavender-soft)",
                    }}
                  >
                    {software.logo ? (
                      <img
                        src={software.logo}
                        alt={`Logo ${software.name}`}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="text-lg font-black"
                        style={{
                          color: "var(--primary)",
                        }}
                      >
                        {software.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                    "
                    style={{
                      backgroundColor: "#ECFDF3",
                      color: "#15803D",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>
                </div>

                {/* Content */}

                <div className="mt-5">
                  <h2
                    className="
                      text-lg
                      font-bold
                      tracking-tight
                      text-gray-900
                      transition-colors
                      group-hover:text-[var(--primary)]
                    "
                  >
                    {software.name}
                  </h2>

                  {software.category && (
                    <span
                      className="
                        mt-2
                        inline-flex
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                      "
                      style={{
                        backgroundColor: "var(--lavender-soft)",
                        color: "var(--primary)",
                      }}
                    >
                      {software.category.name}
                    </span>
                  )}

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                    {software.description || "Tidak ada deskripsi software."}
                  </p>
                </div>

                {/* Bottom */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-100
                    pt-4
                  "
                >
                  <div className="flex items-center gap-3">
                    {software.rating !== undefined &&
                      software.rating !== null && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                          <span className="text-yellow-500">★</span>

                          {Number(software.rating).toFixed(1)}
                        </span>
                      )}

                    {software.reviews !== undefined && (
                      <span className="text-xs text-gray-400">
                        {software.reviews} reviews
                      </span>
                    )}
                  </div>

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-bold
                      transition-all
                      group-hover:gap-2
                    "
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    Lihat detail
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SoftwareDirectory;
