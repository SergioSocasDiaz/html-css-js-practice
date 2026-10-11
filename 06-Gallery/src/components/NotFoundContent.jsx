import styles from '../styles/notFoundContent.module.css'
export function NotFoundContent({handleResetSearch}) {
    return(
        <div className={styles.div}>
            <h1 className={styles.h1}>No hay resultados...</h1>
            <button onClick={handleResetSearch} className={styles.button}>Volver al inicio</button>
        </div>
    )
}