import styles from "./drawerContent.module.css";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../CartItem";

export const DrawerContent = () => {
  const { items } = useCart();
  return (
    <div className={styles.content}>
      {items.map((cartItem) => (
        <CartItem key={cartItem.productId} productId={cartItem.productId} />
      ))}
    </div>
  );
};
