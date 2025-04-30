// src/features/cart/index.tsx
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Portal } from '../../shared/components/Portal'
import { DrawerHeader } from './components/DrawerHeader'
import { DrawerContent } from './components/DrawerContent'
import { DrawerFooter } from './components/DrawerFooter'
import styles from './styles.module.css'

export const CartDrawer = () => {
    const { isDrawerOpen } = useSelector((state: RootState) => state.cart)

    return (
        <Portal>
            <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
                <DrawerHeader />
                <DrawerContent />
                <DrawerFooter/>
            </div>
        </Portal>
    )
}