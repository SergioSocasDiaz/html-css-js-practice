const editorText  = document.querySelector('#editor-text')
const visualField = document.querySelector('#visual-field')



function debounce(fn,time = 300){
    let contador
    return (...args) =>{
        clearTimeout(contador)
        contador = setTimeout(()=> fn(...args),time)
    }
}

const debounceUpdate = debounce(()=>{
    let textoMark = editorText.value
    visualField.innerHTML = DOMPurify.sanitize(marked.parse(textoMark))
},200)

editorText.addEventListener('input',debounceUpdate)

/*editorText.addEventListener('input', ()=>{
    let textoMark = editorText.value
    visualField.innerHTML = DOMPurify.sanitize(marked.parse(textoMark))
})*/

