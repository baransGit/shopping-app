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
  console.log("Cart Helper - Items:", items);
  console.log("Cart Helper - Products:", products);
  console.log("Cart Helper - Looking for productId:", productId);
  console.log(
    "Cart Helper - Available product IDs:",
    products.map((p) => p.id)
  );

  if (!items?.length || !products?.length) return null;
  const cartItem = findCartItem(items, productId);
  const product = products.find((p) => p.id === productId);

  console.log("Cart Helper - Found cartItem:", cartItem);
  console.log("Cart Helper - Found product:", product);

  if (!cartItem || !product) return null;
  return { ...product, quantity: cartItem.quantity };
};
