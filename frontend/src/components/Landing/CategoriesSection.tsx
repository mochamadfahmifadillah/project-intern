import { ArrowUpRight, Layers3 } from "lucide-react";
import type { Category } from "../../types/software";

interface CategoriesSectionProps {
  categories: Category[];
  loading: boolean;
  activeCategory: string;
  onSelect: (category: Category) => void;
}

export default function CategoriesSection({
  categories,
  loading,
  activeCategory,
  onSelect,
}: CategoriesSectionProps) {
  return (
    <section
      id="categories"
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
        backgroundColor: "var(--primary-dark)",
      }}
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          blur-[130px]
        "
        style={{
          backgroundColor: "var(--lavender)",
          opacity: 0.16,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-1/3
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
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-4
              py-2
              text-xs
              font-semibold
              backdrop-blur-md
            "
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.14)",
              color: "var(--lavender)",
            }}
          >
            <Layers3 className="h-3.5 w-3.5" />
            Software Directory
          </div>

          <h2
            className="
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Jelajahi software
            <span
              className="block"
              style={{
                color: "var(--lavender)",
              }}
            >
              berdasarkan kebutuhan bisnis.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              sm:text-base
            "
            style={{
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Pilih kategori untuk menemukan berbagai software yang dapat membantu
            operasional, produktivitas, dan pertumbuhan bisnis Anda.
          </p>

          {!loading && categories.length > 0 && (
            <div
              className="
                mx-auto
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span
                className="font-bold"
                style={{
                  color: "var(--accent-yellow)",
                }}
              >
                {categories.length}
              </span>

              <span className="text-xs sm:text-sm">kategori tersedia</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-12">
          {loading ? (
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="
                    h-[185px]
                    animate-pulse
                    rounded-3xl
                  "
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div
              className="
                mx-auto
                max-w-xl
                rounded-3xl
                border
                px-6
                py-16
                text-center
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  backgroundColor: "var(--lavender)",
                }}
              >
                <Layers3
                  className="h-6 w-6"
                  style={{
                    color: "var(--primary-dark)",
                  }}
                />
              </div>

              <h3 className="mt-5 text-base font-semibold text-white">
                Belum ada kategori
              </h3>

              <p
                className="mt-2 text-sm"
                style={{
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Kategori software akan tersedia setelah data ditambahkan.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {categories.map((category, index) => {
                /*
                 * IMPORTANT:
                 * Landing.tsx menyimpan category.id sebagai activeCategory.
                 */
                const isActive = activeCategory === String(category.id);

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => onSelect(category)}
                    aria-pressed={isActive}
                    className="
                      group
                      relative
                      min-h-[185px]
                      overflow-hidden
                      rounded-3xl
                      border
                      p-6
                      text-center
                      transition-all
                      duration-300
                      hover:-translate-y-1.5
                      hover:shadow-2xl
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[var(--accent-yellow)]
                      focus:ring-offset-2
                      focus:ring-offset-[var(--primary-dark)]
                    "
                    style={{
                      backgroundColor: "var(--white)",
                      borderColor: isActive
                        ? "var(--accent-yellow)"
                        : "rgba(255,255,255,0.08)",
                      boxShadow: isActive
                        ? "0 18px 45px rgba(255,211,97,0.16)"
                        : "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div
                        className="
                          absolute
                          left-0
                          top-0
                          h-1
                          w-full
                        "
                        style={{
                          backgroundColor: "var(--accent-yellow)",
                        }}
                      />
                    )}

                    {/* Background Number */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        right-4
                        text-6xl
                        font-black
                        opacity-[0.035]
                      "
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Hover Glow */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-10
                        -top-10
                        h-28
                        w-28
                        rounded-full
                        opacity-0
                        blur-2xl
                        transition-opacity
                        duration-300
                        group-hover:opacity-80
                      "
                      style={{
                        backgroundColor: "var(--lavender)",
                      }}
                    />

                    {/* Content */}
                    <div className="relative flex h-full flex-col items-center justify-center">
                      {/* Icon */}
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          text-xl
                          shadow-sm
                          transition-all
                          duration-300
                          group-hover:scale-110
                        "
                        style={{
                          backgroundColor: isActive
                            ? "var(--primary)"
                            : "var(--lavender-soft)",
                          color: isActive ? "white" : "var(--primary)",
                        }}
                      >
                        {category.icon ?? "📁"}
                      </div>

                      {/* Name */}
                      <h3
                        className="
                          mt-5
                          text-sm
                          font-bold
                          leading-5
                        "
                        style={{
                          color: isActive
                            ? "var(--primary)"
                            : "var(--text-primary)",
                        }}
                      >
                        {category.name}
                      </h3>

                      {/* Software Count */}
                      <p
                        className="mt-2 text-xs"
                        style={{
                          color: "#888888",
                        }}
                      >
                        {category.softwares_count ?? 0} software
                      </p>

                      {/* Active State */}
                      {isActive && (
                        <span
                          className="
                            mt-2
                            rounded-full
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                          "
                          style={{
                            backgroundColor: "var(--lavender-soft)",
                            color: "var(--primary)",
                          }}
                        >
                          Dipilih
                        </span>
                      )}
                    </div>

                    {/* Arrow */}
                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:opacity-100
                      "
                      style={{
                        backgroundColor: "var(--accent-yellow)",
                      }}
                    >
                      <ArrowUpRight
                        className="h-4 w-4"
                        style={{
                          color: "var(--primary-dark)",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
