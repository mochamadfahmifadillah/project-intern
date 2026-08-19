const STATS = [
  {
    value: "1,247",
    label: "Software Listed",
  },
  {
    value: "50K+",
    label: "Monthly Users",
  },
  {
    value: "34,502",
    label: "Verified Reviews",
  },
];

export default function StatsSection() {
  return (
    <section className="border-y border-slate-100 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-3 divide-x divide-slate-200">

          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="py-8 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}