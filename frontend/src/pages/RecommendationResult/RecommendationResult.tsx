import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  Heart,
  Menu,
  Pencil,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface RecommendationItem {
  rank: number;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  matchScore: number;
  matchLabel: string;
  logoClass: string;
  reasons: string[];
  tags: string[];
}

const RECOMMENDATIONS: RecommendationItem[] = [
  {
    rank: 1,
    name: "Zoho CRM",
    description:
      "Complete CRM platform to attract, engage and delight customers across sales, marketing, and support.",
    rating: 4.6,
    reviews: 2456,
    matchScore: 95,
    matchLabel: "Excellent Match",
    logoClass: "text-blue-600",
    reasons: [
      "Meets 9 of your 10 must-have features",
      "Perfect for your team size (20-50)",
      "Within your budget range",
      "Strong in your industry",
    ],
    tags: ["CRM", "Sales Automation", "Marketing Automation", "+2"],
  },
  {
    rank: 2,
    name: "HubSpot CRM",
    description: "AI-powered CRM with marketing, sales, and service tools.",
    rating: 4.5,
    reviews: 1892,
    matchScore: 88,
    matchLabel: "Great Match",
    logoClass: "text-orange-500",
    reasons: [
      "Meets 8 of your 10 must-have features",
      "Good for your team size",
      "Slightly above your budget",
      "Excellent ease of use",
    ],
    tags: ["CRM", "Marketing Automation", "Email Marketing", "+2"],
  },
  {
    rank: 3,
    name: "Salesforce Sales Cloud",
    description: "The world's #1 CRM for sales teams of all sizes.",
    rating: 4.4,
    reviews: 3210,
    matchScore: 82,
    matchLabel: "Good Match",
    logoClass: "text-sky-500",
    reasons: [
      "Meets 7 of your 10 must-have features",
      "Scales well as you grow",
      "Above your budget",
      "Best-in-class reporting",
    ],
    tags: ["CRM", "Sales Automation", "Analytics", "+3"],
  },
];

const OTHER_SOFTWARE = [
  {
    name: "Pipedrive",
    rating: "4.2",
    logo: "P",
    className: "text-emerald-600",
  },
  {
    name: "freshsales",
    rating: "4.1",
    logo: "◉",
    className: "text-orange-500",
  },
  {
    name: "monday CRM",
    rating: "4.0",
    logo: "●",
    className: "text-cyan-500",
  },
  {
    name: "Microsoft Dynamics 365",
    rating: "4.0",
    logo: "◆",
    className: "text-blue-500",
  },
];

function SoftwareLogo({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  if (name === "Zoho CRM") {
    return (
      <div
        className={`relative flex h-14 w-14 items-center justify-center ${className}`}
      >
        <div className="h-8 w-8 rotate-45 rounded-[9px] border-[4px] border-current" />
        <div className="absolute h-2 w-10 rounded-full bg-current" />
      </div>
    );
  }

  if (name === "HubSpot CRM") {
    return (
      <div
        className={`flex h-14 w-14 items-center justify-center ${className}`}
      >
        <div className="relative h-9 w-9">
          <div className="absolute left-3 top-3 h-4 w-4 rounded-full border-[4px] border-current" />

          <div className="absolute left-0 top-1 h-3 w-3 rounded-full border-[3px] border-current" />

          <div className="absolute left-0 top-2 h-[3px] w-5 rotate-[-25deg] bg-current" />

          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-[3px] border-current" />

          <div className="absolute right-1 top-0 h-3 w-3 rounded-full border-[3px] border-current" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-14 w-14 items-center justify-center ${className}`}>
      <div className="relative h-10 w-12">
        <div className="absolute left-1 top-2 h-7 w-10 rounded-[50%] bg-current opacity-90" />

        <div className="absolute left-3 top-0 h-8 w-7 rounded-full border-[3px] border-white/70" />

        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white">
          salesforce
        </span>
      </div>
    </div>
  );
}

function MatchScore({ score, label }: { score: number; label: string }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[82px] w-[82px]">
        <svg viewBox="0 0 80 80" className="-rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#e8edf5"
            strokeWidth="7"
          />

          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={score >= 90 ? "#2da36b" : "#3980dc"}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[18px] font-bold text-[#12244d]">{score}%</span>
        </div>
      </div>

      <p className="mt-0.5 text-[8px] font-medium text-slate-500">{label}</p>
    </div>
  );
}

function RecommendationResult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#12244d]">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="border-b border-[#e5eaf2] bg-white">
        <div className="mx-auto flex h-[58px] max-w-[1500px] items-center px-5 lg:px-8">
          {/* Logo */}

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#173b82]">
              <span className="text-[10px] font-black text-white">SE</span>
            </div>

            <div className="hidden leading-none sm:block">
              <p className="text-[12px] font-extrabold text-[#173b82]">
                SOFTWARE
              </p>

              <p className="text-[11px] font-extrabold tracking-[0.18em] text-[#f59e0b]">
                EMPIRE
              </p>
            </div>
          </Link>

          {/* Navigation */}

          <nav className="ml-10 hidden items-center gap-7 lg:flex">
            <button className="flex items-center gap-1 text-[11px] text-slate-700">
              Software
              <ChevronDown className="h-3 w-3" />
            </button>

            <button className="flex items-center gap-1 text-[11px] text-slate-700">
              Categories
              <ChevronDown className="h-3 w-3" />
            </button>

            <Link
              to="/software-comparison"
              className="text-[11px] text-slate-700"
            >
              Compare
            </Link>

            <Link
              to="/recommendation"
              className="relative py-[21px] text-[11px] font-semibold text-[#1748c8]"
            >
              Recommend
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1748c8]" />
            </Link>

            <button className="flex items-center gap-1 text-[11px] text-slate-700">
              Learn
              <ChevronDown className="h-3 w-3" />
            </button>

            <button className="text-[11px] text-slate-700">For Vendors</button>
          </nav>

          {/* Right */}

          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden h-8 w-[145px] items-center gap-2 rounded-md border border-[#dfe5ee] px-2.5 md:flex">
              <input
                type="text"
                placeholder="Search software..."
                className="w-full bg-transparent text-[9px] outline-none placeholder:text-slate-400"
              />

              <Search className="h-3.5 w-3.5 text-slate-500" />
            </div>

            <button className="hidden rounded-md border border-[#dfe5ee] px-3.5 py-1.5 text-[10px] font-medium sm:block">
              Login
            </button>

            <button className="rounded-md bg-[#1748c8] px-3.5 py-1.5 text-[10px] font-semibold text-white">
              Sign Up
            </button>

            <Menu className="h-4 w-4 lg:hidden" />
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="mx-auto max-w-[1500px] px-5 lg:px-8">
        {/* =======================================================
            RESULT PROGRESS
        ======================================================= */}

        <section className="hidden border-b border-[#edf0f5] py-5 lg:block">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-[5%] right-[5%] top-3 h-px bg-[#d8dfeb]" />

            {[
              "Business Type",
              "Business Size",
              "Industry",
              "Key Needs",
              "Must-have Features",
              "Budget",
              "Team Size",
              "Integrations",
              "Summary",
              "Results",
            ].map((label, index) => {
              const step = index + 1;
              const isResult = step === 10;

              return (
                <div
                  key={label}
                  className="relative z-10 flex w-[10%] flex-col items-center"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-semibold ${
                      isResult
                        ? "border-[#1748c8] bg-[#1748c8] text-white"
                        : "border-[#cbd5e1] bg-white text-[#1748c8]"
                    }`}
                  >
                    {isResult ? "10" : <Check className="h-3 w-3" />}
                  </span>

                  <span
                    className={`mt-1.5 text-[8px] ${
                      isResult ? "font-bold text-[#1748c8]" : "text-slate-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mobile Progress */}

        <section className="block border-b border-[#edf0f5] py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold text-slate-500">
                Step 10 of 10
              </p>

              <p className="mt-1 text-xs font-bold">Results</p>
            </div>

            <span className="text-[9px] font-semibold text-slate-500">
              100%
            </span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e5eaf2]">
            <div className="h-full w-full rounded-full bg-[#1748c8]" />
          </div>
        </section>

        {/* =======================================================
            SUMMARY HERO
        ======================================================= */}

        <section className="mx-auto mt-5 max-w-[930px] rounded-xl border border-[#dcece6] bg-gradient-to-r from-[#f5fffb] to-[#f9fffd] p-5 lg:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            {/* Trophy */}

            <div className="flex h-[95px] w-[145px] shrink-0 items-center justify-center">
              <div className="relative">
                <Trophy
                  className="h-20 w-20 text-[#f5ad32]"
                  strokeWidth={1.5}
                />

                <Sparkles className="absolute -left-3 top-0 h-4 w-4 text-[#1748c8]" />

                <Sparkles className="absolute -right-4 top-4 h-3 w-3 text-[#8f9de0]" />

                <Sparkles className="absolute bottom-0 right-0 h-3 w-3 text-[#f5ad32]" />
              </div>
            </div>

            {/* Text */}

            <div className="flex-1">
              <h1 className="text-[18px] font-bold text-[#12244d] lg:text-[19px]">
                Here are your top software recommendations!
              </h1>

              <p className="mt-1 text-[9px] text-slate-600">
                Based on your answers, we found the best software that match
                your business needs.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
                <div className="rounded-md border border-[#dce5ef] bg-white px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-[#1748c8]" />

                    <span className="text-[7px] text-slate-500">
                      Business Type
                    </span>
                  </div>

                  <p className="mt-1 text-[9px] font-bold">B2B</p>
                </div>

                <div className="rounded-md border border-[#dce5ef] bg-white px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-emerald-600" />

                    <span className="text-[7px] text-slate-500">Industry</span>
                  </div>

                  <p className="mt-1 text-[9px] font-bold">
                    Retail & E-Commerce
                  </p>
                </div>

                <div className="rounded-md border border-[#dce5ef] bg-white px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-emerald-600" />

                    <span className="text-[7px] text-slate-500">Team Size</span>
                  </div>

                  <p className="mt-1 text-[9px] font-bold">20 - 50 people</p>
                </div>

                <div className="rounded-md border border-[#dce5ef] bg-white px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <WalletCards className="h-3.5 w-3.5 text-[#1748c8]" />

                    <span className="text-[7px] text-slate-500">Budget</span>
                  </div>

                  <p className="mt-1 text-[9px] font-bold">
                    $1,000 - $5,000 / month
                  </p>
                </div>
              </div>
            </div>

            {/* Edit */}

            <button
              onClick={() => navigate("/recommendation")}
              className="flex items-center gap-1.5 text-[9px] font-semibold text-[#1748c8]"
            >
              <Pencil className="h-3 w-3" />
              Edit Answers
            </button>
          </div>
        </section>

        {/* =======================================================
            TOP 3
        ======================================================= */}

        <section className="mx-auto mt-5 max-w-[930px]">
          <h2 className="text-[15px] font-bold text-[#12244d]">
            Top 3 Recommended Software
          </h2>

          <div className="mt-3 space-y-3">
            {RECOMMENDATIONS.map((software) => (
              <article
                key={software.name}
                className="relative overflow-hidden rounded-xl border border-[#e1e7f0] bg-white shadow-[0_3px_15px_rgba(30,60,100,0.03)]"
              >
                {/* Rank */}

                <div
                  className={`absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-br-lg text-[14px] font-bold text-white ${
                    software.rank === 1 ? "bg-[#2daf72]" : "bg-[#95a5bd]"
                  }`}
                >
                  {software.rank}
                </div>

                <div className="grid gap-4 px-5 py-4 pl-14 lg:grid-cols-[1.7fr_0.65fr_1.4fr_1fr] lg:items-center">
                  {/* Software */}

                  <div className="flex min-w-0 items-center gap-3">
                    <SoftwareLogo
                      name={software.name}
                      className={software.logoClass}
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[14px] font-bold text-[#12244d]">
                          {software.name}
                        </h3>

                        {software.rank === 1 && (
                          <span className="rounded-full bg-[#e8f7ef] px-2 py-0.5 text-[7px] font-bold text-[#258858]">
                            Best Match
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {Array.from({
                            length: 5,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              className="h-3 w-3 fill-[#f5a900] text-[#f5a900]"
                            />
                          ))}
                        </div>

                        <span className="text-[8px] font-semibold">
                          {software.rating}
                        </span>

                        <span className="text-[8px] text-[#1748c8]">
                          ({software.reviews.toLocaleString()})
                        </span>
                      </div>

                      <p className="mt-2 max-w-[300px] text-[8px] leading-4 text-slate-500">
                        {software.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {software.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#f4f7fb] px-2 py-1 text-[7px] font-medium text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}

                  <div className="border-y border-[#edf1f5] py-3 lg:border-x lg:border-y-0 lg:px-5">
                    <p className="mb-1 text-center text-[8px] text-slate-500">
                      Match Score
                    </p>

                    <MatchScore
                      score={software.matchScore}
                      label={software.matchLabel}
                    />
                  </div>

                  {/* Reasons */}

                  <div>
                    <h4 className="text-[10px] font-bold text-[#12244d]">
                      Why it's a great match
                    </h4>

                    <div className="mt-2 space-y-1.5">
                      {software.reasons.map((reason) => (
                        <div key={reason} className="flex items-start gap-1.5">
                          <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#e7f7ee]">
                            <Check className="h-2.5 w-2.5 text-[#239761]" />
                          </span>

                          <span className="text-[8px] leading-4 text-slate-600">
                            {reason}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="flex flex-col gap-1.5">
                    <Link
                      to="/software-directory/zoho-crm"
                      className="flex h-7 items-center justify-center rounded-md bg-[#1748c8] text-[8px] font-semibold text-white"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => navigate("/software-comparison")}
                      className="flex h-7 items-center justify-center rounded-md border border-[#9eb6df] text-[8px] font-semibold text-[#1748c8]"
                    >
                      Compare
                    </button>

                    <button className="flex h-7 items-center justify-center gap-1 rounded-md border border-[#9eb6df] text-[8px] font-semibold text-[#1748c8]">
                      Visit Website
                      <ExternalLink className="h-3 w-3" />
                    </button>

                    <button className="mt-0.5 flex items-center justify-center gap-1 text-[8px] text-slate-600">
                      <Heart className="h-3 w-3" />
                      Save
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =======================================================
            OTHER SOFTWARE + HELP
        ======================================================= */}

        <section className="mx-auto mt-3 grid max-w-[930px] gap-3 lg:grid-cols-[2fr_1fr]">
          {/* Other software */}

          <div className="rounded-xl border border-[#e1e7f0] bg-white p-3">
            <h3 className="text-[9px] font-bold text-[#12244d]">
              Other software you might consider (4)
            </h3>

            <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {OTHER_SOFTWARE.map((software) => (
                <div
                  key={software.name}
                  className="flex min-h-[42px] items-center gap-2 rounded-md border border-[#e1e7f0] px-2"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md bg-slate-50 text-[13px] font-black ${software.className}`}
                  >
                    {software.logo}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-[8px] font-semibold text-[#12244d]">
                      {software.name}
                    </p>

                    <p className="text-[7px] text-slate-500">
                      ⭐ {software.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help */}

          <div className="rounded-xl border border-[#e1e7f0] bg-white p-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <h3 className="text-[9px] font-bold text-[#12244d]">
                  Need help choosing?
                </h3>

                <p className="mt-1 text-[7px] leading-3.5 text-slate-500">
                  Get free consultation from our software experts.
                </p>

                <button className="mt-2 rounded-md bg-[#1748c8] px-3 py-1.5 text-[7px] font-semibold text-white">
                  Request Free Consultation
                </button>
              </div>

              <div className="hidden text-4xl lg:block">👩🏻‍💼</div>
            </div>
          </div>
        </section>

        {/* =======================================================
            BOTTOM ACTIONS
        ======================================================= */}

        <section className="mx-auto mb-5 mt-3 grid max-w-[930px] gap-3 lg:grid-cols-2">
          {/* Compare */}

          <div className="flex items-center gap-3 rounded-xl border border-[#e1e7f0] bg-white px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <CircleHelp className="h-5 w-5 text-[#1748c8]" />
            </div>

            <div className="flex-1">
              <p className="text-[9px] font-bold">Compare your top choices</p>

              <p className="text-[7px] text-slate-500">
                Compare features, pricing, and reviews side by side.
              </p>
            </div>

            <button
              onClick={() => navigate("/software-comparison")}
              className="rounded-md border border-[#9eb6df] px-3 py-1.5 text-[7px] font-semibold text-[#1748c8]"
            >
              Compare Now (3)
            </button>
          </div>

          {/* Implementation */}

          <div className="flex items-center gap-3 rounded-xl border border-[#e1e7f0] bg-white px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <ShieldCheck className="h-5 w-5 text-[#1748c8]" />
            </div>

            <div className="flex-1">
              <p className="text-[9px] font-bold">Get implementation help</p>

              <p className="text-[7px] text-slate-500">
                Get matched with verified implementation partners.
              </p>
            </div>

            <button className="rounded-md border border-[#9eb6df] px-3 py-1.5 text-[7px] font-semibold text-[#1748c8]">
              Get Implementation Help
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RecommendationResult;
