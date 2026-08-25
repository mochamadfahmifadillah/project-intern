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

  pricing_model_id?: number;

  pricing_model?: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };

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

  ratings?: SoftwareRating[];

  created_at?: string;
  updated_at?: string;
}

/*
|--------------------------------------------------------------------------
| Software Comparison
|--------------------------------------------------------------------------
*/

export interface SoftwareComparisonVendor {
  id: number;
  name: string;
  description: string | null;
  website_url: string | null;
  logo: string | null;
}

export interface SoftwareComparisonFeature {
  id: number;
  name: string;
  description: string | null;
}

export interface SoftwareComparisonPricing {
  id: number;
  name: string | null;
  price: number | string | null;
  description: string | null;
}

export interface SoftwareComparisonIntegration {
  id: number;
  name: string;
  description: string | null;
}

export interface SoftwareComparisonRating {
  average_rating: number;
  total_ratings: number;
}

export interface SoftwareComparisonItem {
  id: number;
  category_id: number;

  name: string;
  slug: string;

  description: string | null;

  website_url: string | null;

  logo: string | null;

  status: "active" | "inactive";

  category: SoftwareCategory | null;

  vendor: SoftwareComparisonVendor | null;

  features: SoftwareComparisonFeature[];

  pricings: SoftwareComparisonPricing[];

  integrations: SoftwareComparisonIntegration[];

  rating: SoftwareComparisonRating;
}

/*
|--------------------------------------------------------------------------
| Recommendation
|--------------------------------------------------------------------------
|
| POST /api/v1/recommendations
|--------------------------------------------------------------------------
*/

export interface RecommendationPayload {
  category?: string;
  industry?: string;
  business_size?: string;
  pricing?: "free" | "freemium" | "paid" | "custom" | string;
}

/*
|--------------------------------------------------------------------------
| Recommendation Fit Indicators
|--------------------------------------------------------------------------
*/

export interface RecommendationFitIndicators {
  category: boolean;
  industry: boolean;
  business_size: boolean;
  pricing: boolean;
}

/*
|--------------------------------------------------------------------------
| Recommendation Software
|--------------------------------------------------------------------------
*/

export interface RecommendationSoftware {
  id: number;

  name: string;

  slug: string;

  description: string | null;

  website_url: string | null;

  logo: string | null;

  category?: SoftwareCategory;
}

/*
|--------------------------------------------------------------------------
| Recommendation Result
|--------------------------------------------------------------------------
*/

export interface RecommendationResult {
  rank: number;

  score: number | string;

  fit_indicators: RecommendationFitIndicators;

  software: RecommendationSoftware;
}

/*
|--------------------------------------------------------------------------
| Recommendation Session
|--------------------------------------------------------------------------
*/

export interface RecommendationSession {
  id: number;

  session_key: string | null;

  answers: {
    category?: string;
    industry?: string;
    business_size?: string;
    pricing?: string;
  };

  completed_at: string | null;
}

/*
|--------------------------------------------------------------------------
| Recommendation Data
|--------------------------------------------------------------------------
*/

export interface RecommendationData {
  session: RecommendationSession;

  results: RecommendationResult[];
}

/*
|--------------------------------------------------------------------------
| Recommendation Response
|--------------------------------------------------------------------------
*/

export interface RecommendationResponse {
  success?: boolean;

  message: string;

  data: RecommendationData;
}

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
  data: SoftwareRatingSummary;
}

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
| GET /api/v1/softwares
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
| GET /api/v1/software-directory
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
| GET /api/v1/software-comparison
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
*/

export const deleteSoftware = async (id: number): Promise<MessageResponse> => {
  const response = await api.delete<MessageResponse>(`/softwares/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Software Recommendation
|--------------------------------------------------------------------------
|
| POST /api/v1/recommendations
|
| Backend example:
|
| {
|   "category": "design",
|   "industry": "technology",
|   "business_size": "small-business",
|   "pricing": "free"
| }
|--------------------------------------------------------------------------
*/

export const createRecommendation = async (
  data: RecommendationPayload,
): Promise<RecommendationResponse> => {
  /*
  |--------------------------------------------------------------------------
  | Clean Payload
  |--------------------------------------------------------------------------
  */

  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) =>
        value !== undefined && value !== null && String(value).trim() !== "",
    ),
  ) as RecommendationPayload;

  /*
  |--------------------------------------------------------------------------
  | Validate Minimal One Criteria
  |--------------------------------------------------------------------------
  */

  if (Object.keys(cleanedData).length === 0) {
    throw new Error("Minimal satu kriteria recommendation harus diisi.");
  }

  /*
  |--------------------------------------------------------------------------
  | Request
  |--------------------------------------------------------------------------
  |
  | api.ts baseURL:
  |
  | http://127.0.0.1:8000/api
  |
  | Final endpoint:
  |
  | http://127.0.0.1:8000/api/v1/recommendations
  |
  |--------------------------------------------------------------------------
  */

  const response = await api.post<RecommendationResponse>(
    "/v1/recommendations",
    cleanedData,
  );

  return response.data;
};
