import { Search, ChevronDown } from "lucide-react";

interface DirectorySearchProps {
  search: string;
  setSearch: (value: string) => void;
}

function DirectorySearch({ search, setSearch }: DirectorySearchProps) {
  return (
    <div className="flex min-h-[81px] flex-col justify-center gap-4 rounded border border-[#ddd9e3] bg-white px-4 md:flex-row md:items-center md:justify-between md:px-5">
      {/* Search */}
      <div className="flex h-[46px] w-full items-center border border-[#ded9e5] px-4 md:max-w-[480px]">
        <Search size={21} strokeWidth={1.8} className="mr-3 text-[#716b82]" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search software..."
          className="w-full bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#777184]"
        />
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 text-[14px]">
        <span className="text-[#454052]">Sort by:</span>

        <div className="relative">
          <select
            className="h-[42px] min-w-[145px] appearance-none border border-[#ddd9e3] bg-white px-3 pr-9 text-[14px] outline-none"
            defaultValue="recommended"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price">Lowest Price</option>
            <option value="name">Name</option>
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-3 text-[#5f596c]"
          />
        </div>
      </div>
    </div>
  );
}

export default DirectorySearch;
