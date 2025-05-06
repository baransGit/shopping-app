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

    openDrawer: useCallback(() => dispatch(setDrawerOpen(true)), [dispatch]),
    closeDrawer: useCallback(() => dispatch(setDrawerOpen(false)), [dispatch]),
    addItem: useCallback(
      (productId: number) => dispatch(addToCart(productId)),
      [dispatch]
    ),
    removeItem: useCallback(
      (productId: number) => dispatch(removeFromCart(productId)),
      [dispatch]
    ),
    updateItemQuantity: useCallback(
      (productId: number, quantity: number) => {
        if (!isValidQuantity(quantity)) return;
        dispatch(updateQuantity({ productId, quantity }));
      },
      [dispatch]
    ),
    clearItems: useCallback(() => dispatch(clearItems()), [dispatch]),
  };
};
