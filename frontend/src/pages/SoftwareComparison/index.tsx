import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  GitCompareArrows,
  Loader2,
  Star,
  X,
} from "lucide-react";

import {
  getSoftwareComparison,
  type SoftwareComparisonItem,
} from "../../services/softwareService";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

const formatPrice = (price: number | string | null | undefined): string => {
  if (price === null || price === undefined || price === "") {
    return "Tidak tersedia";
  }

  if (typeof price === "number") {
    return new Intl.NumberFormat("id-ID").format(price);
  }

  return price;
};

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

const SoftwareComparison = () => {
  const [searchParams] = useSearchParams();

  const [softwares, setSoftwares] = useState<SoftwareComparisonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Get Software Slugs
  |--------------------------------------------------------------------------
  |
  | URL:
  | /software-comparison?software=figma&software=canva
  |
  */

  const softwareSlugs = useMemo(() => {
    return Array.from(
      new Set(
        searchParams
          .getAll("software")
          .map((slug) => slug.trim())
          .filter(Boolean),
      ),
    );
  }, [searchParams]);

  /*
  |--------------------------------------------------------------------------
  | Stable Slug Key
  |--------------------------------------------------------------------------
  */

  const softwareSlugKey = softwareSlugs.join(",");

  /*
  |--------------------------------------------------------------------------
  | Fetch Comparison
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    const fetchComparison = async () => {
      /*
      |--------------------------------------------------------------------------
      | Validate Selection
      |--------------------------------------------------------------------------
      */

      if (softwareSlugs.length < 2) {
        if (!cancelled) {
          setSoftwares([]);
          setError("Minimal pilih 2 software untuk dibandingkan.");
          setLoading(false);
        }

        return;
      }

      if (softwareSlugs.length > 4) {
        if (!cancelled) {
          setSoftwares([]);
          setError("Maksimal 4 software dapat dibandingkan.");
          setLoading(false);
        }

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | Request
      |--------------------------------------------------------------------------
      */

      try {
        if (!cancelled) {
          setLoading(true);
          setError("");
        }

        const response = await getSoftwareComparison(softwareSlugs);

        /*
        |--------------------------------------------------------------------------
        | Normalize API Response
        |--------------------------------------------------------------------------
        |
        | Kemungkinan response:
        |
        | 1. { data: [...] }
        |
        | 2. { data: { data: [...] } }
        |
        */

        const responseData = response?.data;

        let comparisonData: SoftwareComparisonItem[] = [];

        if (Array.isArray(responseData)) {
          comparisonData = responseData;
        } else if (Array.isArray(responseData?.data)) {
          comparisonData = responseData.data;
        }

        /*
        |--------------------------------------------------------------------------
        | Validate Response
        |--------------------------------------------------------------------------
        */

        if (!Array.isArray(comparisonData)) {
          throw new Error("Format data comparison dari server tidak valid.");
        }

        if (!cancelled) {
          setSoftwares(comparisonData);

          if (comparisonData.length < 2) {
            setError("Data software yang ditemukan kurang dari 2.");
          }
        }
      } catch (err: any) {
        if (cancelled) {
          return;
        }

        console.error("Gagal mengambil comparison:", err);

        setSoftwares([]);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Gagal mengambil data perbandingan software.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchComparison();

    return () => {
      cancelled = true;
    };
  }, [softwareSlugKey]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#362EED]" />

          <p className="text-sm text-gray-500">
            Memuat perbandingan software...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <div className="min-h-[60vh] bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/software-directory"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#362EED]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Software Directory
          </Link>

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <X className="h-7 w-7 text-red-500" />
            </div>

            <h1 className="mb-2 text-xl font-bold text-gray-900">
              Tidak dapat menampilkan comparison
            </h1>

            <p className="text-sm text-gray-500">{error}</p>

            <Link
              to="/software-directory"
              className="mt-6 inline-flex items-center rounded-lg bg-[#362EED] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d26c7]"
            >
              Pilih Software
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Empty Data
  |--------------------------------------------------------------------------
  */

  if (softwares.length < 2) {
    return (
      <div className="min-h-[60vh] bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/software-directory"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#362EED]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Software Directory
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <GitCompareArrows className="mx-auto mb-4 h-12 w-12 text-gray-400" />

            <h1 className="mb-2 text-xl font-bold text-gray-900">
              Software belum cukup
            </h1>

            <p className="text-sm text-gray-500">
              Pilih minimal 2 software untuk mulai membandingkan.
            </p>
          </div>
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
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/*
        |--------------------------------------------------------------------------
        | Header
        |--------------------------------------------------------------------------
        */}

        <div className="mb-8">
          <Link
            to="/software-directory"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#362EED]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Software Directory
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#362EED] text-white">
                  <GitCompareArrows className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#362EED]">
                    Software Directory
                  </p>

                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Software Comparison
                  </h1>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-gray-500">
                Bandingkan fitur, harga, integrasi, dan rating beberapa software
                untuk membantu menentukan pilihan yang paling sesuai.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Software dibandingkan</p>

              <p className="text-lg font-bold text-gray-900">
                {softwares.length} Software
              </p>
            </div>
          </div>
        </div>

        {/*
        |--------------------------------------------------------------------------
        | Comparison Table
        |--------------------------------------------------------------------------
        */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              {/*
              |--------------------------------------------------------------------------
              | Software Header
              |--------------------------------------------------------------------------
              */}

              <thead>
                <tr className="border-b border-gray-200">
                  <th className="sticky left-0 z-10 w-56 min-w-56 border-r border-gray-200 bg-gray-50 p-5 text-left align-top">
                    <div className="flex items-center gap-2">
                      <GitCompareArrows className="h-5 w-5 text-[#362EED]" />

                      <span className="font-semibold text-gray-900">
                        Perbandingan
                      </span>
                    </div>
                  </th>

                  {softwares.map((software) => (
                    <th
                      key={software.id}
                      className="min-w-[250px] p-5 text-left align-top"
                    >
                      <div className="flex items-start gap-4">
                        {software.logo ? (
                          <img
                            src={software.logo}
                            alt={software.name}
                            className="h-14 w-14 rounded-xl border border-gray-200 object-contain p-2"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg font-bold text-gray-500">
                            {(software.name || "S").charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {software.name || "Software"}
                          </h2>

                          {software.category && (
                            <p className="mt-1 text-sm text-gray-500">
                              {software.category.name}
                            </p>
                          )}

                          <Link
                            to={`/software-directory/${software.slug}`}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#362EED] hover:underline"
                          >
                            Lihat detail
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/*
                |--------------------------------------------------------------------------
                | Description
                |--------------------------------------------------------------------------
                */}

                <tr className="border-b border-gray-200">
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 p-5 align-top">
                    <span className="font-semibold text-gray-900">
                      Deskripsi
                    </span>
                  </td>

                  {softwares.map((software) => (
                    <td
                      key={software.id}
                      className="p-5 align-top text-sm leading-6 text-gray-600"
                    >
                      {software.description || "Tidak ada deskripsi."}
                    </td>
                  ))}
                </tr>

                {/*
                |--------------------------------------------------------------------------
                | Category
                |--------------------------------------------------------------------------
                */}

                <tr className="border-b border-gray-200">
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 p-5">
                    <span className="font-semibold text-gray-900">
                      Kategori
                    </span>
                  </td>

                  {softwares.map((software) => (
                    <td key={software.id} className="p-5 text-sm text-gray-700">
                      {software.category?.name || "Tidak tersedia"}
                    </td>
                  ))}
                </tr>

                {/*
                |--------------------------------------------------------------------------
                | Rating
                |--------------------------------------------------------------------------
                */}

                <tr className="border-b border-gray-200">
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 p-5">
                    <span className="font-semibold text-gray-900">Rating</span>
                  </td>

                  {softwares.map((software) => {
                    const ratingValue =
                      software.average_rating !== undefined &&
                      software.average_rating !== null &&
                      !Number.isNaN(Number(software.average_rating))
                        ? Number(software.average_rating).toFixed(1)
                        : "0.0";

                    const totalRatings =
                      software.total_ratings !== undefined &&
                      software.total_ratings !== null
                        ? software.total_ratings
                        : 0;

                    return (
                      <td key={software.id} className="p-5">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                          <span className="font-bold text-gray-900">
                            {ratingValue}
                          </span>

                          <span className="text-sm text-gray-500">
                            ({totalRatings} rating)
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/*
                |--------------------------------------------------------------------------
                | Features
                |--------------------------------------------------------------------------
                */}

                <tr className="border-b border-gray-200">
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 p-5 align-top">
                    <span className="font-semibold text-gray-900">Fitur</span>
                  </td>

                  {softwares.map((software) => {
                    const features = Array.isArray(software.features)
                      ? software.features
                      : [];

                    return (
                      <td key={software.id} className="p-5 align-top">
                        {features.length > 0 ? (
                          <ul className="space-y-3">
                            {features.map((feature) => (
                              <li
                                key={feature.id}
                                className="flex items-start gap-2"
                              >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                                  <Check className="h-3.5 w-3.5 text-green-600" />
                                </span>

                                <div>
                                  <p className="text-sm font-medium text-gray-800">
                                    {feature.name}
                                  </p>

                                  {feature.description && (
                                    <p className="mt-0.5 text-xs leading-5 text-gray-500">
                                      {feature.description}
                                    </p>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-sm text-gray-400">
                            Tidak ada data fitur.
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/*
                |--------------------------------------------------------------------------
                | Pricing
                |--------------------------------------------------------------------------
                */}

                <tr className="border-b border-gray-200">
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 p-5 align-top">
                    <span className="font-semibold text-gray-900">Pricing</span>
                  </td>

                  {softwares.map((software) => {
                    const pricings = Array.isArray(software.pricings)
                      ? software.pricings
                      : [];

                    return (
                      <td key={software.id} className="p-5 align-top">
                        {pricings.length > 0 ? (
                          <div className="space-y-3">
                            {pricings.map((pricing) => (
                              <div
                                key={pricing.id}
                                className="rounded-xl border border-gray-200 p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                      {pricing.name || "Pricing Plan"}
                                    </p>

                                    {pricing.description && (
                                      <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {pricing.description}
                                      </p>
                                    )}
                                  </div>

                                  <span className="shrink-0 text-sm font-bold text-[#362EED]">
                                    {formatPrice(pricing.price)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            Tidak ada data pricing.
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/*
                |--------------------------------------------------------------------------
                | Integrations
                |--------------------------------------------------------------------------
                */}

                <tr className="border-b border-gray-200">
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 p-5 align-top">
                    <span className="font-semibold text-gray-900">
                      Integrasi
                    </span>
                  </td>

                  {softwares.map((software) => {
                    const integrations = Array.isArray(software.integrations)
                      ? software.integrations
                      : [];

                    return (
                      <td key={software.id} className="p-5 align-top">
                        {integrations.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {integrations.map((integration) => (
                              <span
                                key={integration.id}
                                className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                                title={
                                  integration.description || integration.name
                                }
                              >
                                {integration.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            Tidak ada data integrasi.
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/*
                |--------------------------------------------------------------------------
                | Website
                |--------------------------------------------------------------------------
                */}

                <tr>
                  <td className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 p-5">
                    <span className="font-semibold text-gray-900">Website</span>
                  </td>

                  {softwares.map((software) => (
                    <td key={software.id} className="p-5">
                      {software.website_url ? (
                        <a
                          href={software.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-[#362EED] hover:underline"
                        >
                          Kunjungi website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Tidak tersedia
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/*
        |--------------------------------------------------------------------------
        | Footer Note
        |--------------------------------------------------------------------------
        */}

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm leading-6 text-blue-800">
            <span className="font-semibold">Tips:</span> Gunakan informasi
            fitur, pricing, integrasi, dan rating sebagai bahan pertimbangan
            sebelum memilih software yang paling sesuai dengan kebutuhan Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoftwareComparison;
