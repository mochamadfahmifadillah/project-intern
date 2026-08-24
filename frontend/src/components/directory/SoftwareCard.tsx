import { ArrowRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import type { Software } from "../../types/software";

interface SoftwareCardProps {
  software: Software;
  isSelected?: boolean;
  onToggleCompare?: (software: Software) => void;
}

function SoftwareCard({
  software,
  isSelected = false,
  onToggleCompare,
}: SoftwareCardProps) {
  /*
  |--------------------------------------------------------------------------
  | RATING
  |--------------------------------------------------------------------------
  */

  const ratings = software.ratings ?? [];

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((total, rating) => total + Number(rating.rating), 0) /
        ratings.length
      : 0;

  /*
  |--------------------------------------------------------------------------
  | REVIEWS
  |--------------------------------------------------------------------------
  */

  const reviewCount = software.reviews?.length ?? 0;

  /*
  |--------------------------------------------------------------------------
  | PRICING
  |--------------------------------------------------------------------------
  */

  const firstPricing = software.pricings?.[0];

  let pricingText = "Contact vendor";

  if (firstPricing) {
    if (
      firstPricing.price !== null &&
      firstPricing.price !== undefined &&
      firstPricing.price !== ""
    ) {
      pricingText = String(firstPricing.price);
    } else if (firstPricing.description) {
      pricingText = firstPricing.description;
    } else if (firstPricing.pricing_type) {
      pricingText = firstPricing.pricing_type;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CATEGORY
  |--------------------------------------------------------------------------
  */

  const categoryName = software.category?.name ?? "Uncategorized";

  /*
  |--------------------------------------------------------------------------
  | DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const description =
    software.description ||
    "Discover detailed information about this software.";

  /*
  |--------------------------------------------------------------------------
  | COMPARE
  |--------------------------------------------------------------------------
  */

  const handleCompare = () => {
    if (!onToggleCompare) return;

    onToggleCompare(software);
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <article
      className={`
        group
        relative
        rounded-xl
        border
        bg-white
        transition-all
        duration-200
        ${
          isSelected
            ? "border-[#1749B8] shadow-[0_0_0_1px_#1749B8,0_8px_24px_rgba(23,73,184,0.10)]"
            : "border-[#E2E7F0] hover:-translate-y-[1px] hover:border-[#BFD0EA] hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]"
        }
      `}
    >
      {/* ================================================================
          SELECTED INDICATOR
      ================================================================= */}

      {isSelected && (
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[#1749B8]" />
      )}

      {/* ================================================================
          FAVORITE
      ================================================================= */}

      <button
        type="button"
        aria-label={`Add ${software.name} to favorites`}
        className="
          absolute
          right-3
          top-3
          z-10
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          text-[#94A3B8]
          transition
          hover:bg-[#F4F7FB]
          hover:text-[#1749B8]
        "
      >
        <Heart className="h-4 w-4" strokeWidth={1.7} />
      </button>

      {/* ================================================================
          MAIN CARD
      ================================================================= */}

      <div
        className="
          flex
          min-h-[155px]
          flex-col
          gap-5
          p-5
          md:flex-row
          md:items-center
        "
      >
        {/* ==============================================================
            LOGO
        ============================================================== */}

        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            border
            border-[#E2E7F0]
            bg-white
            md:h-[68px]
            md:w-[68px]
          "
        >
          {software.logo ? (
            <img
              src={software.logo}
              alt={`${software.name} logo`}
              className="
                h-full
                w-full
                object-contain
                p-3
              "
            />
          ) : (
            <span
              className="
                text-xl
                font-bold
                text-[#1749B8]
              "
            >
              {software.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* ==============================================================
            SOFTWARE INFORMATION
        ============================================================== */}

        <div
          className="
            min-w-0
            flex-1
            md:min-w-[280px]
          "
        >
          {/* Name */}

          <div className="flex flex-wrap items-center gap-2 pr-8">
            <h2
              className="
                truncate
                text-[16px]
                font-bold
                tracking-[-0.2px]
                text-[#101B3D]
              "
            >
              {software.name}
            </h2>

            <span
              className="
                rounded-full
                bg-[#E9F8EF]
                px-2
                py-0.5
                text-[9px]
                font-semibold
                text-[#159447]
              "
            >
              Sponsored
            </span>
          </div>

          {/* Rating */}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div
              className="flex items-center gap-0.5"
              aria-label={
                averageRating > 0
                  ? `${averageRating.toFixed(1)} out of 5 stars`
                  : "No ratings"
              }
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-[14px] w-[14px] text-[#F5A623]"
                  strokeWidth={1.5}
                  fill={
                    index < Math.round(averageRating) ? "currentColor" : "none"
                  }
                />
              ))}
            </div>

            <span className="text-[12px] font-semibold text-[#26304C]">
              {averageRating > 0 ? averageRating.toFixed(1) : "No rating"}
            </span>

            {reviewCount > 0 && (
              <span className="text-[11px] text-[#4773C7]">
                ({reviewCount.toLocaleString()} reviews)
              </span>
            )}
          </div>

          {/* Description */}

          <p
            className="
              mt-2
              line-clamp-2
              max-w-[560px]
              text-[11px]
              leading-[1.7]
              text-[#68728B]
            "
          >
            {description}
          </p>

          {/* Tags */}

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span
              className="
                rounded-md
                bg-[#F4F6FA]
                px-2
                py-1
                text-[9px]
                font-medium
                text-[#59657D]
              "
            >
              {categoryName}
            </span>

            <span
              className="
                rounded-md
                bg-[#F4F6FA]
                px-2
                py-1
                text-[9px]
                font-medium
                text-[#59657D]
              "
            >
              Business Software
            </span>
          </div>
        </div>

        {/* ==============================================================
            PRICING
        ============================================================== */}

        <div
          className="
            hidden
            min-w-[125px]
            shrink-0
            border-l
            border-[#EDF0F5]
            pl-6
            md:block
          "
        >
          <p className="text-[10px] font-medium text-[#7A849B]">
            Starting from
          </p>

          <p
            className="
              mt-1
              truncate
              text-[19px]
              font-bold
              tracking-[-0.4px]
              text-[#101B3D]
            "
          >
            {pricingText}
          </p>

          <p className="mt-0.5 text-[10px] text-[#7A849B]">/user / month</p>
        </div>

        {/* ==============================================================
            ACTIONS
        ============================================================== */}

        <div
          className="
            flex
            w-full
            shrink-0
            flex-col
            gap-2
            md:w-[120px]
          "
        >
          {/* View Details */}

          <Link
            to={`/software-directory/${software.slug}`}
            className="
              flex
              h-9
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-[#D7DFEC]
              bg-white
              px-3
              text-[11px]
              font-semibold
              text-[#1749B8]
              transition
              hover:border-[#1749B8]
              hover:bg-[#F7F9FD]
            "
          >
            <span>View Details</span>

            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Compare */}

          <button
            type="button"
            onClick={handleCompare}
            className={`
              flex
              h-9
              items-center
              justify-center
              rounded-lg
              px-3
              text-[11px]
              font-semibold
              transition
              ${
                isSelected
                  ? "bg-[#EAF1FF] text-[#1749B8] ring-1 ring-[#1749B8]"
                  : "bg-[#1749B8] text-white hover:bg-[#103D9D]"
              }
            `}
          >
            {isSelected ? "Selected" : "Compare"}
          </button>

          {/* Checkbox */}

          <button
            type="button"
            onClick={handleCompare}
            className="
              flex
              cursor-pointer
              items-center
              justify-center
              gap-2
              text-[10px]
              font-medium
              text-[#68728B]
            "
          >
            <span
              className={`
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded
                border
                transition
                ${
                  isSelected
                    ? "border-[#1749B8] bg-[#1749B8]"
                    : "border-[#CBD5E1] bg-white"
                }
              `}
            >
              {isSelected && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5L4 7L8 3"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>

            <span>{isSelected ? "Added to Compare" : "Add to Compare"}</span>
          </button>
        </div>
      </div>

      {/* ================================================================
          MOBILE PRICING
      ================================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-[#EDF0F5]
          px-5
          py-3
          md:hidden
        "
      >
        <div>
          <p className="text-[9px] text-[#7A849B]">Starting from</p>

          <p className="mt-0.5 text-sm font-bold text-[#101B3D]">
            {pricingText}
          </p>
        </div>

        <span className="text-[10px] text-[#7A849B]">/user / month</span>
      </div>
    </article>
  );
}

export default SoftwareCard;
