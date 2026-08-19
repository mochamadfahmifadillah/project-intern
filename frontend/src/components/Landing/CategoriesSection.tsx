import { ChevronRight, Layers } from "lucide-react";
import type { Category } from "../../types/software";
import SectionLabel from "./SectionLabel";

interface CategoriesSectionProps {
  categories: Category[];
  loading: boolean;
  onSelect: (category: Category) => void;
}

export default function CategoriesSection({
  categories,
  loading,
  onSelect,
}: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <SectionLabel>Categories</SectionLabel>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Explore by category.
            </h2>
          </div>

          <button className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-xl bg-white border border-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-3" />

            <p className="text-sm font-medium text-slate-700">
              No categories available
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Software categories will appear here once available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelect(category)}
                className="group bg-white rounded-xl border border-slate-100 p-4 text-left hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                  <Layers className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                </div>

                <div className="text-sm font-semibold text-slate-800">
                  {category.name}
                </div>

                <div className="text-xs text-slate-400 mt-1">
                  {category.softwares_count ?? 0} tools
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
