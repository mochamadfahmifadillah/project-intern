import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createSoftwareRating,
  createSoftwareReview,
  deleteSoftwareReview,
  getPublicSoftwareDetail,
  getPublicSoftwareRating,
  getPublicSoftwareReviews,
  updateSoftwareRating,
  type Software,
  type SoftwareRating,
  type SoftwareReview,
} from "../../services/softwareService";

function SoftwareDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [software, setSoftware] = useState<Software | null>(null);
  const [reviews, setReviews] = useState<SoftwareReview[]>([]);
  const [ratings, setRatings] = useState<SoftwareRating[]>([]);

  const [reviewText, setReviewText] = useState("");

  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingRatings, setLoadingRatings] = useState(true);

  const [submittingReview, setSubmittingReview] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);

  const [deletingReviewId, setDeletingReviewId] = useState<number | null>(
    null,
  );

  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  const [ratingError, setRatingError] = useState("");
  const [ratingSuccess, setRatingSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Software Detail
  |--------------------------------------------------------------------------
  */

  const fetchSoftwareDetail = async () => {
    if (!slug) {
      setError("Software tidak ditemukan.");
      setSoftware(null);
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

      setReviews(response?.data ?? []);
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
  | Fetch Ratings
  |--------------------------------------------------------------------------
  */

  const fetchRatings = async () => {
    if (!slug) {
      setLoadingRatings(false);
      return;
    }

    try {
      setLoadingRatings(true);
      setRatingError("");

      const response = await getPublicSoftwareRating(slug);

      const ratingData = response?.data ?? [];

      setRatings(ratingData);

      /*
      |--------------------------------------------------------------------------
      | Ambil rating user yang sedang login
      |--------------------------------------------------------------------------
      |
      | Kita cek user_id dari localStorage.
      | Sesuaikan key jika aplikasi lu menyimpan user
      | dengan key yang berbeda.
      |
      */

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const currentUser = JSON.parse(storedUser);

          const currentUserId = Number(currentUser?.id);

          const userRating = ratingData.find(
            (rating) => rating.user_id === currentUserId,
          );

          if (userRating) {
            setSelectedRating(userRating.rating);
          } else {
            setSelectedRating(0);
          }
        } catch (error) {
          console.error("Gagal membaca data user:", error);

          setSelectedRating(0);
        }
      } else {
        setSelectedRating(0);
      }
    } catch (error) {
      console.error("Gagal mengambil rating:", error);

      setRatings([]);
      setSelectedRating(0);
      setRatingError("Gagal mengambil rating software.");
    } finally {
      setLoadingRatings(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Load Data
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchSoftwareDetail();
    fetchReviews();
    fetchRatings();
  }, [slug]);

  /*
  |--------------------------------------------------------------------------
  | Rating Calculation
  |--------------------------------------------------------------------------
  */

  const totalRatings = ratings.length;

  const averageRating =
    totalRatings > 0
      ? ratings.reduce((total, item) => total + Number(item.rating), 0) /
        totalRatings
      : 0;

  /*
  |--------------------------------------------------------------------------
  | Get Current User Rating
  |--------------------------------------------------------------------------
  */

  const getCurrentUserRating = (): SoftwareRating | null => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      const currentUser = JSON.parse(storedUser);

      const currentUserId = Number(currentUser?.id);

      return (
        ratings.find((rating) => rating.user_id === currentUserId) || null
      );
    } catch (error) {
      console.error("Gagal membaca user:", error);

      return null;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Submit Rating
  |--------------------------------------------------------------------------
  */

  const handleSubmitRating = async (ratingValue: number) => {
    if (!slug) {
      return;
    }

    if (ratingValue < 1 || ratingValue > 5) {
      return;
    }

    try {
      setSubmittingRating(true);
      setRatingError("");
      setRatingSuccess("");

      const existingRating = getCurrentUserRating();

      if (existingRating) {
        await updateSoftwareRating(existingRating.id, {
          rating: ratingValue,
        });

        setRatingSuccess("Rating berhasil diperbarui.");
      } else {
        await createSoftwareRating(slug, {
          rating: ratingValue,
        });

        setRatingSuccess("Rating berhasil diberikan.");
      }

      setSelectedRating(ratingValue);

      await fetchRatings();
    } catch (error: any) {
      console.error("Gagal menyimpan rating:", error);

      const status = error?.response?.status;

      const message =
        error?.response?.data?.message ||
        (status === 401
          ? "Silakan login terlebih dahulu untuk memberikan rating."
          : status === 403
            ? "Anda tidak memiliki akses untuk mengubah rating ini."
            : "Gagal menyimpan rating.");

      setRatingError(message);
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
    } catch (error: any) {
      console.error("Gagal menambahkan review:", error);

      const status = error?.response?.status;

      const message =
        error?.response?.data?.message ||
        (status === 401
          ? "Silakan login terlebih dahulu untuk memberikan review."
          : "Gagal menambahkan review.");

      setReviewError(message);
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

      setReviews((currentReviews) =>
        currentReviews.filter((review) => review.id !== reviewId),
      );

      setReviewSuccess("Review berhasil dihapus.");
    } catch (error: any) {
      console.error("Gagal menghapus review:", error);

      const status = error?.response?.status;

      const message =
        error?.response?.data?.message ||
        (status === 401
          ? "Silakan login terlebih dahulu."
          : status === 403
            ? "Anda tidak memiliki akses untuk menghapus review ini."
            : "Gagal menghapus review.");

      setReviewError(message);
    } finally {
      setDeletingReviewId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">Memuat detail software...</p>
          </div>
        </main>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error State
  |--------------------------------------------------------------------------
  */

  if (error || !software) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
            <h1 className="text-xl font-semibold text-red-700">
              Software tidak ditemukan
            </h1>

            <p className="mt-2 text-sm text-red-600">
              Software yang Anda cari tidak tersedia atau sudah tidak aktif.
            </p>

            <Link
              to="/software-directory"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              ← Kembali ke Software Directory
            </Link>
          </div>
        </main>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------------------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------------------- */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link
            to="/software-directory"
            className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            ← Kembali ke Software Directory
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Main Content */}
      {/* ---------------------------------------------------------------- */}

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* ---------------------------------------------------------------- */}
        {/* Software Header */}
        {/* ---------------------------------------------------------------- */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                {software.logo ? (
                  <img
                    src={software.logo}
                    alt={`Logo ${software.name}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">
                    {software.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {software.name}
                  </h1>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>
                </div>

                {software.category && (
                  <span className="mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {software.category.name}
                  </span>
                )}

                <p className="mt-4 max-w-3xl leading-7 text-gray-500">
                  {software.description || "Tidak ada deskripsi software."}
                </p>

                {/* Rating Summary */}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= Math.round(averageRating)
                            ? "text-xl text-yellow-400"
                            : "text-xl text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {loadingRatings ? (
                    <span className="text-sm text-gray-400">
                      Memuat rating...
                    </span>
                  ) : totalRatings > 0 ? (
                    <span className="text-sm text-gray-500">
                      {averageRating.toFixed(1)} / 5 ({totalRatings} rating)
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Belum ada rating
                    </span>
                  )}
                </div>
              </div>
            </div>

            {software.website_url && (
              <a
                href={software.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Kunjungi Website →
              </a>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Rating */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Berikan Rating
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Nilai pengalaman Anda menggunakan {software.name}.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeStar =
                  hoverRating > 0
                    ? star <= hoverRating
                    : star <= selectedRating;

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleSubmitRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={submittingRating}
                    aria-label={`Beri rating ${star} dari 5`}
                    className="text-4xl transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span
                      className={
                        activeStar
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {selectedRating > 0 ? (
                <span className="text-sm font-medium text-gray-700">
                  Rating Anda: {selectedRating}/5
                </span>
              ) : (
                <span className="text-sm text-gray-400">
                  Pilih 1–5 bintang
                </span>
              )}

              {submittingRating && (
                <span className="text-sm text-gray-400">
                  Menyimpan...
                </span>
              )}
            </div>

            {ratingError && (
              <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{ratingError}</p>
              </div>
            )}

            {ratingSuccess && (
              <div className="w-full rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-sm text-green-600">{ratingSuccess}</p>
              </div>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Information */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Tentang {software.name}
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              {software.description ||
                "Belum ada informasi mengenai software ini."}
            </p>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Informasi
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Kategori
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {software.category?.name || "Tidak tersedia"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Status
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {software.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Slug
                </p>

                <p className="mt-1 break-all text-sm text-gray-600">
                  {software.slug}
                </p>
              </div>

              {software.website_url && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Website
                  </p>

                  <a
                    href={software.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all text-sm font-medium text-blue-600 hover:underline"
                  >
                    {software.website_url}
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Features */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Fitur
            </h2>

            {software.features && software.features.length > 0 && (
              <span className="text-sm text-gray-400">
                {software.features.length} fitur
              </span>
            )}
          </div>

          {software.features && software.features.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {software.features.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-lg border border-gray-200 p-4 transition hover:border-blue-200"
                >
                  <h3 className="font-medium text-gray-900">
                    {feature.name}
                  </h3>

                  {feature.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {feature.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-lg bg-gray-50 p-6 text-center">
              <p className="text-sm text-gray-500">
                Belum ada fitur yang ditambahkan.
              </p>
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Pricing */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Pricing
            </h2>

            {software.pricings && software.pricings.length > 0 && (
              <span className="text-sm text-gray-400">
                {software.pricings.length} plan
              </span>
            )}
          </div>

          {software.pricings && software.pricings.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {software.pricings.map((pricing) => (
                <div
                  key={pricing.id}
                  className="rounded-lg border border-gray-200 p-5"
                >
                  <h3 className="font-medium text-gray-900">
                    {pricing.name || "Pricing Plan"}
                  </h3>

                  {pricing.price !== undefined &&
                    pricing.price !== null && (
                      <p className="mt-3 text-xl font-bold text-gray-900">
                        {pricing.price}
                      </p>
                    )}

                  {pricing.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {pricing.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-lg bg-gray-50 p-6 text-center">
              <p className="text-sm text-gray-500">
                Belum ada informasi pricing.
              </p>
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Integrations */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Integrasi
            </h2>

            {software.integrations &&
              software.integrations.length > 0 && (
                <span className="text-sm text-gray-400">
                  {software.integrations.length} integrasi
                </span>
              )}
          </div>

          {software.integrations &&
          software.integrations.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {software.integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="font-medium text-gray-900">
                    {integration.name || "Integration"}
                  </h3>

                  {integration.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {integration.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-lg bg-gray-50 p-6 text-center">
              <p className="text-sm text-gray-500">
                Belum ada informasi integrasi.
              </p>
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Reviews */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Review
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pengalaman pengguna terhadap {software.name}.
              </p>
            </div>

            {!loadingReviews && (
              <span className="text-sm text-gray-400">
                {reviews.length} review
              </span>
            )}
          </div>

          {/* Review Form */}

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="font-medium text-gray-900">
              Berikan Review
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Bagikan pengalaman Anda menggunakan software ini.
            </p>

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
              placeholder="Tulis pengalaman Anda..."
              rows={5}
              maxLength={2000}
              disabled={submittingReview}
              className="mt-4 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
            />

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-gray-400">
                {reviewText.length}/2000 karakter
              </span>

              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={
                  submittingReview ||
                  reviewText.trim().length < 10
                }
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submittingReview
                  ? "Mengirim..."
                  : "Kirim Review"}
              </button>
            </div>

            {reviewError && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">
                  {reviewError}
                </p>
              </div>
            )}

            {reviewSuccess && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-sm text-green-600">
                  {reviewSuccess}
                </p>
              </div>
            )}
          </div>

          {/* Reviews List */}

          <div className="mt-6">
            {loadingReviews ? (
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-sm text-gray-500">
                  Memuat review...
                </p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-sm text-gray-500">
                  Belum ada review untuk software ini.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <span className="font-semibold text-blue-600">
                            {(item.user?.name || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {item.user?.name || "User"}
                          </p>

                          <p className="text-xs text-gray-400">
                            {item.created_at
                              ? new Date(
                                  item.created_at,
                                ).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "Tanggal tidak tersedia"}
                          </p>
                        </div>
                      </div>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteReview(item.id)
                        }
                        disabled={
                          deletingReviewId === item.id
                        }
                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingReviewId === item.id
                          ? "Menghapus..."
                          : "Hapus"}
                      </button>
                    </div>

                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
                      {item.review}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SoftwareDetail;
