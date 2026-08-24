import { Search } from "lucide-react";

interface DirectorySearchProps {
  search: string;
  setSearch: (value: string) => void;
}

function DirectorySearch({ search, setSearch }: DirectorySearchProps) {
  return (
    <div className="flex w-full items-start pt-3">
      {/* Search */}
      <div className="flex h-[46px] w-full items-center border border-[#ded9e5] bg-white">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search software, category, or business need.."
          className="h-full min-w-0 flex-1 bg-white px-4 text-[15px] text-[#222] outline-none placeholder:text-[#777184]"
        />

        <div className="flex h-full w-[48px] shrink-0 items-center justify-center bg-[#172554]">
          <Search size={20} strokeWidth={2} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default DirectorySearch;
