import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { RootState } from "../../../app/store";
import { useProducts } from "../../product/hooks/useProducts";
import {
  cartAPI,
  AddToCartResponse,
  UpdateQuantityResponse,
} from "../api/cartApi";
import { getCartItemWithDetails } from "../utils/helpers";
import calculations from "../utils/calculations";

import {
  setDrawerOpen,
  addToCart as addToCartLocal,
  removeFromCart,
  updateQuantity as updateQuantityLocal,
  clearItems,
} from "../slice";
import { formatCartSummary } from "../utils/formatters";

export const useCart = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { items, isDrawerOpen } = useSelector((state: RootState) => state.cart);
  const { data: products = [], isLoading: isProductsLoading } = useProducts();

  const subTotal = useMemo(
    () => calculations.calculateSubTotal(items, products),
    [items, products]
  );

  const itemCount = calculations.calculateTotalItems(items);

  // Stock check query
  const useStockCheck = (productId?: number) => {
    return useQuery({
      queryKey: ["stock", productId],
      queryFn: () => cartAPI.checkStock(productId!),
      enabled: !!productId,
      staleTime: 10000, // 10 seconds
      refetchInterval: 30000, // Update every 30 seconds
    });
  };

  // Add to cart mutation
  const addItemMutation = useMutation<AddToCartResponse, Error, number>({
    mutationFn: (productId: number) =>
      cartAPI.addToCart({ productId, quantity: 1 }),
    onSuccess: (response, productId) => {
      if (response.success) {
        // Update local state if backend is successful
        dispatch(addToCartLocal(productId));
        // Update stock cache
        queryClient.invalidateQueries({ queryKey: ["stock", productId] });
      }
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation<
    UpdateQuantityResponse,
    Error,
    { productId: number; quantity: number }
  >({
    mutationFn: ({ productId, quantity }) =>
      cartAPI.updateQuantity(productId, quantity),
    onSuccess: (response, { productId }) => {
      if (response.success) {
        // Update local state if backend is successful
        dispatch(
          updateQuantityLocal({ productId, quantity: response.newQuantity })
        );
        // Update stock cache
        queryClient.invalidateQueries({ queryKey: ["stock", productId] });
      }
    },
  });

  // Remove item mutation
  const removeItemMutation = useMutation<
    { success: boolean; message?: string },
    Error,
    number
  >({
    mutationFn: (productId: number) => cartAPI.removeFromCart(productId),
    onSuccess: (response, productId) => {
      if (response.success) {
        // Update local state if backend is successful
        dispatch(removeFromCart(productId));
        // Update stock cache
        queryClient.invalidateQueries({ queryKey: ["stock", productId] });
      }
    },
  });

  return {
    // State
    items,
    isOpen: isDrawerOpen,
    isLoading: isProductsLoading,
    subTotal,
    itemCount,
    cartSummary: formatCartSummary(itemCount),
    products,

    // Mutation states
    isAddingItem: addItemMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,

    // Helpers
    getCartItemWithDetails: (productId: number) =>
      getCartItemWithDetails(items, products, productId),
    useStockCheck, // For use in component

    // Actions
    openDrawer: () => dispatch(setDrawerOpen(true)),
    closeDrawer: () => dispatch(setDrawerOpen(false)),

    addItem: (productId: number) => {
      addItemMutation.mutate(productId);
      return addItemMutation;
    },

    removeItem: (productId: number) => {
      removeItemMutation.mutate(productId);
      return removeItemMutation;
    },

    updateItemQuantity: (productId: number, quantity: number) => {
      updateQuantityMutation.mutate({ productId, quantity });
      return updateQuantityMutation;
    },

    clearItems: () => dispatch(clearItems()),

    // Error states
    addItemError: addItemMutation.error,
    updateQuantityError: updateQuantityMutation.error,
    removeItemError: removeItemMutation.error,
  };
};
