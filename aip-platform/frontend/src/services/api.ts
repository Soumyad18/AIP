import axios from 'axios';

// @ts-ignore - Vite environment variables
const isDev = import.meta.env?.MODE === 'development';

export const api = axios.create({
  baseURL: isDev ? 'http://localhost:4000/api' : '/api',
  timeout: 30000
});
