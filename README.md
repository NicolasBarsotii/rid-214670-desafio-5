📚 Biblioteca Central Online
Sistema completo de gerenciamento de biblioteca com frontend em React e backend em Node.js.

🚀 Tecnologias Utilizadas
Frontend
React - Biblioteca para interfaces

React Router DOM - Roteamento

Axios - Cliente HTTP

CSS3 - Estilização

Backend
Node.js - Runtime JavaScript

Express - Framework web

SQLite - Banco de dados

CORS - Middleware para cross-origin

📋 Funcionalidades
👤 Gestão de Livros
✅ Listar todos os livros

✅ Cadastrar novos livros

✅ Editar informações dos livros

✅ Excluir livros

✅ Pesquisar livros

🎯 Interface
✅ Design responsivo e moderno

✅ Navegação intuitiva

✅ Feedback visual para ações

✅ Validação de formulários

🏗️ Estrutura do Projeto:

biblioteca-online/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços de API
│   │   └── assets/          # Imagens e recursos
│   └── package.json
├── backend/                  # API Node.js
│   ├── server.js            # Servidor principal
│   ├── database.db          # Banco de dados SQLite
│   └── package.json
└── README.md

🚀 Como Executar o Projeto
Pré-requisitos
Node.js 16+

npm ou yarn

1. Clone o repositório:
   git clone https://github.com/seu-usuario/biblioteca-central-online.git
   cd biblioteca-central-online

2 Backend (API):
  cd backend
  npm install
  npm start

O backend estará rodando em http://localhost:3001

3. Frontend (React):
   cd frontend
   npm install
   npm run dev

O frontend estará rodando em http://localhost:5173

📡 Endpoints da API
Livros
GET /api/books - Listar todos os livros

POST /api/books - Criar novo livro

GET /api/books/:id - Buscar livro por ID

PATCH /api/books/:id - Atualizar livro

DELETE /api/books/:id - Excluir livro

Saúde do Sistema
GET /api/test - Teste de conectividade

GET /api/health - Status do sistema

🎨 Interface
Páginas Principais
Home - Página inicial com overview

Listar Livros - Visualização em grid dos livros

Cadastrar Livros - Formulário de cadastro

Editar Livros - Formulário de edição

Design
Header com navegação fixa

Cards responsivos para livros

Formulários com validação

Cores: #303030 (header), #007bff (primária)

💾 Banco de Dados
Tabela: books
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  autor TEXT,
  paginas INTEGER,
  isbn TEXT,
  editora TEXT,
  certificado TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

🛠️ Desenvolvimento
Scripts Disponíveis
Frontend:
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview build

Backend: 
npm start           # Produção
npm run dev         # Desenvolvimento

Estrutura de Dados
Livro:
{
  id: number,
  titulo: string,
  autor: string,
  paginas: number,
  isbn: string,
  editora: string,
  certificado: string,
  created_at: string
}

🔧 Configuração
Variáveis de Ambiente
Crie um arquivo .env no backend:
PORT=3001
NODE_ENV=development

CORS
O backend está configurado para aceitar requests do frontend em http://localhost:5173

📱 Responsividade
O sistema é totalmente responsivo e funciona em:

✅ Desktop

✅ Tablet

✅ Mobile

🐛 Solução de Problemas
Erros Comuns
Porta já em uso

Altere a porta no backend (server.js)

Erro de CORS

Verifique a URL do frontend no backend

Banco de dados não carrega

Delete database.db para recriar

🤝 Contribuição
Fork o projeto

Crie uma branch para sua feature

Commit suas mudanças

Push para a branch

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👥 Autores
Seu Nome - seu-email@dominio.com

🙏 Agradecimentos
Equipe de desenvolvimento

Comunidade React

Documentação do Express e SQLite

⭐ Se este projeto foi útil, deixe uma estrela no repositório!

📞 Suporte
Encontrou um problema? Abra uma issue no GitHub.

<div align="center">
Desenvolvido com ❤️ para a comunidade de desenvolvedores

⬆ Voltar ao topo

</div>
