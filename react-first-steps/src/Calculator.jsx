import { use, useState } from 'react'
import {Display} from './components/display.jsx'
import { ButtonPad } from './components/buttonpad.jsx'
import './calculator.css'


export function Calculator() {
  
  // 3 Estados
  const [display,setDisplay] = useState('0')
  const [prevValue,setPrevValue] = useState(null)
  const [operator,setOperator] = useState(null)
  // Flag que indica si el siguiente numero tiene que borrar el display
  const [waitingForOperand,setWaitingForOperand] = useState(true)
  
  // Diccionario de funciones
  const operaciones = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  };

  function handleClickNumber(number){
    if(waitingForOperand){
      setDisplay(String(number))
      setWaitingForOperand(false)
    }else{
      setDisplay(display+ String(number))
    }
  }

  function handleClickOperand(op){
    const currentValue = Number(display)

    if(operator && prevValue!== null && !waitingForOperand){
      const result = operaciones[operator](prevValue,currentValue)
      setPrevValue(result)
      setDisplay(String(result))

      // Estos console log imprimen resultados erroneos, ya que 
      console.log("result" + result)
      console.log("prevValue" + prevValue)
    }else{
      setPrevValue(currentValue)
    }
    setOperator(op)
    setWaitingForOperand(true)
  }

  function handleClickEquals(){
    let result
    if (operator){
      const currentValue = Number(display)
      result = operaciones[operator](prevValue,currentValue)
    }else{
      result = prevValue
    }
    setDisplay(result)

    
    setOperator(null)
    setPrevValue(null)
    setWaitingForOperand(true)
  }

  function handleClickClear(){
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }
  return (
    <div className='calculator-container'>
      <Display number={display}/>
      <ButtonPad handleClickNumber={handleClickNumber} handleClickOperand={handleClickOperand} handleClickEquals={handleClickEquals} handleClickClear={handleClickClear}></ButtonPad>
    </div>
  )
}


