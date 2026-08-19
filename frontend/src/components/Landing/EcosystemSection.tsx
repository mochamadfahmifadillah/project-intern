import {
  ArrowRight,
  BookOpen,
  Globe,
  Scale,
  ShoppingBag,
  Wrench,
} from "lucide-react";

const ECOSYSTEM_ITEMS = [
  {
    icon: BookOpen,
    label: "Education Hub",
    desc: "Guides and resources to help businesses understand software solutions.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Globe,
    label: "Software Directory",
    desc: "Discover software solutions from different categories and industries.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Scale,
    label: "Comparison Engine",
    desc: "Compare software features and capabilities before making a decision.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: ShoppingBag,
    label: "Marketplace",
    desc: "Future ecosystem for discovering and acquiring software solutions.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Wrench,
    label: "Implementation",
    desc: "Connect businesses with implementation and technology partners.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export default function EcosystemSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3 block">
              Ecosystem
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
              More than a software directory.
            </h2>

            <p className="text-slate-500 leading-relaxed mb-8 max-w-xl">
              Software Empire is designed to grow into a complete software
              decision ecosystem, helping businesses discover, compare,
              evaluate, and eventually implement technology solutions.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Explore the ecosystem
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div className="grid grid-cols-2 gap-3">
            {ECOSYSTEM_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center mb-3`}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 mb-1">
                    {item.label}
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}