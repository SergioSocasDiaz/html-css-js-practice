class WeatherIcon extends HTMLElement{
    constructor(){
        super()

        // Aislamos el DOM
        this.attachShadow({mode: 'open'})
        // Soleado:0 SemiNublado:1 Nublado:2 Lluvia:3 Tormenta:4
        this.icons = ['sunny','semicloudy','cloudy','stormy','rainy']
    }
    
    render(){
        if(this.icons.includes(this.dataset.value)){
            this.shadowRoot.innerHTML = `
            <style>
            img{
                width: 100%;
                height: 100%;
                filter: drop-shadow(0px 0px 5px #00A3FF)
            }</style>
            <img src= "./images/${this.dataset.value}.svg">
            `
        }
        
        
    }

    connectedCallback(){
        this.render()
    }
}

customElements.define(`weather-icon`,WeatherIcon)