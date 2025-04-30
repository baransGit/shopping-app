import { api } from "../../../shared/lib/axios";
import { CATEGORY_GROUPS } from "../constants/categoryGroups";
import { Category, CategoryGroup, RawCategory } from "../types/Category";

export const categoryApi = {
    getCategories: async (): Promise<CategoryGroup[]> => {
        try {
            const { data: rawCategories } = await api.get<RawCategory[]>('/products/categories');
            console.log('Raw Categories:', rawCategories);

            const categoryGroups = Object.values(CATEGORY_GROUPS).map(group => ({
                id: group.id,
                name: group.name,
                categories: rawCategories
                    .filter((rawCategory: RawCategory) => 
                        group.categories.includes(rawCategory.slug)
                    )
                    .map((rawCategory: RawCategory) => ({
                        slug: rawCategory.slug,
                        name: rawCategory.name,
                        url: rawCategory.url,
                        groupId: group.id,
                        image: `/images/categories/${rawCategory.slug}.jpg`
                    }))
            }));

            return categoryGroups;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    getProductsByCategory: async (categorySlug: string) => {
        try {
            const { data } = await api.get(`/products/category/${categorySlug}`);
            return data.products;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};