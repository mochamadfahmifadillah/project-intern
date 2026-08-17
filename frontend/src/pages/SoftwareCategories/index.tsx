import { useEffect, useState } from "react";
import {
  createSoftwareCategory,
  deleteSoftwareCategory,
  getSoftwareCategories,
  updateSoftwareCategory,
  type SoftwareCategory,
} from "../../services/softwareCategoryService";

function SoftwareCategories() {
  const [categories, setCategories] = useState<SoftwareCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<SoftwareCategory | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSoftwareCategories();

      setCategories(response.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil kategori software:", error);
      setError("Gagal mengambil kategori software.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);

    setForm({
      name: "",
      slug: "",
      description: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (category: SoftwareCategory) => {
    setEditingCategory(category);

    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Nama kategori wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingCategory) {
        await updateSoftwareCategory(editingCategory.id, {
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

      setIsModalOpen(false);
      setEditingCategory(null);

      setForm({
        name: "",
        slug: "",
        description: "",
      });

      await fetchCategories();
    } catch (error) {
      console.error("Gagal menyimpan kategori software:", error);
      setError("Gagal menyimpan kategori software.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category: SoftwareCategory) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus kategori "${category.name}"?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteSoftwareCategory(category.id);

      await fetchCategories();
    } catch (error) {
      console.error("Gagal menghapus kategori software:", error);
      setError("Gagal menghapus kategori software.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Software Categories
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola kategori software yang tersedia pada sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Tambah Kategori
        </button>
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
          Memuat kategori software...
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-500">Belum ada kategori software.</p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Tambah Kategori
          </button>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Nama
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Slug
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Deskripsi
                  </th>

                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Jumlah Software
                  </th>

                  <th className="px-6 py-4 text-right font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr key={category.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {category.name}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        {category.slug}
                      </span>
                    </td>

                    <td className="max-w-md px-6 py-4 text-gray-600">
                      <p className="truncate">{category.description || "-"}</p>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                        {category.softwares_count ?? 0}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(category)}
                          className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
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
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingCategory
                  ? "Edit Software Category"
                  : "Tambah Software Category"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingCategory
                  ? "Perbarui informasi kategori software."
                  : "Tambahkan kategori software baru."}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5 px-6 py-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nama
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="Contoh: CRM"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Slug
                  </label>

                  <input
                    type="text"
                    value={form.slug}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        slug: event.target.value,
                      })
                    }
                    placeholder="Contoh: crm"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />

                  <p className="mt-1 text-xs text-gray-400">
                    Kosongkan jika ingin dibuat otomatis.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        description: event.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Deskripsi kategori..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Menyimpan..."
                    : editingCategory
                      ? "Simpan Perubahan"
                      : "Tambah Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SoftwareCategories;
