const input = document.querySelector('input')

const searchResults = document.querySelector('#search-results')

const boxResults = document.querySelector('.box-results')



let temporizador
export let pais


input.addEventListener('input',()=> {
    //Elimina el anterior temporizador hecho
    clearTimeout(temporizador)
    const valorBusqueda = input.value.trim()
    //Establecemos un contador para limitar las llamadas a la API
    if(valorBusqueda !== ''){
        temporizador = setTimeout(()=>{
        //! Los inputs no tienen textContent si no valores
        llamadaDatosGeoBusqueda(tratadoDeBusqueda(valorBusqueda),pais)
    },500)
    
    }
    
    
})

export function tratadoDeBusqueda(busqueda){
    return busqueda.trim().replace(' ','+')
}

function llamadaDatosGeoBusqueda(name){
    vaciarListaBusqueda()
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=es&format=json`)
    .then(datos =>{
        return datos.json()
    }).then(datos=>{
        crearElementosLista(datos)
    })
}



function crearElementosLista(datos){
    if(!datos['results']){
        boxResults.classList.add('invisible')
        boxResults.classList.remove('visible')

        return
    }
    boxResults.classList.remove('invisible')
    boxResults.classList.add('visible')
    datos['results'].forEach(element =>{

        const objeto = {
            id: element.id,
            name: element.name,
            latitude: element.latitude,
            longitude: element.longitude,
        }

        
        let liElement = document.createElement('li')
            // Hay que ver como tratar los paises
            liElement.textContent = `${element['name']} | ${element.country}`
            liElement.classList.add('option-search')
            searchResults.appendChild(liElement)
    })
}

export function vaciarListaBusqueda(){
    clearTimeout(temporizador)
    searchResults.innerHTML= ''
    boxResults.classList.add('invisible')
}



// Realización de guardado de elección

searchResults.addEventListener('click',(evento)=>{
    if(evento.target.classList.contains('option-search')){
        pais = undefined
        input.value = evento.target.textContent
        input.focus()
    }
})




