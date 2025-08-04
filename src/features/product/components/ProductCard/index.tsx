import { Product } from "../../types/Product";
import { Image } from "../../../../shared/components/Image";
import styles from "./styles.module.css";
import { formatPrice } from "../../../../shared/utils/formatters/currency";
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      <Image
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
        fit="cover"
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};
