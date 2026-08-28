import styles from './buttonpad.module.css'

export function ButtonPad({handlePlus,handleMinus,handleReset}){
    return(
        <div className={styles.container}>
            <div className={styles.div}>
                <button className={`${styles.minusButton} ${styles.bigButton}`} onClick={handleMinus}>-</button>
                <button className={`${styles.plusButton} ${styles.bigButton}`} onClick={handlePlus}>+</button>
            </div>
            <div className={styles.div}>
                <button className={styles.resetButton} onClick={handleReset}>RESET</button>
            </div>
            
        </div>
        
    )
}