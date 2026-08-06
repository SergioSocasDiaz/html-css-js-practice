const themeButton = document.querySelector('#theme-button')
const dowloadButton = document.querySelector('#download-button')
const boldButton = document.querySelector('#bold-button')
const italicButton = document.querySelector('#italic-button')
const editorText  = document.querySelector('#editor-text')
const saveButton = document.querySelector('#save-file')
const deleteButton = document.querySelector('#delete-file')
const fileTitle = document.querySelector('#file-name')

loadData()
editorText.dispatchEvent(new Event('input'))

themeButton.addEventListener('click',()=>{
    document.documentElement.classList.toggle('white-theme')
})

dowloadButton.addEventListener('click',()=>{
    let textoMark = editorText.value
    const tempFile = new Blob([textoMark],{type: 'text/markdown'})

    const URLtemp = URL.createObjectURL(tempFile)


    const tempLink = document.createElement('a')
    tempLink.href = URLtemp
    if(fileTitle.value.trim() !== ''){
        tempLink.download = fileTitle.value.trim()
    }else{
        tempLink.download = 'Mi-archivo'
    }
    
    tempLink.click()

    URL.revokeObjectURL(tempFile)
})


function insert(type) {
    let textAdd
    let spaces
    switch (type){
        case'bold': 
            textAdd = '**'
            spaces = 2
            break;
        case 'italic': 
            textAdd = '*'
            spaces = 1
            break;
    }
    
    const inicio = editorText.selectionStart
    const final = editorText.selectionEnd
    const textoIni = editorText.value
    const nuevoTexto = textoIni.slice(0,inicio) + textAdd + textoIni.slice(inicio,final) + textAdd + textoIni.slice(final)

    editorText.value = nuevoTexto
    if(inicio === final){
        editorText.setSelectionRange(inicio+spaces,inicio+spaces)
    }

    // Para recuperar el puntero y foco
    editorText.focus()
}


const keyboardShortcut = {
    'b' : 'bold',
    'i': 'italic',
}


boldButton.addEventListener('click',()=> {insert('bold')})
italicButton.addEventListener('click',()=>{insert('italic')})


document.addEventListener('keydown',(event)=>{
    if (event.ctrlKey && event.key.toLocaleLowerCase() in keyboardShortcut){
        event.preventDefault()
        // Para evitar que el navegador haga caso a la conbimanción que acabamos de hacer
        insert(keyboardShortcut[event.key.toLocaleLowerCase()])


    }
    
})

saveButton.addEventListener('click',()=>{
    const textToSave = JSON.stringify(editorText.value)
    localStorage.setItem('text',textToSave)
    Swal.fire({
        title: "Saved Succesfully",
        text: "",
        icon: "success"
    });
})

function loadData(){
    const data = localStorage.getItem('text')
    if (data){
        editorText.value = JSON.parse(data)
    }
}

deleteButton.addEventListener('click',()=>{
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) 
    Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
    });
    localStorage.setItem('text','')
});
})