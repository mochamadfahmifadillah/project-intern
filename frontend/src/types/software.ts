export interface Software {
  id: number;
  name: string;
  category?: string;
  category_id?: number | string;
  description?: string;
  rating?: number;
  reviews?: number;
  pricing?: string;
  badge?: string;
  initials?: string;
  color?: string;
  logo?: string;
}

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  softwares_count?: number;
}
