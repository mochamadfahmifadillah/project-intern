import { ArrowRight, Check, Sparkles, Store } from "lucide-react";

interface ListingCTASectionProps {
  onListSoftware: () => void;
}

const BENEFITS = [
  "Tingkatkan visibilitas software",
  "Jangkau calon pengguna bisnis",
  "Bangun kepercayaan melalui profil software",
];

export default function ListingCTASection({
  onListSoftware,
}: ListingCTASectionProps) {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:px-8
        lg:py-28
      "
      style={{
        backgroundColor: "var(--off-white)",
      }}
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/2
          h-[420px]
          w-[420px]
          -translate-y-1/2
          rounded-full
          blur-[130px]
        "
        style={{
          backgroundColor: "var(--lavender)",
          opacity: 0.35,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-[360px]
          w-[360px]
          rounded-full
          blur-[120px]
        "
        style={{
          backgroundColor: "var(--accent-yellow)",
          opacity: 0.16,
        }}
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-6xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            px-6
            py-12
            shadow-2xl
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
          "
          style={{
            background:
              "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
            boxShadow: "0 30px 80px rgba(54, 46, 237, 0.22)",
          }}
        >
          {/* Inner Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              blur-[80px]
            "
            style={{
              backgroundColor: "var(--lavender)",
              opacity: 0.22,
            }}
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              left-1/3
              h-72
              w-72
              rounded-full
              blur-[90px]
            "
            style={{
              backgroundColor: "var(--accent-yellow)",
              opacity: 0.08,
            }}
          />

          {/* Decorative Grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.04]
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          <div className="relative">
            {/* =================================================
                CONTENT
            ================================================== */}

            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                {/* Badge */}

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    backdrop-blur-sm
                  "
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.16)",
                    color: "var(--accent-yellow)",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  For Software Vendors
                </div>

                {/* Heading */}

                <h2
                  className="
                    mt-5
                    text-3xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-white
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  Tumbuhkan jangkauan
                  <span
                    className="block"
                    style={{
                      color: "var(--lavender)",
                    }}
                  >
                    software Anda.
                  </span>
                </h2>

                {/* Description */}

                <p
                  className="
                    mt-5
                    max-w-xl
                    text-sm
                    leading-7
                    sm:text-base
                  "
                  style={{
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Daftarkan software Anda di Software Empire dan bantu lebih
                  banyak bisnis menemukan solusi yang tepat untuk kebutuhan
                  mereka.
                </p>

                {/* Benefits */}

                <div className="mt-7 space-y-3">
                  {BENEFITS.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <span
                        className="
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                        "
                        style={{
                          backgroundColor: "rgba(255,211,97,0.18)",
                        }}
                      >
                        <Check
                          className="h-3 w-3"
                          style={{
                            color: "var(--accent-yellow)",
                          }}
                        />
                      </span>

                      <span
                        className="text-sm"
                        style={{
                          color: "rgba(255,255,255,0.78)",
                        }}
                      >
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={onListSoftware}
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      px-5
                      py-3
                      text-sm
                      font-bold
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:brightness-105
                      active:translate-y-0
                    "
                    style={{
                      backgroundColor: "var(--accent-yellow)",
                      color: "var(--primary-dark)",
                      boxShadow: "0 10px 25px rgba(255,211,97,0.18)",
                    }}
                  >
                    Daftarkan Software
                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </button>

                  <button
                    type="button"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      border
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-200
                      hover:bg-white/10
                    "
                    style={{
                      borderColor: "rgba(255,255,255,0.18)",
                    }}
                  >
                    Pelajari lebih lanjut
                  </button>
                </div>
              </div>

              {/* =================================================
                  VISUAL
              ================================================== */}

              <div className="hidden lg:flex lg:justify-end">
                <div
                  className="
                    relative
                    flex
                    h-52
                    w-52
                    items-center
                    justify-center
                    rounded-[2rem]
                    border
                    backdrop-blur-sm
                  "
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.12)",
                    transform: "rotate(3deg)",
                  }}
                >
                  <div
                    className="
                      flex
                      h-28
                      w-28
                      items-center
                      justify-center
                      rounded-3xl
                      shadow-xl
                    "
                    style={{
                      backgroundColor: "var(--accent-yellow)",
                      color: "var(--primary-dark)",
                      transform: "rotate(-3deg)",
                    }}
                  >
                    <Store className="h-12 w-12" />
                  </div>

                  {/* Floating Badge */}

                  <div
                    className="
                      absolute
                      -right-5
                      top-7
                      rounded-xl
                      border
                      px-3
                      py-2
                      shadow-lg
                      backdrop-blur-md
                    "
                    style={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      borderColor: "rgba(255,255,255,0.4)",
                      transform: "rotate(-3deg)",
                    }}
                  >
                    <p
                      className="text-[10px] font-medium"
                      style={{
                        color: "rgba(17,17,17,0.5)",
                      }}
                    >
                      Vendor
                    </p>

                    <p
                      className="text-xs font-bold"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      Software Listing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
