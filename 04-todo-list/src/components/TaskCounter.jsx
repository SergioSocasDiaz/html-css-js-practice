import styles from './taskCounter.module.css'
export function TaskCounter({count}){
    return(
        <footer>
            <span className={styles.span}>{count} TAREAS PENDIENTES</span>
        </footer>
    )
}