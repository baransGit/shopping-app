import {useCart} from '../../hooks/useCart'
import { Button } from '../../../../shared/components/Button'
import {formatPrice} from '../../../../shared/utils/formatters/currency'
import styles from './drawerFooter.module.css'


export const DrawerFooter = () => {

const  {subTotal,itemCount,clearItems} = useCart()

    return (
        <div className={styles.footer}>
           <div className ={styles.summary}>
              <div className = {styles.summaryRow}>
                <span>Total({itemCount} items)</span>
                <span className={styles.price}>{formatPrice(subTotal)}</span>
              </div>
            </div>
            <div className ={styles.actions}> 
                <Button
                   variant='primary'
                   size='medium'
                   className = {styles.checkoutButton}
                   onClick={()=>{}}
                >
                    Checkout
                </Button>
                <Button
                    variant='secondary'
                    size='medium'
                    className = {styles.clearButton}
                    onClick = {clearItems}
                >
                    Clear Cart
                </Button>
            </div>
         </div>
 )
}
