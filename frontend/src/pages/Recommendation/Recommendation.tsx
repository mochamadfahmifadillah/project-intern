import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  Globe2,
  HandHeart,
  Info,
  LockKeyhole,
  Menu,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

interface Option {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}

interface Question {
  id: number;
  title: string;
  description: string;
  options: Option[];
}

/*
|--------------------------------------------------------------------------
| QUESTIONS
|--------------------------------------------------------------------------
*/

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "What type of business is your company?",
    description: "This helps us understand your operational context better.",
    options: [
      {
        id: "b2b",
        title: "B2B",
        description: "Business to Business",
        icon: Building2,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "b2c",
        title: "B2C",
        description: "Business to Consumer",
        icon: Users,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "b2b2c",
        title: "B2B2C",
        description: "Business to Business to Consumer",
        icon: Network,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "non-profit",
        title: "Non-profit",
        description: "Organization",
        icon: HandHeart,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "government",
        title: "Government",
        description: "Organization",
        icon: Building2,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "other",
        title: "Other",
        description: "Please specify",
        icon: CircleMore,
        iconClass: "text-slate-500 bg-slate-100",
      },
    ],
  },

  {
    id: 2,
    title: "How large is your business?",
    description:
      "This helps us recommend software that fits your organization size.",
    options: [
      {
        id: "solo",
        title: "Solo",
        description: "Just me",
        icon: Users,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "small",
        title: "Small",
        description: "2–50 employees",
        icon: Users,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "medium",
        title: "Medium",
        description: "51–250 employees",
        icon: Building2,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "large",
        title: "Large",
        description: "251–1,000 employees",
        icon: Building2,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "enterprise",
        title: "Enterprise",
        description: "1,000+ employees",
        icon: Globe2,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "unsure",
        title: "Not sure",
        description: "Help me decide",
        icon: CircleHelp,
        iconClass: "text-slate-500 bg-slate-100",
      },
    ],
  },

  {
    id: 3,
    title: "What industry are you in?",
    description:
      "Your industry helps us narrow down software built for your specific needs.",
    options: [
      {
        id: "technology",
        title: "Technology",
        description: "Software & IT",
        icon: Globe2,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "retail",
        title: "Retail",
        description: "Commerce & stores",
        icon: WalletCards,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "finance",
        title: "Finance",
        description: "Banking & financial services",
        icon: WalletCards,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "healthcare",
        title: "Healthcare",
        description: "Health & medical",
        icon: HandHeart,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "education",
        title: "Education",
        description: "Schools & learning",
        icon: Building2,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "other",
        title: "Other",
        description: "Another industry",
        icon: CircleMore,
        iconClass: "text-slate-500 bg-slate-100",
      },
    ],
  },

  {
    id: 4,
    title: "What are your key business needs?",
    description:
      "Tell us what you want software to help your business achieve.",
    options: [
      {
        id: "sales",
        title: "Increase Sales",
        description: "Grow revenue & conversions",
        icon: Sparkles,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "productivity",
        title: "Improve Productivity",
        description: "Save time & automate work",
        icon: Check,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "customers",
        title: "Manage Customers",
        description: "Build better relationships",
        icon: Users,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "operations",
        title: "Optimize Operations",
        description: "Improve business processes",
        icon: Network,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "analytics",
        title: "Better Analytics",
        description: "Make data-driven decisions",
        icon: Globe2,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "security",
        title: "Improve Security",
        description: "Protect your business",
        icon: ShieldCheck,
        iconClass: "text-slate-600 bg-slate-100",
      },
    ],
  },

  {
    id: 5,
    title: "Which features are must-have?",
    description:
      "Select the capabilities that are essential for your business.",
    options: [
      {
        id: "crm",
        title: "CRM",
        description: "Customer relationship management",
        icon: Users,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "automation",
        title: "Automation",
        description: "Automate repetitive tasks",
        icon: Sparkles,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "analytics",
        title: "Analytics",
        description: "Reports & dashboards",
        icon: Globe2,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "collaboration",
        title: "Collaboration",
        description: "Team communication",
        icon: Users,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "integration",
        title: "Integrations",
        description: "Connect other tools",
        icon: Network,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "security",
        title: "Security",
        description: "Advanced security controls",
        icon: ShieldCheck,
        iconClass: "text-slate-600 bg-slate-100",
      },
    ],
  },

  {
    id: 6,
    title: "What is your software budget?",
    description:
      "Your budget helps us recommend options that fit your investment range.",
    options: [
      {
        id: "free",
        title: "Free",
        description: "No budget",
        icon: WalletCards,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "under50",
        title: "Under $50",
        description: "Per user / month",
        icon: WalletCards,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "50-100",
        title: "$50 – $100",
        description: "Per user / month",
        icon: WalletCards,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "100-250",
        title: "$100 – $250",
        description: "Per user / month",
        icon: WalletCards,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "250-plus",
        title: "$250+",
        description: "Per user / month",
        icon: WalletCards,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "flexible",
        title: "Flexible",
        description: "Best value matters most",
        icon: Sparkles,
        iconClass: "text-slate-600 bg-slate-100",
      },
    ],
  },

  {
    id: 7,
    title: "How large is your team?",
    description:
      "This helps us find software with the right number of users and collaboration features.",
    options: [
      {
        id: "1-5",
        title: "1 – 5",
        description: "Team members",
        icon: Users,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "6-20",
        title: "6 – 20",
        description: "Team members",
        icon: Users,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "21-50",
        title: "21 – 50",
        description: "Team members",
        icon: Users,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "51-100",
        title: "51 – 100",
        description: "Team members",
        icon: Building2,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "101-plus",
        title: "101+",
        description: "Team members",
        icon: Building2,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "growing",
        title: "Growing",
        description: "Rapidly expanding team",
        icon: Sparkles,
        iconClass: "text-slate-600 bg-slate-100",
      },
    ],
  },

  {
    id: 8,
    title: "Which integrations do you need?",
    description:
      "Choose the tools you already use so we can find compatible software.",
    options: [
      {
        id: "google",
        title: "Google Workspace",
        description: "Gmail, Drive & more",
        icon: Globe2,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "microsoft",
        title: "Microsoft",
        description: "365, Teams & more",
        icon: Building2,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "slack",
        title: "Slack",
        description: "Team communication",
        icon: Users,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "zapier",
        title: "Zapier",
        description: "Workflow automation",
        icon: Sparkles,
        iconClass: "text-pink-500 bg-pink-50",
      },
      {
        id: "salesforce",
        title: "Salesforce",
        description: "CRM integration",
        icon: Network,
        iconClass: "text-amber-500 bg-amber-50",
      },
      {
        id: "other",
        title: "Other",
        description: "Other integrations",
        icon: CircleMore,
        iconClass: "text-slate-600 bg-slate-100",
      },
    ],
  },

  {
    id: 9,
    title: "You're all set!",
    description:
      "Review your answers and get personalized software recommendations.",
    options: [
      {
        id: "recommend",
        title: "Get Recommendations",
        description: "Show me my best matches",
        icon: Sparkles,
        iconClass: "text-violet-600 bg-violet-50",
      },
      {
        id: "compare",
        title: "Compare Options",
        description: "Compare recommended software",
        icon: Network,
        iconClass: "text-blue-600 bg-blue-50",
      },
      {
        id: "save",
        title: "Save My Answers",
        description: "Review them later",
        icon: BookmarkIcon,
        iconClass: "text-emerald-600 bg-emerald-50",
      },
    ],
  },
];

/*
|--------------------------------------------------------------------------
| SMALL ICON HELPERS
|--------------------------------------------------------------------------
*/

function CircleMore() {
  return (
    <span className="flex h-5 w-5 items-center justify-center text-lg font-bold leading-none">
      •••
    </span>
  );
}

function BookmarkIcon() {
  return <span className="text-lg leading-none">♡</span>;
}

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/

function Recommendation() {
  const [currentStep, setCurrentStep] = useState(1);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = QUESTIONS[currentStep - 1];

  const progress = (currentStep / QUESTIONS.length) * 100;

  const selectedAnswer = answers[currentStep];

  /*
  |--------------------------------------------------------------------------
  | SELECT ANSWER
  |--------------------------------------------------------------------------
  */

  const handleSelect = (optionId: string) => {
    setAnswers((current) => ({
      ...current,
      [currentStep]: optionId,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | NEXT
  |--------------------------------------------------------------------------
  */

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep((current) => current + 1);

      return;
    }

    // Frontend-only untuk sekarang.
    // Nanti bisa diarahkan ke halaman hasil recommendation.
    console.log("Recommendation answers:", answers);
  };

  /*
  |--------------------------------------------------------------------------
  | BACK
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((current) => current - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#12244d]">
      {/* =========================================================
          TOP HEADER
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
            PROGRESS
        ======================================================= */}

        <div className="hidden border-b border-[#edf0f5] py-5 lg:block">
          <div className="relative flex items-start justify-between">
            {/* Progress line */}

            <div className="absolute left-[6%] right-[6%] top-3 h-px bg-[#dfe5ef]" />

            {QUESTIONS.map((item, index) => {
              const step = index + 1;

              const active = step === currentStep;

              const completed = step < currentStep;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (step <= currentStep) {
                      setCurrentStep(step);
                    }
                  }}
                  className="relative z-10 flex w-[10%] flex-col items-center"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-semibold ${
                      active || completed
                        ? "border-[#1748c8] bg-[#1748c8] text-white"
                        : "border-[#cbd5e1] bg-white text-slate-600"
                    }`}
                  >
                    {completed ? <Check className="h-3 w-3" /> : step}
                  </span>

                  <span
                    className={`mt-1.5 text-[8px] ${
                      active ? "font-bold text-[#1748c8]" : "text-slate-600"
                    }`}
                  >
                    {
                      [
                        "Business Type",
                        "Business Size",
                        "Industry",
                        "Key Needs",
                        "Must-have Features",
                        "Budget",
                        "Team Size",
                        "Integrations",
                        "Summary",
                      ][index]
                    }
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            MOBILE PROGRESS
        ======================================================= */}

        <div className="block border-b border-[#edf0f5] py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold text-slate-500">
                Step {currentStep} of {QUESTIONS.length}
              </p>

              <p className="mt-1 text-xs font-bold text-[#12244d]">
                {
                  [
                    "Business Type",
                    "Business Size",
                    "Industry",
                    "Key Needs",
                    "Must-have Features",
                    "Budget",
                    "Team Size",
                    "Integrations",
                    "Summary",
                  ][currentStep - 1]
                }
              </p>
            </div>

            <span className="text-[9px] font-semibold text-slate-500">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e5eaf2]">
            <div
              className="h-full rounded-full bg-[#1748c8] transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* =======================================================
            QUESTION CARD
        ======================================================= */}

        <section className="mx-auto mt-5 max-w-[930px] rounded-xl border border-[#e5eaf2] bg-white p-5 shadow-[0_8px_30px_rgba(30,60,100,0.04)] lg:p-7">
          <div className="grid gap-7 lg:grid-cols-[255px_minmax(0,1fr)]">
            {/* =================================================
                LEFT INFO
            ================================================= */}

            <aside className="border-b border-[#edf0f5] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
              {/* Illustration */}

              <div className="mb-6 flex h-[145px] items-center justify-center rounded-xl bg-gradient-to-br from-[#f7fbff] to-[#eef5ff]">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-blue-100 bg-white shadow-sm">
                    <Building2 className="h-12 w-12 text-[#3775db]" />
                  </div>

                  <span className="absolute -left-5 bottom-0 h-7 w-7 rounded-lg border border-blue-100 bg-white" />

                  <span className="absolute -right-4 top-1 h-8 w-8 rounded-full border border-blue-100 bg-white" />

                  <span className="absolute -right-4 bottom-1 h-6 w-6 rounded-lg bg-[#dceaff]" />
                </div>
              </div>

              {/* Why */}

              <h3 className="flex items-center gap-2 text-[11px] font-bold text-[#12244d]">
                <Info className="h-3.5 w-3.5 text-[#1748c8]" />
                Why we ask this?
              </h3>

              <p className="mt-2 text-[9px] leading-4 text-slate-500">
                Your answers help us find software that truly fits your business
                needs.
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#1748c8]" />

                  <span className="text-[9px] text-slate-600">
                    Personalized recommendation
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-[#1748c8]" />

                  <span className="text-[9px] text-slate-600">
                    Save time & effort
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-[#1748c8]" />

                  <span className="text-[9px] text-slate-600">
                    More accurate match
                  </span>
                </div>
              </div>
            </aside>

            {/* =================================================
                RIGHT QUESTION
            ================================================= */}

            <div>
              <div>
                <h1 className="text-[18px] font-bold leading-7 text-[#12244d] lg:text-[19px]">
                  {question.title}
                </h1>

                <p className="mt-1.5 text-[10px] text-slate-500">
                  {question.description}
                </p>
              </div>

              {/* Options */}

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {question.options.map((option) => {
                  const Icon = option.icon;

                  const selected = selectedAnswer === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className={`group relative flex min-h-[70px] items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition ${
                        selected
                          ? "border-[#5d8ee9] bg-[#f8fbff] shadow-[0_0_0_1px_rgba(23,72,200,0.08)]"
                          : "border-[#e0e6ef] bg-white hover:border-[#aebfdd] hover:bg-[#fbfdff]"
                      }`}
                    >
                      {/* Icon */}

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${option.iconClass}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      {/* Text */}

                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold text-[#12244d]">
                          {option.title}
                        </span>

                        <span className="mt-0.5 block text-[8px] leading-3.5 text-slate-500">
                          {option.description}
                        </span>
                      </span>

                      {/* Check */}

                      {selected && (
                        <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1748c8]">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}

              <div className="mt-6 border-t border-[#edf0f5]" />

              {/* Navigation */}

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex min-w-[95px] items-center justify-center gap-1.5 rounded-md border px-4 py-2 text-[9px] font-semibold ${
                    currentStep === 1
                      ? "cursor-not-allowed border-[#edf0f5] text-slate-300"
                      : "border-[#cbd5e1] text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </button>

                <div className="hidden items-center gap-1.5 sm:flex">
                  {QUESTIONS.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${
                        index + 1 === currentStep
                          ? "bg-[#1748c8]"
                          : "bg-[#d6deeb]"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex min-w-[105px] items-center justify-center gap-1.5 rounded-md bg-[#1748c8] px-4 py-2 text-[9px] font-semibold text-white shadow-[0_4px_12px_rgba(23,72,200,0.18)] hover:bg-[#123da8]"
                >
                  {currentStep === QUESTIONS.length ? "Get Results" : "Next"}

                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            SECURITY BOX
        ======================================================= */}

        <section className="mx-auto mt-5 max-w-[930px] rounded-xl border border-[#e3eaf5] bg-[#f8fbff] px-5 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Shield */}

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <ShieldCheck className="h-7 w-7 text-[#1748c8]" />
            </div>

            {/* Text */}

            <div className="flex-1">
              <h3 className="text-[10px] font-bold text-[#12244d]">
                Your data is safe with us
              </h3>

              <p className="mt-1 text-[8px] leading-4 text-slate-500">
                We value your privacy and never share your information with
                third parties.
              </p>
            </div>

            {/* Security items */}

            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#1748c8]" />

                <div>
                  <p className="text-[8px] font-bold">GDPR</p>

                  <p className="text-[7px] text-slate-500">Compliant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <LockKeyhole className="h-5 w-5 text-emerald-600" />

                <div>
                  <p className="text-[8px] font-bold">Secure</p>

                  <p className="text-[7px] text-slate-500">Encryption</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-emerald-600" />

                <div>
                  <p className="text-[8px] font-bold">Privacy</p>

                  <p className="text-[7px] text-slate-500">Protected</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            TRUSTED COMPANIES
        ======================================================= */}

        <section className="mx-auto max-w-[930px] py-5 text-center">
          <p className="text-[9px] font-semibold text-slate-500">
            Trusted by businesses worldwide
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-bold text-slate-300 grayscale">
            <span>tokopedia</span>
            <span>◈ bukalapak</span>
            <span>traveloka</span>
            <span>ruang guru</span>
            <span>J&T EXPRESS</span>
            <span>✦ mekari</span>
            <span>sociolla</span>
            <span>▣ BCA</span>
          </div>
        </section>

        {/* =======================================================
            BOTTOM PROCESS
        ======================================================= */}

        <section className="mx-auto mb-5 max-w-[930px] rounded-xl border border-[#e4eaf3] bg-[#f9fbff] px-5 py-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {/* Step 1 */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <CircleHelp className="h-5 w-5 text-[#1748c8]" />
              </div>

              <div>
                <p className="text-[9px] font-bold text-[#12244d]">
                  Answer Questions
                </p>

                <p className="text-[8px] text-slate-500">about your business</p>
              </div>

              <ArrowRight className="ml-auto hidden h-4 w-4 text-slate-400 md:block" />
            </div>

            {/* Step 2 */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-[9px] font-bold text-[#12244d]">
                  Our AI analyzes
                </p>

                <p className="text-[8px] text-slate-500">
                  thousands of software
                </p>
              </div>

              <ArrowRight className="ml-auto hidden h-4 w-4 text-slate-400 md:block" />
            </div>

            {/* Step 3 */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                <Sparkles className="h-5 w-5 text-violet-600" />
              </div>

              <div>
                <p className="text-[9px] font-bold text-[#12244d]">
                  Get personalized
                </p>

                <p className="text-[8px] text-slate-500">recommendations</p>
              </div>

              <ArrowRight className="ml-auto hidden h-4 w-4 text-slate-400 md:block" />
            </div>

            {/* Step 4 */}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                <ScaleIcon />
              </div>

              <div>
                <p className="text-[9px] font-bold text-[#12244d]">
                  Compare & choose
                </p>

                <p className="text-[8px] text-slate-500">the best fit</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| SCALE ICON
|--------------------------------------------------------------------------
*/

function ScaleIcon() {
  return (
    <span className="text-xl font-bold leading-none text-orange-500">⚖</span>
  );
}

export default Recommendation;
