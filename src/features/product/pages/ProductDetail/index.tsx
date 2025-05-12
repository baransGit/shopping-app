/**
 * Product Detail Page
 * Displays detailed information about a single product
 *
 * Features:
 * - Image gallery with product photos
 * - Product information (title, description, price)
 * - Product details (rating, stock)
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

// src/features/product/pages/ProductDetail/index.tsx
export const ProductDetail = () => {
  // Get product ID from URL parameters
  const { id } = useParams();

  // Fetch product details and add item functionality
  const { data: product, isLoading } = useProduct(Number(id));
  const { addItem } = useCart();

  // Show loading state while fetching product details
  if (isLoading) return <div>Loading...</div>;

  // Handle case where product is not found
  if (!product) return <div>Product not found</div>;

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
          <span className={styles.stock}>Stock: {product.stock}</span>
        </div>

        {/* Color options */}
        <div className={styles.colorOptions}>
          <span className={styles.colorLabel}>Color:</span>
          <span className={styles.color}>{product.color}</span>
        </div>

        {/* Add to cart button */}
        <Button
          variant="primary"
          className={styles.addButtonMargin}
          onClick={() => addItem(product.id)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
