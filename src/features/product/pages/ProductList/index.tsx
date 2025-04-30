import { useParams } from 'react-router-dom'
import { useNavigation } from '../../../../shared/hooks/useNavigation'
import {useProducts} from '../../hooks/useProducts'
import { ProductCard } from "../../components/ProductCard"
import {Product} from '../../types/Product'

import styles from './styles.module.css'



export const ProductList = ()=>{
    const {groupId} =useParams()
    const {goToProductDetail} = useNavigation()
    const {data:products, isLoading,error} =useProducts(groupId)

    console.log('GroupId:', groupId)  
    console.log('Products:', products) 
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading products</div>
    if (!products) return <div>No products found</div> // Ürün y
console.log('Products in component:', products) // Debug için

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
            {products?.map((product:Product)=>(
                <ProductCard
                    key={product.id}
                    product ={product}
                    onClick= {()=>goToProductDetail(product.id)}
                />
            ))}
            </div>
        </div>




    )



}