import { Link } from 'react-router-dom';
import { useState } from 'react';
import { livrosService } from '../../services/livrosService';

function CadastrarLivros() {
  const [formData, setFormData] = useState({
    titulo: '',
    paginas: '',
    isbn: '', // Mudei de SINO para ISBN
    editora: '',
    certificado: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      await livrosService.create(formData);
      setMessage('Livro cadastrado com sucesso!');
      setFormData({
        titulo: '',
        paginas: '',
        isbn: '',
        editora: '',
        certificado: ''
      });
    } catch (error) {
      setMessage('Erro ao cadastrar livro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="nav-header">
        <h1>Cadastrar livros</h1>
        <Link to="/listar-livros" className="secondary-link">Listar livros</Link>
      </div>
      
      <h2>Cadastro de Livros</h2>
      
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
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default CadastrarLivros;