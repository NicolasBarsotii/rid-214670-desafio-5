import bookService from "../service/book.service.js";

async function createBookController(req, res){
   const newBook = req.body;
   const userId = req.userId;
   
   try{
    const createBook = await bookService.createBookSevice(newBook, userId)
    res.status(201).send(createBook)
   } catch(error){
    res.status(400).send(error.message)
   }
}

async function findAllBooksController(req, res) {
    try{
        const books = await bookService.findAllBooksService()
        res.send(books)
    }catch(error){
        res.status(404).send(error.message);
    }
}

async function findBookByIdController(req, res){
    const bookId = req.params.bookId
    
    try {
        const book = await bookService.findBookByIdService(bookId)
        return res.send(book);
    }catch (error){
        return res.status(404).send(error.message)
    }
}

async function updateBookController(req, res){
    const updateBook = req.body
    const bookId = req.params.id
    const userId = req.userId

    try{
        const response =- await bookService.updateBookService(
            updateBook,
            bookId,
            userId
        )
        return res.send(response)
    }catch(error){
        res.status(400).send(error.message);
    }
}

async function deleteBookController(req, res){

    try {
        const reponse = await bookService.deleteBookService(bookId, userId)
        return res.send(reponse)
    }catch(error){
        res.status(400).send(error.message)
    }
}

async function searchBooksController(req, res){
    const { search } = req.query

    try{
        const books = await bookService.searchBookService(search)
        return res.send(books)
    }catch(error){
        res.status(400).send(error.message)
    }
}

export default{
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController,
    searchBooksController
}