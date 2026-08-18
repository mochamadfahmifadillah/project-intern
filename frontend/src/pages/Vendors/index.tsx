import { useEffect, useState } from "react";

import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
  type Vendor,
  type VendorPayload,
} from "../../services/vendorService";

function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<VendorPayload>({
    name: "",
    description: "",
    website_url: "",
    email: "",
    phone: "",
    address: "",
    is_active: true,
  });

  // =========================
  // FETCH DATA
  // =========================

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getVendors();

      setVendors(response.data?.data ?? response.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data vendor:", error);
      setError("Gagal mengambil data vendor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // =========================
  // FORM
  // =========================

  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
      website_url: "",
      email: "",
      phone: "",
      address: "",
      is_active: true,
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

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Nama vendor wajib diisi.");
      return;
    }

    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      if (editingId !== null) {
        await updateVendor(editingId, form);

        setSuccess("Vendor berhasil diperbarui.");
      } else {
        await createVendor(form);

        setSuccess("Vendor berhasil ditambahkan.");
      }

      closeForm();
      await fetchVendors();
    } catch (error) {
      console.error("Gagal menyimpan vendor:", error);

      setError(
        editingId !== null
          ? "Gagal memperbarui vendor."
          : "Gagal menambahkan vendor.",
      );
    } finally {
      setFormLoading(false);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (vendor: Vendor) => {
    setEditingId(vendor.id);

    setForm({
      name: vendor.name,
      description: vendor.description ?? "",
      website_url: vendor.website_url ?? "",
      email: vendor.email ?? "",
      phone: vendor.phone ?? "",
      address: vendor.address ?? "",
      is_active: vendor.is_active,
    });

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus vendor ini?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");
      setSuccess("");

      await deleteVendor(id);

      setSuccess("Vendor berhasil dihapus.");

      if (editingId === id) {
        closeForm();
      }

      await fetchVendors();
    } catch (error) {
      console.error("Gagal menghapus vendor:", error);
      setError("Gagal menghapus vendor.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola perusahaan atau vendor penyedia software.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Tambah Vendor
          </button>
        )}
      </div>

      {/* SUCCESS */}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* FORM */}

      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId !== null ? "Edit Vendor" : "Tambah Vendor"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingId !== null
                  ? "Perbarui informasi vendor."
                  : "Tambahkan perusahaan penyedia software."}
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
            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Vendor
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Contoh: Microsoft"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contact@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* PHONE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nomor Telepon
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+62 812 3456 7890"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* WEBSITE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>

              <input
                type="url"
                name="website_url"
                value={form.website_url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* ADDRESS */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Alamat
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={2}
                placeholder="Alamat perusahaan..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Deskripsi
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Deskripsi vendor..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* STATUS */}

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm font-medium text-gray-700">
                  Vendor Aktif
                </span>
              </label>
            </div>

            {/* BUTTON */}

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={formLoading}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {formLoading
                  ? "Menyimpan..."
                  : editingId !== null
                    ? "Simpan Perubahan"
                    : "Tambah Vendor"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                disabled={formLoading}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LIST */}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Memuat vendor...</div>
        ) : vendors.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Belum ada vendor.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Vendor
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Email
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Telepon
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Website
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="transition hover:bg-gray-50">
                    {/* VENDOR */}

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {vendor.name}
                        </p>

                        {vendor.description && (
                          <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                            {vendor.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-4 text-gray-600">
                      {vendor.email ?? "-"}
                    </td>

                    {/* PHONE */}

                    <td className="px-6 py-4 text-gray-600">
                      {vendor.phone ?? "-"}
                    </td>

                    {/* WEBSITE */}

                    <td className="px-6 py-4">
                      {vendor.website_url ? (
                        <a
                          href={vendor.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      {vendor.is_active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(vendor)}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(vendor.id)}
                          disabled={deleteLoading === vendor.id}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleteLoading === vendor.id
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

export default Vendors;
