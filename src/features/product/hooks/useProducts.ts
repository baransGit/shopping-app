import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../api/productApi";

export const useProducts = (categorySlug?: string) => {
  console.log("useProducts called with categorySlug:", categorySlug);
  return useQuery({
    queryKey: ["products", categorySlug],
    queryFn: () => {
      console.log("queryFn executing, categorySlug:", categorySlug);
      if (!categorySlug) {
        console.log("No categorySlug, fetching all products");
        return productAPI.getProducts();
      }
      return productAPI.getProductsByGroup(categorySlug);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: true,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productAPI.getProduct(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
