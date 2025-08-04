import { useQuery } from "@tanstack/react-query";
import { categoryAPI } from "../api/categoryApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryAPI.getCategories,
    staleTime: 1000 * 60 * 5,
  });
};
