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
| Software Rating
|--------------------------------------------------------------------------
*/

export interface SoftwareRating {
  id: number;
  software_id: number;
  user_id: number;
  rating: number;
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
  ratings?: SoftwareRating[];

  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Software Comparison
|--------------------------------------------------------------------------
|
| Data khusus yang digunakan oleh halaman comparison.
|
*/

export interface SoftwareComparisonItem {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  website_url: string | null;
  logo: string | null;

  category?: SoftwareCategory;

  features?: SoftwareFeature[];
  pricings?: SoftwarePricing[];
  integrations?: SoftwareIntegration[];

  average_rating?: number;
  total_ratings?: number;
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

export interface SoftwareRatingPayload {
  rating: number;
}

export interface PublicSoftwareParams {
  search?: string;
  category?: string;
}

/*
|--------------------------------------------------------------------------
| Software Comparison Params
|--------------------------------------------------------------------------
*/

export interface SoftwareComparisonParams {
  software: string[];
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

export interface SoftwareRatingResponse {
  message: string;
  data: SoftwareRating;
}

export interface SoftwareRatingsResponse {
  message: string;
  data: SoftwareRating[];
}

/*
|--------------------------------------------------------------------------
| Software Comparison Response
|--------------------------------------------------------------------------
*/

export interface SoftwareComparisonResponse {
  message: string;
  data: SoftwareComparisonItem[];
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
*/

export const deleteSoftwareReview = async (
  id: number,
): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(
    `/software-reviews/${id}`,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Public Software Ratings
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{slug}/ratings
|
*/

export const getPublicSoftwareRating = async (
  slug: string,
): Promise<SoftwareRatingsResponse> => {
  const response = await api.get<SoftwareRatingsResponse>(
    `/software-directory/${slug}/ratings`,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Software Rating
|--------------------------------------------------------------------------
|
| POST /api/software-directory/{slug}/ratings
|
| Membutuhkan authentication.
|
*/

export const createSoftwareRating = async (
  slug: string,
  data: SoftwareRatingPayload,
): Promise<SoftwareRatingResponse> => {
  const response = await api.post<SoftwareRatingResponse>(
    `/software-directory/${slug}/ratings`,
    data,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Software Rating
|--------------------------------------------------------------------------
|
| PUT /api/software-ratings/{id}
|
*/

export const updateSoftwareRating = async (
  id: number,
  data: SoftwareRatingPayload,
): Promise<SoftwareRatingResponse> => {
  const response = await api.put<SoftwareRatingResponse>(
    `/software-ratings/${id}`,
    data,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Software Comparison
|--------------------------------------------------------------------------
|
| GET /api/software-comparison?software[]=figma&software[]=canva
|
| Digunakan untuk membandingkan beberapa software
| berdasarkan:
|
| - Informasi software
| - Category
| - Features
| - Pricing
| - Integrations
| - Average rating
| - Total ratings
|
*/

export const getSoftwareComparison = async (
  softwareSlugs: string[],
): Promise<SoftwareComparisonResponse> => {
  if (softwareSlugs.length < 2) {
    throw new Error("Minimal pilih 2 software untuk dibandingkan.");
  }

  if (softwareSlugs.length > 4) {
    throw new Error("Maksimal 4 software dapat dibandingkan.");
  }

  const response = await api.get<SoftwareComparisonResponse>(
    "/software-comparison",
    {
      params: {
        software: softwareSlugs,
      },
    },
  );

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
  const response = await api.get<SoftwareDetailResponse>(
    `/softwares/${id}`,
  );

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
  const response = await api.post<SoftwareDetailResponse>(
    "/softwares",
    data,
  );

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

export const deleteSoftware = async (
  id: number,
): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(
    `/softwares/${id}`,
  );

  return response.data;
};