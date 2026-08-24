import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  ExternalLink,
  Heart,
  Layers3,
  Mail,
  Menu,
  MessageSquare,
  Play,
  Puzzle,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Users,
  UsersRound,
  Workflow,
  X,
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

type TabKey =
  | "overview"
  | "features"
  | "pricing"
  | "integrations"
  | "reviews"
  | "alternatives"
  | "faq";

function SoftwareDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [software, setSoftware] = useState<Software | null>(null);
  const [reviews, setReviews] = useState<SoftwareReview[]>([]);
  const [ratingSummary, setRatingSummary] =
    useState<SoftwareRatingSummary | null>(null);

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
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

  const [activeMedia, setActiveMedia] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentUserId = useMemo(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      const currentUser = JSON.parse(storedUser);
      const id = Number(currentUser?.id);

      return Number.isFinite(id) && id > 0 ? id : null;
    } catch {
      return null;
    }
  }, []);

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
    } catch (requestError) {
      console.error("Gagal mengambil detail software:", requestError);
      setSoftware(null);
      setError("Software tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  };

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
    } catch (requestError) {
      console.error("Gagal mengambil review:", requestError);
      setReviews([]);
      setReviewError("Gagal mengambil review software.");
    } finally {
      setLoadingReviews(false);
    }
  };

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
    } catch (requestError) {
      console.error("Gagal mengambil rating:", requestError);
      setRatingSummary(null);
      setSelectedRating(0);
      setRatingError("Gagal mengambil rating software.");
    } finally {
      setLoadingRatings(false);
    }
  };

  useEffect(() => {
    fetchSoftwareDetail();
    fetchReviews();
    fetchRating();
  }, [slug]);

  const ratingStats = useMemo(() => {
    return {
      average: Number(ratingSummary?.average_rating) || 0,
      total: Number(ratingSummary?.total_ratings) || 0,
    };
  }, [ratingSummary]);

  const reviewCount = reviews.length;

  const categoryName = software?.category?.name || "Software";

  const featureItems = software?.features || [];
  const pricingItems = software?.pricings || [];
  const integrationItems = software?.integrations || [];

  const tags = useMemo(() => {
    const values = [
      categoryName,
      "Sales Automation",
      "Marketing Automation",
      "Help Desk",
    ];

    return values.filter(Boolean).slice(0, 4);
  }, [categoryName]);

  const mediaItems = useMemo(() => {
    if (!software) return [];

    return [
      {
        type: "preview",
        label: "Product preview",
        src: software.logo || "",
      },
      {
        type: "preview",
        label: "Dashboard",
        src: software.logo || "",
      },
      {
        type: "preview",
        label: "Features",
        src: software.logo || "",
      },
      {
        type: "preview",
        label: "Analytics",
        src: software.logo || "",
      },
    ];
  }, [software]);

  const bestForItems = [
    "Small, Medium & Large Businesses",
    "Sales, Marketing & Support Teams",
    "Companies looking for scalable software",
    "Business growth and automation",
  ];

  const scrollToSection = (tab: TabKey) => {
    setActiveTab(tab);

    const targetId =
      tab === "reviews"
        ? "reviews-section"
        : tab === "overview"
          ? "overview-section"
          : `${tab}-section`;

    window.setTimeout(() => {
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleSubmitRating = async (ratingValue: number) => {
    if (!slug || ratingValue < 1 || ratingValue > 5) return;

    try {
      setSubmittingRating(true);
      setRatingError("");
      setRatingSuccess("");

      const userRatingId = ratingSummary?.user_rating_id ?? null;

      if (userRatingId) {
        await updateSoftwareRating(userRatingId, {
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
      await fetchRating();
    } catch (requestError: unknown) {
      console.error("Gagal menyimpan rating:", requestError);

      const responseError = requestError as {
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

  const handleSubmitReview = async () => {
    if (!slug) return;

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
    } catch (requestError: unknown) {
      console.error("Gagal menambahkan review:", requestError);

      const responseError = requestError as {
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

  const handleDeleteReview = async (reviewId: number) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus review ini?",
    );

    if (!confirmed) return;

    try {
      setDeletingReviewId(reviewId);
      setReviewError("");
      setReviewSuccess("");

      await deleteSoftwareReview(reviewId);

      setReviews((current) =>
        current.filter((review) => review.id !== reviewId),
      );

      setReviewSuccess("Review berhasil dihapus.");
    } catch (requestError: unknown) {
      console.error("Gagal menghapus review:", requestError);

      const responseError = requestError as {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-5">
            <div className="h-4 w-64 rounded bg-slate-200" />

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="flex gap-6">
                  <div className="h-28 w-28 rounded-2xl bg-slate-200" />
                  <div className="flex-1 space-y-4">
                    <div className="h-8 w-72 rounded bg-slate-200" />
                    <div className="h-4 w-full max-w-2xl rounded bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                  </div>
                </div>
              </div>

              <div className="h-80 rounded-2xl bg-white" />
            </div>

            <div className="h-14 rounded-xl bg-white" />

            <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
              <div className="h-96 rounded-2xl bg-white" />
              <div className="h-96 rounded-2xl bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !software) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
          <div className="w-full rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Layers3 className="h-6 w-6" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#10275c]">
              Software tidak ditemukan
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Software yang Anda cari tidak tersedia atau sudah tidak aktif.
            </p>

            <Link
              to="/software-directory"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#1648b7] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123e9f]"
            >
              <ChevronLeft className="h-4 w-4" />
              Kembali ke Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = ratingStats.average;
  const displayRating = averageRating > 0 ? averageRating.toFixed(1) : "—";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#102044]">
      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-5">
            <Link
              to="/"
              className="flex shrink-0 items-center gap-3"
              aria-label="Software Empire"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1648b7] text-white shadow-sm">
                <span className="text-lg font-black">E</span>
              </div>

              <div className="hidden leading-none sm:block">
                <p className="text-[18px] font-black tracking-tight text-[#103c91]">
                  SOFTWARE
                </p>
                <p className="text-[18px] font-black tracking-tight text-[#f6a20b]">
                  EMPIRE
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              <Link
                to="/software-directory"
                className="border-b-2 border-[#1648b7] py-[25px] text-[13px] font-semibold text-[#102044]"
              >
                Software <ChevronDown className="ml-1 inline h-3 w-3" />
              </Link>
              <Link
                to="/software-directory"
                className="text-[13px] font-medium text-slate-600 hover:text-[#1648b7]"
              >
                Categories <ChevronDown className="ml-1 inline h-3 w-3" />
              </Link>
              <Link
                to="/software-comparison"
                className="text-[13px] font-medium text-slate-600 hover:text-[#1648b7]"
              >
                Compare
              </Link>
              <Link
                to="/recommend"
                className="text-[13px] font-medium text-slate-600 hover:text-[#1648b7]"
              >
                Recommend
              </Link>
              <button className="text-[13px] font-medium text-slate-600 hover:text-[#1648b7]">
                Learn <ChevronDown className="ml-1 inline h-3 w-3" />
              </button>
              <button className="text-[13px] font-medium text-slate-600 hover:text-[#1648b7]">
                For Vendors
              </button>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="flex h-10 w-[185px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                <input
                  aria-label="Search software"
                  placeholder="Search software..."
                  className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                />
                <Search className="h-4 w-4 shrink-0 text-[#102044]" />
              </div>

              <Link
                to="/login"
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#102044] hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#1648b7] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#123e9f]"
              >
                Sign Up
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="rounded-lg p-2 text-[#102044] lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-slate-100 py-4 lg:hidden">
              <div className="grid gap-1">
                <Link
                  to="/software-directory"
                  className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Software
                </Link>
                <Link
                  to="/software-directory"
                  className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Categories
                </Link>
                <Link
                  to="/software-comparison"
                  className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Compare
                </Link>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500">
          <Link to="/" className="hover:text-[#1648b7]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link to="/software-directory" className="hover:text-[#1648b7]">
            Software
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span>{categoryName}</span>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="font-semibold text-[#102044]">{software.name}</span>
        </div>
      </div>

      {/* PRODUCT HEADER */}
      <section className="mx-auto max-w-[1440px] px-4 pb-0 pt-5 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,35,75,0.04)] sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {software.logo ? (
                  <img
                    src={software.logo}
                    alt={`Logo ${software.name}`}
                    className="h-full w-full object-contain p-4"
                  />
                ) : (
                  <span className="text-4xl font-black text-[#1648b7]">
                    {software.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-black tracking-tight text-[#102044] sm:text-[34px]">
                    {software.name}
                  </h1>

                  {software.status === "active" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-600 sm:text-sm">
                  {software.description ||
                    `Complete ${categoryName.toLowerCase()} software to help teams manage their business more efficiently.`}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4"
                        fill={
                          star <= Math.round(averageRating)
                            ? "currentColor"
                            : "none"
                        }
                        style={{
                          color:
                            star <= Math.round(averageRating)
                              ? "#f6a20b"
                              : "#cbd5e1",
                        }}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-[#102044]">
                    {displayRating}
                  </span>

                  <button
                    type="button"
                    onClick={() => scrollToSection("reviews")}
                    className="text-xs font-semibold text-[#1648b7] hover:underline"
                  >
                    ({ratingStats.total.toLocaleString("id-ID")} reviews)
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-md bg-[#f4f7fb] px-3 py-1.5 text-[10px] font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}

                  {featureItems.length > 4 && (
                    <span className="rounded-md bg-[#f4f7fb] px-3 py-1.5 text-[10px] font-semibold text-[#1648b7]">
                      +{featureItems.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {software.website_url && (
                    <a
                      href={software.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-[136px] items-center justify-center gap-2 rounded-lg bg-[#1648b7] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#123e9f]"
                    >
                      Visit Website
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => scrollToSection("reviews")}
                    className="inline-flex min-w-[126px] items-center justify-center rounded-lg border border-[#9eb8e9] bg-white px-5 py-3 text-xs font-bold text-[#1648b7] transition hover:bg-[#f5f8ff]"
                  >
                    Request Demo
                  </button>

                  <button
                    type="button"
                    onClick={() => setSaved((value) => !value)}
                    className={`inline-flex min-w-[100px] items-center justify-center gap-2 rounded-lg border px-5 py-3 text-xs font-semibold transition ${
                      saved
                        ? "border-[#1648b7] bg-[#f5f8ff] text-[#1648b7]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Heart
                      className="h-4 w-4"
                      fill={saved ? "currentColor" : "none"}
                    />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PRICING CARD */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,35,75,0.06)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xs font-bold text-[#102044]">Pricing</h2>
              <button
                type="button"
                onClick={() => scrollToSection("pricing")}
                className="text-[10px] font-bold text-[#1648b7] hover:underline"
              >
                View all plans →
              </button>
            </div>

            <div className="pt-4">
              <p className="text-[10px] font-medium text-slate-500">
                Starting from
              </p>

              <p className="mt-0.5 text-3xl font-black tracking-tight text-[#102044]">
                {pricingItems.length > 0
                  ? `${pricingItems[0].currency || "$"}${pricingItems[0].price ?? "—"}`
                  : "Free"}
              </p>

              <p className="text-[10px] text-slate-500">/ user / month</p>
              <p className="mt-1 text-[10px] text-slate-500">Billed annually</p>

              <div className="mt-5 space-y-2.5">
                {[
                  "Free trial available",
                  "No credit card required",
                  "Cancel anytime",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[10px] font-medium text-slate-600"
                  >
                    <Check className="h-3.5 w-3.5 text-[#1648b7]" />
                    {item}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection("pricing")}
                className="mt-5 w-full rounded-lg bg-[#1648b7] px-4 py-3 text-[11px] font-bold text-white hover:bg-[#123e9f]"
              >
                See Pricing Plans
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-[72px] z-40 mt-5 border-y border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1440px] overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-max">
            {(
              [
                ["overview", "Overview"],
                ["features", "Features"],
                ["pricing", "Pricing"],
                ["integrations", "Integrations"],
                [
                  "reviews",
                  `Reviews (${ratingStats.total.toLocaleString("id-ID")})`,
                ],
                ["alternatives", "Alternatives (12)"],
                ["faq", "FAQ"],
              ] as [TabKey, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => scrollToSection(key)}
                className={`relative px-4 py-4 text-[11px] font-semibold transition ${
                  activeTab === key
                    ? "text-[#1648b7]"
                    : "text-slate-600 hover:text-[#1648b7]"
                }`}
              >
                {label}
                {activeTab === key && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#1648b7]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-8">
        {/* OVERVIEW */}
        <section
          id="overview-section"
          className="scroll-mt-36 border-b border-slate-200 py-8 lg:py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_300px]">
            <div>
              <h2 className="text-xl font-bold text-[#102044]">Overview</h2>

              <p className="mt-3 max-w-3xl text-[12px] leading-6 text-slate-600 sm:text-[13px]">
                {software.description ||
                  `Pelajari bagaimana ${software.name} membantu tim meningkatkan produktivitas, mengelola proses bisnis, dan membuat keputusan yang lebih baik.`}
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Workflow,
                    title: "Sales Automation",
                    description:
                      "Automate sales processes and close deals faster.",
                  },
                  {
                    icon: Workflow,
                    title: "Workflow Management",
                    description:
                      "Create workflows and streamline approval processes.",
                  },
                  {
                    icon: Bot,
                    title: "AI Assistant",
                    description:
                      "Get insights, predictions, and recommendations powered by AI.",
                  },
                  {
                    icon: UsersRound,
                    title: "Omnichannel",
                    description:
                      "Engage customers through email, phone, chat, and social media.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf3ff] text-[#1648b7]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-3 text-[11px] font-bold text-[#102044]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10px] leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MEDIA GALLERY */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="relative flex h-[190px] items-center justify-center overflow-hidden bg-[#f5f8fc]">
                {mediaItems[activeMedia]?.src ? (
                  <div className="flex h-full w-full items-center justify-center p-8">
                    <div className="flex h-full w-full items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                      <img
                        src={mediaItems[activeMedia].src}
                        alt={mediaItems[activeMedia].label}
                        className="max-h-[90px] max-w-[55%] object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#edf3ff] to-white">
                    <div className="h-28 w-44 rounded-lg border border-slate-200 bg-white shadow-sm" />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setActiveMedia((value) =>
                      value === 0 ? mediaItems.length - 1 : value - 1,
                    )
                  }
                  className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
                  aria-label="Previous preview"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveMedia((value) =>
                      value === mediaItems.length - 1 ? 0 : value + 1,
                    )
                  }
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
                  aria-label="Next preview"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="absolute inset-x-0 bottom-3 flex justify-center">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#102044] text-white shadow-lg"
                    aria-label="Play product preview"
                  >
                    <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 border-t border-slate-100 p-2">
                {mediaItems.map((item, index) => (
                  <button
                    key={`${item.label}-${index}`}
                    type="button"
                    onClick={() => setActiveMedia(index)}
                    className={`h-10 flex-1 overflow-hidden rounded-md border ${
                      activeMedia === index
                        ? "border-[#1648b7] ring-1 ring-[#1648b7]"
                        : "border-slate-200"
                    } bg-white`}
                  >
                    {item.src ? (
                      <img
                        src={item.src}
                        alt=""
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-50" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KEY FEATURES + BEST FOR */}
        <section id="features-section" className="scroll-mt-36 py-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_290px]">
            <div>
              <h2 className="text-xl font-bold text-[#102044]">Key Features</h2>

              {featureItems.length > 0 ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {featureItems.map((feature, index) => {
                    const icons = [
                      UsersRound,
                      BarChart3,
                      Mail,
                      Workflow,
                      Bot,
                      Sparkles,
                    ];
                    const Icon = icons[index % icons.length];

                    return (
                      <article
                        key={feature.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#b9caf0] hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f4ff] text-[#1648b7]">
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-[11px] font-bold text-[#102044]">
                              {feature.name}
                            </h3>

                            {feature.description && (
                              <p className="mt-1.5 text-[10px] leading-5 text-slate-500">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <p className="text-sm text-slate-500">
                    Belum ada fitur yang ditambahkan.
                  </p>
                </div>
              )}
            </div>

            <aside className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-bold text-[#102044]">Best For</h2>

              <ul className="mt-4 space-y-3">
                {bestForItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[10px] leading-5 text-slate-600"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1648b7]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-bold text-[#102044]">Deployment</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    [Cloud, "Cloud"],
                    [Server, "On-Premise"],
                    [Puzzle, "Hybrid"],
                  ].map(([Icon, label]) => {
                    const DeploymentIcon = Icon as typeof Cloud;

                    return (
                      <span
                        key={String(label)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-600"
                      >
                        <DeploymentIcon className="h-3.5 w-3.5" />
                        {String(label)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing-section"
          className="scroll-mt-36 border-t border-slate-200 py-8 lg:py-10"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#1648b7]">
                Pricing
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#102044]">
                Pricing plans
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Informasi paket dan harga yang tersedia.
              </p>
            </div>

            {pricingItems.length > 0 && (
              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">
                {pricingItems.length} plan
              </span>
            )}
          </div>

          {pricingItems.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pricingItems.map((pricing, index) => (
                <article
                  key={pricing.id}
                  className={`relative rounded-xl border bg-white p-5 ${
                    index === 0
                      ? "border-[#1648b7] shadow-sm"
                      : "border-slate-200"
                  }`}
                >
                  {index === 0 && (
                    <span className="absolute right-4 top-4 rounded-full bg-[#edf3ff] px-2 py-1 text-[9px] font-bold text-[#1648b7]">
                      POPULER
                    </span>
                  )}

                  <h3 className="pr-14 text-sm font-bold text-[#102044]">
                    {pricing.name || "Pricing Plan"}
                  </h3>

                  {pricing.price !== undefined && pricing.price !== null ? (
                    <p className="mt-5 text-2xl font-black text-[#102044]">
                      {pricing.currency ? `${pricing.currency} ` : ""}
                      {pricing.price}
                    </p>
                  ) : (
                    <p className="mt-5 text-2xl font-black text-[#102044]">
                      Contact
                    </p>
                  )}

                  <p className="mt-1 text-[10px] text-slate-500">
                    per user / month
                  </p>

                  {pricing.description && (
                    <p className="mt-4 text-[11px] leading-5 text-slate-500">
                      {pricing.description}
                    </p>
                  )}

                  <button
                    type="button"
                    className="mt-5 w-full rounded-lg border border-[#b9caf0] px-4 py-2.5 text-[10px] font-bold text-[#1648b7] hover:bg-[#f5f8ff]"
                  >
                    View plan
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm text-slate-500">
                Belum ada informasi pricing.
              </p>
            </div>
          )}
        </section>

        {/* INTEGRATIONS */}
        <section
          id="integrations-section"
          className="scroll-mt-36 border-t border-slate-200 py-8 lg:py-10"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#1648b7]">
                Ecosystem
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#102044]">
                Integrations
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Layanan yang dapat terhubung dengan software ini.
              </p>
            </div>

            {integrationItems.length > 0 && (
              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">
                {integrationItems.length} integrations
              </span>
            )}
          </div>

          {integrationItems.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {integrationItems.map((integration) => (
                <article
                  key={integration.id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf3ff] text-[#1648b7]">
                      <Puzzle className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[#102044]">
                      {integration.name || "Integration"}
                    </h3>
                  </div>

                  {integration.description && (
                    <p className="mt-3 text-[10px] leading-5 text-slate-500">
                      {integration.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm text-slate-500">
                Belum ada informasi integrasi.
              </p>
            </div>
          )}
        </section>

        {/* REVIEWS */}
        <section
          id="reviews-section"
          className="scroll-mt-36 border-t border-slate-200 py-8 lg:py-10"
        >
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#1648b7]">
                Trust signals
              </p>

              <p className="mt-4 text-5xl font-black tracking-tight text-[#102044]">
                {loadingRatings ? "..." : displayRating}
              </p>

              <div className="mt-2 flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5"
                    fill={
                      star <= Math.round(averageRating)
                        ? "currentColor"
                        : "none"
                    }
                    style={{
                      color:
                        star <= Math.round(averageRating)
                          ? "#f6a20b"
                          : "#cbd5e1",
                    }}
                  />
                ))}
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {ratingStats.total.toLocaleString("id-ID")} total ratings
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-bold text-[#102044]">
                  Rate this software
                </h3>

                <div className="mt-3 flex items-center gap-0.5">
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
                        className="rounded-md p-1 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Star
                          className="h-6 w-6"
                          fill={activeStar ? "currentColor" : "none"}
                          style={{
                            color: activeStar ? "#f6a20b" : "#cbd5e1",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                {ratingError && (
                  <p className="mt-3 text-[10px] leading-5 text-red-600">
                    {ratingError}
                  </p>
                )}

                {ratingSuccess && (
                  <p className="mt-3 text-[10px] leading-5 text-emerald-600">
                    {ratingSuccess}
                  </p>
                )}
              </div>
            </aside>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#1648b7]">
                    Community feedback
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#102044]">
                    Reviews
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Lihat pengalaman pengguna lain sebelum menentukan pilihan.
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">
                  {reviewCount} review
                </span>
              </div>

              {/* REVIEW FORM */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf3ff] text-[#1648b7]">
                    <MessageSquare className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#102044]">
                      Write a review
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Bagikan pengalaman Anda menggunakan {software.name}.
                    </p>
                  </div>
                </div>

                <textarea
                  value={reviewText}
                  onChange={(event) => {
                    setReviewText(event.target.value);

                    if (reviewError) setReviewError("");
                    if (reviewSuccess) setReviewSuccess("");
                  }}
                  placeholder="Apa yang Anda sukai? Apa yang bisa ditingkatkan?"
                  rows={5}
                  maxLength={2000}
                  disabled={submittingReview}
                  className="mt-4 w-full resize-none rounded-lg border border-slate-200 bg-[#fbfcfe] px-4 py-3 text-xs leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1648b7] focus:bg-white focus:ring-4 focus:ring-[#edf3ff]"
                />

                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[10px] text-slate-400">
                    {reviewText.length}/2000 karakter
                  </span>

                  <button
                    type="button"
                    onClick={handleSubmitReview}
                    disabled={submittingReview || reviewText.trim().length < 10}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1648b7] px-5 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#123e9f] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    {submittingReview ? "Mengirim..." : "Kirim Review"}
                  </button>
                </div>

                {reviewError && (
                  <div className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                    <p className="text-[10px] text-red-600">{reviewError}</p>
                  </div>
                )}

                {reviewSuccess && (
                  <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
                    <p className="text-[10px] text-emerald-600">
                      {reviewSuccess}
                    </p>
                  </div>
                )}
              </div>

              {/* REVIEW LIST */}
              <div className="mt-5">
                {loadingReviews ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-32 animate-pulse rounded-xl bg-white"
                      />
                    ))}
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                    <MessageSquare className="mx-auto h-6 w-6 text-slate-300" />
                    <h3 className="mt-3 text-sm font-semibold text-[#102044]">
                      Belum ada review
                    </h3>
                    <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">
                      Jadilah pengguna pertama yang membagikan pengalaman
                      menggunakan {software.name}.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((item) => {
                      const isOwner =
                        currentUserId !== null &&
                        Number(item.user_id) === currentUserId;

                      return (
                        <article
                          key={item.id}
                          className="rounded-xl border border-slate-200 bg-white p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf3ff] text-[#1648b7]">
                                <Users className="h-4 w-4" />
                              </div>

                              <div>
                                <p className="text-xs font-bold text-[#102044]">
                                  {item.user?.name || "User"}
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-400">
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

                            {isOwner && (
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(item.id)}
                                disabled={deletingReviewId === item.id}
                                aria-label="Hapus review"
                                className="rounded-lg p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          <p className="mt-4 whitespace-pre-line text-xs leading-6 text-slate-600">
                            {item.review}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ALTERNATIVES */}
        <section
          id="alternatives-section"
          className="scroll-mt-36 border-t border-slate-200 py-8 lg:py-10"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#1648b7]">
              Explore more
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#102044]">
              Alternatives
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Bandingkan software lain yang memiliki kategori atau kebutuhan
              serupa.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Alternative Software", "Similar Platform", "Business Tool"].map(
              (name, index) => (
                <div
                  key={name}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f4ff] text-[#1648b7]">
                      <Tag className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#102044]">
                        {index === 0 ? categoryName : name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Compare features and pricing
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = "/software-directory";
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-[#1648b7]"
                  >
                    Explore
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              ),
            )}
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq-section"
          className="scroll-mt-36 border-t border-slate-200 py-8 lg:py-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1648b7]">
            FAQ
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#102044]">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {[
              `Apa itu ${software.name}?`,
              `Berapa harga ${software.name}?`,
              `Siapa yang cocok menggunakan ${software.name}?`,
              `Apakah ${software.name} memiliki integrasi?`,
            ].map((question) => (
              <details key={question} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-bold text-[#102044]">
                  {question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
                </summary>

                <p className="mt-3 max-w-3xl text-xs leading-6 text-slate-500">
                  Informasi detail untuk pertanyaan ini dapat disesuaikan
                  berdasarkan data software yang tersedia di sistem.
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* MOBILE ACTION BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl gap-2">
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            className="flex w-12 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
            aria-label="Save software"
          >
            <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
          </button>

          {software.website_url && (
            <a
              href={software.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1648b7] px-4 py-3 text-xs font-bold text-white"
            >
              Visit Website
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={() => scrollToSection("pricing")}
            className="flex flex-1 items-center justify-center rounded-lg border border-[#1648b7] px-4 py-3 text-xs font-bold text-[#1648b7]"
          >
            See Pricing Plans
          </button>
        </div>
      </div>
    </div>
  );
}

export default SoftwareDetail;
