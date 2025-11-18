import './style.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import ListarLivros from '../listar-livros/listar-livros'
import CadastrarLivros from '../cadastrar-livros/cadastrar-livros'
import EditarLivros from '../editar-livros/editar-livros'

function Home() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <nav>
            <img src={logo} alt="Logo" />
            <div className="nav-links">
              <Link to="/listar-livros">Listar livros</Link>
              <Link to="/cadastrar-livros">Cadastrar livros</Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="home-content">
                <h1>Biblioteca Central Online - Livros</h1>
              </div>
            } />
            <Route path="/listar-livros" element={<ListarLivros />} />
            <Route path="/cadastrar-livros" element={<CadastrarLivros />} />
            <Route path="/editar-livros/:id" element={<EditarLivros />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default Home