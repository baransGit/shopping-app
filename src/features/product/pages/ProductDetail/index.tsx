/**
 * Product Detail Page
 * Displays detailed information about a single product
 *
 * Features:
 * - Image gallery with product photos
 * - Product information (title, description, price)
 * - Color options
 * - Add to cart functionality
 * - Loading and error states
 */

import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import { useCart } from "../../../cart/hooks/useCart";
import { formatPrice } from "../../../../shared/utils/formatters/currency";
import { ImageGallery } from "../../components/ImageGallery";
import { Button } from "../../../../shared/components/Button";
import styles from "./styles.module.css";

export const ProductDetail = () => {
  // Get product ID from URL parameters
  const { id } = useParams();
  const productId = Number(id);

  // Fetch product details and cart functionality
  const { data: product, isLoading } = useProduct(productId);
  const { addItem } = useCart();

  // Show loading state while fetching product details
  if (isLoading) {
    return <div>Loading product...</div>;
  }

  // Handle case where product is not found
  if (!product) return <div>Product not found</div>;

  // Handle add to cart
  const handleAddToCart = () => {
    addItem(productId);
  };

  return (
    <div className={styles.container}>
      {/* Product image gallery */}
      <ImageGallery images={product.images} title={product.title} />

      <div className={styles.info}>
        {/* Product title and description */}
        <h1>{product.title}</h1>
        <p>{product.description}</p>

        {/* Product price */}
        <p className={styles.price}>{formatPrice(product.price)}</p>

        {/* Product details */}
        <div className={styles.details}>
          <span className={styles.rating}>Rating: {product.rating}</span>
        </div>

        {/* Color options (if available) */}
        {product.color && (
          <div className={styles.colorOptions}>
            <span className={styles.colorLabel}>Color:</span>
            <span className={styles.color}>{product.color}</span>
          </div>
        )}

        {/* Add to cart button */}
        <Button
          variant="primary"
          className={styles.addButtonMargin}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
