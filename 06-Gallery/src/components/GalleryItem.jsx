import {Link} from './Link.jsx'
import styles from '../styles/galleryItem.module.css'
import {motion} from 'framer-motion'

export function GalleryItem({product}) {
    function parseText(text){
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
    return(

        <Link className={styles.link}>
        <motion.div 
            className={styles.container}
            initial={{opacity: 0, y: 5}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.7, timingFunction: 'easeInOut'}}
        >
            <img className={styles.img} src={product.images[0]}></img>
            <div className={styles.info}>
                <small className={styles.category}>{product.category.toUpperCase()}</small>
                <span className={styles.important}>{parseText(product.title)}</span>
                <span className={styles.important}>{`${product.price}€`}</span>
            </div>
            
        </motion.div>
        </Link>
        
    )
}