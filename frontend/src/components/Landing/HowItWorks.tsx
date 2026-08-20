import { Search, BarChart3, GitCompare, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Find software based on your business needs, industry, and category.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Evaluate",
    description:
      "Explore features, pricing, integrations, ratings, and user reviews.",
  },
  {
    number: "03",
    icon: GitCompare,
    title: "Compare",
    description:
      "Compare multiple software options side by side before deciding.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Decide",
    description:
      "Choose the software that best fits your business requirements.",
  },
];

function HowItWorks() {
  return (
    <section className="border-b border-[#d9d5e5] bg-[#faf9fc] py-20">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="max-w-[600px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6846e8]">
            How it works
          </p>

          <h2 className="mt-3 text-[32px] font-semibold tracking-[-1px]">
            Make better software decisions.
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-[#5b5667]">
            Software Empire helps you discover, evaluate, compare, and choose
            software with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="border border-[#ddd9e5] bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#eeeaff] text-[#6846e8]">
                    <Icon size={19} />
                  </div>

                  <span className="text-[12px] font-semibold text-[#aaa5b3]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-[17px] font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-[#5b5667]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;