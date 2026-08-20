import {
  Check,
  CircleDollarSign,
  MessageSquare,
  Puzzle,
  Star,
  Waypoints,
} from "lucide-react";

const benefits = [
  {
    title: "Trusted Ratings",
    description:
      "See software ratings based on real user feedback before making a decision.",
    icon: Star,
  },
  {
    title: "Transparent Pricing",
    description:
      "Understand available pricing plans and compare costs across different solutions.",
    icon: CircleDollarSign,
  },
  {
    title: "Real User Reviews",
    description:
      "Learn from experiences shared by people and businesses using the software.",
    icon: MessageSquare,
  },
  {
    title: "Integration Insights",
    description:
      "Discover which tools and services can work together with your software.",
    icon: Puzzle,
  },
];

function WhySoftwareEmpire() {
  return (
    <section className="border-b border-[#e4e0eb] bg-white py-20">
      <div className="mx-auto grid max-w-[1180px] gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        {/* Left */}
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#6846e8]">
            Why Software Empire
          </p>

          <h2 className="mt-3 max-w-[500px] text-[32px] font-semibold leading-tight tracking-[-1px] text-[#171717] md:text-[40px]">
            Make software decisions with confidence.
          </h2>

          <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#625d6d]">
            Choosing business software should not mean opening dozens of tabs
            and comparing information manually.
          </p>

          <p className="mt-4 max-w-[500px] text-[15px] leading-7 text-[#625d6d]">
            Software Empire brings the information together so you can discover,
            evaluate, and compare software in one place.
          </p>

          {/* Small journey */}
          <div className="mt-8 flex flex-wrap items-center gap-2 text-[12px] font-semibold">
            <span className="bg-[#eeeaff] px-3 py-2 text-[#6846e8]">
              Discover
            </span>

            <span className="text-[#b0aaba]">→</span>

            <span className="bg-[#eeeaff] px-3 py-2 text-[#6846e8]">
              Evaluate
            </span>

            <span className="text-[#b0aaba]">→</span>

            <span className="bg-[#362EED] px-3 py-2 text-white">Decide</span>
          </div>
        </div>

        {/* Right */}
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="border border-[#e2dee9] p-6 transition hover:border-[#cfc4ef] hover:shadow-[0_10px_30px_rgba(30,20,70,0.06)]"
              >
                <div className="flex h-11 w-11 items-center justify-center bg-[#eeeaff] text-[#6846e8]">
                  <Icon size={20} strokeWidth={1.7} />
                </div>

                <h3 className="mt-5 text-[17px] font-semibold text-[#171717]">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-[#625d6d]">
                  {benefit.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-[#6846e8]">
                  <Check size={14} />
                  Built for better decisions
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhySoftwareEmpire;
