import styles from './taskList.module.css'

import { TaskItem } from "./TaskItem.jsx"
export function TaskList({tareas,onDelete,onCompleted}){
    return(
        <ul className={styles.ul}>
            {tareas.map((tarea=>{
                return(
                    <TaskItem 
                    key={tarea.id} 
                    tarea={tarea} 
                    onDelete={onDelete} 
                    onCompleted={onCompleted}/>
                )
            }))}
        </ul>
        
    )
}