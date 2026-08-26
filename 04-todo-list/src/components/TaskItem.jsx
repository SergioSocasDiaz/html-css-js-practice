import { useState } from 'react'
import styles from './taskItem.module.css'
export function TaskItem({tarea, onDelete, onCompleted}){
    const className = tarea.completed? `${styles.isCompleted} ${styles.li}` : `${styles.li}`
    return(
        <li className={className}>
            <div className={styles.div}>
                <input  className={styles.input} type="checkbox" checked={tarea.completed} onChange={()=>{onCompleted(tarea.id)}}></input>
                <span className={styles.span}>{tarea.text}</span>
            </div>
            <button onClick={()=>{onDelete(tarea.id)}}className={styles.button}>Eliminar</button>
        </li>
    )
}