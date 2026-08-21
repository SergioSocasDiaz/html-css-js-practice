import buttons from './data.json'

export function ButtonPad({handleClickNumber,handleClickOperand,handleClickEquals,handleClickClear}){

    const handleAction = (button)=>{
        switch(button.type){
            case 'number':
                handleClickNumber(button.value)
                break;
            case 'operator':
                handleClickOperand(button.value)
                break;
            case 'equals':
                handleClickEquals()
                break;
            case 'clear':
                handleClickClear()
                break;
            default:
                console.warn('Tipo de boton no identificado')
        }
    }
    return(
        <div className='buttonpad-container'>
            {buttons.map((button)=>
            <button
                key={button.id}
                className={`btn btn-${button.type} ${button.span? 'cero':''}`}
                onClick= {()=>{handleAction(button)}}
            >
            {button.label}
            </button>
            )}
        </div>
    )
}