import { ArrowRight, Check, Search, Sparkles, Zap } from "lucide-react";

interface HeroSectionProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const POPULAR_SEARCHES = [
  "Accounting",
  "HR & Payroll",
  "CRM",
  "Project Management",
  "POS",
];

export default function HeroSection({
  value,
  onChange,
  onSearch,
}: HeroSectionProps) {
  const handlePopularSearch = (item: string) => {
    onChange(item);

    // Langsung jalankan pencarian setelah user
    // memilih kategori populer.
    setTimeout(() => {
      onSearch();
    }, 0);
  };

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        px-4
        pb-20
        pt-32
        sm:px-6
        sm:pb-24
        sm:pt-36
        lg:px-8
        lg:pb-28
        lg:pt-40
      "
      style={{
        background:
          "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 52%, #6246d9 100%)",
      }}
    >
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}

      {/* Main glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -top-48
          left-1/2
          h-[520px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          blur-[140px]
        "
        style={{
          backgroundColor: "var(--lavender)",
          opacity: 0.18,
        }}
      />

      {/* Bottom right glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-52
          -right-40
          h-[500px]
          w-[500px]
          rounded-full
          blur-[130px]
        "
        style={{
          backgroundColor: "var(--accent-yellow)",
          opacity: 0.07,
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative mx-auto max-w-6xl text-center">
        {/* =======================================================
            BADGE
        ======================================================== */}

        <div
          className="
            mb-7
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            shadow-lg
            backdrop-blur-md
          "
          style={{
            borderColor: "rgba(255,255,255,0.16)",
            backgroundColor: "rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <span
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
            "
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          >
            <Sparkles
              className="h-3 w-3"
              style={{
                color: "var(--accent-yellow)",
              }}
            />
          </span>

          <span className="text-xs font-medium text-white/85 sm:text-sm">
            Temukan software untuk kebutuhan bisnis Anda
          </span>
        </div>

        {/* =======================================================
            HEADING
        ======================================================== */}

        <h1
          className="
            mx-auto
            max-w-5xl
            text-4xl
            font-bold
            leading-[1.08]
            tracking-[-0.035em]
            text-white
            sm:text-5xl
            lg:text-6xl
            xl:text-7xl
          "
        >
          Temukan software yang tepat
          <br className="hidden sm:block" />
          <span
            className="
              relative
              inline-block
            "
            style={{
              color: "var(--lavender)",
            }}
          >
            untuk bisnis Anda.
          </span>
        </h1>

        {/* =======================================================
            DESCRIPTION
        ======================================================== */}

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-sm
            leading-7
            sm:text-base
            lg:text-lg
            lg:leading-8
          "
          style={{
            color: "rgba(255,255,255,0.70)",
          }}
        >
          Temukan, bandingkan, dan pahami berbagai software bisnis dalam satu
          platform untuk membantu Anda mengambil keputusan teknologi dengan
          lebih tepat.
        </p>

        {/* =======================================================
            SEARCH
        ======================================================== */}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
          }}
          className="
            mx-auto
            mt-9
            max-w-4xl
          "
        >
          <div
            className="
              rounded-2xl
              border
              p-2
              shadow-2xl
              backdrop-blur-md
              sm:p-2.5
            "
            style={{
              backgroundColor: "rgba(255,255,255,0.10)",
              borderColor: "rgba(255,255,255,0.18)",
              boxShadow: "0 25px 70px rgba(0,0,0,0.20)",
            }}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Input */}
              <div className="relative min-w-0 flex-1">
                <Search
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                  "
                  style={{
                    color: "var(--primary)",
                  }}
                />

                <input
                  type="text"
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  placeholder="Cari software, kategori, atau fitur..."
                  aria-label="Cari software, kategori, atau fitur"
                  autoComplete="off"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border-0
                    bg-white
                    pl-12
                    pr-4
                    text-sm
                    font-medium
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:ring-4
                    focus:ring-white/20
                    sm:h-16
                    sm:text-base
                  "
                  style={{
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="
                  group
                  flex
                  h-14
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:brightness-110
                  active:translate-y-0
                  sm:h-16
                  sm:px-8
                "
                style={{
                  backgroundColor: "var(--primary-dark)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.16)",
                }}
              >
                <span>Cari Software</span>

                <ArrowRight
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </div>
        </form>

        {/* =======================================================
            POPULAR SEARCHES
        ======================================================== */}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span
            className="
              mr-1
              text-xs
              font-medium
            "
            style={{
              color: "rgba(255,255,255,0.48)",
            }}
          >
            Populer:
          </span>

          {POPULAR_SEARCHES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handlePopularSearch(item)}
              className="
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-medium
                text-white/70
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white
                hover:text-[var(--primary)]
                active:translate-y-0
              "
              style={{
                borderColor: "rgba(255,255,255,0.14)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* =======================================================
            VALUE PROPOSITIONS
        ======================================================== */}

        <div
          className="
            mx-auto
            mt-10
            flex
            max-w-2xl
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-3
            border-t
            pt-6
          "
          style={{
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
              }}
            >
              <Check className="h-3 w-3 text-white" />
            </span>

            <span className="text-xs text-white/60 sm:text-sm">
              Temukan software
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
              }}
            >
              <Check className="h-3 w-3 text-white" />
            </span>

            <span className="text-xs text-white/60 sm:text-sm">
              Bandingkan pilihan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
              }}
            >
              <Zap className="h-3 w-3 text-white" />
            </span>

            <span className="text-xs text-white/60 sm:text-sm">
              Pilih dengan lebih tepat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
