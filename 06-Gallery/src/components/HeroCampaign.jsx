import styles from '../styles/herocampaing.module.css'
import {Link} from './Link.jsx'
export function HeroCampaign({product}) {
    if (product === null) return;
    const roundLength = Math.trunc(product?.title.length/2)
    const indexOfMidleSpace = product?.title.slice(roundLength).indexOf(' ') + roundLength
    const normalText = product?.title.slice(0, indexOfMidleSpace+1)
    const accentText = product?.title.slice(indexOfMidleSpace+1)
    return(
        <div className={styles.heroCampaign}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.4rem',alignItems:'center'}}>
                <span className={styles.campaign}>{product?.campaign}</span>
                <h1 className={styles.title}>
                    {normalText}<span>{accentText}</span>
                </h1>
                <p className={styles.description}>{product?.description}</p>
            </div>

            <Link className={styles.button}
                path='/search'
            >
                Explorar Catálogo
            </Link>
            <div className={styles.product}>
                <div className={styles.imgContainer}>
                    <img className={styles.img}src='/mockheroimage.jpeg'></img>
                    <div className={styles.productInfo}>
                        <span className={styles.productName}>{product?.productName}</span>
                        <span className={product?.mod? `${styles.mod}`: `${styles.invisible}`}>{product?.mod}</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}