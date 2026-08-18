import { useEffect, useState } from "react";
import {
  getSoftwareIntegrations,
  createSoftwareIntegration,
  updateSoftwareIntegration,
  deleteSoftwareIntegration,
  type SoftwareIntegration,
  type SoftwareIntegrationPayload,
} from "../../services/softwareIntegrationService";
import api from "../../services/api";

interface Software {
  id: number;
  name: string;
}

function SoftwareIntegrations() {
  const [integrations, setIntegrations] = useState<SoftwareIntegration[]>([]);
  const [softwares, setSoftwares] = useState<Software[]>([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<SoftwareIntegrationPayload>({
    software_id: 0,
    name: "",
    type: "",
    description: "",
    website_url: "",
    is_active: true,
  });

  // =========================================================
  // FETCH DATA
  // =========================================================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [integrationResponse, softwareResponse] = await Promise.all([
        getSoftwareIntegrations(),
        api.get("/softwares"),
      ]);

      // Software Integrations
      setIntegrations(integrationResponse.data ?? []);

      // Softwares
      setSoftwares(softwareResponse.data?.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);

      setError("Gagal mengambil data software integrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setEditingId(null);

    setForm({
      software_id: 0,
      name: "",
      type: "",
      description: "",
      website_url: "",
      is_active: true,
    });
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const closeForm = () => {
    resetForm();
    setShowForm(false);
    setError("");
  };

  // =========================================================
  // OPEN CREATE FORM
  // =========================================================

  const openCreateForm = () => {
    resetForm();
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =========================================================
  // HANDLE FORM CHANGE
  // =========================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => {
      if (name === "software_id") {
        return {
          ...prev,
          software_id: Number(value),
        };
      }

      if (type === "checkbox") {
        return {
          ...prev,
          [name]: (e.target as HTMLInputElement).checked,
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validasi software
    if (!form.software_id) {
      setError("Silakan pilih software terlebih dahulu.");
      return;
    }

    // Validasi nama
    if (!form.name.trim()) {
      setError("Nama integration wajib diisi.");
      return;
    }

    try {
      setFormLoading(true);

      if (editingId !== null) {
        await updateSoftwareIntegration(editingId, {
          software_id: form.software_id,
          name: form.name.trim(),
          type: form.type || null,
          description: form.description?.trim() || null,
          website_url: form.website_url?.trim() || null,
          is_active: form.is_active,
        });

        setSuccess("Software integration berhasil diperbarui.");
      } else {
        await createSoftwareIntegration({
          software_id: form.software_id,
          name: form.name.trim(),
          type: form.type || null,
          description: form.description?.trim() || null,
          website_url: form.website_url?.trim() || null,
          is_active: form.is_active,
        });

        setSuccess("Software integration berhasil ditambahkan.");
      }

      resetForm();
      setShowForm(false);

      await fetchData();
    } catch (error) {
      console.error("Gagal menyimpan integration:", error);

      setError(
        editingId !== null
          ? "Gagal memperbarui software integration."
          : "Gagal menambahkan software integration.",
      );
    } finally {
      setFormLoading(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (integration: SoftwareIntegration) => {
    setEditingId(integration.id);

    setForm({
      software_id: integration.software_id,
      name: integration.name,
      type: integration.type ?? "",
      description: integration.description ?? "",
      website_url: integration.website_url ?? "",
      is_active: integration.is_active,
    });

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus software integration ini?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");
      setSuccess("");

      await deleteSoftwareIntegration(id);

      setSuccess("Software integration berhasil dihapus.");

      if (editingId === id) {
        resetForm();
        setShowForm(false);
      }

      await fetchData();
    } catch (error) {
      console.error("Gagal menghapus integration:", error);

      setError("Gagal menghapus software integration.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Software Integrations
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola layanan dan aplikasi yang terintegrasi dengan software.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Tambah Integration
          </button>
        )}
      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          FORM
      ===================================================== */}

      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          {/* Form Header */}

          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId !== null
                  ? "Edit Software Integration"
                  : "Tambah Software Integration"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingId !== null
                  ? "Perbarui informasi software integration."
                  : "Tambahkan layanan atau aplikasi yang terintegrasi."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={formLoading}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Batal
            </button>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {/* =================================================
                SOFTWARE
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Software
              </label>

              <select
                name="software_id"
                value={form.software_id}
                onChange={handleChange}
                disabled={formLoading}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value={0}>Pilih software</option>

                {softwares.map((software) => (
                  <option key={software.id} value={software.id}>
                    {software.name}
                  </option>
                ))}
              </select>
            </div>

            {/* =================================================
                NAME
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Integration
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={formLoading}
                placeholder="Contoh: MySQL"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* =================================================
                TYPE
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tipe
              </label>

              <select
                name="type"
                value={form.type ?? ""}
                onChange={handleChange}
                disabled={formLoading}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Pilih tipe</option>
                <option value="Database">Database</option>
                <option value="Cache">Cache</option>
                <option value="Payment">Payment</option>
                <option value="Version Control">Version Control</option>
                <option value="Authentication">Authentication</option>
                <option value="API">API</option>
                <option value="Storage">Storage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* =================================================
                WEBSITE URL
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website URL
              </label>

              <input
                type="url"
                name="website_url"
                value={form.website_url ?? ""}
                onChange={handleChange}
                disabled={formLoading}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Deskripsi
              </label>

              <textarea
                name="description"
                value={form.description ?? ""}
                onChange={handleChange}
                disabled={formLoading}
                rows={3}
                placeholder="Deskripsi integration..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active ?? true}
                  onChange={handleChange}
                  disabled={formLoading}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm font-medium text-gray-700">
                  Integration Aktif
                </span>
              </label>
            </div>

            {/* =================================================
                BUTTON
            ================================================= */}

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
                    : "Tambah Integration"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                disabled={formLoading}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =====================================================
          INTEGRATION LIST
      ===================================================== */}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Memuat software integrations...
          </div>
        ) : integrations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Belum ada software integration.
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
                    Integration
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Tipe
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
                {integrations.map((integration) => (
                  <tr
                    key={integration.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Software */}

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {integration.software?.name ?? "-"}
                    </td>

                    {/* Integration */}

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {integration.name}
                        </p>

                        {integration.description && (
                          <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                            {integration.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Type */}

                    <td className="px-6 py-4">
                      {integration.type ? (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {integration.type}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Website */}

                    <td className="px-6 py-4">
                      {integration.website_url ? (
                        <a
                          href={integration.website_url}
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

                    {/* Status */}

                    <td className="px-6 py-4">
                      {integration.is_active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(integration)}
                          disabled={deleteLoading !== null}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(integration.id)}
                          disabled={deleteLoading === integration.id}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleteLoading === integration.id
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

export default SoftwareIntegrations;
