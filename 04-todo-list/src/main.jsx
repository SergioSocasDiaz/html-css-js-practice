import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'

const initialTareas = JSON.parse(localStorage.getItem('tareas'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialTareas={initialTareas}/>
  </StrictMode>,
)
