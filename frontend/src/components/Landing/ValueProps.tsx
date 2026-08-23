import { BadgeCheck, GitCompareArrows, Layers3, Sparkles } from "lucide-react";

const valueProps = [
  {
    icon: Layers3,
    title: "1000+ Software",
    description: "Explore verified business software across all categories.",
  },
  {
    icon: GitCompareArrows,
    title: "Compare Easily",
    description: "Compare features, pricing, and reviews side by side.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendation",
    description: "Get recommendations based on your business needs.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Reviews",
    description: "Real user reviews help you make confident decisions.",
  },
];

function ValueProps() {
  return (
    <section className="relative z-10 -mt-5 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex gap-4 p-6 lg:p-5 xl:p-6 ${
                  index !== valueProps.length - 1
                    ? "border-b border-[#EEF2F7] lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF5FF] text-[#0D47A1]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-[#64748B]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ValueProps;
