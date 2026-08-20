import { Search, BarChart3, GitCompare, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Find software based on your business needs, industry, and category.",
    image: "/background2.webp",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Evaluate",
    description:
      "Explore features, pricing, integrations, ratings, and user reviews.",
    image: "/background3.webp",
  },
  {
    number: "03",
    icon: GitCompare,
    title: "Compare",
    description:
      "Compare multiple software options side by side before deciding.",
    image: "/background4.webp",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Decide",
    description:
      "Choose the software that best fits your business requirements.",
    image: "/background5.webp",
  },
];

function HowItWorks() {
  return (
    <section className="border-b border-[#d9d5e5] bg-[#faf9fc] py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[700px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6846e8]">
            How it works
          </p>

          <h2 className="mt-4 text-[38px] font-semibold leading-tight tracking-[-1.2px] md:text-[44px]">
            Make better software decisions.
          </h2>

          <p className="mt-5 max-w-[620px] text-[16px] leading-7 text-[#5b5667]">
            Software Empire helps you discover, evaluate, compare, and choose
            software with confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative min-h-[380px] overflow-hidden border border-[#d9d4e3] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(30,20,70,0.15)]"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${step.image}')`,
                  }}
                />

                {/* Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />

                {/* Content */}
                <div className="relative z-10 flex min-h-[380px] flex-col p-8 text-white">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center bg-white text-[#6846e8] shadow-lg">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    {/* Number */}
                    <span className="text-[14px] font-semibold tracking-wide text-white/80">
                      {step.number}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div className="mt-auto">
                    <h3 className="text-[25px] font-semibold tracking-[-0.5px]">
                      {step.title}
                    </h3>

                    <p className="mt-4 max-w-[250px] text-[15px] leading-7 text-white/85">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
