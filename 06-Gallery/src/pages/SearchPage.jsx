import { SearchBar } from '../components/SearchBar.jsx'
import { Gallery } from '../components/Gallery.jsx'
import { Navigation } from '../components/Navigation.jsx'
import { useRouter } from '../hooks/useRouter.jsx'
import { useState, useEffect, useRef } from 'react'
export function SearchPage() {
    const [_, navigateTo] = useRouter()
    const [textToFilter, setTextToFilter] = useState(()=>{
        const url = new URL(window.location)
        return url.searchParams.get('q') || ''
    })
    const [products, setProducts] = useState([])

    const timeOut=  useRef(null)
    function handleSearchChange (event) {
        setTextToFilter(event.target.value)
    }

    useEffect(()=>{
        timeOut.current = setTimeout(()=>{
            const url = new URL(window.location)
            url.searchParams.set('q',textToFilter)
            navigateTo(`${url.pathname}${url.search}`)

            //Usar skip y limit para paginar los resultados, y usar sort para ordenar los resultados.
            const urlToFetch = textToFilter === '' ? 'https://dummyjson.com/products' : `https://dummyjson.com/products/search?q=${textToFilter}&limit=5`
            fetch(urlToFetch)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                console.log(data)
            })
        },800)
        
        
        //Se ejecuta o cuando se desmonta el componente, o cuando se vuelve a ejecutar el efecto, es decir, cuando cambia textToFilter. Esto evita que se acumulen múltiples timeouts si el usuario sigue escribiendo rápidamente.
        return () => {
            clearTimeout(timeOut.current)
        }

    },[textToFilter])

    return(
        <>
            <SearchBar value={textToFilter} onChange={handleSearchChange}/>
            <Gallery products={products}/>
            <Navigation totalPages={5} currentPage={1}/>
        </>
    )
}