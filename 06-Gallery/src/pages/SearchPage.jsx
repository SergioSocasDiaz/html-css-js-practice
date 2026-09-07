import { SearchBar } from '../components/SearchBar.jsx'
import { Gallery } from '../components/Gallery.jsx'
import { Navigation } from '../components/Navigation.jsx'
import { useRouter } from '../hooks/useRouter.jsx'
import { useState, useEffect, useRef } from 'react'
import { Loading } from '../components/Loading.jsx'

const ITEM_PER_PAGE = 8

export function SearchPage() {
    const [_, navigateTo] = useRouter()

    const [textToFilter, setTextToFilter] = useState(()=>{
        const url = new URL(window.location)
        return url.searchParams.get('q') || ''
    })
    const [products, setProducts] = useState([])

    const timeOut=  useRef(null)



    const [totalPages,setTotalPages] = useState(0)
    const [currentPage,setCurrentPage] = useState(()=>{
        const url = new URL(window.location)
        return url.searchParams.get('page') ? parseInt(url.searchParams.get('page')) : 1
    })

    const [isLoading, setIsLoading] = useState(false)
    /*
    De normal hariamos esto pero me he dado cuenta que hariamos dos renders inecesarios:
        1. Cuando cambiamos el currentPage
        2. Cuando navegamos mediante el enlace

    !Lo mejor es unicamente usar la URL
    */
    function handleSearchChange (event) {
        setTextToFilter(event.target.value)
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const handleNextPage = () => {
        if (currentPage === totalPages) {
            return
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage === 1) {
            return
        } else {
            setCurrentPage(currentPage - 1)
        }
    }
    useEffect(()=>{
        timeOut.current = setTimeout(async ()=>{
            setIsLoading(true)
            const url = new URL(window.location)
            if(textToFilter !== ''){
                url.searchParams.set('q',textToFilter)
            }
            navigateTo(`${url.pathname}${url.search}`)

            //Usar skip y limit para paginar los resultados, y usar sort para ordenar los resultados.
            const urlToFetch = textToFilter === '' ? `https://dummyjson.com/products?limit=${ITEM_PER_PAGE}&skip=${(currentPage-1)*ITEM_PER_PAGE}` : `https://dummyjson.com/products/search?q=${textToFilter}&limit=${ITEM_PER_PAGE}&skip=${ITEM_PER_PAGE*(currentPage-1)}&delay=1000`
            await fetch(urlToFetch)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setTotalPages(Math.ceil(data.total/ITEM_PER_PAGE))
                console.log(data)
            })
            setIsLoading(false)
        },500)
        
        
        //Se ejecuta o cuando se desmonta el componente, o cuando se vuelve a ejecutar el efecto, es decir, cuando cambia textToFilter. Esto evita que se acumulen múltiples timeouts si el usuario sigue escribiendo rápidamente.
        return () => {
            clearTimeout(timeOut.current)
        }

    },[textToFilter,currentPage])

    return(
        <>
            <SearchBar value={textToFilter} onChange={handleSearchChange}/>
            {isLoading ? <Loading/> : <Gallery products={products}/>}
            <Navigation 
                totalPages={totalPages} 
                currentPage={currentPage} 
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageChange={handlePageChange}
            />
        </>
    )
}