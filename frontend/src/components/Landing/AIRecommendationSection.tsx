import { ArrowRight, Wand2 } from "lucide-react";

export default function AIRecommendationSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-slate-900 rounded-2xl p-10 sm:p-14 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Wand2 className="w-6 h-6 text-blue-400" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <span className="inline-flex text-xs font-semibold text-blue-300 bg-blue-500/15 border border-blue-500/25 px-3 py-1 rounded-full mb-3">
                Coming Soon
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                AI-powered recommendations.
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                Tell us about your business, team, budget, and requirements.
                Software Empire will help identify software solutions that fit
                your needs.
              </p>
            </div>

            {/* Action */}
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              Join waitlist
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
