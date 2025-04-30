import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import { useCart } from '../../../cart/hooks/useCart'
import { formatPrice } from "../../../../shared/utils/formatters/currency";
import { ImageGallery } from "../../components/ImageGallery";
import { Button } from "../../../../shared/components/Button";
import styles from './styles.module.css'


// src/features/product/pages/ProductDetail/index.tsx
export const ProductDetail = () => {   
    const { id } = useParams()
    const { data: product, isLoading } = useProduct(Number(id))
    const { addItem } = useCart()

    if (isLoading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

    return (
        <div className={styles.container}>
            <ImageGallery
                images = {product.images}
                title= {product.title}
                />
            <div className={styles.info}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p className={styles.price}>{formatPrice(product.price)}</p>
                <div className={styles.details}>
                    <span className={styles.rating}>Rating: {product.rating}</span>
                    <span className={styles.stock}>Stock: {product.stock}</span>
                </div>
                <div className = {styles.colorOptions}>
                    <span className = {styles.colorLabel}>Color:</span>
                    <span className = {styles.color}>{product.color}</span>
                </div>
                <Button 
                    variant ="primary"
                    className={styles.addButtonMargin}
                    onClick={() => addItem(product.id)}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}
