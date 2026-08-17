import { useEffect, useState } from "react";
import {
  getSoftwareCategories,
  type SoftwareCategory,
} from "../../services/softwareCategoryService";

function SoftwareCategories() {
  const [categories, setCategories] = useState<SoftwareCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSoftwareCategories();

      setCategories(response.data);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Software Categories
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola kategori software yang tersedia pada sistem.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
          Memuat kategori software...
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
          Belum ada kategori software.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">Nama</th>

                <th className="px-6 py-4 font-semibold text-gray-700">Slug</th>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Deskripsi
                </th>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Jumlah Software
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {categories.map((category) => (
                <tr key={category.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{category.slug}</td>

                  <td className="px-6 py-4 text-gray-600">
                    {category.description || "-"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {category.softwares_count ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SoftwareCategories;
