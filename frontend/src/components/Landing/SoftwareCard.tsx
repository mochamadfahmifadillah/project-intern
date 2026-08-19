import { ArrowUpRight, CheckCircle2, Star } from "lucide-react";

import type { Software } from "../../types/software";

interface SoftwareCardProps {
  software: Software;
}

export default function SoftwareCard({ software }: SoftwareCardProps) {
  const initials =
    software.initials ??
    software.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ??
    "SW";

  const rating =
    software.rating !== undefined && software.rating !== null
      ? Number(software.rating)
      : null;

  const reviewCount =
    software.reviews !== undefined && software.reviews !== null
      ? Number(software.reviews)
      : null;

  const categoryName = software.category?.name ?? "Uncategorized";

  const description =
    software.description?.trim() ||
    "Temukan informasi lengkap mengenai software ini.";

  const pricing = software.pricing?.trim() || "Contact vendor";

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1.5
        hover:shadow-xl
      "
      style={{
        borderColor: "rgba(112, 79, 230, 0.12)",
        boxShadow: "0 8px 30px rgba(17, 17, 17, 0.04)",
      }}
    >
      {/* =====================================================
          HOVER ACCENT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-1
          w-full
          origin-left
          scale-x-0
          transition-transform
          duration-300
          group-hover:scale-x-100
        "
        style={{
          backgroundColor: "var(--primary)",
        }}
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-start justify-between gap-4">
        {/* Software Identity */}

        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              text-sm
              font-black
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:rotate-1
            "
            style={{
              background:
                "linear-gradient(135deg, var(--lavender), var(--lavender-soft))",
              color: "var(--primary)",
            }}
          >
            {initials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3
                className="
                  truncate
                  text-sm
                  font-bold
                  tracking-tight
                "
                style={{
                  color: "var(--text-primary)",
                }}
                title={software.name}
              >
                {software.name}
              </h3>

              <CheckCircle2
                className="h-3.5 w-3.5 shrink-0"
                style={{
                  color: "var(--primary)",
                }}
                aria-label="Verified software"
              />
            </div>

            <span
              className="
                mt-1
                inline-flex
                max-w-full
                truncate
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-semibold
              "
              style={{
                backgroundColor: "var(--lavender-soft)",
                color: "var(--primary)",
              }}
              title={categoryName}
            >
              {categoryName}
            </span>
          </div>
        </div>

        {/* Rating */}

        {rating !== null && !Number.isNaN(rating) && (
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              rounded-full
              px-2.5
              py-1.5
            "
            style={{
              backgroundColor: "rgba(255, 211, 97, 0.18)",
            }}
          >
            <Star
              className="h-3.5 w-3.5 fill-current"
              style={{
                color: "var(--accent-yellow)",
              }}
            />

            <span
              className="text-xs font-bold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}

      <div className="mt-5 flex-1">
        <p
          className="
            line-clamp-3
            text-sm
            leading-6
          "
          style={{
            color: "rgba(17,17,17,0.58)",
          }}
        >
          {description}
        </p>
      </div>

      {/* =====================================================
          METADATA
      ====================================================== */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          gap-3
          rounded-2xl
          px-3.5
          py-3
        "
        style={{
          backgroundColor: "var(--off-white)",
        }}
      >
        {/* Reviews */}

        <div className="min-w-0">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
            "
            style={{
              color: "rgba(17,17,17,0.4)",
            }}
          >
            Community
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-xs
              font-semibold
            "
            style={{
              color: "var(--text-primary)",
            }}
          >
            {reviewCount !== null && !Number.isNaN(reviewCount)
              ? `${reviewCount.toLocaleString()} reviews`
              : "No reviews yet"}
          </p>
        </div>

        {/* Pricing */}

        <div className="min-w-0 text-right">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
            "
            style={{
              color: "rgba(17,17,17,0.4)",
            }}
          >
            Pricing
          </p>

          <p
            className="
              mt-0.5
              max-w-[120px]
              truncate
              text-xs
              font-bold
            "
            style={{
              color: "var(--primary)",
            }}
            title={pricing}
          >
            {pricing}
          </p>
        </div>
      </div>

      {/* =====================================================
          FOOTER / ACTION
      ====================================================== */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          border-t
          pt-4
        "
        style={{
          borderColor: "rgba(17,17,17,0.07)",
        }}
      >
        <span
          className="
            text-xs
            font-medium
            transition-colors
            duration-200
            group-hover:text-[var(--primary)]
          "
          style={{
            color: "rgba(17,17,17,0.5)",
          }}
        >
          Explore software
        </span>

        <button
          type="button"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
          style={{
            backgroundColor: "var(--lavender-soft)",
            color: "var(--primary)",
          }}
          aria-label={`Lihat detail ${software.name}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
