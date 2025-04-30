import { CartItem } from "../../types";
import { Product } from "../../../product/types/Product";

const calculations = {
  calculateSubTotal: (items: CartItem[], products: Product[]) => {
    if (!items?.length || !products?.length) return 0;
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  },
  calculateTotalItems: (items: CartItem[]) => {
    if (!items?.length) return 0;
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
};

export default calculations;
