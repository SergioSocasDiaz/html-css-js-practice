import {Link} from './Link.jsx'
import styles from '../styles/galleryItem.module.css'
export function GalleryItem({product}) {
    function parseText(text){
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
    return(
        <Link className={styles.link}>
        <div className={styles.container}>
            <img className={styles.img} src={product.images[0]}></img>
            <div className={styles.info}>
                <small className={styles.category}>{product.category.toUpperCase()}</small>
                <span className={styles.important}>{parseText(product.title)}</span>
                <span className={styles.important}>{`${product.price}€`}</span>
            </div>
            
        </div>
        </Link>
        
    )
}