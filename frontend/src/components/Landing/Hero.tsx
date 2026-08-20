import { useEffect, useState } from "react";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getPublicSoftwareCategories,
  type SoftwareCategory,
} from "../../services/softwareService";

function Hero() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<SoftwareCategory[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

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

        setCategories(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to load software categories:", error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (category.trim()) {
      params.set("category", category);
    }

    const query = params.toString();

    navigate(`/software-directory${query ? `?${query}` : ""}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Category
  |--------------------------------------------------------------------------
  */

  const handleCategoryClick = (slug: string) => {
    setCategory(slug);

    navigate(`/software-directory?category=${encodeURIComponent(slug)}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Navigation
  |--------------------------------------------------------------------------
  */

  const handleExplore = () => {
    navigate("/software-directory");
  };

  const handleCompare = () => {
    navigate("/software-comparison");
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-[#ddd7e8]">
      {/* ================================================================= */}
      {/* BACKGROUND */}
      {/* ================================================================= */}

      <div className="absolute inset-0 -z-20">
        <img
          src="/background1.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Subtle readability gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/65 via-white/35 to-white/75" />

      {/* Small brand accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-[#704FE6]" />

      {/* ================================================================= */}
      {/* CONTENT */}
      {/* ================================================================= */}

      <div className="mx-auto flex min-h-[700px] max-w-[1180px] flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        {/* Eyebrow */}

        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#625b70]">
          <span className="h-px w-8 bg-[#704FE6]" />
          Software Intelligence Platform
          <span className="h-px w-8 bg-[#704FE6]" />
        </div>

        {/* Heading */}

        <h1 className="mt-7 max-w-[850px] text-[46px] font-bold leading-[1.04] tracking-[-2.2px] text-[#17151d] sm:text-[54px] md:text-[62px] lg:text-[68px]">
          Find software that
          <span className="block text-[#704FE6]">
            moves your business forward.
          </span>
        </h1>

        {/* Description */}

        <p className="mt-6 max-w-[620px] text-[15px] leading-7 text-[#5d5768] md:text-[16px]">
          Discover, evaluate, and compare business software based on your needs,
          budget, industry, and integrations.
        </p>

        {/* ================================================================= */}
        {/* SEARCH */}
        {/* ================================================================= */}

        <div className="mt-10 w-full max-w-[780px]">
          <div className="flex flex-col rounded-[2px] border border-[#d7d0e1] bg-white p-2 shadow-[0_20px_55px_rgba(42,30,75,0.14)] md:h-[68px] md:flex-row">
            {/* Category */}

            <div className="relative flex h-[52px] items-center border-b border-[#ebe7f0] px-4 md:h-full md:w-[190px] md:border-b-0 md:border-r">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                disabled={loadingCategories}
                className="w-full cursor-pointer appearance-none bg-transparent pr-7 text-left text-[13px] font-medium text-[#35303f] outline-none disabled:cursor-wait"
              >
                <option value="">
                  {loadingCategories ? "Loading..." : "All Categories"}
                </option>

                {categories.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                strokeWidth={1.8}
                className="pointer-events-none absolute right-4 text-[#777080]"
              />
            </div>

            {/* Search Input */}

            <div className="flex h-[52px] flex-1 items-center px-4 md:h-full">
              <Search
                size={20}
                strokeWidth={1.8}
                className="mr-3 shrink-0 text-[#704FE6]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search software, tools, or solutions..."
                className="w-full bg-transparent text-[14px] text-[#201d27] outline-none placeholder:text-[#9791a0]"
              />
            </div>

            {/* Search */}

            <button
              type="button"
              onClick={handleSearch}
              className="group flex h-[48px] items-center justify-center gap-2 bg-[#704FE6] px-8 text-[13px] font-bold text-white transition hover:bg-[#6F4FDE] md:h-[52px]"
            >
              Search
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Search hint */}

          <div className="mt-3 flex justify-between px-1 text-[10px] text-[#817a8d]">
            <span>Search by name, category, or business need</span>

            <span className="hidden sm:block">Press Enter to search</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* POPULAR */}
        {/* ================================================================= */}

        {!loadingCategories && categories.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#817a8d]">
              Popular
            </span>

            {categories.slice(0, 6).map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCategoryClick(item.slug)}
                className={`text-[12px] font-medium underline decoration-transparent underline-offset-4 transition hover:decoration-current ${
                  index === 0
                    ? "text-[#704FE6]"
                    : "text-[#514b5b] hover:text-[#704FE6]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {/* ================================================================= */}
        {/* CTA */}
        {/* ================================================================= */}

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleExplore}
            className="group inline-flex min-w-[175px] items-center justify-center gap-2 bg-[#704FE6] px-7 py-3.5 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#6F4FDE]"
          >
            Explore Software
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={handleCompare}
            className="min-w-[175px] border border-[#cbc3d8] bg-white px-7 py-3.5 text-[13px] font-semibold text-[#302b3b] transition hover:border-[#704FE6] hover:text-[#704FE6]"
          >
            Compare Software
          </button>
        </div>

        {/* ================================================================= */}
        {/* JOURNEY */}
        {/* ================================================================= */}

        <div className="mt-12 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b8495]">
          <span>Discover</span>

          <span className="h-1 w-1 rounded-full bg-[#DEC8FE]" />

          <span>Evaluate</span>

          <span className="h-1 w-1 rounded-full bg-[#FFD361]" />

          <span>Compare</span>

          <span className="h-1 w-1 rounded-full bg-[#704FE6]" />

          <span>Decide</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
