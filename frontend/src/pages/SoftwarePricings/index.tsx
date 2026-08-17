import { useEffect, useState } from "react";
import {
  getSoftwarePricings,
  createSoftwarePricing,
  updateSoftwarePricing,
  deleteSoftwarePricing,
  type SoftwarePricing,
  type CreateSoftwarePricingPayload,
  type UpdateSoftwarePricingPayload,
} from "../../services/softwarePricingService";
import api from "../../services/api";

interface Software {
  id: number;
  name: string;
}

function SoftwarePricings() {
  const [pricings, setPricings] = useState<SoftwarePricing[]>([]);
  const [softwares, setSoftwares] = useState<Software[]>([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<
    CreateSoftwarePricingPayload | UpdateSoftwarePricingPayload
  >({
    software_id: 0,
    pricing_type: "free",
    price: null,
    currency: "USD",
    billing_period: null,
    description: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [pricingResponse, softwareResponse] = await Promise.all([
        getSoftwarePricings(),
        api.get("/softwares"),
      ]);

      setPricings(pricingResponse.data ?? []);
      setSoftwares(softwareResponse.data.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data pricing:", error);
      setError("Gagal mengambil data pricing software.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setEditingId(null);

    setForm({
      software_id: 0,
      pricing_type: "free",
      price: null,
      currency: "USD",
      billing_period: null,
      description: "",
    });
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
    setError("");
  };

  const openCreateForm = () => {
    resetForm();
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "software_id"
          ? Number(value)
          : name === "price"
            ? value === ""
              ? null
              : Number(value)
            : name === "billing_period"
              ? value === ""
                ? null
                : value
              : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.software_id) {
      setError("Silakan pilih software terlebih dahulu.");
      return;
    }

    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      if (editingId) {
        await updateSoftwarePricing(editingId, form);

        setSuccess("Pricing software berhasil diperbarui.");
      } else {
        await createSoftwarePricing(form);

        setSuccess("Pricing software berhasil ditambahkan.");
      }

      closeForm();
      await fetchData();
    } catch (error) {
      console.error("Gagal menyimpan pricing:", error);

      setError(
        editingId
          ? "Gagal memperbarui pricing software."
          : "Gagal menambahkan pricing software."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (pricing: SoftwarePricing) => {
    setEditingId(pricing.id);

    setForm({
      software_id: pricing.software_id,
      pricing_type: pricing.pricing_type,
      price: pricing.price === null ? null : Number(pricing.price),
      currency: pricing.currency,
      billing_period: pricing.billing_period,
      description: pricing.description ?? "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus pricing software ini?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");
      setSuccess("");

      await deleteSoftwarePricing(id);

      setSuccess("Pricing software berhasil dihapus.");

      if (editingId === id) {
        closeForm();
      }

      await fetchData();
    } catch (error) {
      console.error("Gagal menghapus pricing:", error);
      setError("Gagal menghapus pricing software.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Software Pricing
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola informasi pricing software yang tersedia pada sistem.
          </p>
        </div>

        {/* Add Button */}
        {!showForm && (
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Tambah Pricing
          </button>
        )}
      </div>

      {/* Success */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Pricing" : "Tambah Pricing"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingId
                  ? "Perbarui informasi pricing software."
                  : "Tambahkan informasi pricing software baru."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {/* Software */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Software
              </label>

              <select
                name="software_id"
                value={form.software_id}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value={0}>Pilih software</option>

                {softwares.map((software) => (
                  <option key={software.id} value={software.id}>
                    {software.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tipe Pricing
              </label>

              <select
                name="pricing_type"
                value={form.pricing_type}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Harga
              </label>

              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={form.price ?? ""}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Currency
              </label>

              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="IDR">IDR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            {/* Billing Period */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Periode Billing
              </label>

              <select
                name="billing_period"
                value={form.billing_period ?? ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Tidak ada</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="one_time">One Time</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Deskripsi
              </label>

              <textarea
                name="description"
                value={form.description ?? ""}
                onChange={handleChange}
                rows={3}
                placeholder="Deskripsi pricing..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={formLoading}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {formLoading
                  ? "Menyimpan..."
                  : editingId
                    ? "Simpan Perubahan"
                    : "Tambah Pricing"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                disabled={formLoading}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pricing List */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Memuat pricing software...
          </div>
        ) : pricings.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Belum ada pricing software.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Software
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Tipe
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Harga
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Billing
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Deskripsi
                  </th>

                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {pricings.map((pricing) => (
                  <tr
                    key={pricing.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {pricing.software?.name ?? "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                        {pricing.pricing_type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {pricing.price !== null
                        ? `${pricing.currency} ${pricing.price}`
                        : "-"}
                    </td>

                    <td className="px-6 py-4 capitalize text-gray-600">
                      {pricing.billing_period
                        ? pricing.billing_period.replace("_", " ")
                        : "-"}
                    </td>

                    <td className="max-w-md px-6 py-4 text-gray-600">
                      <p className="truncate">
                        {pricing.description || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(pricing)}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(pricing.id)}
                          disabled={deleteLoading === pricing.id}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleteLoading === pricing.id
                            ? "Menghapus..."
                            : "Hapus"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoftwarePricings;
