import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const popularCategories = [
  "CRM",
  "ERP",
  "Accounting",
  "HR",
  "Marketing",
  "AI Tools",
];

function Hero() {
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log({
      category,
      search,
    });
  };

  return (
    <section className="border-b border-[#d9d5e5]">
      <div className="mx-auto flex min-h-[545px] max-w-[1100px] flex-col items-center px-6 pt-16 text-center">
        {/* Heading */}
        <h1 className="max-w-[760px] text-[42px] font-bold leading-[1.15] tracking-[-1.5px] md:text-[48px]">
          Find the Right Software for Your
          <br />
          Business
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-[650px] text-[16px] leading-7 text-[#454257]">
          Discover, compare, and evaluate business software based on your
          needs,
          <br className="hidden md:block" />
          budget, industry, and integrations.
        </p>

        {/* Search */}
        <div className="mt-11 flex w-full max-w-[685px] flex-col border border-[#ddd9e5] bg-white shadow-[0_8px_30px_rgba(30,20,70,0.04)] md:h-[58px] md:flex-row">
          {/* Category */}
          <div className="relative flex h-[56px] items-center border-b border-[#ddd9e5] px-5 md:w-[170px] md:border-b-0 md:border-r">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-left text-[14px] text-[#3d394a] outline-none"
            >
              <option>All Categories</option>
              <option>CRM</option>
              <option>ERP</option>
              <option>Accounting</option>
              <option>HR</option>
              <option>Marketing</option>
              <option>AI Tools</option>
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
              className="mr-3 text-[#716b82]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="What software are you looking for?"
              className="w-full bg-transparent text-[14px] text-[#222] outline-none placeholder:text-[#817c91]"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="m-2 h-[40px] bg-[#6846e8] px-7 text-[13px] font-semibold text-white transition hover:bg-[#5938d5]"
          >
            Search
          </button>
        </div>

        {/* Popular */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[13px]">
          <span className="mr-1 font-semibold">Popular:</span>

          {popularCategories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className="text-[#403b4c] underline decoration-[#aaa4b7] underline-offset-4 transition hover:text-[#6846e8]"
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-11 flex flex-col gap-3 sm:flex-row">
          <button className="bg-[#6846e8] px-8 py-3 text-[13px] font-semibold tracking-wide text-white transition hover:bg-[#5938d5]">
            Explore Software
          </button>

          <button className="border border-[#d0cbd9] bg-white px-8 py-3 text-[13px] font-semibold tracking-wide text-[#171717] transition hover:bg-[#f8f7fa]">
            Compare Software
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;