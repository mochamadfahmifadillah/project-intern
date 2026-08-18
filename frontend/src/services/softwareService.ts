import api from "./api";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface SoftwareCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SoftwareFeature {
  id: number;
  software_id?: number;
  name: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SoftwarePricing {
  id: number;
  software_id?: number;
  name: string;
  price: number | string | null;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SoftwareIntegration {
  id: number;
  software_id?: number;
  name: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Software Review
|--------------------------------------------------------------------------
*/

export interface SoftwareReview {
  id: number;
  software_id: number;
  user_id: number;
  review: string;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;

  user?: {
    id: number;
    name: string;
  };
}

/*
|--------------------------------------------------------------------------
| Software
|--------------------------------------------------------------------------
*/

export interface Software {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  website_url: string | null;
  logo: string | null;
  status: "active" | "inactive";

  category?: SoftwareCategory;

  features?: SoftwareFeature[];
  pricings?: SoftwarePricing[];
  integrations?: SoftwareIntegration[];
  reviews?: SoftwareReview[];

  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Payloads
|--------------------------------------------------------------------------
*/

export interface SoftwarePayload {
  category_id: number;
  name: string;
  slug?: string;
  description?: string;
  website_url?: string;
  logo?: string;
  status?: "active" | "inactive";
}

export interface SoftwareReviewPayload {
  review: string;
}

export interface PublicSoftwareParams {
  search?: string;
  category?: string;
}

/*
|--------------------------------------------------------------------------
| API Response Types
|--------------------------------------------------------------------------
*/

export interface SoftwareResponse {
  message: string;
  data: Software[];
}

export interface SoftwareDetailResponse {
  message: string;
  data: Software;
}

export interface SoftwareCategoryResponse {
  message: string;
  data: SoftwareCategory[];
}

export interface SoftwareReviewResponse {
  message: string;
  data: SoftwareReview;
}

export interface SoftwareReviewsResponse {
  message: string;
  data: SoftwareReview[];
}

export interface MessageResponse {
  message: string;
}

/*
|--------------------------------------------------------------------------
| Get All Softwares - Protected
|--------------------------------------------------------------------------
|
| GET /api/softwares
|
*/

export const getSoftwares = async (): Promise<SoftwareResponse> => {
  const response = await api.get<SoftwareResponse>("/softwares");

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Public Software Directory
|--------------------------------------------------------------------------
|
| GET /api/software-directory
| GET /api/software-directory?search=figma
| GET /api/software-directory?category=design
| GET /api/software-directory?search=figma&category=design
|
*/

export const getPublicSoftwares = async (
  params?: PublicSoftwareParams,
): Promise<SoftwareResponse> => {
  const response = await api.get<SoftwareResponse>("/software-directory", {
    params: {
      ...(params?.search
        ? {
            search: params.search,
          }
        : {}),

      ...(params?.category
        ? {
            category: params.category,
          }
        : {}),
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Public Software Categories
|--------------------------------------------------------------------------
|
| GET /api/software-categories-public
|
*/

export const getPublicSoftwareCategories =
  async (): Promise<SoftwareCategoryResponse> => {
    const response = await api.get<SoftwareCategoryResponse>(
      "/software-categories-public",
    );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| Get Public Software Detail
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{slug}
|
| Contoh:
| GET /api/software-directory/figma
|
*/

export const getPublicSoftwareDetail = async (
  slug: string,
): Promise<SoftwareDetailResponse> => {
  const response = await api.get<SoftwareDetailResponse>(
    `/software-directory/${slug}`,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Public Software Reviews
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{slug}/reviews
|
| Digunakan untuk menampilkan review pada
| halaman public Software Detail.
|
*/

export const getPublicSoftwareReviews = async (
  slug: string,
): Promise<SoftwareReviewsResponse> => {
  const response = await api.get<SoftwareReviewsResponse>(
    `/software-directory/${slug}/reviews`,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Software Review
|--------------------------------------------------------------------------
|
| POST /api/software-directory/{slug}/reviews
|
| Membutuhkan authentication.
|
*/

export const createSoftwareReview = async (
  slug: string,
  data: SoftwareReviewPayload,
): Promise<SoftwareReviewResponse> => {
  const response = await api.post<SoftwareReviewResponse>(
    `/software-directory/${slug}/reviews`,
    data,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Software Review
|--------------------------------------------------------------------------
|
| PUT /api/software-reviews/{id}
|
| User hanya dapat mengubah review miliknya sendiri.
|
*/

export const updateSoftwareReview = async (
  id: number,
  data: SoftwareReviewPayload,
): Promise<SoftwareReviewResponse> => {
  const response = await api.put<SoftwareReviewResponse>(
    `/software-reviews/${id}`,
    data,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Software Review
|--------------------------------------------------------------------------
|
| DELETE /api/software-reviews/{id}
|
| User hanya dapat menghapus review miliknya sendiri.
|
*/

export const deleteSoftwareReview = async (
  id: number,
): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(`/software-reviews/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Software Detail - Protected
|--------------------------------------------------------------------------
|
| GET /api/softwares/{id}
|
*/

export const getSoftware = async (
  id: number,
): Promise<SoftwareDetailResponse> => {
  const response = await api.get<SoftwareDetailResponse>(`/softwares/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Software
|--------------------------------------------------------------------------
|
| POST /api/softwares
|
*/

export const createSoftware = async (
  data: SoftwarePayload,
): Promise<SoftwareDetailResponse> => {
  const response = await api.post<SoftwareDetailResponse>("/softwares", data);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Software
|--------------------------------------------------------------------------
|
| PUT /api/softwares/{id}
|
*/

export const updateSoftware = async (
  id: number,
  data: SoftwarePayload,
): Promise<SoftwareDetailResponse> => {
  const response = await api.put<SoftwareDetailResponse>(
    `/softwares/${id}`,
    data,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Software
|--------------------------------------------------------------------------
|
| DELETE /api/softwares/{id}
|
*/

export const deleteSoftware = async (id: number): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(`/softwares/${id}`);

  return response.data;
};
