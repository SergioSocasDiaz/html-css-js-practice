import styles from './activity.module.css'
import {useEffect, useState} from 'react'
export function Activity({text}){
    const [time,setTime] = useState('Just Now')
    /*We prevent to change the Time it was created*/
    const [createdTime,_] = useState(Date.now())
    
    // We use useEffect to prevent create multiples interval, we create only one with the creation
    // We also return the cleanUp function when the component dispose
    useEffect(()=>{
        const interval = setInterval(()=>{
            changeTime()
            
        })
        return ()=> clearInterval(interval)
    },[createdTime])

    function changeTime(){
        const actualTime = Date.now()
        const dif = actualTime - createdTime

        const minutes = Math.floor((dif/(1000*60) %60))
        
        const text = minutes === 0 ? 'Just Now' : `${minutes}min`

        setTime(text)

    }
    return(
        <li className={styles.li}>{text}<span>{time}</span></li>
    )
}