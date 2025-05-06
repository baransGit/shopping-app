// src/features/category/constants/categoryGroups.ts
import type { CategoryGroup } from "../types/Category";

export const CATEGORY_GROUPS: Record<string, CategoryGroup> = {
  ELECTRONICS: {
    id: "electronics",
    name: "Electronics",
    categories: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  },
  FASHION: {
    id: "fashion",
    name: "Fashion",
    categories: [
      "mens-shirts",
      "mens-shoes",
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
    ],
  },
  HOME: {
    id: "home",
    name: "Home & Living",
    categories: [
      "furniture",
      "home-decoration",
      "lighting",
      "kitchen-accessories",
    ],
  },
  BEAUTY: {
    id: "beauty",
    name: "Beauty & Care",
    categories: ["fragrances", "skincare", "beauty", "personal-care"],
  },
  ACCESSORIES: {
    id: "accessories",
    name: "Accessories",
    categories: [
      "mens-watches",
      "womens-watches",
      "womens-jewellery",
      "sunglasses",
    ],
  },
} as const;

export type CategoryGroupId = keyof typeof CATEGORY_GROUPS;
