import styles from './counter.module.css'

export function Counter({number}){
    return(
        <span className={styles.span}>{number}</span>
    )
}