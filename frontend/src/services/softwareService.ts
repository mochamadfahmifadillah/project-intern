import api from "./api";

/*
|--------------------------------------------------------------------------
| Software Category
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

/*
|--------------------------------------------------------------------------
| Software Feature
|--------------------------------------------------------------------------
*/

export interface SoftwareFeature {
  id: number;
  software_id?: number;
  name: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Software Pricing
|--------------------------------------------------------------------------
*/

export interface SoftwarePricing {
  id: number;
  software_id?: number;

  pricing_type: "free" | "freemium" | "paid" | "custom";

  price: number | string | null;

  currency: string | null;

  billing_period: "monthly" | "yearly" | "one_time" | "custom" | null;

  description: string | null;

  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Software Integration
|--------------------------------------------------------------------------
*/

export interface SoftwareIntegration {
  id: number;
  software_id?: number;

  name: string;

  type: string | null;

  description: string | null;

  website_url: string | null;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Software Review
|--------------------------------------------------------------------------
|
| Backend:
| status = active | hidden
|--------------------------------------------------------------------------
*/

export interface SoftwareReview {
  id: number;
  software_id: number;
  user_id: number;

  review: string;

  status: "active" | "hidden";

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
| Software Rating Summary
|--------------------------------------------------------------------------
|
| Response:
|
| GET /api/software-directory/{slug}/ratings
|
| {
|   "average_rating": 2,
|   "total_ratings": 1,
|   "user_rating": null
| }
|
|--------------------------------------------------------------------------
*/

export interface SoftwareRatingSummary {
  average_rating: number;
  total_ratings: number;
  user_rating: number | null;
  user_rating_id: number | null;
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

  /*
   * Endpoint detail:
   *
   * "ratings": [
   *   {
   *     "id": 1,
   *     "software_id": 1,
   *     "user_id": 2,
   *     "rating": 2
   *   }
   * ]
   */
  ratings?: SoftwareRating[];

  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Software Comparison
|--------------------------------------------------------------------------
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

/*
|--------------------------------------------------------------------------
| Software Payload
|--------------------------------------------------------------------------
*/

export interface SoftwarePayload {
  category_id: number;

  name: string;

  slug?: string;

  description?: string | null;

  website_url?: string | null;

  logo?: string | null;

  status?: "active" | "inactive";
}

/*
|--------------------------------------------------------------------------
| Software Feature Payload
|--------------------------------------------------------------------------
*/

export interface SoftwareFeaturePayload {
  software_id: number;

  name: string;

  description?: string | null;
}

/*
|--------------------------------------------------------------------------
| Software Pricing Payload
|--------------------------------------------------------------------------
*/

export interface SoftwarePricingPayload {
  software_id: number;

  pricing_type: "free" | "freemium" | "paid" | "custom";

  price?: number | null;

  currency?: string | null;

  billing_period?: "monthly" | "yearly" | "one_time" | "custom" | null;

  description?: string | null;
}

/*
|--------------------------------------------------------------------------
| Software Integration Payload
|--------------------------------------------------------------------------
*/

export interface SoftwareIntegrationPayload {
  software_id: number;

  name: string;

  type?: string | null;

  description?: string | null;

  website_url?: string | null;

  is_active?: boolean;
}

/*
|--------------------------------------------------------------------------
| Software Review Payload
|--------------------------------------------------------------------------
*/

export interface SoftwareReviewPayload {
  review: string;
}

/*
|--------------------------------------------------------------------------
| Software Rating Payload
|--------------------------------------------------------------------------
*/

export interface SoftwareRatingPayload {
  rating: number;
}

/*
|--------------------------------------------------------------------------
| Public Software Params
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Software Response
|--------------------------------------------------------------------------
*/

export interface SoftwareResponse {
  message: string;
  data: Software[];
}

/*
|--------------------------------------------------------------------------
| Software Detail Response
|--------------------------------------------------------------------------
*/

export interface SoftwareDetailResponse {
  message: string;
  data: Software;
}

/*
|--------------------------------------------------------------------------
| Software Category Response
|--------------------------------------------------------------------------
*/

export interface SoftwareCategoryResponse {
  message: string;
  data: SoftwareCategory[];
}

/*
|--------------------------------------------------------------------------
| Software Review Response
|--------------------------------------------------------------------------
*/

export interface SoftwareReviewResponse {
  message: string;
  data: SoftwareReview;
}

/*
|--------------------------------------------------------------------------
| Software Reviews Response
|--------------------------------------------------------------------------
*/

export interface SoftwareReviewsResponse {
  message: string;
  data: SoftwareReview[];
}

/*
|--------------------------------------------------------------------------
| Software Rating Response
|--------------------------------------------------------------------------
*/

export interface SoftwareRatingResponse {
  message: string;
  data: SoftwareRating;
}

/*
|--------------------------------------------------------------------------
| Software Ratings Response
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Endpoint ini TIDAK mengembalikan array rating.
|
| GET /api/software-directory/{slug}/ratings
|
| data:
| {
|   average_rating: number,
|   total_ratings: number,
|   user_rating: number | null
| }
|
|--------------------------------------------------------------------------
*/

export interface SoftwareRatingsResponse {
  message: string;
  data: SoftwareRatingSummary;
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

/*
|--------------------------------------------------------------------------
| Message Response
|--------------------------------------------------------------------------
*/

export interface MessageResponse {
  message: string;
}

/*
|--------------------------------------------------------------------------
| Get All Softwares - Protected
|--------------------------------------------------------------------------
|
| GET /api/softwares
|--------------------------------------------------------------------------
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
|
| Optional:
|
| ?search=figma
| ?category=design
| ?search=figma&category=design
|--------------------------------------------------------------------------
*/

export const getPublicSoftwares = async (
  params?: PublicSoftwareParams,
): Promise<SoftwareResponse> => {
  const response = await api.get<SoftwareResponse>("/software-directory", {
    params: {
      ...(params?.search?.trim()
        ? {
            search: params.search.trim(),
          }
        : {}),

      ...(params?.category?.trim()
        ? {
            category: params.category.trim(),
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
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
*/

export const getPublicSoftwareDetail = async (
  slug: string,
): Promise<SoftwareDetailResponse> => {
  const safeSlug = encodeURIComponent(slug.trim());

  const response = await api.get<SoftwareDetailResponse>(
    `/software-directory/${safeSlug}`,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Public Software Reviews
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{slug}/reviews
|--------------------------------------------------------------------------
*/

export const getPublicSoftwareReviews = async (
  slug: string,
): Promise<SoftwareReviewsResponse> => {
  const safeSlug = encodeURIComponent(slug.trim());

  const response = await api.get<SoftwareReviewsResponse>(
    `/software-directory/${safeSlug}/reviews`,
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
| Authentication required.
|--------------------------------------------------------------------------
*/

export const createSoftwareReview = async (
  slug: string,
  data: SoftwareReviewPayload,
): Promise<SoftwareReviewResponse> => {
  const safeSlug = encodeURIComponent(slug.trim());

  const response = await api.post<SoftwareReviewResponse>(
    `/software-directory/${safeSlug}/reviews`,
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
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
*/

export const deleteSoftwareReview = async (
  id: number,
): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(`/software-reviews/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Public Software Rating Summary
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{slug}/ratings
|
| Backend response:
|
| {
|   "message": "Rating software berhasil diambil.",
|   "data": {
|     "average_rating": 2,
|     "total_ratings": 1,
|     "user_rating": null
|   }
| }
|--------------------------------------------------------------------------
*/

export const getPublicSoftwareRating = async (
  slug: string,
): Promise<SoftwareRatingsResponse> => {
  const safeSlug = encodeURIComponent(slug.trim());

  const response = await api.get<SoftwareRatingsResponse>(
    `/software-directory/${safeSlug}/ratings`,
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
| Authentication required.
|--------------------------------------------------------------------------
*/

export const createSoftwareRating = async (
  slug: string,
  data: SoftwareRatingPayload,
): Promise<SoftwareRatingResponse> => {
  const safeSlug = encodeURIComponent(slug.trim());

  const response = await api.post<SoftwareRatingResponse>(
    `/software-directory/${safeSlug}/ratings`,
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
|--------------------------------------------------------------------------
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
| Delete Software Rating
|--------------------------------------------------------------------------
|
| DELETE /api/software-ratings/{id}
|--------------------------------------------------------------------------
*/

export const deleteSoftwareRating = async (
  id: number,
): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(`/software-ratings/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Software Comparison
|--------------------------------------------------------------------------
|
| GET /api/software-comparison
|
| Example:
|
| ?software[]=figma
| &software[]=trello
|
| Minimal : 2
| Maksimal : 4
|--------------------------------------------------------------------------
*/

export const getSoftwareComparison = async (
  softwareSlugs: string[],
): Promise<SoftwareComparisonResponse> => {
  const cleanedSlugs = softwareSlugs.map((slug) => slug.trim()).filter(Boolean);

  if (cleanedSlugs.length < 2) {
    throw new Error("Minimal pilih 2 software untuk dibandingkan.");
  }

  if (cleanedSlugs.length > 4) {
    throw new Error("Maksimal 4 software dapat dibandingkan.");
  }

  const response = await api.get<SoftwareComparisonResponse>(
    "/software-comparison",
    {
      params: {
        software: cleanedSlugs,
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
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
*/

export const deleteSoftware = async (id: number): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(`/softwares/${id}`);

  return response.data;
};
