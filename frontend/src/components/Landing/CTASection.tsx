import { ArrowRight, GitCompareArrows } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="px-6 py-20">
      <div className="relative mx-auto max-w-[1180px] overflow-hidden bg-[#362EED] px-8 py-16 text-center md:px-12">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-[#8d7cff]/30 blur-3xl" />

        <div className="relative mx-auto max-w-[700px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/60">
            Start Exploring
          </p>

          <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-[-1px] text-white md:text-[42px]">
            Ready to find the right software?
          </h2>

          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-white/65">
            Discover software, compare your options, and make a better
            decision for your business.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/software-directory"
              className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 text-[13px] font-bold text-[#362EED] transition hover:bg-[#f4f2ff]"
            >
              Explore Software
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/software-comparison"
              className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/10 px-7 py-3.5 text-[13px] font-semibold text-white transition hover:bg-white/15"
            >
              <GitCompareArrows size={16} />
              Compare Software
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;