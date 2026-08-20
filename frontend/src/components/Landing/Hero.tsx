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

        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load software categories:", error);
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
  | CTA
  |--------------------------------------------------------------------------
  */

  const handleExplore = () => {
    navigate("/software-directory");
  };

  const handleCompare = () => {
    navigate("/software-comparison");
  };

  return (
    <section
      className="relative min-h-[800px] overflow-hidden border-b border-[#d9d5e5] bg-cover bg-center"
      style={{
        backgroundImage: "url('/background1.webp')",
      }}
    >
      {/* Content */}
      <div className="relative mx-auto flex min-h-[680px] max-w-[1100px] flex-col items-center px-6 pb-20 pt-24 text-center">
        {/* Heading */}
        <h1 className="max-w-[760px] text-[42px] font-bold leading-[1.15] tracking-[-1.5px] text-[#17151f] md:text-[48px]">
          Find the Right Software for Your
          <br />
          Business
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-[650px] text-[16px] leading-7 text-[#454257]">
          Discover, compare, and evaluate business software based on your needs,
          <br className="hidden md:block" />
          budget, industry, and integrations.
        </p>

        {/* Search */}
        <div className="mt-11 flex w-full max-w-[685px] flex-col border border-[#ddd9e5] bg-white shadow-[0_12px_40px_rgba(30,20,70,0.10)] md:h-[58px] md:flex-row">
          {/* Category */}
          <div className="relative flex h-[56px] items-center border-b border-[#ddd9e5] px-5 md:w-[190px] md:border-b-0 md:border-r">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={loadingCategories}
              className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-left text-[14px] text-[#3d394a] outline-none disabled:cursor-wait disabled:text-[#817c91]"
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
              size={17}
              className="pointer-events-none absolute right-4 text-[#555064]"
            />
          </div>

          {/* Search Input */}
          <div className="flex h-[56px] flex-1 items-center px-4">
            <Search
              size={21}
              strokeWidth={1.8}
              className="mr-3 shrink-0 text-[#716b82]"
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
              placeholder="What software are you looking for?"
              className="w-full bg-transparent text-[14px] text-[#222] outline-none placeholder:text-[#817c91]"
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="m-2 h-[40px] bg-[#6846e8] px-7 text-[13px] font-semibold text-white transition hover:bg-[#5938d5]"
          >
            Search
          </button>
        </div>

        {/* Popular Categories */}
        {!loadingCategories && categories.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[13px]">
            <span className="mr-1 font-semibold text-[#302c3b]">Popular:</span>

            {categories.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCategoryClick(item.slug)}
                className="text-[#403b4c] underline decoration-[#aaa4b7] underline-offset-4 transition hover:text-[#6846e8]"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-11 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleExplore}
            className="group flex items-center justify-center gap-2 bg-[#6846e8] px-8 py-3 text-[13px] font-semibold tracking-wide text-white transition hover:bg-[#5938d5]"
          >
            Explore Software
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={handleCompare}
            className="border border-[#d0cbd9] bg-white px-8 py-3 text-[13px] font-semibold tracking-wide text-[#171717] transition hover:bg-[#f8f7fa]"
          >
            Compare Software
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
