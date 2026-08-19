import type { Software } from "../../types/software";

interface SoftwareCardProps {
  software: Software;
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  const initials =
    software.initials ??
    software.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">
          {initials}
        </div>

        {software.rating !== undefined && software.rating !== null && (
          <div className="text-sm font-medium text-slate-900">
            ★ {Number(software.rating).toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-semibold text-slate-900">{software.name}</h3>

        <p className="text-xs text-blue-600 mt-1">
          {software.category?.name ?? "Uncategorized"}
        </p>

        <p className="text-sm text-slate-500 mt-3 line-clamp-2">
          {software.description ?? "No description available."}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {software.reviews !== undefined
            ? `(${software.reviews} reviews)`
            : ""}
        </span>

        <span className="text-sm font-medium text-slate-700">
          {software.pricing ?? "Contact vendor"}
        </span>
      </div>
    </div>
  );
}
