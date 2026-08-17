import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface Software {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  website_url: string | null;
  logo: string | null;
  status: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

function Software() {
  const { token, loading: authLoading } = useAuth();

  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !token) {
      return;
    }

    const fetchSoftwares = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/softwares");

        setSoftwares(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data software:", error);
        setError("Gagal mengambil data software.");
      } finally {
        setLoading(false);
      }
    };

    fetchSoftwares();
  }, [token, authLoading]);

  if (authLoading) {
    return (
      <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
        Memuat...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
        Silakan login terlebih dahulu.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Software
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola software yang tersedia pada sistem.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
          Memuat software...
        </div>
      ) : softwares.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-500">
          Belum ada software.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
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

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {softwares.map((software) => (
                <tr
                  key={software.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {software.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {software.category?.name || "-"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {software.description || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {software.website_url ? (
                      <a
                        href={software.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        software.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {software.status}
                    </span>
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

export default Software;