/*
|--------------------------------------------------------------------------
| Software Category
|--------------------------------------------------------------------------
*/

export interface SoftwareCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
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
  description?: string | null;
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
  name: string;
  price: number | string | null;
  description?: string | null;
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
  description?: string | null;
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
| Category
|--------------------------------------------------------------------------
|
| Kalau endpoint category kamu memang mengirim:
| - icon
| - softwares_count
|
| gunakan interface ini.
|
*/

export interface Category extends SoftwareCategory {
  icon?: string;
  softwares_count?: number;
}

/*
|--------------------------------------------------------------------------
| API Response
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

export interface SoftwareReviewsResponse {
  message: string;
  data: SoftwareReview[];
}

export interface SoftwareReviewResponse {
  message: string;
  data: SoftwareReview;
}

export interface SoftwareRatingsResponse {
  message: string;
  data: SoftwareRating[];
}

export interface SoftwareRatingResponse {
  message: string;
  data: SoftwareRating;
}

export interface MessageResponse {
  message: string;
}

/*
|--------------------------------------------------------------------------
| Public Software Params
|--------------------------------------------------------------------------
*/

export interface PublicSoftwareParams {
  search?: string;
  category?: string;
  pricing?: string;
}
