import { Search } from "lucide-react";

interface HeroSectionProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const POPULAR_SEARCHES = [
  "Accounting",
  "HR & Payroll",
  "CRM",
  "Project Management",
  "POS",
];

export default function HeroSection({
  value,
  onChange,
  onSearch,
}: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm font-medium text-blue-600 mb-5">
          1,247 software listed across 89 categories
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          Find the right software
          <br />
          for your business.
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-500 leading-relaxed">
          Discover, compare, and review business software trusted by 50,000+
          Indonesian companies, startups, and UMKM.
        </p>

        {/* SEARCH */}

        <div className="max-w-2xl mx-auto mt-9">
          <div className="flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <Search className="w-5 h-5 text-slate-400 ml-3" />

            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              placeholder="Search software..."
              className="flex-1 px-2 py-3 outline-none text-sm text-slate-900 placeholder:text-slate-400"
            />

            <button
              onClick={onSearch}
              className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* POPULAR */}

        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <span className="text-xs text-slate-400">Popular:</span>

          {POPULAR_SEARCHES.map((item) => (
            <button
              key={item}
              onClick={() => onChange(item)}
              className="text-xs text-slate-500 hover:text-blue-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
