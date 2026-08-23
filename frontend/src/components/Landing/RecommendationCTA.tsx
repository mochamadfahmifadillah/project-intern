import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";

function RecommendationCTA() {
  return (
    <section className="px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-xl bg-[#0D47A1] px-6 py-7 sm:px-10">
          {/* Decoration */}
          <div className="absolute right-[-60px] top-[-80px] h-48 w-48 rounded-full bg-white/10" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row">
            {/* Icon */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white">
              <ClipboardCheck size={46} className="text-[#0D47A1]" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-[15px] font-bold text-white">
                Not sure which software is right for you?
              </h2>

              <p className="mt-2 text-[11px] text-white/80">
                Answer a few questions and get personalized recommendations.
              </p>
            </div>

            {/* CTA */}
            <Link
              to="/recommend"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-[11px] font-bold text-[#0D47A1] transition hover:bg-[#F8FAFC]"
            >
              Get Recommendation
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecommendationCTA;
