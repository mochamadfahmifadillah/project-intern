import { useEffect, useState } from "react";
import {
  createSoftware,
  deleteSoftware,
  getSoftwares,
  updateSoftware,
  type Software,
  type SoftwarePayload,
} from "../../services/softwareService";
import {
  getSoftwareCategories,
  type SoftwareCategory,
} from "../../services/softwareCategoryService";

function Software() {
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [categories, setCategories] = useState<SoftwareCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState<Software | null>(
    null
  );

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [softwareResponse, categoryResponse] = await Promise.all([
        getSoftwares(),
        getSoftwareCategories(),
      ]);

      setSoftwares(softwareResponse.data ?? []);
      setCategories(categoryResponse.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data software:", error);
      setError("Gagal mengambil data software.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setCategoryId("");
    setName("");
    setSlug("");
    setDescription("");
    setWebsiteUrl("");
    setLogo("");
    setStatus("active");

    setEditingSoftware(null);
    setShowForm(false);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!categoryId) {
      setError("Kategori software wajib dipilih.");
      return;
    }

    if (!name.trim()) {
      setError("Nama software wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload: SoftwarePayload = {
        category_id: Number(categoryId),
        name: name.trim(),
        slug: slug.trim() || undefined,
        description: description.trim() || undefined,
        website_url: websiteUrl.trim() || undefined,
        logo: logo.trim() || undefined,
        status,
      };

      if (editingSoftware) {
        await updateSoftware(editingSoftware.id, payload);
      } else {
        await createSoftware(payload);
      }

      resetForm();
      await fetchData();
    } catch (error) {
      console.error("Gagal menyimpan software:", error);
      setError("Gagal menyimpan software.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (software: Software) => {
    setEditingSoftware(software);

    setCategoryId(String(software.category_id));
    setName(software.name);
    setSlug(software.slug);
    setDescription(software.description ?? "");
    setWebsiteUrl(software.website_url ?? "");
    setLogo(software.logo ?? "");
    setStatus(software.status);

    setError("");
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus software ini?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteSoftware(id);

      await fetchData();
    } catch (error) {
      console.error("Gagal menghapus software:", error);
      setError("Gagal menghapus software.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Software</h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola software yang tersedia pada sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Tambah Software
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingSoftware ? "Edit Software" : "Tambah Software"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Isi informasi software di bawah ini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kategori
              </label>

              <select
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              >
                <option value="">Pilih kategori</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Software
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Contoh: Laravel"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Slug
              </label>

              <input
                type="text"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="laravel"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />

              <p className="mt-1 text-xs text-gray-400">
                Kosongkan jika ingin slug dibuat otomatis.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Deskripsi
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Deskripsi software..."
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Website */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website URL
              </label>

              <input
                type="url"
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
                placeholder="https://laravel.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Logo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Logo URL
              </label>

              <input
                type="text"
                value={logo}
                onChange={(event) => setLogo(event.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "active" | "inactive")
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Menyimpan..."
                  : editingSoftware
                    ? "Simpan Perubahan"
                    : "Tambah Software"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
          Memuat software...
        </div>
      ) : softwares.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
          Belum ada software.
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Nama
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Kategori
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Deskripsi
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Website
                  </th>

                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {softwares.map((software) => (
                  <tr
                    key={software.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {software.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {software.slug}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-gray-600">
                      {software.category?.name || "-"}
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-6 py-4 text-gray-600">
                      <p className="truncate">
                        {software.description || "-"}
                      </p>
                    </td>

                    {/* Website */}
                    <td className="px-6 py-4">
                      {software.website_url ? (
                        <a
                          href={software.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Website
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          software.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {software.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(software)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(software.id)}
                          disabled={deletingId === software.id}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === software.id
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
        </div>
      )}
    </div>
  );
}

export default Software;
