import { SearchBar } from '../components/SearchBar.jsx'
import { Gallery } from '../components/Gallery.jsx'
import { Navigation } from '../components/Navigation.jsx'
import { useRouter } from '../hooks/useRouter.jsx'
import { useState, useEffect, useRef } from 'react'
import { Loading } from '../components/Loading.jsx'
import { NotFoundContent } from '../components/NotFoundContent.jsx'
import { ErrorContent } from '../components/ErrorContent.jsx'

const ITEM_PER_PAGE = 8

export function SearchPage() {
    const [_, navigateTo] = useRouter()

    const [textToFilter, setTextToFilter] = useState(()=>{
        const url = new URL(window.location)
        return url.searchParams.get('q') || ''
    })
    const [debounceTextToFilter,setDebounceTextToFilter] = useState(textToFilter)

    const [products, setProducts] = useState([])

    const timeOut=  useRef(null)



    const [totalPages,setTotalPages] = useState(0)

    const [currentPage,setCurrentPage] = useState(()=>{
        const url = new URL(window.location)
        return url.searchParams.get('page') ? parseInt(url.searchParams.get('page')) : 1
    })

    const [isLoading, setIsLoading] = useState(false)

    const [hasError,setHasError] = useState(false)

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

    const handleReturnHome = () => {
        navigateTo('/')
    }
    // UseEffect para hacer debounce unicamente en la busqueda y que la navegación sea instantanea
    useEffect(()=>{
        timeOut.current = setTimeout(()=>{
            setDebounceTextToFilter(textToFilter)
            setCurrentPage(1)
        },500)
        return () => clearTimeout(timeOut.current)
    },[textToFilter])

    const handleResetSearch = () => {
        setTextToFilter('')
        setDebounceTextToFilter('')
        setCurrentPage(1)
    }

    useEffect(()=>{
       // Tenemos que declarar la función ya que useEffect no puede ser async ya que devuelve una promesa
        async function fetchData() {
            setIsLoading(true)
            //Usar skip y limit para paginar los resultados, y usar sort para ordenar los resultados.                
            const urlToFetch = textToFilter === '' ? `https://dummyjson.com/products?limit=${ITEM_PER_PAGE}&skip=${(currentPage-1)*ITEM_PER_PAGE}` : `https://dummyjson.com/products/search?q=${textToFilter}&limit=${ITEM_PER_PAGE}&skip=${ITEM_PER_PAGE*(currentPage-1)}&delay=1000`
            await fetch(urlToFetch)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setTotalPages(Math.ceil(data.total/ITEM_PER_PAGE))
                })
            setIsLoading(false)
        }
        try{
            fetchData()
        }catch(error){
            return(
                <p>Ha ocurrido un error en la busqueda</p>
            )
        }
        
    
        
        //Se ejecuta o cuando se desmonta el componente, o cuando se vuelve a ejecutar el efecto, es decir, cuando cambia textToFilter. Esto evita que se acumulen múltiples timeouts si el usuario sigue escribiendo rápidamente


    },[debounceTextToFilter,currentPage])

// HAy que tener un estado de error porque una variable normal react no se enteraria del cambio y no cambiaria el renderizado.
    const renderContent = () => {
        if(isLoading){
            return <Loading/>
        }
        if(products.length === 0){
            return <NotFoundContent handleResetSearch={handleResetSearch}/>
        }
        if(hasError){
            return <ErrorContent handleReturnHome={handleReturnHome}/>
        }
        return <Gallery products={products}/>
    }
    
    return(
        <>
            <SearchBar value={textToFilter} onChange={handleSearchChange}/>
            {renderContent()}
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