import { useCart } from "../../hooks/useCart";
import { Image } from "../../../../shared/components/Image";
import { formatPrice } from "../../../../shared/utils/formatters/currency";
import { Button } from "../../../../shared/components/Button";
import styles from "./cartItem.module.css";

export const CartItem = ({ productId }: { productId: number }) => {
  const { updateItemQuantity, removeItem, getCartItemWithDetails, isLoading } =
    useCart();
  const cartItem = getCartItemWithDetails(productId);

  if (isLoading) {
    return (
      <div className={styles.loadingItem}>
        <div className={styles.loadingText}>Yükleniyor...</div>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (!cartItem) {
    return (
      <div className={styles.errorItem}>
        <div className={styles.errorText}>Ürün bulunamadı</div>
        <Button
          variant="text"
          size="small"
          onClick={() => removeItem(productId)}
          className={styles.removeButton}
        >
          Sepetten Kaldır
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.cartItem}>
      <Image
        src={cartItem.thumbnail}
        alt={cartItem.title}
        className={styles.itemImage}
        fit="cover"
        loading="eager"
      />
      <div className={styles.itemDetails}>
        <h3>{cartItem.title}</h3>
        <p className={styles.itemPrice}>{formatPrice(cartItem.price)}</p>
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
        <Button
          variant="text"
          size="small"
          onClick={() => removeItem(productId)}
          className={styles.removeButton}
        >
          Kaldır
        </Button>
      </div>
    </div>
  );
};
