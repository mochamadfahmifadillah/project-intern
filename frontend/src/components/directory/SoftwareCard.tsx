import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

import type { Software } from "../../types/software";

interface SoftwareCardProps {
  software: Software;
}

function SoftwareCard({ software }: SoftwareCardProps) {
  /*
  |--------------------------------------------------------------------------
  | Rating
  |--------------------------------------------------------------------------
  */

  const ratings = software.ratings ?? [];

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((total, rating) => total + Number(rating.rating), 0) /
        ratings.length
      : 0;

  const roundedRating = Math.round(averageRating);

  /*
  |--------------------------------------------------------------------------
  | Reviews
  |--------------------------------------------------------------------------
  */

  const reviewCount = software.reviews?.length ?? 0;

  /*
  |--------------------------------------------------------------------------
  | Pricing
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
    } else if (firstPricing.name) {
      pricingText = firstPricing.name;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Category
  |--------------------------------------------------------------------------
  */

  const categoryName = software.category?.name ?? "Uncategorized";

  /*
  |--------------------------------------------------------------------------
  | Description
  |--------------------------------------------------------------------------
  */

  const description =
    software.description || "Temukan informasi lengkap mengenai software ini.";

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <article className="rounded border border-[#ddd9e3] bg-white p-6 transition hover:shadow-[0_8px_25px_rgba(30,20,70,0.06)]">
      {/* Top */}
      <div className="flex items-start justify-between">
        {/* Logo */}
        <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden border border-[#e2dfe6] bg-white">
          {software.logo ? (
            <img
              src={software.logo}
              alt={`${software.name} logo`}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <div className="text-2xl font-bold text-[#6846e8]">
              {software.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Compare */}
        <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[#393445]">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] cursor-pointer appearance-none rounded border border-[#cfc9db] bg-white checked:border-[#6846e8] checked:bg-[#6846e8]"
          />

          <span>Compare</span>
        </label>
      </div>

      {/* Name */}
      <h2 className="mt-5 text-[21px] font-semibold tracking-[-0.4px] text-[#171717]">
        {software.name}
      </h2>

      {/* Category */}
      <div className="mt-2 inline-flex bg-[#e7d7ff] px-2 py-1 text-[13px] font-medium text-[#6846e8]">
        {categoryName}
      </div>

      {/* Rating */}
      <div className="mt-3 flex items-start gap-3">
        <div
          className="flex gap-0.5"
          aria-label={
            averageRating > 0
              ? `${averageRating.toFixed(1)} out of 5 stars`
              : "No ratings"
          }
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={20}
              strokeWidth={1.8}
              className="text-[#f2b82b]"
              fill={index < roundedRating ? "#f2b82b" : "none"}
            />
          ))}
        </div>

        <span className="text-[14px] text-[#393445]">
          {averageRating > 0
            ? `${averageRating.toFixed(1)} (${reviewCount.toLocaleString()} reviews)`
            : `No ratings (${reviewCount.toLocaleString()} reviews)`}
        </span>
      </div>

      {/* Description */}
      <p className="mt-5 min-h-[48px] text-[14px] leading-5 text-[#454052]">
        {description}
      </p>

      <div className="my-5 border-t border-[#e3dfe6]" />

      {/* Bottom */}
      <div className="flex items-end justify-between gap-4">
        {/* Pricing */}
        <div>
          <p className="text-[13px] font-medium text-[#393445]">Starting at</p>

          <p className="mt-1 text-[18px] font-semibold text-[#171717]">
            {pricingText}
          </p>
        </div>

        {/* View Details */}
        <Link
          to={`/software-directory/${software.slug}`}
          className="flex items-center gap-2 text-[14px] font-medium text-[#6846e8] transition hover:text-[#5132c5]"
        >
          <span>View Details</span>

          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}

export default SoftwareCard;
