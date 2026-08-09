import {tratadoDeBusqueda,vaciarListaBusqueda} from './fetch-location.js'
import {pais} from './fetch-location.js'
const form = document.querySelector('#form-busqueda')


const cityName = document.querySelector('#city-name')
const cityTemperature = document.querySelector('#city-temperature')
const temperatureUnit = document.querySelector('#temperature-unit')
const cityWeatherCode = document.querySelector('#city-weathercode')
const cityPrecipitation = document.querySelector('#city-precipitation')
const weatherIcon = document.querySelector('weather-icon')
const glassBox = document.querySelector('.glass-box')
const chart = document.querySelector('.chart-container')


let eleccion

export let Rawdata
let DEFAULT_CITY = {
    latitude: '40.4165',
    longitude: '-3.70256',
    name: 'Madrid'
}


if(localStorage.getItem('last-city')){
    DEFAULT_CITY = JSON.parse(localStorage.getItem('last-city'))
}

obtenerClima(DEFAULT_CITY)

form.addEventListener('submit',async (evento)=>{
    evento.preventDefault()
    vaciarListaBusqueda()
    const datos = new FormData(evento.target)
    const nombreBusqueda = tratadoDeBusqueda(datos.get('ciudad').split('|')[0])
    const pais = datos.get('ciudad').split('|')[1]?.trim()

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nombreBusqueda}&count=4&language=es&format=json`)
    .then((ciudad)=>{
        evento.target.reset()
        vaciarListaBusqueda()


        return ciudad.json()
    }).then((ciudad)=>{
        if(pais){
            ciudad.results.forEach(element => {
                if(element.country === pais){ eleccion = element}
            });
        }else{
            eleccion = ciudad.results[0]
        }
        if (eleccion){
            obtenerClima(eleccion)
        }else{
            obtenerClima(DEFAULT_CITY)
        }
        //? Coger unicamente los datos que nos interesan y posteriormente hacer una llamada a la otra API
        //! SI es UNdefined no hemos encontrado nada, cargamos la default (Eg:Madrid)
    })

})


function obtenerClima(eleccion){
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${eleccion.latitude}&longitude=${eleccion.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,precipitation,weather_code&timezone=auto`)
    .then((resultado)=>{            
        return resultado.json()
    }).then(async(resultado)=>{

        Rawdata = resultado

        document.dispatchEvent(new CustomEvent('weather-data-ready'))
        
        cityName.textContent = eleccion.name
        // AL hacer esto tambien estamos borrando el small de las unidades
        cityTemperature.innerHTML = `${resultado.current.temperature_2m}<small id="temperature-unit">${resultado.current_units.temperature_2m}</small>`
    
        cityPrecipitation.textContent = `Precipitation: ${resultado.current.precipitation}%`
        
        let weatherCode = translateWeatherCodes(resultado.current.weather_code)
        weatherIcon.dataset.value = weatherCode
        cityWeatherCode.textContent = capitaliceText(weatherCode)
        
        weatherIcon.render()

        glassBox.classList.remove('show-up')

        void glassBox.offsetWidth;
        glassBox.classList.add('show-up')
        chart.classList.remove('show-up')

        void chart.offsetWidth;
        chart.classList.add('show-up')
        
        localStorage.setItem('last-city',JSON.stringify(eleccion))
    })
}


export function translateWeatherCodes(code){
    const codes = {
        sunny: [0],
        semicloudy: [1,2],
        cloudy: [3],
        rainy: [51,53,55,56,57,61,63,65,66,67,80,81,82],
        stormy: [95,96,99],
    }

    for(const clave in codes){
        if (codes[clave].includes(code)) return clave
    }
}

function capitaliceText(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
}