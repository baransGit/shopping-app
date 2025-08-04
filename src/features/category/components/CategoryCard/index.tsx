

import { Image } from "../../../../shared/components/Image";
import styles from './styles.module.css'


interface CategoryCardProps{
    name:string,
    image:string,
    onClick:()=>void
}


export const CategoryCard =({name,image,onClick}:CategoryCardProps)=>{
    return(
        <div className={styles.card} onClick={onClick}>
            <Image
                src={image}
                alt={name}
                className= {styles.image}
                fit='cover'
            />
            <div  className= {styles.content}>
                <h2 className={styles.name}>{name}</h2>
            </div>    
        </div>
    )
}