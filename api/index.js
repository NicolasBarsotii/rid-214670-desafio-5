import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Banco de dados
let db;

async function initDatabase() {
  db = await open({
    filename: './biblioteca.db',
    driver: sqlite3.Database
  });

  // Criar tabela de livros
  await db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      autor TEXT,
      paginas INTEGER,
      isbn TEXT,
      editora TEXT,
      certificado TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('✅ Banco de dados pronto');
}

// ===== ROTAS DOS LIVROS =====

// GET - Listar todos os livros
app.get('/api/books', async (req, res) => {
  try {
    console.log('📚 Buscando todos os livros...');
    const books = await db.all('SELECT * FROM books ORDER BY created_at DESC');
    res.json(books);
  } catch (error) {
    console.error('❌ Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar novo livro
app.post('/api/books', async (req, res) => {
  try {
    console.log('➕ Criando novo livro:', req.body);
    const { titulo, autor, paginas, isbn, editora, certificado } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    const result = await db.run(
      `INSERT INTO books (titulo, autor, paginas, isbn, editora, certificado) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [titulo, autor || 'Autor Desconhecido', paginas || 0, isbn, editora, certificado]
    );

    const newBook = await db.get('SELECT * FROM books WHERE id = ?', [result.lastID]);
    console.log('✅ Livro criado:', newBook);
    res.status(201).json(newBook);
  } catch (error) {
    console.error('❌ Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro ao criar livro' });
  }
});

// GET - Buscar livro por ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Buscando livro ID: ${id}`);
    
    const book = await db.get('SELECT * FROM books WHERE id = ?', [id]);
    
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('❌ Erro ao buscar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PATCH - Atualizar livro
app.patch('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, paginas, isbn, editora, certificado } = req.body;
    
    console.log(`✏️ Atualizando livro ID: ${id}`, req.body);

    await db.run(
      `UPDATE books 
       SET titulo=?, autor=?, paginas=?, isbn=?, editora=?, certificado=?
       WHERE id=?`,
      [titulo, autor, paginas, isbn, editora, certificado, id]
    );

    const updatedBook = await db.get('SELECT * FROM books WHERE id = ?', [id]);
    console.log('✅ Livro atualizado:', updatedBook);
    res.json(updatedBook);
  } catch (error) {
    console.error('❌ Erro ao atualizar livro:', error);
    res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

// DELETE - Deletar livro
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Deletando livro ID: ${id}`);
    
    const result = await db.run('DELETE FROM books WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    console.log('✅ Livro deletado');
    res.json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('❌ Erro ao deletar livro:', error);
    res.status(500).json({ error: 'Erro ao deletar livro' });
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '✅ Backend funcionando perfeitamente!',
    timestamp: new Date().toISOString(),
    database: 'SQLite conectado'
  });
});

// Inicializar servidor
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('=' .repeat(50));
    console.log('🚀 BIBLIOTECA BACKEND - SERVIDOR RODANDO');
    console.log('=' .repeat(50));
    console.log(`📍 Porta: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('📚 Endpoints disponíveis:');
    console.log(`   GET    http://localhost:${PORT}/api/books`);
    console.log(`   POST   http://localhost:${PORT}/api/books`);
    console.log(`   GET    http://localhost:${PORT}/api/books/:id`);
    console.log(`   PATCH  http://localhost:${PORT}/api/books/:id`);
    console.log(`   DELETE http://localhost:${PORT}/api/books/:id`);
    console.log(`   TEST   http://localhost:${PORT}/api/test`);
    console.log('=' .repeat(50));
  });
}).catch(error => {
  console.error('❌ Erro ao iniciar servidor:', error);
});