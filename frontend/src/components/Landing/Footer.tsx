import { ArrowUp, ArrowUpRight, Layers3, Search, Sparkles } from "lucide-react";

interface FooterProps {
  onNavigate: (id: string) => void;
}

const PLATFORM_LINKS = [
  {
    label: "Directory",
    action: () => {},
  },
  {
    label: "Categories",
    action: () => {},
  },
];

const COMPANY_LINKS = ["About Software Empire", "For Software Vendors"];

const SUPPORT_LINKS = ["Help Center", "Contact"];

export default function Footer({ onNavigate }: FooterProps) {
  const handleDirectory = () => {
    onNavigate("directory");
  };

  const handleCategories = () => {
    onNavigate("categories");
  };

  const handleTop = () => {
    onNavigate("top");
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--primary-dark)",
      }}
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          blur-[140px]
        "
        style={{
          backgroundColor: "var(--primary)",
          opacity: 0.2,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-48
          -right-32
          h-[400px]
          w-[400px]
          rounded-full
          blur-[130px]
        "
        style={{
          backgroundColor: "var(--accent-yellow)",
          opacity: 0.07,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===================================================
            MAIN FOOTER
        ==================================================== */}

        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* =================================================
              BRAND
          ================================================== */}

          <div className="max-w-sm">
            <button
              type="button"
              onClick={handleTop}
              className="
                group
                flex
                items-center
                gap-2.5
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-xs
                  font-black
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
                style={{
                  backgroundColor: "var(--accent-yellow)",
                  color: "var(--primary-dark)",
                }}
              >
                SE
              </span>

              <span
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Software Empire
              </span>
            </button>

            <p
              className="
                mt-5
                text-sm
                leading-7
              "
              style={{
                color: "rgba(255,255,255,0.58)",
              }}
            >
              Platform discovery software untuk membantu bisnis menemukan,
              memahami, membandingkan, dan memilih teknologi yang tepat.
            </p>

            {/* Platform Positioning */}

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-2
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <Sparkles
                className="h-3.5 w-3.5"
                style={{
                  color: "var(--accent-yellow)",
                }}
              />

              <span
                className="text-xs font-medium"
                style={{
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Navigate the software ecosystem
              </span>
            </div>
          </div>

          {/* =================================================
              PLATFORM
          ================================================== */}

          <div>
            <h4
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
              "
            >
              Platform
            </h4>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={handleDirectory}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-sm
                  transition-colors
                "
                style={{
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <Search className="h-3.5 w-3.5 opacity-70" />
                Directory
                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </button>

              <button
                type="button"
                onClick={handleCategories}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-sm
                  transition-colors
                "
                style={{
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <Layers3 className="h-3.5 w-3.5 opacity-70" />
                Categories
                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </button>

              <button
                type="button"
                className="
                  text-sm
                  transition-colors
                "
                style={{
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Compare
              </button>

              <button
                type="button"
                className="
                  text-sm
                  transition-colors
                "
                style={{
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Reviews
              </button>
            </div>
          </div>

          {/* =================================================
              ECOSYSTEM
          ================================================== */}

          <div>
            <h4
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
              "
            >
              Ecosystem
            </h4>

            <div className="mt-5 space-y-3">
              {COMPANY_LINKS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="
                    block
                    text-sm
                    transition-colors
                  "
                  style={{
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              SUPPORT
          ================================================== */}

          <div>
            <h4
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
              "
            >
              Support
            </h4>

            <div className="mt-5 space-y-3">
              {SUPPORT_LINKS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="
                    block
                    text-sm
                    transition-colors
                  "
                  style={{
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM BAR
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-t
            py-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
          style={{
            borderColor: "rgba(255,255,255,0.09)",
          }}
        >
          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.4)",
            }}
          >
            © 2026 Software Empire. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              className="text-xs transition-colors"
              style={{
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Privacy
            </button>

            <button
              type="button"
              className="text-xs transition-colors"
              style={{
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Terms
            </button>

            {/* Back to Top */}

            <button
              type="button"
              onClick={handleTop}
              className="
                group
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-200
                hover:-translate-y-0.5
              "
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.7)",
              }}
              aria-label="Kembali ke atas"
            >
              <ArrowUp
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:-translate-y-0.5
                "
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
