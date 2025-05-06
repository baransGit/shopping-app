// Raw data from API
export interface RawCategory {
  slug: string;
  name: string;
  url: string;
}

// Category data
export interface Category {
  slug: string;
  name: string;
  url: string;
  groupId: string;
  image: string;
}

// Static category group (for configuration)
export interface CategoryGroup {
  id: string;
  name: string;
  categories: string[]; // category slugs
}

// Runtime category group (after API call)
export interface CategoryGroupWithData {
  id: string;
  name: string;
  categories: Category[];
}

// API response type
export interface CategoryApiResponse {
  categories: CategoryGroupWithData[];
}
