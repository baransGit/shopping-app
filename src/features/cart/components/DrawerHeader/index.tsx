import {useCart} from '../../hooks/useCart'
import {IoClose} from 'react-icons/io5'
import styles from './drawerHeader.module.css'


export const DrawerHeader = ()=>{
    const {closeDrawer} = useCart()
    return (
        <div className = {styles.header}>
            <h2 className={styles.title}>My Cart </h2>
            <button
                onClick = {closeDrawer}
                className = {styles.closeButton}
            >
                <IoClose size = {24} />
            </button>

        </div>
    )
}
