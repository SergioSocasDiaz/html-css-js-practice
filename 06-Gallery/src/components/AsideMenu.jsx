import styles from '../styles/asideMenu.module.css'
import {useState, useEffect} from 'react'
export function AsideMenu({isOpen}) {

    const className = isOpen ? `${styles.aside} ${styles.isOpen}` : `${styles.aside} ${styles.isClosed}`
    const [render, setRender] = useState(isOpen)

    // Establecemos un estado interno que nos dice si renderizaos el componente o no

    useEffect(()=>{
        if(isOpen){
            setRender(true)
        }
    }, [isOpen])
    // SI esta abierto cambiamos a que SI tenemos que renderizarlo
    if (!render) return null

    return(
        <aside className={className}
            onAnimationEnd={
                // Una vez que termine la animacion de cierre, comprobamos estado y cancelamos el render
                ()=>{
                    if(!isOpen){
                        setRender(false)
                    }
                }
            }
        >
            <nav className={styles.nav}>
                <a className={styles.a}>New Arrivals</a>
                <a className={styles.a}>Collections</a>
                <a className={styles.a}>Men</a>
                <a className={styles.a}>Woman</a>
                <a className={styles.a}>Sales</a>
            </nav>
        </aside>
    )
}