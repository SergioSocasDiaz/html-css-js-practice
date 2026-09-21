import {GalleryItem} from './GalleryItem.jsx'
import styles from '../styles/seasonExpo.module.css'
export function SeasonExpo({products}) {
    return(
        <div className={styles.container}>
            <div className={styles.titles}>
                <span>SELECCIÓN DE GALERÍA</span>
                <h1>Exposior de Temporada</h1>
            </div>
            <div className={styles.showcase}>
                {products?.map((product, index) => (
                    <GalleryItem key={index} product={product}/>
                ))}
            </div>
        </div>
        
    )
}