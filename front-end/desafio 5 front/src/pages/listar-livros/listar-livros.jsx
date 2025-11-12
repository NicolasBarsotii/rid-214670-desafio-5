import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { livrosService } from '../../services/livrosService';

function ListarLivros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Buscar livros
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        setLoading(true);
        const livrosData = await livrosService.getAll();
        console.log('📚 Livros carregados:', livrosData);
        setLivros(livrosData);
      } catch (err) {
        setError('Erro ao carregar livros');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  // Deletar livro
  const handleDelete = async (id, titulo) => {
    if (window.confirm(`Tem certeza que deseja deletar o livro "${titulo}"?`)) {
      try {
        await livrosService.delete(id);
        // Remove o livro da lista
        setLivros(livros.filter(livro => livro.id !== id));
        alert('✅ Livro deletado com sucesso!');
      } catch (error) {
        alert('❌ Erro ao deletar livro: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="loading">📚 Carregando livros...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <div className="error-message">❌ {error}</div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="nav-header">
        <h1>Listar livros</h1>
        <Link to="/cadastrar-livros" className="secondary-link">Cadastrar livros</Link>
      </div>
      
      <h2>Escolha o seu livro</h2>
      
      <div className="books-grid">
        {livros.length === 0 ? (
          <div className="no-books">
            <p>Nenhum livro cadastrado</p>
            <Link to="/cadastrar-livros" className="btn-primary">
              Cadastrar Primeiro Livro
            </Link>
          </div>
        ) : (
          livros.map((livro) => (
            <div key={livro.id} className="book-card">
              <div className="book-info">
                <h3>{livro.titulo}</h3>
                <p className="book-author">{livro.autor}</p>
                <p className="book-publisher">{livro.editora}</p>
                {livro.paginas && (
                  <p className="book-pages">{livro.paginas} páginas</p>
                )}
              </div>
              
              <div className="book-actions">
                <Link 
                  to={`/editar-livros/${livro.id}`} 
                  className="btn-edit"
                >
                  ✏️ Editar
                </Link>
                <button 
                  onClick={() => handleDelete(livro.id, livro.titulo)}
                  className="btn-delete"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListarLivros;