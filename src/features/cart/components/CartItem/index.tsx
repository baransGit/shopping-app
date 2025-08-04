/**
 * CartItem Component
 * Displays and manages individual items in the shopping cart
 *
 * Features:
 * - Shows product image, title, and price
 * - Quantity adjustment controls
 * - Remove item functionality
 * - Loading and error states
 * - Responsive design
 */

import { useCart } from "../../hooks/useCart";
import { Image } from "../../../../shared/components/Image";
import { formatPrice } from "../../../../shared/utils/formatters/currency";
import { Button } from "../../../../shared/components/Button";
import styles from "./cartItem.module.css";

interface CartItemProps {
  productId: number; // Unique identifier for the product
}

export const CartItem = ({ productId }: CartItemProps) => {
  // Get cart functionality and item details from cart hook
  const { updateItemQuantity, removeItem, getCartItemWithDetails, isLoading } =
    useCart();
  const cartItem = getCartItemWithDetails(productId);

  // Show loading state while fetching item details
  if (isLoading) {
    return (
      <div className={styles.loadingItem}>
        <div className={styles.loadingText}>Loading...</div>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  // Handle case where item is not found
  if (!cartItem) {
    return (
      <div className={styles.errorItem}>
        <div className={styles.errorText}>Product is not found</div>
        <Button
          variant="text"
          size="small"
          onClick={() => removeItem(productId)}
          className={styles.removeButton}
        >
          Remove Item
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.cartItem}>
      {/* Product image */}
      <Image
        src={cartItem.thumbnail}
        alt={cartItem.title}
        className={styles.itemImage}
        fit="cover"
        loading="eager"
      />

      <div className={styles.itemDetails}>
        {/* Product title */}
        <h3>{cartItem.title}</h3>

        {/* Product price */}
        <p className={styles.itemPrice}>{formatPrice(cartItem.price)}</p>

        {/* Quantity controls */}
        <div className={styles.quantity}>
          <Button
            variant="outline"
            size="small"
            className={styles.quantityButton}
            onClick={() => updateItemQuantity(productId, cartItem.quantity - 1)}
            disabled={cartItem.quantity <= 1}
          >
            -
          </Button>
          <span>{cartItem.quantity}</span>
          <Button
            variant="outline"
            size="small"
            className={styles.quantityButton}
            onClick={() => updateItemQuantity(productId, cartItem.quantity + 1)}
          >
            +
          </Button>
        </div>

        {/* Remove item button */}
        <Button
          variant="text"
          size="small"
          onClick={() => removeItem(productId)}
          className={styles.removeButton}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
