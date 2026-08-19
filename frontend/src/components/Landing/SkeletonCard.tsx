export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-slate-200 shrink-0" />

        <div className="flex-1">
          <div className="h-3.5 w-28 bg-slate-200 rounded mb-2" />
          <div className="h-3 w-16 bg-slate-100 rounded" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
        <div className="h-3 bg-slate-100 rounded w-4/6" />
      </div>

      <div className="pt-3 border-t border-slate-100">
        <div className="h-3 w-24 bg-slate-100 rounded" />
      </div>
    </div>
  );
}
