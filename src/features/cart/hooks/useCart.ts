import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import { RootState } from "../../../app/store";
import { useProducts } from "../../product/hooks/useProducts";
import { getCartItemWithDetails } from "../utils/helpers";
import calculations from "../utils/calculations";

import {
  setDrawerOpen,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearItems,
} from "../slice";
import { formatCartSummary, formatQuantity } from "../utils/formatters";
import { isValidQuantity } from "../utils/validators";

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, isDrawerOpen } = useSelector((state: RootState) => state.cart);
  const { data: products = [], isLoading: isProductsLoading } = useProducts();

  console.log("useCart - products loading:", isProductsLoading);
  console.log("useCart - products data:", products);

  const subTotal = useMemo(
    () => calculations.calculateSubTotal(items, products),
    [items, products]
  );

  const itemCount = calculations.calculateTotalItems(items);

  return {
    items,
    isOpen: isDrawerOpen,
    isLoading: isProductsLoading,
    subTotal,
    itemCount,
    cartSummary: formatCartSummary(itemCount),
    getCartItemWithDetails: (productId: number) =>
      getCartItemWithDetails(items, products, productId),
    products,

    openDrawer: () => dispatch(setDrawerOpen(true)),
    closeDrawer: () => dispatch(setDrawerOpen(false)),
    addItem: (productId: number) => dispatch(addToCart(productId)),

    removeItem: (productId: number) => dispatch(removeFromCart(productId)),
    updateItemQuantity: (productId: number, quantity: number) => {
      if (!isValidQuantity(quantity)) return;
      dispatch(updateQuantity({ productId, quantity }));
    },

    clearItems: () => dispatch(clearItems()),
  };
};
