import type { Category } from "../../types/software";

interface CategoriesSectionProps {
  categories: Category[];
  loading: boolean;
  activeCategory: string;
  onSelect: (category: Category) => void;
}

export default function CategoriesSection({
  categories,
  loading,
  activeCategory,
  onSelect,
}: CategoriesSectionProps) {
  return (
    <section className="py-20 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Browse by category
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {categories.length} categories
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            // handle all category dari parent
          }}
          className={`mb-4 px-4 py-2 rounded-lg text-sm border transition-colors ${
            activeCategory === "all"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          All categories
        </button>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="h-24 rounded-xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelect(category)}
                className={`text-left p-4 rounded-xl border transition-colors ${
                  activeCategory === category.slug
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-200 hover:bg-blue-50/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-xl">
                    {category.icon ?? "📁"}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {category.name}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {category.softwares_count ?? 0} products
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
