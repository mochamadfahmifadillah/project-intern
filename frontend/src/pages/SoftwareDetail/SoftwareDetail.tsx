import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Globe2,
  Layers3,
  MessageSquare,
  Puzzle,
  Star,
  Trash2,
  Users,
  Zap,
} from "lucide-react";

import {
  createSoftwareRating,
  createSoftwareReview,
  deleteSoftwareReview,
  getPublicSoftwareDetail,
  getPublicSoftwareRating,
  getPublicSoftwareReviews,
  updateSoftwareRating,
  type Software,
  type SoftwareRatingSummary,
  type SoftwareReview,
} from "../../services/softwareService";

function SoftwareDetail() {
  const { slug } = useParams<{ slug: string }>();

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [software, setSoftware] = useState<Software | null>(null);
  const [reviews, setReviews] = useState<SoftwareReview[]>([]);
  const [ratingSummary, setRatingSummary] =
    useState<SoftwareRatingSummary | null>(null);

  const [reviewText, setReviewText] = useState("");

  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingRatings, setLoadingRatings] = useState(true);

  const [submittingReview, setSubmittingReview] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);

  const [deletingReviewId, setDeletingReviewId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  const [ratingError, setRatingError] = useState("");
  const [ratingSuccess, setRatingSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Current User
  |--------------------------------------------------------------------------
  */

  const currentUserId = useMemo(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      const currentUser = JSON.parse(storedUser);
      const id = Number(currentUser?.id);

      return Number.isFinite(id) && id > 0 ? id : null;
    } catch {
      return null;
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch Software
  |--------------------------------------------------------------------------
  */

  const fetchSoftwareDetail = async () => {
    if (!slug) {
      setError("Software tidak ditemukan.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getPublicSoftwareDetail(slug);

      setSoftware(response.data);
    } catch (error) {
      console.error("Gagal mengambil detail software:", error);

      setSoftware(null);
      setError("Software tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch Reviews
  |--------------------------------------------------------------------------
  */

  const fetchReviews = async () => {
    if (!slug) {
      setLoadingReviews(false);
      return;
    }

    try {
      setLoadingReviews(true);
      setReviewError("");

      const response = await getPublicSoftwareReviews(slug);

      setReviews(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Gagal mengambil review:", error);

      setReviews([]);
      setReviewError("Gagal mengambil review software.");
    } finally {
      setLoadingReviews(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch Rating Summary
  |--------------------------------------------------------------------------
  */

  const fetchRating = async () => {
    if (!slug) {
      setLoadingRatings(false);
      return;
    }

    try {
      setLoadingRatings(true);
      setRatingError("");

      const response = await getPublicSoftwareRating(slug);

      const data = response?.data;

      if (!data) {
        setRatingSummary({
          average_rating: 0,
          total_ratings: 0,
          user_rating: null,
          user_rating_id: null,
        });

        setSelectedRating(0);
        return;
      }

      setRatingSummary(data);

      setSelectedRating(
        data.user_rating !== null ? Number(data.user_rating) : 0,
      );
    } catch (error) {
      console.error("Gagal mengambil rating:", error);

      setRatingSummary(null);
      setSelectedRating(0);
      setRatingError("Gagal mengambil rating software.");
    } finally {
      setLoadingRatings(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchSoftwareDetail();
    fetchReviews();
    fetchRating();
  }, [slug]);

  /*
  |--------------------------------------------------------------------------
  | Rating Stats
  |--------------------------------------------------------------------------
  */

  const ratingStats = useMemo(() => {
    if (!ratingSummary) {
      return {
        average: 0,
        total: 0,
      };
    }

    return {
      average: Number(ratingSummary.average_rating) || 0,
      total: Number(ratingSummary.total_ratings) || 0,
    };
  }, [ratingSummary]);

  /*
  |--------------------------------------------------------------------------
  | Submit Rating
  |--------------------------------------------------------------------------
  */

  const handleSubmitRating = async (ratingValue: number) => {
    if (!slug || ratingValue < 1 || ratingValue > 5) {
      return;
    }

    try {
      setSubmittingRating(true);
      setRatingError("");
      setRatingSuccess("");

      const userRatingId = ratingSummary?.user_rating_id ?? null;

      /*
       * Jika user sudah memiliki rating dan backend memberikan
       * ID rating tersebut, update rating.
       */
      if (userRatingId) {
        await updateSoftwareRating(userRatingId, {
          rating: ratingValue,
        });

        setRatingSuccess("Rating berhasil diperbarui.");
      } else {
        /*
         * Jika belum pernah memberikan rating,
         * buat rating baru.
         */
        await createSoftwareRating(slug, {
          rating: ratingValue,
        });

        setRatingSuccess("Rating berhasil diberikan.");
      }

      setSelectedRating(ratingValue);

      await fetchRating();
    } catch (error: unknown) {
      console.error("Gagal menyimpan rating:", error);

      const responseError = error as {
        response?: {
          status?: number;
          data?: {
            message?: string;
          };
        };
      };

      const status = responseError.response?.status;

      setRatingError(
        responseError.response?.data?.message ||
          (status === 401
            ? "Silakan login terlebih dahulu untuk memberikan rating."
            : status === 403
              ? "Anda tidak memiliki akses untuk mengubah rating ini."
              : status === 409
                ? "Anda sudah memberikan rating untuk software ini."
                : "Gagal menyimpan rating."),
      );
    } finally {
      setSubmittingRating(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Submit Review
  |--------------------------------------------------------------------------
  */

  const handleSubmitReview = async () => {
    if (!slug) {
      return;
    }

    const trimmedReview = reviewText.trim();

    if (!trimmedReview) {
      setReviewError("Review tidak boleh kosong.");
      return;
    }

    if (trimmedReview.length < 10) {
      setReviewError("Review minimal 10 karakter.");
      return;
    }

    try {
      setSubmittingReview(true);
      setReviewError("");
      setReviewSuccess("");

      await createSoftwareReview(slug, {
        review: trimmedReview,
      });

      setReviewText("");
      setReviewSuccess("Review berhasil ditambahkan.");

      await fetchReviews();
    } catch (error: unknown) {
      console.error("Gagal menambahkan review:", error);

      const responseError = error as {
        response?: {
          status?: number;
          data?: {
            message?: string;
          };
        };
      };

      const status = responseError.response?.status;

      setReviewError(
        responseError.response?.data?.message ||
          (status === 401
            ? "Silakan login terlebih dahulu untuk memberikan review."
            : status === 403
              ? "Anda tidak memiliki akses untuk memberikan review."
              : "Gagal menambahkan review."),
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Review
  |--------------------------------------------------------------------------
  */

  const handleDeleteReview = async (reviewId: number) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus review ini?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingReviewId(reviewId);
      setReviewError("");
      setReviewSuccess("");

      await deleteSoftwareReview(reviewId);

      setReviews((current) =>
        current.filter((review) => review.id !== reviewId),
      );

      setReviewSuccess("Review berhasil dihapus.");
    } catch (error: unknown) {
      console.error("Gagal menghapus review:", error);

      const responseError = error as {
        response?: {
          status?: number;
          data?: {
            message?: string;
          };
        };
      };

      const status = responseError.response?.status;

      setReviewError(
        responseError.response?.data?.message ||
          (status === 401
            ? "Silakan login terlebih dahulu."
            : status === 403
              ? "Anda tidak memiliki akses untuk menghapus review ini."
              : "Gagal menghapus review."),
      );
    } finally {
      setDeletingReviewId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-40 rounded bg-slate-200" />

            <div className="rounded-[2rem] bg-white p-8">
              <div className="flex gap-6">
                <div className="h-24 w-24 rounded-2xl bg-slate-200" />

                <div className="flex-1 space-y-4">
                  <div className="h-8 w-72 rounded bg-slate-200" />
                  <div className="h-4 w-full max-w-2xl rounded bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="h-72 rounded-3xl bg-white lg:col-span-2" />
              <div className="h-72 rounded-3xl bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error || !software) {
    return (
      <div className="min-h-screen bg-[var(--off-white)] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-red-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Layers3 className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Software tidak ditemukan
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Software yang Anda cari tidak tersedia atau sudah tidak aktif.
          </p>

          <Link
            to="/software-directory"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Directory
          </Link>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="relative overflow-hidden bg-[var(--primary-dark)]">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[var(--lavender)] opacity-20 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[var(--accent-yellow)] opacity-10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20">
          <Link
            to="/software-directory"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Software Directory
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-xl">
                  {software.logo ? (
                    <img
                      src={software.logo}
                      alt={`Logo ${software.name}`}
                      className="h-full w-full object-contain p-3"
                    />
                  ) : (
                    <span className="text-3xl font-black text-[var(--primary)]">
                      {software.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  {software.category && (
                    <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-[var(--lavender)] ring-1 ring-inset ring-white/10">
                      {software.category.name}
                    </span>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {software.name}
                    </h1>

                    {software.status === "active" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-300/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Active
                      </span>
                    )}
                  </div>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                    {software.description ||
                      "Temukan informasi lengkap mengenai software ini."}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5"
                          fill={
                            star <= Math.round(ratingStats.average)
                              ? "currentColor"
                              : "none"
                          }
                          style={{
                            color:
                              star <= Math.round(ratingStats.average)
                                ? "var(--accent-yellow)"
                                : "rgba(255,255,255,0.25)",
                          }}
                        />
                      ))}
                    </div>

                    {loadingRatings ? (
                      <span className="text-sm text-white/50">
                        Memuat rating...
                      </span>
                    ) : ratingStats.total > 0 ? (
                      <span className="text-sm text-white/70">
                        <strong className="text-white">
                          {ratingStats.average.toFixed(1)}
                        </strong>{" "}
                        / 5 · {ratingStats.total} rating
                      </span>
                    ) : (
                      <span className="text-sm text-white/50">
                        Belum ada rating
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              {software.website_url && (
                <a
                  href={software.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-yellow)] px-6 py-3.5 text-sm font-bold text-[var(--primary-dark)] shadow-lg transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Kunjungi Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              <Link
                to="/software-comparison"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                <Layers3 className="h-4 w-4" />
                Bandingkan Software
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MAIN
      ================================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* QUICK INFO */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lavender-soft)] text-[var(--primary)]">
              <Layers3 className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              Kategori
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {software.category?.name || "Tidak tersedia"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Star className="h-5 w-5" fill="currentColor" />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              Rating
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {ratingStats.total > 0
                ? `${ratingStats.average.toFixed(1)} / 5`
                : "Belum ada"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageSquare className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              Review
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {reviews.length} review
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Puzzle className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              Integrasi
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {software.integrations?.length ?? 0} integrasi
            </p>
          </div>
        </div>

        {/* OVERVIEW */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lavender-soft)] text-[var(--primary)]">
                <Zap className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                  Overview
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  Tentang {software.name}
                </h2>
              </div>
            </div>

            <p className="mt-6 leading-8 text-slate-600">
              {software.description ||
                "Belum ada informasi mengenai software ini."}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              Software information
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">Informasi</h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Status
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      software.status === "active"
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }`}
                  />

                  {software.status === "active" ? "Active" : "Inactive"}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Website
                </p>

                {software.website_url ? (
                  <a
                    href={software.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-2 break-all text-sm font-medium text-[var(--primary)] hover:underline"
                  >
                    <Globe2 className="h-4 w-4 shrink-0" />
                    Website resmi
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-slate-500">Tidak tersedia</p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Slug
                </p>

                <p className="mt-1 break-all text-sm text-slate-600">
                  {software.slug}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FEATURES */}

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                Capabilities
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Fitur utama
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Kemampuan yang tersedia pada {software.name}.
              </p>
            </div>

            {software.features && software.features.length > 0 && (
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {software.features.length} fitur
              </span>
            )}
          </div>

          {software.features && software.features.length > 0 ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {software.features.map((feature) => (
                <div
                  key={feature.id}
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-[var(--lavender)] hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--lavender-soft)] text-[var(--primary)] transition group-hover:scale-105">
                    <Check className="h-4 w-4" />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    {feature.name}
                  </h3>

                  {feature.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-500">
                Belum ada fitur yang ditambahkan.
              </p>
            </div>
          )}
        </section>

        {/* PRICING */}

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                Pricing
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Pilihan harga
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Informasi paket dan harga yang tersedia.
              </p>
            </div>

            {software.pricings && software.pricings.length > 0 && (
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {software.pricings.length} plan
              </span>
            )}
          </div>

          {software.pricings && software.pricings.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {software.pricings.map((pricing, index) => (
                <div
                  key={pricing.id}
                  className={`relative overflow-hidden rounded-2xl border p-6 ${
                    index === 0
                      ? "border-[var(--primary)] shadow-md"
                      : "border-slate-200"
                  }`}
                >
                  {index === 0 && (
                    <span className="absolute right-4 top-4 rounded-full bg-[var(--lavender-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--primary)]">
                      POPULER
                    </span>
                  )}

                  <h3 className="pr-16 font-semibold text-slate-900">
                    {pricing.name || "Pricing Plan"}
                  </h3>

                  {pricing.price !== undefined && pricing.price !== null && (
                    <p className="mt-5 text-2xl font-black text-slate-900">
                      {pricing.currency ? `${pricing.currency} ` : ""}
                      {pricing.price}
                    </p>
                  )}

                  {pricing.description && (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {pricing.description}
                    </p>
                  )}

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-400">
                      Informasi pricing dari vendor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-500">
                Belum ada informasi pricing.
              </p>
            </div>
          )}
        </section>

        {/* INTEGRATIONS */}

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                Ecosystem
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Integrasi
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Layanan yang dapat terhubung dengan software ini.
              </p>
            </div>

            {software.integrations && software.integrations.length > 0 && (
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {software.integrations.length} integrasi
              </span>
            )}
          </div>

          {software.integrations && software.integrations.length > 0 ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {software.integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-[var(--lavender)] hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Puzzle className="h-5 w-5" />
                    </div>

                    <h3 className="font-semibold text-slate-900">
                      {integration.name || "Integration"}
                    </h3>
                  </div>

                  {integration.description && (
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {integration.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-500">
                Belum ada informasi integrasi.
              </p>
            </div>
          )}
        </section>

        {/* ================================================================
            RATING & REVIEW
        ================================================================= */}

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              Community feedback
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Rating & Review
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Lihat pengalaman pengguna lain sebelum menentukan pilihan.
            </p>
          </div>

          {/* Rating Summary */}

          <div className="mt-7 rounded-2xl bg-slate-50 p-6 sm:p-7">
            <div className="flex flex-col items-center text-center">
              <p className="text-5xl font-black tracking-tight text-slate-900">
                {loadingRatings
                  ? "..."
                  : ratingStats.total > 0
                    ? ratingStats.average.toFixed(1)
                    : "—"}
              </p>

              <div className="mt-3 flex justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5"
                    fill={
                      star <= Math.round(ratingStats.average)
                        ? "currentColor"
                        : "none"
                    }
                    style={{
                      color:
                        star <= Math.round(ratingStats.average)
                          ? "var(--accent-yellow)"
                          : "#cbd5e1",
                    }}
                  />
                ))}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {ratingStats.total} total rating
              </p>
            </div>
          </div>

          {/* Give Rating */}

          <div className="mt-7 rounded-2xl border border-[var(--lavender)] bg-[var(--lavender-soft)] p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-bold text-slate-900">
                  Bagaimana pengalaman Anda?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Berikan rating untuk membantu bisnis lain.
                </p>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const activeStar =
                    hoverRating > 0
                      ? star <= hoverRating
                      : star <= selectedRating;

                  return (
                    <button
                      key={star}
                      type="button"
                      disabled={submittingRating}
                      onClick={() => handleSubmitRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Beri rating ${star} dari 5`}
                      className="rounded-lg p-1 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Star
                        className="h-7 w-7"
                        fill={activeStar ? "currentColor" : "none"}
                        style={{
                          color: activeStar
                            ? "var(--accent-yellow)"
                            : "#cbd5e1",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedRating > 0 && (
              <p className="mt-4 text-xs font-medium text-[var(--primary)]">
                Rating Anda: {selectedRating}/5
              </p>
            )}

            {submittingRating && (
              <p className="mt-3 text-xs text-slate-500">Menyimpan rating...</p>
            )}

            {ratingError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{ratingError}</p>
              </div>
            )}

            {ratingSuccess && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <p className="text-sm text-emerald-600">{ratingSuccess}</p>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================
            REVIEW FORM
        ================================================================= */}

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <MessageSquare className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Tulis Review</h2>

              <p className="mt-1 text-sm text-slate-500">
                Bagikan pengalaman Anda menggunakan {software.name}.
              </p>
            </div>
          </div>

          <textarea
            value={reviewText}
            onChange={(event) => {
              setReviewText(event.target.value);

              if (reviewError) {
                setReviewError("");
              }

              if (reviewSuccess) {
                setReviewSuccess("");
              }
            }}
            placeholder="Apa yang Anda sukai? Apa yang bisa ditingkatkan?"
            rows={6}
            maxLength={2000}
            disabled={submittingReview}
            className="mt-6 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--lavender-soft)] disabled:cursor-not-allowed"
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-slate-400">
              {reviewText.length}/2000 karakter
            </span>

            <button
              type="button"
              onClick={handleSubmitReview}
              disabled={submittingReview || reviewText.trim().length < 10}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MessageSquare className="h-4 w-4" />

              {submittingReview ? "Mengirim..." : "Kirim Review"}
            </button>
          </div>

          {reviewError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{reviewError}</p>
            </div>
          )}

          {reviewSuccess && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm text-emerald-600">{reviewSuccess}</p>
            </div>
          )}
        </section>

        {/* ================================================================
            REVIEW LIST
        ================================================================= */}

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                User reviews
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Pengalaman pengguna
              </h2>
            </div>

            {!loadingReviews && (
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                {reviews.length} review
              </span>
            )}
          </div>

          <div className="mt-6">
            {loadingReviews ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-40 animate-pulse rounded-2xl bg-white"
                  />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <MessageSquare className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900">
                  Belum ada review
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Jadilah pengguna pertama yang membagikan pengalaman
                  menggunakan {software.name}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((item) => {
                  const isOwner =
                    currentUserId !== null &&
                    Number(item.user_id) === currentUserId;

                  return (
                    <article
                      key={item.id}
                      className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--lavender-soft)]">
                            <Users className="h-5 w-5 text-[var(--primary)]" />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {item.user?.name || "User"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {item.created_at
                                ? new Date(item.created_at).toLocaleDateString(
                                    "id-ID",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    },
                                  )
                                : "Tanggal tidak tersedia"}
                            </p>
                          </div>
                        </div>

                        {isOwner && (
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(item.id)}
                            disabled={deletingReviewId === item.id}
                            aria-label="Hapus review"
                            className="rounded-xl p-2 text-slate-300 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {item.review}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SoftwareDetail;
