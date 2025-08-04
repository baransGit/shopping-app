import { useState } from "react"
import { ImageGalleryProps } from "../../types/Product";
import { ImageThumbnails } from "../ImageThumbnails";
import { Image } from "../../../../shared/components/Image";
import styles from  './styles.module.css'



export const ImageGallery = ({images,title}:ImageGalleryProps) =>{
    const [selectedImage, setSelectedImage] = useState(0)
    return (
        <div className={styles.gallery}>
            <div className ={styles.mainImage}>
                <Image
                    src = {images[selectedImage]}
                    alt = {title}
                    fit = "contain"
                />
            </div>
            <ImageThumbnails
                images = {images}
                selectedIndex={selectedImage}
                onSelect = {setSelectedImage}
                title= {title}
            />
        </div>
    )
}