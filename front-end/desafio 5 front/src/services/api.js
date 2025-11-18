import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Logs para debug
api.interceptors.request.use((config) => {
  console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`⬅️ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ Erro: ${error.message}`);
    return Promise.reject(error);
  }
);

export default api;