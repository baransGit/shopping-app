import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { RootState } from "../../../app/store";
import { useProducts } from "../../product/hooks/useProducts";
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
  const { items, isDrawerOpen } = useSelector((state: RootState) => state.cart);
  const { data: products = [], isLoading: isProductsLoading } = useProducts();

  const subTotal = useMemo(
    () => calculations.calculateSubTotal(items, products),
    [items, products]
  );

  const itemCount = calculations.calculateTotalItems(items);

  return {
    // State
    items,
    isOpen: isDrawerOpen,
    isLoading: isProductsLoading,
    subTotal,
    itemCount,
    cartSummary: formatCartSummary(itemCount),
    products,

    // Helpers
    getCartItemWithDetails: (productId: number) =>
      getCartItemWithDetails(items, products, productId),

    // Actions
    openDrawer: () => dispatch(setDrawerOpen(true)),
    closeDrawer: () => dispatch(setDrawerOpen(false)),

    addItem: (productId: number) => {
      dispatch(addToCartLocal(productId));
    },

    removeItem: (productId: number) => {
      dispatch(removeFromCart(productId));
    },

    updateItemQuantity: (productId: number, quantity: number) => {
      dispatch(updateQuantityLocal({ productId, quantity }));
    },

    clearItems: () => dispatch(clearItems()),
  };
};
