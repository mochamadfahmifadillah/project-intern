import { useEffect, useState } from "react";
import {
  getSoftwarePricings,
  type SoftwarePricing,
} from "../../services/softwarePricingService";

function SoftwarePricings() {
  const [pricings, setPricings] = useState<SoftwarePricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPricings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSoftwarePricings();

      setPricings(response.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil pricing software:", error);

      setError("Gagal mengambil pricing software.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricings();
  }, []);

  const formatPricingType = (type: SoftwarePricing["pricing_type"]) => {
    switch (type) {
      case "free":
        return "Free";

      case "freemium":
        return "Freemium";

      case "paid":
        return "Paid";

      case "custom":
        return "Custom";

      default:
        return type;
    }
  };

  const formatBillingPeriod = (period: SoftwarePricing["billing_period"]) => {
    switch (period) {
      case "monthly":
        return "Monthly";

      case "yearly":
        return "Yearly";

      case "one_time":
        return "One Time";

      case "custom":
        return "Custom";

      default:
        return "-";
    }
  };

  const formatPrice = (pricing: SoftwarePricing) => {
    if (pricing.price === null) {
      return "-";
    }

    return `${pricing.currency} ${Number(pricing.price).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    )}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Software Pricing</h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola informasi pricing software yang tersedia pada sistem.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
          Memuat pricing software...
        </div>
      ) : pricings.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
          Belum ada pricing software.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Software
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Pricing Type
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Price
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Billing Period
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Deskripsi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {pricings.map((pricing) => (
                  <tr key={pricing.id} className="transition hover:bg-gray-50">
                    {/* Software */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {pricing.software?.name || "-"}
                      </p>

                      {pricing.software?.slug && (
                        <p className="mt-1 text-xs text-gray-400">
                          {pricing.software.slug}
                        </p>
                      )}
                    </td>

                    {/* Pricing Type */}
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {formatPricingType(pricing.pricing_type)}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatPrice(pricing)}
                    </td>

                    {/* Billing */}
                    <td className="px-6 py-4 text-gray-600">
                      {formatBillingPeriod(pricing.billing_period)}
                    </td>

                    {/* Description */}
                    <td className="max-w-md px-6 py-4 text-gray-600">
                      <p className="truncate">{pricing.description || "-"}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SoftwarePricings;
