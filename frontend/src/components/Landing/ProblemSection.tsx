import { AlertCircle, Layers, TrendingUp, Zap } from "lucide-react";

import SectionLabel from "./SectionLabel";

const PROBLEMS = [
  {
    icon: Layers,
    title: "Too many choices",
    description:
      "Too many software options make it difficult to identify the right solution for your business.",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderHover: "hover:border-blue-200",
  },
  {
    icon: AlertCircle,
    title: "Scattered information",
    description:
      "Pricing, features, reviews, and software information are often spread across different sources.",
    accentColor: "text-violet-600",
    bgColor: "bg-violet-50",
    borderHover: "hover:border-violet-200",
  },
  {
    icon: Zap,
    title: "Integration complexity",
    description:
      "Choosing software that does not fit your existing workflow can create unnecessary complexity.",
    accentColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderHover: "hover:border-emerald-200",
  },
  {
    icon: TrendingUp,
    title: "Wrong decisions",
    description:
      "The wrong software decision can waste time, budget, and resources for your organization.",
    accentColor: "text-red-600",
    bgColor: "bg-red-50",
    borderHover: "hover:border-red-200",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>The Problem</SectionLabel>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Software selection is complicated.
          </h2>

          <p className="text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
            Businesses need better ways to discover and evaluate software before
            making important technology decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;

            return (
              <div
                key={problem.title}
                className={`bg-slate-50 rounded-xl p-6 border border-slate-100 ${problem.borderHover} hover:shadow-sm transition-all`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${problem.bgColor} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-5 h-5 ${problem.accentColor}`} />
                </div>

                <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                  {problem.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
