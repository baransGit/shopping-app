import { api } from "../../../shared/lib/axios";
import { CATEGORY_GROUPS } from "../constants/categoryGroups";
import type {
  Category,
  CategoryApiResponse,
  CategoryGroupWithData,
  RawCategory,
} from "../types/Category";

export const categoryAPI = {
  // Get all categories grouped by their parent category
  getCategories: async (): Promise<CategoryApiResponse> => {
    try {
      // Fetch raw categories from API
      const { data: rawCategories } = await api.get<RawCategory[]>(
        "/products/categories"
      );

      // Process and group categories
      const categories = Object.values(CATEGORY_GROUPS).map(
        (group): CategoryGroupWithData => ({
          id: group.id,
          name: group.name,
          categories: rawCategories
            .filter((raw) => group.categories.includes(raw.slug))
            .map(
              (raw): Category => ({
                slug: raw.slug,
                name: raw.name,
                url: raw.url,
                groupId: group.id,
                image: `/images/categories/${raw.slug}.jpeg`,
              })
            ),
        })
      );

      return { categories };
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error("Failed to load categories");
    }
  },

  getProductsByCategory: async (categorySlug: string) => {
    try {
      const { data } = await api.get(`/products/category/${categorySlug}`);
      return data.products;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
