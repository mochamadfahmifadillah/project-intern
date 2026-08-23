import { ArrowRight, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const recommendations = [
  {
    number: 1,
    name: "Zoho CRM",
    rating: "4.6",
    logo: "∞",
  },
  {
    number: 2,
    name: "HubSpot CRM",
    rating: "4.5",
    logo: "●",
  },
  {
    number: 3,
    name: "Salesforce Sales Cloud",
    rating: "4.4",
    logo: "☁",
  },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FC]">
      {/* Background decoration */}
      <div className="absolute right-[-100px] top-[-120px] h-[480px] w-[480px] rounded-full bg-[#E7F0FF] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-[72px]">
        {/* Left */}
        <div>
          <h1 className="max-w-[570px] text-[42px] font-bold leading-[1.08] tracking-[-1.8px] text-[#0F172A] sm:text-[48px]">
            Find the <span className="text-[#0D47A1]">Best Software</span>
            <br />
            for Your Business
          </h1>

          <p className="mt-5 max-w-[390px] text-[14px] leading-5 text-[#334155]">
            Discover, compare, and choose the right software with confidence.
            1000+ software, real reviews, and smart recommendations.
          </p>

          {/* Search */}
          <div className="mt-6 flex max-w-[395px] overflow-hidden rounded-lg border border-[#D9E0EA] bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search software, category, or business need..."
              className="min-w-0 flex-1 px-4 py-3 text-[11px] text-[#334155] outline-none placeholder:text-[#94A3B8]"
            />

            <button className="flex w-12 shrink-0 items-center justify-center bg-[#0D47A1] text-white">
              <Search size={18} />
            </button>
          </div>

          {/* Popular searches */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px]">
            <span className="mr-1 font-medium text-[#334155]">
              Popular searches:
            </span>

            {[
              "CRM",
              "Accounting",
              "ERP",
              "HR Software",
              "Project Management",
            ].map((item) => (
              <button
                key={item}
                className="rounded-md border border-[#DDE4ED] bg-white px-2.5 py-1.5 text-[#334155] hover:border-[#0D47A1] hover:text-[#0D47A1]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="relative hidden min-h-[360px] lg:block">
          {/* Match score */}
          <div className="absolute left-0 top-[105px] z-20 rounded-lg border border-[#E1E7EF] bg-white px-5 py-4 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <ShieldCheck className="mx-auto text-[#16A579]" size={19} />

            <p className="mt-1 text-[22px] font-bold text-[#16A579]">95%</p>

            <p className="text-[10px] text-[#64748B]">Match Score</p>
          </div>

          {/* Recommendation card */}
          <div className="absolute right-4 top-8 w-[370px] rounded-xl border border-[#E1E7EF] bg-white p-5 shadow-[0_15px_40px_rgba(15,23,42,0.09)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[12px] font-bold text-[#0F172A]">
                Top Recommendation for You
              </h3>

              <Sparkles size={18} className="text-[#0D47A1]" />
            </div>

            <div className="space-y-2">
              {recommendations.map((item) => (
                <div
                  key={item.number}
                  className="flex items-center gap-3 rounded-lg border border-[#E8EDF3] px-3 py-3"
                >
                  <span className="w-4 text-[12px] font-semibold text-[#0F172A]">
                    {item.number}
                  </span>

                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F1F5F9] text-[#0D47A1]">
                    {item.logo}
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-[#0F172A]">
                      {item.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[#F5A623]">
                      <span className="text-[9px]">★★★★★</span>

                      <span className="text-[8px] text-[#64748B]">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <button className="rounded border border-[#DCE3EC] px-2 py-1 text-[8px] font-medium text-[#0D47A1]">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Compare floating */}
          <div className="absolute right-0 top-[-10px] z-30 flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.1)]">
            <Sparkles size={18} className="text-[#0D47A1]" />

            <div>
              <p className="text-[10px] font-semibold text-[#0F172A]">
                Compare
              </p>

              <p className="text-[8px] text-[#64748B]">Side by side</p>
            </div>
          </div>

          {/* Software count */}
          <div className="absolute bottom-0 right-[-5px] flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.1)]">
            <div className="text-[#0D47A1]">
              <Sparkles size={20} />
            </div>

            <div>
              <p className="text-[18px] font-bold text-[#0F172A]">1000+</p>

              <p className="text-[9px] text-[#64748B]">Software</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile recommendation */}
      <div className="px-5 pb-10 lg:hidden">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#0F172A]">
              Top Recommendation for You
            </h3>

            <Sparkles size={16} className="text-[#0D47A1]" />
          </div>

          <div className="space-y-2">
            {recommendations.map((item) => (
              <div
                key={item.number}
                className="flex items-center gap-2 rounded-lg border border-[#E8EDF3] p-2.5"
              >
                <span className="text-xs font-semibold">{item.number}</span>

                <div className="h-7 w-7 rounded bg-[#F1F5F9] text-center text-sm leading-7 text-[#0D47A1]">
                  {item.logo}
                </div>

                <div className="flex-1">
                  <p className="text-[10px] font-semibold">{item.name}</p>

                  <p className="text-[9px] text-[#F5A623]">
                    ★★★★★ {item.rating}
                  </p>
                </div>

                <ArrowRight size={13} className="text-[#0D47A1]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop CTA strip */}
      <div className="relative mx-auto hidden max-w-[1100px] px-5 pb-8 lg:block">
        <div className="grid grid-cols-4 rounded-xl border border-[#E1E7EF] bg-white shadow-sm">
          {[
            {
              title: "1000+ Software",
              description:
                "Explore verified business software across all categories.",
            },
            {
              title: "Compare Easily",
              description:
                "Compare features, pricing, and reviews side by side.",
            },
            {
              title: "Smart Recommendation",
              description:
                "Get AI-powered recommendations based on your business needs.",
            },
            {
              title: "Trusted Reviews",
              description:
                "Real user reviews to help you make confident decisions.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`flex gap-3 p-5 ${
                index !== 3 ? "border-r border-[#E8EDF3]" : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF5FF] text-[#0D47A1]">
                {index === 0 && "◈"}
                {index === 1 && "⚖"}
                {index === 2 && "✦"}
                {index === 3 && "✓"}
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-[#0F172A]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[9px] leading-4 text-[#64748B]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
