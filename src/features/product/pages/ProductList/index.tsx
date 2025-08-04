import { useParams } from "react-router-dom";
import { useNavigation } from "../../../../shared/hooks/useNavigation";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../types/Product";
import styles from "./styles.module.css";

export const ProductList = () => {
  const { categorySlug } = useParams();
  const { goToProductDetail } = useNavigation();
  const { data: products, isLoading, error } = useProducts(categorySlug);

  if (isLoading) return <div>Loading products...</div>;

  if (error) {
    return <div>{(error as Error).message || "Error loading products"}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => goToProductDetail(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
