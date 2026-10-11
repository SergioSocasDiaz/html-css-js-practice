import styles from '../styles/error.module.css'
import errorImage from '../assets/Error_image.png'
export function ErrorContent({handleReturnHome}){
    return(
        <div className={styles.div}>
            <h1 className={styles.h1}>Ha ocurrido un error</h1>
            <img src={errorImage} alt="Error" className={styles.img}/>
            <button onClick={handleReturnHome} className={styles.button}>Volver al inicio</button>
        </div>
    )
}
