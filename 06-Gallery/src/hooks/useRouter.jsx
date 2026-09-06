import {useState, useEffect} from 'react'

export function useRouter() {
    const [path, setPath] = useState(`${window.location.pathname}`)
    // Almacenamos la ruta actual en el estado path, inicializándola con la ruta actual del navegador.

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname)
        }
        // Definimos una función handlePopState que actualiza el estado path con la ruta actual del navegador.
    
        window.addEventListener('popstate', handlePopState)
        // Agregamos un event listener al evento 'popstate' del objeto window, que se dispara cuando el usuario navega hacia atrás o hacia adelante en el historial del navegador.

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }

        //Devolvemos el cleaner que elimina el event listener cuando el componente se desmonta, evitando posibles fugas de memoria.
    })

    function navigateTo(path) {
        window.history.pushState({}, '', path)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return [ path, navigateTo ]
}