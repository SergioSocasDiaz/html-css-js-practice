import rawData from '../data/books.json' with {type:'json'}

export const data = rawData

export function getBookById(id){
    return data.find(book=> book.id === id)
}

export function filterBooks(genre,available,author,title,year,limit,offset){
    // Una función filter devuelve true o false asi que podemos ayudarnos de variables para hacer comprobaciones mas fáciles
    const limitfun = limit ? parseInt(limit) : data.length
    const offsetfun = offset ? parseInt(offset) : 0
    return data.filter(book=>{
        const matchgenre = genre ? book.genre === genre : true
        const matchavailable = available? book.available === (available === 'true') : true
        const matchauthor = author ? book.author.toLowerCase().includes(author.toLowerCase()) : true
        const matchtitle = title ? book.title.toLowerCase().includes(title.toLowerCase()) : true
        const matchyear = year && year>0? book.publishedYear === parseInt(year) : true

        return(
            matchgenre &&
            matchavailable &&
            matchauthor &&
            matchtitle &&
            matchyear
        )
    }).slice(offsetfun,offsetfun+limitfun)
}

export function addBook(book){
    data.push(book)
}

export function nextId(){
    const lastId = data.length > 0 ? data.length : 0
    const zeros = '0'.repeat(4 - (lastId + 1).toString().length)
    return `b${zeros}${lastId + 1}`
}

export function deleteBook(id){
    const index = data.findIndex(book => book.id === id)
    if (index !== -1) {
        data.splice(index, 1)
        return true
    }
    return false
}