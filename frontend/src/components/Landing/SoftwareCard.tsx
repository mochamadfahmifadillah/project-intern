import { Star } from "lucide-react";
import type { Software } from "../../types/software";

interface SoftwareCardProps {
  software: Software;
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  const initials =
    software.initials ||
    software.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

  return (
    <div className="group bg-white rounded-xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {software.logo ? (
            <img
              src={software.logo}
              alt={software.name}
              className="w-10 h-10 rounded-lg object-contain border border-slate-100 shrink-0"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0"
              style={{
                backgroundColor: software.color || "#2563EB",
              }}
            >
              {initials}
            </div>
          )}

          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {software.name}
            </h4>

            {software.category && (
              <span className="text-xs text-slate-400">
                {software.category}
              </span>
            )}
          </div>
        </div>

        {software.badge && (
          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap border border-blue-100">
            {software.badge}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3">
        {software.description || "No description available."}
      </p>

      {(software.rating !== undefined || software.pricing) && (
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-50">
          {software.rating !== undefined ? (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />

              <span className="text-xs font-semibold text-slate-700">
                {software.rating}
              </span>

              {software.reviews !== undefined && (
                <span className="text-xs text-slate-400">
                  ({software.reviews.toLocaleString()})
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          {software.pricing && (
            <span className="text-xs text-slate-500 font-medium truncate">
              {software.pricing}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
