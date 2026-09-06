import { useEffect, useState } from 'react'
import {Header} from './components/Header.jsx'
import { Counter } from './components/Counter.jsx'
import { ButtonPad } from './components/ButtonPad.jsx'
import { ActivityPanel } from './components/ActivityPanel.jsx'
import {GooeyToaster, gooeyToast} from 'goey-toast'
import "goey-toast/styles.css";
import './App.css'

export function App(){

  const [count,setCount] = useState(0)
  const [activities,setActivity] = useState([])

  function handlePlus(){
    if(count >=100){ 
      gooeyToast.warning('You achived the highest limit: 100', {
      borderColor: '#E0E0E0',
      borderWidth: 1.5,
      preset: 'smooth',
      showTimestamp: false,
      })
      return
    }
    setCount((prev)=>prev+1)
    handleActivity('+1')

  }
  function handleMinus(){
    if(count <=0){
      gooeyToast.warning('You achived the lower limit: 0', {
      borderColor: '#E0E0E0',
      borderWidth: 1.5,
      preset: 'smooth',
      showTimestamp: false,
      })
      return
    }
    setCount((prev)=>prev-1)
    handleActivity('-1')
  }
  function handleReset(){
    setCount(0)
    handleActivity('Reset')
  }
  function handleActivity(text){
    
    const newActivity = {text:text, id:crypto.randomUUID()}
    setActivity((prev)=>[...newActivity,...prev].slice(0,3))
  }
  

  return(
    <>
      <Header/>
      <main>
        <GooeyToaster position="top-center" />
        <Counter number={count}/>
        <ButtonPad handleMinus={handleMinus} handlePlus={handlePlus} handleReset={handleReset}/>
        <ActivityPanel activities={activities}/>
      </main>
    </>
  )
}