import type { Software } from "../../types/software";
import SoftwareCard from "./SoftwareCard";

interface FeaturedSoftwareSectionProps {
  software: Software[];
  loading: boolean;
  onViewAll: () => void;
}

export default function FeaturedSoftwareSection({
  software,
  loading,
  onViewAll,
}: FeaturedSoftwareSectionProps) {
  return (
    <section className="py-20 bg-slate-50" id="directory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-8">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Featured software
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Verified and highly-rated by the community
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
          </button>

        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 bg-white rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {software.slice(0, 4).map((item) => (
              <SoftwareCard
                key={item.id}
                software={item}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}