import { api } from "../../../shared/lib/axios";
import { AxiosError } from "axios";

export const productAPI = {
  // Get all products
  getProducts: async () => {
    console.log("Fetching all products...");
    const { data } = await api.get("/products?limit=0");
    console.log("All products response:", data);
    return data.products;
  },

  getProductsByGroup: async (categorySlug: string) => {
    try {
      console.log("Fetching products for category:", categorySlug);
      // DummyJSON API endpoint
      const { data } = await api.get(`/products/category/${categorySlug}`);
      console.log("API Response:", data);

      if (!data || !data.products) {
        throw new Error("Products not found");
      }

      return data.products;
    } catch (error) {
      console.error("API Error Details:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new Error("Products not found");
        }
      }
      throw new Error("Failed to load products");
    }
  },

  // Get single product
  getProduct: async (id: number) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};
