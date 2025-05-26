/**
 * Product Detail Page
 * Displays detailed information about a single product
 *
 * Features:
 * - Image gallery with product photos
 * - Product information (title, description, price)
 * - Real-time stock levels from backend
 * - Color options
 * - Add to cart functionality with backend validation
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
  const productId = Number(id);

  // Fetch product details and cart functionality
  const { data: product, isLoading } = useProduct(productId);
  const { addItem, useStockCheck, isAddingItem, addItemError } = useCart();

  // Real-time stok kontrolü
  const {
    data: stockData,
    isLoading: isStockLoading,
    error: stockError,
    refetch: refetchStock,
  } = useStockCheck(productId);

  // Show loading state while fetching product details
  if (isLoading) {
    return <div>Loading product...</div>;
  }

  // Handle case where product is not found
  if (!product) return <div>Product not found</div>;

  // Stok bilgileri
  const currentStock = stockData?.currentStock || 0;
  const isOutOfStock = !stockData?.available || currentStock === 0;
  const isLowStock = currentStock > 0 && currentStock <= 5;
  const canAdd = stockData?.available && !isAddingItem;

  // Handle add to cart
  const handleAddToCart = async () => {
    const mutation = addItem(productId);
    // Success/error handling mutation'dan geliyor
  };

  // Stock status text and styling
  const getStockStatus = () => {
    if (isStockLoading) {
      return { text: "Stok kontrol ediliyor...", className: styles.loading };
    }
    if (stockError) {
      return { text: "Stok bilgisi alınamadı", className: styles.error };
    }
    if (isOutOfStock) {
      return { text: "Stokta Yok", className: styles.outOfStock };
    }
    if (isLowStock) {
      return { text: `Son ${currentStock} adet`, className: styles.lowStock };
    }
    return { text: `${currentStock} adet stokta`, className: styles.inStock };
  };

  const stockStatus = getStockStatus();

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
          <span className={`${styles.stock} ${stockStatus.className}`}>
            {stockStatus.text}
          </span>
        </div>

        {/* Stock error handling */}
        {stockError && (
          <div className={styles.stockError}>
            Stok bilgisi alınamadı.{" "}
            <button
              onClick={() => refetchStock()}
              className={styles.retryButton}
            >
              Tekrar dene
            </button>
          </div>
        )}

        {/* Low stock warning */}
        {isLowStock && !isOutOfStock && (
          <div className={styles.lowStockWarning}>⚠️ Az sayıda ürün kaldı!</div>
        )}

        {/* Add to cart error */}
        {addItemError && (
          <div className={styles.addToCartError}>❌ {addItemError.message}</div>
        )}

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
          disabled={!canAdd || isOutOfStock || isStockLoading}
        >
          {isAddingItem
            ? "Sepete Ekleniyor..."
            : isOutOfStock
            ? "Stokta Yok"
            : canAdd
            ? "Sepete Ekle"
            : "Stok Kontrol Ediliyor..."}
        </Button>

        {/* Stock information */}
        <div className={styles.stockInfo}>
          <small>
            {isOutOfStock
              ? "Bu ürün şu anda stokta bulunmamaktadır."
              : isStockLoading
              ? "Stok bilgisi kontrol ediliyor..."
              : `Bu üründen ${currentStock} adet mevcuttur.`}
          </small>
        </div>
      </div>
    </div>
  );
};
