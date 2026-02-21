import axios from 'axios';

const api = axios.create({
  // Talo: Maadaama Frontend-ka laga dhex ridayo Backend-ka (Static Files),
  // waxaad isticmaali kartaa '/api' oo kaliya. Browser-ka ayaa garanaya inuu isla server-ka weydiisto.
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Interceptor-kaaga waa mid aad u fiican
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;