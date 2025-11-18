// server.js - VERSÃO SIMPLIFICADA SEM sqlite
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados SQLite3 puro
const db = new sqlite3.Database('./biblioteca.db', (err) => {
  if (err) {
    console.error('❌ Erro ao conectar com banco:', err.message);
  } else {
    console.log('✅ Conectado ao banco SQLite');
    
    // Criar tabela
    db.run(`
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
    `, (err) => {
      if (err) {
        console.error('❌ Erro ao criar tabela:', err);
      } else {
        console.log('✅ Tabela books pronta');
        
        // Inserir dados de exemplo
        db.get("SELECT COUNT(*) as count FROM books", (err, row) => {
          if (!err && row.count === 0) {
            const livrosExemplo = [
              ['1984', 'George Orwell', 328, '978-85-359-0277-8', 'Super Cluster', 'CERT001'],
              ['O Sol é para Todos', 'Harper Lee', 285, '978-85-359-0278-5', 'Editora José Olympio', 'CERT002']
            ];
            
            livrosExemplo.forEach(livro => {
              db.run(
                `INSERT INTO books (titulo, autor, paginas, isbn, editora, certificado) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                livro
              );
            });
            console.log('📚 Livros de exemplo inseridos');
          }
        });
      }
    });
  }
});

// ===== ROTAS DOS LIVROS =====

// GET - Listar todos os livros
app.get('/api/books', (req, res) => {
  db.all('SELECT * FROM books ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST - Criar novo livro
app.post('/api/books', (req, res) => {
  const { titulo, autor, paginas, isbn, editora, certificado } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }

  db.run(
    `INSERT INTO books (titulo, autor, paginas, isbn, editora, certificado) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [titulo, autor || '', paginas || 0, isbn || '', editora || '', certificado || ''],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Buscar o livro recém-criado
        db.get('SELECT * FROM books WHERE id = ?', [this.lastID], (err, row) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(201).json(row);
          }
        });
      }
    }
  );
});

// GET - Buscar livro por ID
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Livro não encontrado' });
    } else {
      res.json(row);
    }
  });
});

// PATCH - Atualizar livro
app.patch('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, paginas, isbn, editora, certificado } = req.body;

  db.run(
    `UPDATE books 
     SET titulo=?, autor=?, paginas=?, isbn=?, editora=?, certificado=?
     WHERE id=?`,
    [titulo, autor, paginas, isbn, editora, certificado, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Buscar livro atualizado
        db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.json(row);
          }
        });
      }
    }
  );
});

// DELETE - Deletar livro
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM books WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Livro não encontrado' });
    } else {
      res.json({ message: 'Livro deletado com sucesso' });
    }
  });
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '✅ Backend funcionando perfeitamente!',
    timestamp: new Date().toISOString(),
    database: 'SQLite3 conectado'
  });
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  db.get('SELECT 1 as status', (err, row) => {
    if (err) {
      res.status(500).json({ status: 'ERROR', error: err.message });
    } else {
      res.json({ status: 'HEALTHY', database: 'CONNECTED' });
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 SERVIDOR BIBLIOTECA - RODANDO!');
  console.log('='.repeat(50));
  console.log('📍 Porta: ' + PORT);
  console.log('🌐 URL: http://localhost:' + PORT);
  console.log('📚 Teste: http://localhost:' + PORT + '/api/test');
  console.log('='.repeat(50));
});