
import { Image } from '../../../../shared/components/Image'
import { ImageThumbnailsProps } from '../../types/Product'
import styles from './styles.module.css'
export const ImageThumbnails = ({
    images,
    selectedIndex,
    onSelect,
    title
}:ImageThumbnailsProps)=>{
    return(
        <div className = {styles.thumbnails}>
            {images.map((image,index)=>(
                <Image
                    key={index}
                    src={image}
                    alt={`${title} ${index+1} `}
                    className ={index===selectedIndex ? styles.activeThumbnail:styles.thumbnail}
                    onClick= {()=>onSelect(index)}
                    fit ="cover"
                />    
            ))}
        </div>
    )}