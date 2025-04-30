import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../api/productApi";

export const useProducts = (groupId?: string) => {
  return useQuery({
    queryKey: ["products", groupId],
    queryFn: () => productAPI.getProducts(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
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
