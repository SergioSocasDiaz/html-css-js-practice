import {deleteBook,getBookById,addBook,filterBooks,nextId} from './book.js'
import {json} from 'node:stream/consumers'


function sendJSON(res,data,statusCode=200){
    res.setHeader('Content-Type','application/json; charset=utf-8')
    res.writeHead(statusCode)
    res.end(JSON.stringify(data))
}

export async function handleRoutes(req,res){
    const method = req.method;
    const {pathname,searchParams} = new URL(req.url,`http://${req.headers.host}`)
    const [, resource, id] = pathname.split('/')
    if(pathname === '/health' && method === 'GET'){
        return sendJSON(res,{status:'ok',uptime:process.uptime()})
    }
    if(pathname === '/books' && method === 'GET'){
        const {genre,available,author,title,publishedYear,limit,offset} = Object.fromEntries(searchParams)
        if( (available !== undefined && !['true','false'].includes(available)) || parseInt(publishedYear) <= 0 || parseInt(limit)<=0 || parseInt(offset)<0){
            return sendJSON(res,{error:'Invalid query parameters'},400)
        }
        const filteredData = filterBooks(
            genre,
            available,
            author,
            title,
            parseInt(publishedYear),
            parseInt(limit),
            parseInt(offset)  
        )
        return sendJSON(res,filteredData)
    }
    if(resource === 'books' && method === 'GET'){
        if(id && getBookById(id)){
            return sendJSON(res,getBookById(id))
        }else{
            return sendJSON(res,{error:'Book not found'},404)
        }
    }

    if(pathname === '/books' && method === 'POST'){
        let body;
        try {
            body = await json(req);
        } catch {
            return sendJSON(res, { error: 'Invalid JSON in request body' }, 400);
        }
        const {title,author,genre,publishedYear,available} = body
        if(!title?.trim() || !author?.trim()|| !genre?.trim() || !Number.isInteger(Number(publishedYear)) || Number(publishedYear) < 0 || typeof available !== 'boolean'){
            return sendJSON(res,{error:'Missing required fields'},400)
        }

        const newBook = {
            id: nextId(),
            title: body.title,
            author: body.author,
            genre: body.genre,
            publishedYear: body.publishedYear,
            available: body.available,
            createdAt: new Date().toISOString(),
        }
        addBook(newBook)
        return sendJSON(res,newBook,201)
        

    }

    if(resource === 'books' && method === 'PATCH'){
        if(id && getBookById(id)){
            const body = await json(req)
            const book = getBookById(id)
            const {title,author,genre,publishedYear,available} = body
            
            // !{} es true si el objeto está vacío
            // Así que evaluamos que tenga keys el objeto
            if(body.id || body.createdAt || Object.keys(body).length === 0){
                return sendJSON(res,{error:'Missing request body'},400)
            }
            if(title?.trim()){
                book.title = title
            }
            if(author?.trim()){
                book.author = author
            }
            if(genre?.trim()){
                book.genre = genre
            }
            if(Number.isInteger(Number(publishedYear)) && Number(publishedYear) > 0){
                book.publishedYear = publishedYear
            }
            if(typeof available === 'boolean'){
                book.available = available
            }
            return sendJSON(res,book)
        }else{
            return sendJSON(res,{error:'Book not found'},404)
        }
    }

    if(resource === 'books' && method === 'DELETE'){
        if(id && deleteBook(id)){
            res.statusCode = 204
            return res.end()
        }else{
            return sendJSON(res,{error:'Book not found'},404)
        }
    }

    if(
        pathname === '/books' || pathname === '/health' || (resource === 'books' && id)
    ){
        return sendJSON(res,{error:'Method not allowed'},405)
    }

    return sendJSON(res,{error:'Not found'},404)
}
