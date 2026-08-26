import {Header} from './components/Header.jsx'
import { TaskCounter } from './components/TaskCounter.jsx'
import { TaskInput } from './components/TaskInput.jsx'
import { TaskList } from './components/TaskList.jsx'
import { useState, useEffect } from 'react'
export function App({initialTareas}){
  let initialState
  if (initialTareas){
    initialState = initialTareas
  }else{
    initialState = [{id:crypto.randomUUID(),text:'Tarea placeholder',completed:false}]
  }
  const [tareas,setTareas] = useState(initialState)

  useEffect(() => {
  localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);
  const tareasOrdenadas = [...tareas].sort((a,b)=>a.completed-b.completed)
  const tareasPendientes = tareas.filter((tarea)=>!tarea.completed).length

  const handleInput =(event)=>{
    event.preventDefault()
    const newTareas = [...tareas]
    const newId = crypto.randomUUID()

    const formData = new FormData(event.target);
    const text = formData.get('input')

    newTareas.push({id:newId, text:text,completed:false})
    setTareas(newTareas)
  }

  const handleDelete = (id)=>{
    const newTareas = [...tareas]
    setTareas(newTareas.filter((tarea)=> tarea.id !== id))
  }

  const handleToggleCompleted = (id)=>{
      setTareas(tareas.map((tarea)=>{
        if(tarea.id === id){
          return {...tarea, completed:!tarea.completed}
        }else{
          return tarea
        }
      }))
    }

  return(
    <div className='appContainer'>
      <Header/>
      <main>
        <TaskInput onSubmit={handleInput}/>
        <TaskList tareas={tareasOrdenadas} onDelete={handleDelete} onCompleted={handleToggleCompleted}/>
      </main>
      <TaskCounter count={tareasPendientes}/>
    </div>
  )

}
