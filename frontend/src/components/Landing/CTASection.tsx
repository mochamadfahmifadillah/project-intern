import { ArrowUpRight, GitCompareArrows } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid overflow-hidden border border-[#ded9e8] lg:grid-cols-[1.35fr_0.65fr]">
          {/* MAIN CTA */}
          <div className="relative overflow-hidden bg-[#704FE6] px-8 py-16 md:px-14 md:py-20 lg:px-16 lg:py-24">
            {/* Large number */}
            <span className="pointer-events-none absolute -right-4 -top-10 select-none text-[180px] font-bold leading-none tracking-[-15px] text-white/[0.06] md:text-[220px]">
              →
            </span>

            <div className="relative max-w-[650px]">
              {/* Eyebrow */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Start exploring
              </p>

              {/* Heading */}
              <h2 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-[-1.8px] text-white md:text-[54px]">
                Your next software
                <br />
                starts here.
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-white/70">
                Discover software that fits your business, compare your options,
                and make your next decision with confidence.
              </p>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  to="/software-directory"
                  className="group inline-flex h-12 items-center gap-3 bg-white px-7 text-[13px] font-semibold text-[#704FE6] transition duration-200 hover:bg-[#FFD361]"
                >
                  Explore Software
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* SECONDARY PANEL */}
          <div className="flex flex-col justify-between bg-[#FFD361] p-8 md:p-10 lg:p-12">
            <div>
              <div className="flex h-11 w-11 items-center justify-center bg-white text-[#704FE6]">
                <GitCompareArrows size={20} strokeWidth={1.8} />
              </div>

              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5f5540]">
                Still deciding?
              </p>

              <h3 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.8px] text-[#18161d]">
                Compare your options side by side.
              </h3>

              <p className="mt-4 text-[13px] leading-6 text-[#5f5540]">
                Put multiple software solutions next to each other and see what
                fits your needs.
              </p>
            </div>

            <Link
              to="/software-comparison"
              className="group mt-10 inline-flex w-fit items-center gap-2 border-b border-[#18161d] pb-1 text-[13px] font-semibold text-[#18161d]"
            >
              Compare Software
              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
