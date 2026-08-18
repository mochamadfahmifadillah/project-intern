import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

      setCategoryError("Gagal mengambil kategori software.");
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
  | Initial Categories
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchCategories();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Search & Category Filter
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
  | Reset Filter
  |--------------------------------------------------------------------------
  */

  const resetFilter = () => {
    setSearch("");
    setCategory("");
  };

  /*
  |--------------------------------------------------------------------------
  | Retry Software
  |--------------------------------------------------------------------------
  */

  const retryFetch = () => {
    fetchSoftwares(search, category);
  };

  /*
  |--------------------------------------------------------------------------
  | Retry Categories
  |--------------------------------------------------------------------------
  */

  const retryCategories = () => {
    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ----------------------------------------------------------------- */}
      {/* Header */}
      {/* ----------------------------------------------------------------- */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-medium text-blue-600">
            Software Directory
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Temukan Software yang Tepat
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Jelajahi berbagai software berdasarkan kategori dan kebutuhan Anda.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Content */}
      {/* ----------------------------------------------------------------- */}

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* ---------------------------------------------------------------- */}
        {/* Filter */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px_auto]">
            {/* Search */}

            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Cari Software
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Contoh: Figma, Slack, Notion..."
                autoComplete="off"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Category */}

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>

              {categoryError ? (
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
                    <span className="text-xs text-red-600">
                      {categoryError}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={retryCategories}
                    className="rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="">
                    {loadingCategories
                      ? "Memuat kategori..."
                      : "Semua Kategori"}
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

            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilter}
                disabled={!search && !category}
                className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Loading */}
        {/* ---------------------------------------------------------------- */}

        {loading && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-gray-500">Memuat software...</p>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Error */}
        {/* ---------------------------------------------------------------- */}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">Terjadi Kesalahan</h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={retryFetch}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Empty */}
        {/* ---------------------------------------------------------------- */}

        {!loading && !error && softwares.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="font-semibold text-gray-900">
              Software tidak ditemukan
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Coba gunakan kata kunci atau kategori yang berbeda.
            </p>

            {(search || category) && (
              <button
                type="button"
                onClick={resetFilter}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Result */}
        {/* ---------------------------------------------------------------- */}

        {!loading && !error && softwares.length > 0 && (
          <>
            {/* Result Count */}

            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium text-gray-900">
                  {softwares.length}
                </span>{" "}
                software
              </p>

              {(search || category) && (
                <p className="text-sm text-gray-400">Filter aktif</p>
              )}
            </div>

            {/* Software Grid */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {softwares.map((software) => (
                <Link
                  key={software.id}
                  to={`/software-directory/${software.slug}`}
                  className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {/* Logo + Status */}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                      {software.logo ? (
                        <img
                          src={software.logo}
                          alt={`Logo ${software.name}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">
                          {software.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </div>

                  {/* Name */}

                  <h2 className="mt-5 text-lg font-semibold text-gray-900 transition group-hover:text-blue-600">
                    {software.name}
                  </h2>

                  {/* Category */}

                  {software.category && (
                    <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      {software.category.name}
                    </span>
                  )}

                  {/* Description */}

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                    {software.description || "Tidak ada deskripsi software."}
                  </p>

                  {/* Detail */}

                  <span className="mt-5 inline-flex text-sm font-medium text-blue-600 transition group-hover:text-blue-700">
                    Lihat Detail →
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default SoftwareDirectory;
