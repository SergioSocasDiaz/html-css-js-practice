import { SearchBar } from '../components/SearchBar.jsx'
import { Gallery } from '../components/Gallery.jsx'
import { Navigation } from '../components/Navigation.jsx'
import { useRouter } from '../hooks/useRouter.jsx'
import { useState, useEffect, useRef } from 'react'
export function SearchPage() {
    const [path, navigateTo] = useRouter()
    
    const [textToFilter, setTextToFilter] = useState('')

    const timeOut=  useRef(null)
    function handleSearchChange (event) {
        setTextToFilter(event.target.value)
    }

    useEffect(()=>{
        timeOut.current = setTimeout(()=>{
            if(textToFilter === ''){
                navigateTo(window.location.pathname)
                return
            }
            const url = new URL(window.location)
            url.searchParams.set('title',textToFilter)
            navigateTo(`${url.pathname}${url.search}`)
        },800)

        //Se ejecuta o cuando se desmonta el componente, o cuando se vuelve a ejecutar el efecto, es decir, cuando cambia textToFilter. Esto evita que se acumulen múltiples timeouts si el usuario sigue escribiendo rápidamente.
        return () => {
            clearTimeout(timeOut.current)
        }

    },[textToFilter])

    return(
        <>
            <SearchBar value={textToFilter} onChange={handleSearchChange}/>
            <Gallery/>
            <Navigation/>
        </>
    )
}