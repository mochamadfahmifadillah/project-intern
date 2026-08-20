import { CircleDollarSign, MessageSquare, Puzzle, Star } from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Trusted Ratings",
    description:
      "Understand how users rate software before making your decision.",
    icon: Star,
    color: "#704FE6",
    textColor: "#FFFFFF",
    numberColor: "rgba(255,255,255,0.65)",
    iconColor: "#704FE6",
  },
  {
    number: "02",
    title: "Transparent Pricing",
    description:
      "Compare pricing plans and understand the real cost of each solution.",
    icon: CircleDollarSign,
    color: "#FFD361",
    textColor: "#18161D",
    numberColor: "rgba(24,22,29,0.55)",
    iconColor: "#6F4FDE",
  },
  {
    number: "03",
    title: "Real User Reviews",
    description: "Learn from experiences shared by people and businesses.",
    icon: MessageSquare,
    color: "#DBC8F6",
    textColor: "#18161D",
    numberColor: "rgba(24,22,29,0.55)",
    iconColor: "#704FE6",
  },
  {
    number: "04",
    title: "Integration Insights",
    description: "Discover which tools and services work with your software.",
    icon: Puzzle,
    color: "#6F4FDE",
    textColor: "#FFFFFF",
    numberColor: "rgba(255,255,255,0.65)",
    iconColor: "#6F4FDE",
  },
];

function WhySoftwareEmpire() {
  return (
    <section className="border-b border-[#e5e2eb] bg-white py-24 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-[650px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#704FE6]">
            Why Software Empire
          </p>

          <h2 className="mt-4 text-[36px] font-semibold leading-[1.1] tracking-[-1.5px] text-[#18161d] md:text-[46px]">
            Everything you need
            <br className="hidden md:block" />
            to choose better software.
          </h2>

          <p className="mt-5 max-w-[570px] text-[15px] leading-7 text-[#6b6575]">
            Discover the information that matters before committing to a
            business software solution.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-16 grid overflow-hidden border border-[#ded9e8] lg:grid-cols-[1fr_1fr]">
          {/* IMAGE */}
          <div className="relative min-h-[480px] lg:min-h-[560px]">
            <img
              src="/background1.webp"
              alt="Software discovery"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* IMAGE CONTENT */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 text-[11px] font-semibold text-[#18161d]">
                <span className="h-2 w-2 rounded-full bg-[#704FE6]" />
                Software Intelligence
              </div>

              <h3 className="mt-5 max-w-[400px] text-[30px] font-semibold leading-tight tracking-[-1px] text-white md:text-[36px]">
                Less searching.
                <br />
                Better decisions.
              </h3>
            </div>
          </div>

          {/* BENEFITS */}
          <div>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.number}
                  className="group min-h-[140px] border-b border-white last:border-b-0"
                  style={{
                    backgroundColor: benefit.color,
                  }}
                >
                  <div className="flex min-h-[140px] items-start gap-5 p-7 transition-all duration-200 hover:brightness-95 md:p-8">
                    {/* NUMBER */}
                    <span
                      className="pt-1 text-[11px] font-bold tracking-wide"
                      style={{
                        color: benefit.numberColor,
                      }}
                    >
                      {benefit.number}
                    </span>

                    {/* ICON */}
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center bg-white shadow-sm"
                      style={{
                        color: benefit.iconColor,
                      }}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0">
                      <h3
                        className="text-[16px] font-semibold"
                        style={{
                          color: benefit.textColor,
                        }}
                      >
                        {benefit.title}
                      </h3>

                      <p
                        className="mt-2 max-w-[390px] text-[13px] leading-6"
                        style={{
                          color:
                            benefit.textColor === "#FFFFFF"
                              ? "rgba(255,255,255,0.78)"
                              : "#514b5c",
                        }}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ACCENT */}
        <div className="mt-6 flex items-center gap-2">
          <div className="h-1 w-16 bg-[#704FE6]" />
          <div className="h-1 w-8 bg-[#DBC8F6]" />
          <div className="h-1 w-4 bg-[#FFD361]" />
        </div>
      </div>
    </section>
  );
}

export default WhySoftwareEmpire;
