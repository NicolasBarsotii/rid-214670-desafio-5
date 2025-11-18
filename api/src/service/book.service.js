// service/book.service.js
export default {
  createBookSevice: async (newBook, userId) => {
    try {
      const db = global.db; // ou como você está acessando o banco
      
      const result = await db.run(
        `INSERT INTO books (titulo, autor, paginas, isbn, editora, certificado) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [newBook.titulo, newBook.autor, newBook.paginas, newBook.isbn, newBook.editora, newBook.certificado]
      );

      // Buscar o livro recém-criado
      const livro = await db.get(
        `SELECT * FROM books WHERE id = ?`,
        [result.lastID]
      );

      return livro;
    } catch (error) {
      throw new Error('Erro ao criar livro: ' + error.message);
    }
  },

  findAllBooksService: async () => {
    try {
      const db = global.db;
      const books = await db.all(`SELECT * FROM books ORDER BY created_at DESC`);
      return books;
    } catch (error) {
      throw new Error('Erro ao buscar livros: ' + error.message);
    }
  },

  findBookByIdService: async (bookId) => {
    try {
      const db = global.db;
      const book = await db.get(`SELECT * FROM books WHERE id = ?`, [bookId]);
      
      if (!book) {
        throw new Error('Livro não encontrado');
      }
      
      return book;
    } catch (error) {
      throw new Error('Erro ao buscar livro: ' + error.message);
    }
  },

  updateBookService: async (updateBook, bookId, userId) => {
    try {
      const db = global.db;
      
      await db.run(
        `UPDATE books 
         SET titulo = ?, autor = ?, paginas = ?, isbn = ?, editora = ?, certificado = ?
         WHERE id = ?`,
        [updateBook.titulo, updateBook.autor, updateBook.paginas, updateBook.isbn, 
         updateBook.editora, updateBook.certificado, bookId]
      );

      // Buscar livro atualizado
      const book = await db.get(`SELECT * FROM books WHERE id = ?`, [bookId]);
      return book;
    } catch (error) {
      throw new Error('Erro ao atualizar livro: ' + error.message);
    }
  },

  deleteBookService: async (bookId, userId) => {
    try {
      const db = global.db;
      
      const result = await db.run(`DELETE FROM books WHERE id = ?`, [bookId]);
      
      if (result.changes === 0) {
        throw new Error('Livro não encontrado');
      }
      
      return { message: 'Livro deletado com sucesso' };
    } catch (error) {
      throw new Error('Erro ao deletar livro: ' + error.message);
    }
  }
};