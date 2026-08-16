import { useEffect, useState } from "react";
import api from "../../services/api";

interface SoftwareCategory {
  id: number;
  name: string;
  slug: string;
}

interface Software {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  website_url: string | null;
  logo: string | null;
  status: "active" | "inactive";
  category?: SoftwareCategory;
}

interface SoftwareResponse {
  message: string;
  data: Software[];
}

function Software() {
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSoftwares = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<SoftwareResponse>("/softwares");

      setSoftwares(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data software:", error);
      setError("Gagal mengambil data software.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoftwares();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Software</h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola daftar software yang tersedia pada sistem.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Tambah Software
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
        <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
          Memuat data software...
        </div>
      ) : softwares.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
          Belum ada data software.
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Software
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Kategori
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Deskripsi
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {softwares.map((software) => (
                  <tr key={software.id} className="transition hover:bg-gray-50">
                    {/* Software */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {software.logo ? (
                          <img
                            src={software.logo}
                            alt={software.name}
                            className="h-10 w-10 rounded-lg object-contain"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-500">
                            {software.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-medium text-gray-900">
                            {software.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {software.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-gray-600">
                      {software.category?.name ?? "-"}
                    </td>

                    {/* Description */}
                    <td className="max-w-md px-6 py-4 text-gray-600">
                      {software.description || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          software.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {software.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="rounded-md border px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
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
    </div>
  );
}

export default Software;
