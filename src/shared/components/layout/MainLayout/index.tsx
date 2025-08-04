import {Header} from '../Header/index'
import {Outlet} from 'react-router-dom' 
import styles from './styles.module.css'



export const MainLayout = ()=>{

    return (
        <div className={styles.layout}>
           <Header/>
           <main className={styles.mainContent}>
            <Outlet/>
           </main>
       
        </div>
    )
}
