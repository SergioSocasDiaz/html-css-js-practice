import { Rawdata } from "./fetch-weather.js"
import { translateWeatherCodes } from "./fetch-weather.js"

const canvas = document.querySelector('#weather-chart')
const iconsChart = document.getElementsByClassName('weather-chart-icon')

let myChart = undefined

function renderChart(){

    if(myChart){
        myChart.destroy()
    }
    let rawLabels = Rawdata?.daily?.time
    rawLabels.forEach((element,index) => {
        const fecha = new Date(element);
        const opciones = {  
            weekday:'long',
            day: 'numeric'
        }
        let texto = fecha.toLocaleDateString('es-ES',opciones)
        texto = texto.charAt(0).toUpperCase() + texto.slice(1)
        rawLabels[index] = texto
    });
    const data = {
    datasets:[{
        type:'line',
        label:'Minimum-Temperature',
        data: Rawdata?.daily?.temperature_2m_min,
        
    },{
        type: 'line',
        label: 'Maximun-Temperature',
        data: Rawdata?.daily?.temperature_2m_max,
    }],
    labels: rawLabels
}
myChart = new Chart(canvas,
    {
        data,
        options:{
            plugins:{
                legend:{
                    display:false,
                },
            },
        },
    }
)
for(let i = 0; i<iconsChart.length;i++){
    let element = iconsChart[i]
    element.dataset.value= translateWeatherCodes(Rawdata?.daily?.weather_code[i])
    element.render()
}
}

document.addEventListener('weather-data-ready',renderChart)
