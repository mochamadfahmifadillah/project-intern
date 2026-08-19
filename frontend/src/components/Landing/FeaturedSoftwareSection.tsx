import { ArrowRight, LayoutGrid, Sparkles } from "lucide-react";

import type { Software } from "../../types/software";
import SoftwareCard from "./SoftwareCard";

interface FeaturedSoftwareSectionProps {
  software: Software[];
  loading: boolean;
  onViewAll: () => void;
}

export default function FeaturedSoftwareSection({
  software,
  loading,
  onViewAll,
}: FeaturedSoftwareSectionProps) {
  const visibleSoftware = software.slice(0, 4);

  return (
    <section
      id="directory"
      className="
        relative
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
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}

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
          backgroundColor: "var(--lavender)",
          opacity: 0.18,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-[360px]
          w-[360px]
          rounded-full
          blur-[120px]
        "
        style={{
          backgroundColor: "var(--accent-yellow)",
          opacity: 0.08,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =======================================================
            SECTION HEADER
        ======================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* Heading */}
          <div className="max-w-2xl">
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3.5
                py-2
                text-xs
                font-semibold
              "
              style={{
                backgroundColor: "var(--lavender-soft)",
                borderColor: "rgba(112,79,230,0.12)",
                color: "var(--primary)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Software Discovery
            </div>

            <h2
              className="
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                sm:text-4xl
              "
              style={{
                color: "var(--text-primary)",
              }}
            >
              Temukan software yang
              <span
                className="block"
                style={{
                  color: "var(--primary)",
                }}
              >
                sesuai kebutuhan bisnis.
              </span>
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                sm:text-base
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Jelajahi pilihan software bisnis yang tersedia dan temukan solusi
              yang dapat membantu operasional, produktivitas, dan pertumbuhan
              bisnis Anda.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            onClick={onViewAll}
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200
              hover:-translate-y-0.5
            "
            style={{
              backgroundColor: "white",
              borderColor: "rgba(17,17,17,0.1)",
              color: "var(--primary)",
              boxShadow: "0 6px 20px rgba(17,17,17,0.05)",
            }}
          >
            Lihat semua software
            <ArrowRight
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

        {/* =======================================================
            SOFTWARE GRID
        ======================================================== */}

        <div className="mt-10">
          {loading ? (
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    bg-white
                  "
                  style={{
                    borderColor: "rgba(17,17,17,0.06)",
                  }}
                >
                  {/* Logo */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className="
                          h-12
                          w-12
                          animate-pulse
                          rounded-2xl
                        "
                        style={{
                          backgroundColor: "#eeeeee",
                        }}
                      />

                      <div
                        className="
                          h-7
                          w-16
                          animate-pulse
                          rounded-full
                        "
                        style={{
                          backgroundColor: "#eeeeee",
                        }}
                      />
                    </div>

                    {/* Title */}
                    <div
                      className="
                        mt-6
                        h-5
                        w-3/4
                        animate-pulse
                        rounded
                      "
                      style={{
                        backgroundColor: "#eeeeee",
                      }}
                    />

                    {/* Description */}
                    <div
                      className="
                        mt-3
                        h-3
                        w-full
                        animate-pulse
                        rounded
                      "
                      style={{
                        backgroundColor: "#eeeeee",
                      }}
                    />

                    <div
                      className="
                        mt-2
                        h-3
                        w-2/3
                        animate-pulse
                        rounded
                      "
                      style={{
                        backgroundColor: "#eeeeee",
                      }}
                    />
                  </div>

                  {/* Bottom */}
                  <div
                    className="
                      border-t
                      px-6
                      py-4
                    "
                    style={{
                      borderColor: "rgba(17,17,17,0.06)",
                    }}
                  >
                    <div
                      className="
                        h-3
                        w-1/2
                        animate-pulse
                        rounded
                      "
                      style={{
                        backgroundColor: "#eeeeee",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : visibleSoftware.length === 0 ? (
            /* =====================================================
               EMPTY STATE
            ====================================================== */

            <div
              className="
                rounded-3xl
                border
                bg-white
                px-6
                py-20
                text-center
              "
              style={{
                borderColor: "rgba(17,17,17,0.08)",
              }}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  backgroundColor: "var(--lavender-soft)",
                }}
              >
                <LayoutGrid
                  className="h-7 w-7"
                  style={{
                    color: "var(--primary)",
                  }}
                />
              </div>

              <h3
                className="mt-6 text-lg font-bold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                Software belum tersedia
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                "
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Belum ada software yang dapat ditampilkan saat ini. Silakan coba
                kategori atau pencarian lainnya.
              </p>

              <button
                type="button"
                onClick={onViewAll}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:-translate-y-0.5
                "
                style={{
                  backgroundColor: "var(--primary)",
                }}
              >
                Jelajahi directory
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            /* =====================================================
               SOFTWARE CARDS
            ====================================================== */

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {visibleSoftware.map((item) => (
                <SoftwareCard key={item.id} software={item} />
              ))}
            </div>
          )}
        </div>

        {/* =======================================================
            BOTTOM CTA
        ======================================================== */}

        {!loading && visibleSoftware.length > 0 && (
          <div
            className="
              mt-10
              flex
              flex-col
              items-center
              justify-between
              gap-4
              rounded-3xl
              border
              px-6
              py-5
              sm:flex-row
            "
            style={{
              backgroundColor: "rgba(112,79,230,0.05)",
              borderColor: "rgba(112,79,230,0.1)",
            }}
          >
            <div className="text-center sm:text-left">
              <p
                className="text-sm font-semibold"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                Belum menemukan software yang Anda cari?
              </p>

              <p
                className="mt-1 text-xs"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Jelajahi seluruh katalog Software Empire.
              </p>
            </div>

            <button
              type="button"
              onClick={onViewAll}
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                px-5
                py-3
                text-sm
                font-semibold
                transition-all
                hover:-translate-y-0.5
              "
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                boxShadow: "0 8px 20px rgba(112,79,230,0.2)",
              }}
            >
              Explore directory
              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
