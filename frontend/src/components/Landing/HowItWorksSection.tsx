import { CheckCircle2, Scale, Search } from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Discover",
    desc: "Explore software based on your business needs, category, budget, and requirements.",
    icon: Search,
  },
  {
    step: "02",
    title: "Compare",
    desc: "Compare software features, pricing, reviews, and capabilities side by side.",
    icon: Scale,
  },
  {
    step: "03",
    title: "Choose",
    desc: "Make a more confident software decision based on relevant information.",
    icon: CheckCircle2,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3 block">
            Process
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            How it works.
          </h2>

          <p className="text-slate-400 mt-4 max-w-md mx-auto leading-relaxed">
            Make better software decisions through a simple discovery process.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {HOW_IT_WORKS.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.step} className="text-center">
                {/* ICON */}
                <div className="inline-flex mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                </div>

                {/* STEP NUMBER */}
                <div className="text-[10px] font-bold tracking-widest text-blue-400 mb-2">
                  STEP {step.step}
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
