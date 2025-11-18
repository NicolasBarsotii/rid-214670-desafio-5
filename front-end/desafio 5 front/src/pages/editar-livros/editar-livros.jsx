import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { livrosService } from '../../services/livrosService';

function EditarLivros() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    paginas: '',
    isbn: '', // Mudei de SINO para ISBN
    editora: '',
    certificado: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Buscar dados do livro ao carregar
  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const livroData = await livrosService.getById(id);
        setFormData({
          titulo: livroData.titulo || livroData.title || '',
          paginas: livroData.paginas || livroData.pages || '',
          isbn: livroData.isbn || livroData.sino || '',
          editora: livroData.editora || livroData.publisher || '',
          certificado: livroData.certificado || ''
        });
      } catch (error) {
        setMessage('Erro ao carregar livro: ' + error.message);
      }
    };

    if (id) {
      fetchLivro();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await livrosService.update(id, formData);
      setMessage('Livro atualizado com sucesso!');
      setTimeout(() => {
        navigate('/listar-livros');
      }, 1500);
    } catch (error) {
      setMessage('Erro ao atualizar livro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="nav-header">
        <h1>Edição de Livros</h1>
        <Link to="/listar-livros" className="secondary-link">Listar livros</Link>
      </div>
      
      <h2>Edição de Livros</h2>
      
      {message && (
        <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label><strong>Título:</strong></label>
          <input 
            type="text" 
            className="form-input" 
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Número de Páginas</label>
          <input 
            type="number" 
            className="form-input" 
            name="paginas"
            value={formData.paginas}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>ISBN</label>
          <input 
            type="text" 
            className="form-input" 
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Editora</label>
          <input 
            type="text" 
            className="form-input" 
            name="editora"
            value={formData.editora}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>CERTIFICADO</label>
          <input 
            type="text" 
            className="form-input" 
            name="certificado"
            value={formData.certificado}
            onChange={handleChange}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
        >
          {loading ? 'Atualizando...' : 'ATUALIZAR LIVRO'}
        </button>
      </form>
    </div>
  );
}

export default EditarLivros;