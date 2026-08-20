import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

import {
  getPublicSoftwareRating,
  getPublicSoftwares,
  type Software,
} from "../../services/softwareService";

interface FeaturedSoftwareItem {
  software: Software;
  averageRating: number;
  totalRatings: number;
}

const cardAccents = [
  {
    background: "#DEC8FE",
    icon: "#704FE6",
  },
  {
    background: "#FFD361",
    icon: "#6F4FDE",
  },
  {
    background: "#DBC8F6",
    icon: "#704FE6",
  },
];

function FeaturedSoftware() {
  const [featuredSoftware, setFeaturedSoftware] = useState<
    FeaturedSoftwareItem[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Featured Software
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchFeaturedSoftware = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublicSoftwares();

        const softwares = Array.isArray(response?.data)
          ? response.data.filter((software) => software.status === "active")
          : [];

        const selectedSoftwares = softwares.slice(0, 3);

        const featuredWithRatings = await Promise.all(
          selectedSoftwares.map(async (software) => {
            try {
              const ratingResponse = await getPublicSoftwareRating(
                software.slug,
              );

              return {
                software,
                averageRating: Number(ratingResponse.data?.average_rating) || 0,
                totalRatings: Number(ratingResponse.data?.total_ratings) || 0,
              };
            } catch (ratingError) {
              console.error(
                `Gagal mengambil rating ${software.name}:`,
                ratingError,
              );

              return {
                software,
                averageRating: 0,
                totalRatings: 0,
              };
            }
          }),
        );

        setFeaturedSoftware(featuredWithRatings);
      } catch (fetchError) {
        console.error("Gagal mengambil featured software:", fetchError);

        setFeaturedSoftware([]);
        setError("Gagal memuat software.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSoftware();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Pricing
  |--------------------------------------------------------------------------
  */

  const getPricingText = (software: Software) => {
    const pricing = software.pricings?.[0];

    if (!pricing) {
      return "Contact vendor";
    }

    if (
      pricing.price !== null &&
      pricing.price !== undefined &&
      pricing.price !== ""
    ) {
      const currency = pricing.currency
        ? `${pricing.currency.toUpperCase()} `
        : "";

      return `${currency}${pricing.price}`;
    }

    if (pricing.pricing_type === "free") {
      return "Free";
    }

    if (pricing.pricing_type === "freemium") {
      return "Freemium";
    }

    if (pricing.pricing_type === "custom") {
      return "Custom";
    }

    return "Contact vendor";
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <section
        id="directory"
        className="relative overflow-hidden border-b border-[#e2ddec] bg-[#faf9fc] py-20"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#DEC8FE]/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#FFD361]/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="mx-auto max-w-[600px] text-center">
            <div className="mx-auto h-3 w-20 animate-pulse rounded bg-[#DEC8FE]" />

            <div className="mx-auto mt-4 h-9 w-64 animate-pulse rounded bg-[#e9e4f1]" />

            <div className="mx-auto mt-4 h-4 w-[420px] max-w-full animate-pulse rounded bg-[#eeeaf4]" />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse border border-[#e2ddec] bg-white p-6"
              >
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#eeeaf4]" />

                  <div className="flex-1">
                    <div className="h-5 w-32 rounded bg-[#eeeaf4]" />
                    <div className="mt-2 h-3 w-24 rounded bg-[#f3f0f7]" />
                  </div>
                </div>

                <div className="mt-7 h-3 w-full rounded bg-[#f3f0f7]" />
                <div className="mt-2 h-3 w-4/5 rounded bg-[#f3f0f7]" />

                <div className="my-6 border-t border-[#eeeaf4]" />

                <div className="flex justify-between">
                  <div>
                    <div className="h-3 w-16 rounded bg-[#f3f0f7]" />
                    <div className="mt-2 h-4 w-24 rounded bg-[#eeeaf4]" />
                  </div>

                  <div className="h-10 w-28 rounded bg-[#eeeaf4]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <section
        id="directory"
        className="border-b border-[#e2ddec] bg-[#faf9fc] py-20"
      >
        <div className="mx-auto max-w-[700px] px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#704FE6]">
            Explore
          </p>

          <h2 className="mt-3 text-[32px] font-semibold tracking-[-1px]">
            Featured Software
          </h2>

          <p className="mt-4 text-sm text-[#777184]">{error}</p>

          <Link
            to="/software-directory"
            className="mt-7 inline-flex items-center gap-2 bg-[#704FE6] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#6F4FDE]"
          >
            Browse Software
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Empty
  |--------------------------------------------------------------------------
  */

  if (featuredSoftware.length === 0) {
    return (
      <section
        id="directory"
        className="border-b border-[#e2ddec] bg-[#faf9fc] py-20"
      >
        <div className="mx-auto max-w-[700px] px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#704FE6]">
            Explore
          </p>

          <h2 className="mt-3 text-[32px] font-semibold tracking-[-1px]">
            Featured Software
          </h2>

          <p className="mt-4 text-sm text-[#777184]">
            Belum ada software yang tersedia.
          </p>

          <Link
            to="/software-directory"
            className="mt-7 inline-flex items-center gap-2 bg-[#704FE6] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#6F4FDE]"
          >
            View Software Directory
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <section
      id="directory"
      className="relative overflow-hidden border-b border-[#e2ddec] bg-[#faf9fc] py-20 md:py-24"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#DEC8FE]/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FFD361]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1180px] px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[620px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#704FE6]">
              Explore
            </p>

            <h2 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-1.2px] text-[#18161d] md:text-[42px]">
              Software worth exploring.
            </h2>

            <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#625d6d]">
              Discover software selected from the directory to help you find
              solutions that fit your business needs.
            </p>
          </div>

          <Link
            to="/software-directory"
            className="group inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[#704FE6]"
          >
            View all software
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredSoftware.map(
            ({ software, averageRating, totalRatings }, index) => {
              const pricingText = getPricingText(software);
              const accent = cardAccents[index % cardAccents.length];

              return (
                <article
                  key={software.id}
                  className="group relative overflow-hidden border border-[#ddd8e7] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#cfc5e3] hover:shadow-[0_18px_45px_rgba(48,35,82,0.10)]"
                >
                  {/* Accent strip */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      backgroundColor: accent.background,
                    }}
                  />

                  <div className="p-7">
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        {/* Logo */}
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                          style={{
                            backgroundColor: accent.background,
                          }}
                        >
                          {software.logo ? (
                            <img
                              src={software.logo}
                              alt={`${software.name} logo`}
                              className="h-full w-full object-contain p-2.5"
                            />
                          ) : (
                            <span
                              className="text-lg font-bold"
                              style={{
                                color: accent.icon,
                              }}
                            >
                              {software.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-[17px] font-semibold text-[#18161d]">
                            {software.name}
                          </h3>

                          <p className="mt-1 truncate text-[12px] font-medium text-[#777184]">
                            {software.category?.name || "Software"}
                          </p>
                        </div>
                      </div>

                      {/* Category indicator */}
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor: accent.icon,
                        }}
                      />
                    </div>

                    {/* Description */}
                    <p className="mt-7 min-h-[42px] text-[13px] leading-6 text-[#625d6d]">
                      {software.description ||
                        "Informasi lengkap mengenai software ini tersedia di directory."}
                    </p>

                    {/* Rating */}
                    <div className="mt-6 flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={14}
                            strokeWidth={1.5}
                            className={
                              starIndex < Math.round(averageRating)
                                ? "text-[#704FE6]"
                                : "text-[#d9d4e2]"
                            }
                            fill={
                              starIndex < Math.round(averageRating)
                                ? "#704FE6"
                                : "none"
                            }
                          />
                        ))}
                      </div>

                      <span className="text-[12px] font-semibold text-[#302b3c]">
                        {averageRating > 0
                          ? averageRating.toFixed(1)
                          : "No rating"}
                      </span>

                      <span className="text-[12px] text-[#8a8494]">
                        {totalRatings} review
                        {totalRatings !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-[#eeeaf1]" />

                    {/* Footer */}
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a8494]">
                          Starting at
                        </p>

                        <p className="mt-1 text-[14px] font-semibold text-[#18161d]">
                          {pricingText}
                        </p>
                      </div>

                      <Link
                        to={`/software-directory/${software.slug}`}
                        className="group/button inline-flex items-center gap-1.5 bg-[#704FE6] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#6F4FDE]"
                      >
                        View Details
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover/button:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSoftware;
