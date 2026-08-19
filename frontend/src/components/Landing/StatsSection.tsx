import {
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  Search,
  Users,
} from "lucide-react";

const STATS = [
  {
    value: "1.247+",
    label: "Software",
    description: "Tools bisnis dalam berbagai kategori",
    icon: Layers3,
    background: "var(--lavender)",
    textColor: "var(--text-primary)",
    accentColor: "var(--primary)",
  },
  {
    value: "89",
    label: "Kategori",
    description: "Mulai dari CRM hingga AI tools",
    icon: Search,
    background: "var(--accent-yellow)",
    textColor: "var(--text-primary)",
    accentColor: "var(--primary-dark)",
  },
  {
    value: "Terstruktur",
    label: "Informasi Software",
    description: "Fitur, harga, integrasi, dan detail lainnya",
    icon: CheckCircle2,
    background: "var(--primary-dark)",
    textColor: "white",
    accentColor: "var(--accent-yellow)",
  },
];

export default function StatsSection() {
  return (
    <section
      className="
        relative
        px-4
        py-10
        sm:px-6
        sm:py-14
        lg:px-8
        lg:py-16
      "
      style={{
        backgroundColor: "var(--off-white)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* =====================================================
            INTRO
        ====================================================== */}

        <div className="mb-7 text-center sm:mb-9">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
            "
            style={{
              color: "var(--primary)",
            }}
          >
            Software discovery
          </p>

          <h2
            className="
              mt-2
              text-xl
              font-bold
              tracking-tight
              sm:text-2xl
            "
            style={{
              color: "var(--text-primary)",
            }}
          >
            Semua yang Anda butuhkan untuk menemukan software
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-2xl
              text-sm
              leading-6
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Informasi software dikumpulkan dan disusun agar bisnis lebih mudah
            memahami pilihan teknologi yang tersedia.
          </p>
        </div>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-3
            md:gap-5
          "
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:p-7
                "
                style={{
                  backgroundColor: stat.background,
                  color: stat.textColor,
                }}
              >
                {/* =================================================
                    DECORATIVE SHAPES
                ================================================== */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    opacity-20
                    transition-transform
                    duration-500
                    group-hover:scale-125
                  "
                  style={{
                    backgroundColor: stat.accentColor,
                  }}
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-44
                    w-44
                    rounded-full
                    opacity-10
                    transition-transform
                    duration-500
                    group-hover:scale-125
                  "
                  style={{
                    backgroundColor: stat.accentColor,
                  }}
                />

                {/* =================================================
                    HEADER
                ================================================== */}

                <div className="relative flex items-start justify-between">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                    "
                    style={{
                      backgroundColor:
                        stat.background === "var(--primary-dark)"
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(255,255,255,0.55)",
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color: stat.accentColor,
                      }}
                    />
                  </div>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      opacity-60
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                    style={{
                      backgroundColor:
                        stat.background === "var(--primary-dark)"
                          ? "rgba(255,255,255,0.10)"
                          : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <ArrowUpRight
                      className="h-4 w-4"
                      style={{
                        color: stat.accentColor,
                      }}
                    />
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================== */}

                <div className="relative mt-7">
                  <div className="flex items-baseline gap-2">
                    <p
                      className="
                        text-3xl
                        font-bold
                        tracking-tight
                        sm:text-4xl
                      "
                    >
                      {stat.value}
                    </p>
                  </div>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                    "
                    style={{
                      color: stat.accentColor,
                    }}
                  >
                    {stat.label}
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-xs
                      text-xs
                      leading-5
                    "
                    style={{
                      color:
                        stat.background === "var(--primary-dark)"
                          ? "rgba(255,255,255,0.65)"
                          : "rgba(17,17,17,0.55)",
                    }}
                  >
                    {stat.description}
                  </p>
                </div>

                {/* =================================================
                    BOTTOM INDICATOR
                ================================================== */}

                <div
                  className="
                    relative
                    mt-6
                    h-px
                    w-full
                    overflow-hidden
                  "
                  style={{
                    backgroundColor:
                      stat.background === "var(--primary-dark)"
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(17,17,17,0.08)",
                  }}
                >
                  <div
                    className="
                      h-full
                      w-1/3
                      transition-all
                      duration-500
                      group-hover:w-2/3
                    "
                    style={{
                      backgroundColor: stat.accentColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
