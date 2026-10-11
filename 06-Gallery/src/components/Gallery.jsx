import { GalleryItem } from "./GalleryItem.jsx"
import styles from '../styles/gallery.module.css'
export function Gallery({products}) {
    return(
        <div className={styles.container}>
            {products.map((product)=>{
                return(
                    <GalleryItem key={product.id} product={product}/>
                )
            })
        }
        </div>
    )
}