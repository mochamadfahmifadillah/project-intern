import { Search, ChevronRight } from "lucide-react";
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
  return (
    <section id="directory" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <SectionLabel>Directory</SectionLabel>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Discover software.
            </h2>
          </div>

          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search directory..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 mb-8"
          style={{ scrollbarWidth: "none" }}
        >
          <button
            onClick={() => onCategoryChange("all")}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${
              activeCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-50 text-slate-600 border border-slate-200"
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(String(category.id))}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${
                activeCategory === String(category.id)
                  ? "bg-blue-600 text-white"
                  : "bg-slate-50 text-slate-600 border border-slate-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : software.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-slate-400" />
            </div>

            <h3 className="text-sm font-semibold text-slate-800 mb-2">
              No software found
            </h3>

            <p className="text-sm text-slate-500 max-w-xs">
              No software matches your current search or category filter.
            </p>

            <button
              onClick={onClearFilters}
              className="mt-5 text-sm text-blue-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {software.map((item) => (
                <SoftwareCard key={item.id} software={item} />
              ))}
            </div>

            <div className="text-center mt-10">
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 font-medium hover:bg-slate-50">
                View all software
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
