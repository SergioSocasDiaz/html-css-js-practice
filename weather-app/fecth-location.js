const input = document.querySelector('input')

const searchResults = document.querySelector('#search-results')

const boxResults = document.querySelector('.box-results')

const form = document.querySelector('#form-busqueda')

let temporizador




let seleccion


input.addEventListener('input',()=> {
    //Elimina el anterior temporizador hecho
    clearTimeout(temporizador)
    const valorBusqueda = input.value.trim()
    //Establecemos un contador para limitar las llamadas a la API
    if(valorBusqueda !== ''){
        temporizador = setTimeout(()=>{
        //! Los inputs no tienen textContent si no valores
        llamadaDatosGeoBusqueda(tratadoDeBusqueda(valorBusqueda))
    },500)
    
    }
    
    
})

function tratadoDeBusqueda(busqueda){
    return busqueda.replace(' ','+')
}

function llamadaDatosGeoBusqueda(name){
    vaciarListaBusqueda()
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=4&language=es&format=json`)
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

function vaciarListaBusqueda(){
    searchResults.innerHTML= ''
}



// Realización de guardado de elección

searchResults.addEventListener('click',(evento)=>{
    if(evento.target.classList.contains('option-search')){
        input.value = evento.target.textContent 
    }
})


form.addEventListener('submit',async (evento)=>{
    evento.preventDefault()
    
    const datos = new FormData(evento.target)
    const nombreBusqueda = tratadoDeBusqueda(datos.get('ciudad'))

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nombreBusqueda}&count=1&language=es&format=json`)
    .then((ciudad)=>{
        return ciudad.json()
    }).then((ciudad)=>{
        const eleccion = ciudad.results
        console.log(eleccion)
        //? Coger unicamente los datos que nos interesan y posteriormente hacer una llamada a la otra API
        //! SI es UNdefined no hemos encontrado nada, cargamos la default (Eg:Madrid)
    })

})

