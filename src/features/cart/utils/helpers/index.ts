import { CartItem } from "../../types";
import { Product } from "../../../product/types/Product";

export const findCartItem = (items: CartItem[], productId: number) => {
  if (!items?.length) return null;
  return items.find((item) => item.productId === productId);
};

export const getCartItemWithDetails = (
  items: CartItem[],
  products: Product[],
  productId: number
) => {
  if (!items?.length || !products?.length) return null;
  const cartItem = findCartItem(items, productId);
  const product = products.find((p) => p.id === productId);
  if (!cartItem || !product) return null;
  return { ...product, quantity: cartItem.quantity };
};
