// services/livrosService.js - VERSÃO COM BACKEND REAL
import api from './api';

export const livrosService = {
  getAll: async () => {
    try {
      console.log('🔄 Buscando livros do backend...');
      const response = await api.get('/books');
      console.log('✅ Livros recebidos:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar livros:', error);
      throw new Error('Erro ao carregar livros do servidor');
    }
  },

  create: async (livroData) => {
    try {
      console.log('🔄 Cadastrando livro no backend...', livroData);
      const response = await api.post('/books', livroData);
      console.log('✅ Livro cadastrado:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao cadastrar livro:', error);
      throw new Error('Erro ao cadastrar livro no servidor');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw new Error('Livro não encontrado');
    }
  },

  update: async (id, livroData) => {
    try {
      const response = await api.patch(`/books/${id}`, livroData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      throw new Error('Erro ao atualizar livro');
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      throw new Error('Erro ao deletar livro');
    }
  }
};