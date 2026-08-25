import axios from "axios";

const api = axios.create({
  /*
  |--------------------------------------------------------------------------
  | API Base URL
  |--------------------------------------------------------------------------
  |
  | Backend Laravel menggunakan API versioning:
  |
  | /api/v1/...
  |
  | Jadi seluruh service cukup menggunakan:
  |
  | api.get("/softwares")
  | api.post("/recommendations")
  |
  | dan otomatis menjadi:
  |
  | http://127.0.0.1:8000/api/v1/softwares
  | http://127.0.0.1:8000/api/v1/recommendations
  |
  |--------------------------------------------------------------------------
  */

  baseURL: "http://127.0.0.1:8000/api/v1",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
|
| Mengambil token authentication dari localStorage.
|
| Jika token tersedia:
| Authorization: Bearer {token}
|
| Jika tidak tersedia:
| Authorization header dihapus.
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
