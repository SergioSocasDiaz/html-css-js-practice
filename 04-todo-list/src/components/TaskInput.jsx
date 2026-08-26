import { useState } from 'react'
import styles from './taskInput.module.css'
export function TaskInput({onSubmit}){
    const [content,setContent] = useState('')
    
    return(
        <form className={styles.form} onSubmit={(event)=>{
            onSubmit(event)
            setContent('')
            }} >
            <input  name='input' className={styles.input} placeholder="Nueva tarea..." value={content} onChange={(event)=>setContent(event.target.value)} required></input>
            <button className={styles.button}>Añadir</button>
        </form>
    )
}