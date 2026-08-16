import { FormEvent, useEffect, useState } from "react";
import {
  createSoftwareCategory,
  deleteSoftwareCategory,
  getSoftwareCategories,
  updateSoftwareCategory,
  SoftwareCategory,
} from "../../services/softwareCategoryService";

interface CategoryForm {
  name: string;
  slug: string;
  description: string;
}

const initialForm: CategoryForm = {
  name: "",
  slug: "",
  description: "",
};

export default function SoftwareCategories() {
  const [categories, setCategories] = useState<SoftwareCategory[]>([]);
  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSoftwareCategories();
      setCategories(response.data ?? []);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Gagal mengambil data kategori software.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Nama kategori wajib diisi.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      if (editingId) {
        await updateSoftwareCategory(editingId, {
          name: form.name,
          slug: form.slug || undefined,
          description: form.description || undefined,
        });
      } else {
        await createSoftwareCategory({
          name: form.name,
          slug: form.slug || undefined,
          description: form.description || undefined,
        });
      }

      setForm(initialForm);
      setEditingId(null);

      await fetchCategories();
    } catch (err: any) {
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0];

        setError(
          Array.isArray(firstError)
            ? String(firstError[0])
            : "Data yang dimasukkan tidak valid.",
        );
      } else {
        setError(
          err.response?.data?.message || "Gagal menyimpan kategori software.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: SoftwareCategory) => {
    setEditingId(category.id);

    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
    });

    setError("");
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus kategori ini?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteSoftwareCategory(id);

      await fetchCategories();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Gagal menghapus kategori software.",
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Software Categories
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola kategori software yang tersedia pada sistem.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingId ? "Edit Kategori" : "Tambah Kategori"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {editingId
              ? "Perbarui informasi kategori software."
              : "Tambahkan kategori software baru."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Nama Kategori
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Contoh: Web Development"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              value={form.slug}
              onChange={handleChange}
              placeholder="Contoh: web-development"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />

            <p className="mt-1 text-xs text-gray-400">
              Kosongkan untuk membuat slug secara otomatis.
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Deskripsi
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Deskripsi kategori software..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Menyimpan..."
                : editingId
                  ? "Simpan Perubahan"
                  : "Tambah Kategori"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Daftar Kategori
          </h2>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Memuat data kategori...
          </div>
        ) : categories.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Belum ada kategori software.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Kategori</th>
                  <th className="px-6 py-3 font-medium">Slug</th>
                  <th className="px-6 py-3 font-medium">Deskripsi</th>
                  <th className="px-6 py-3 text-center font-medium">
                    Software
                  </th>
                  <th className="px-6 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr key={category.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        {category.slug}
                      </span>
                    </td>

                    <td className="max-w-md px-6 py-4 text-gray-600">
                      {category.description || "-"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        {category.softwares_count ?? 0}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Hapus
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
