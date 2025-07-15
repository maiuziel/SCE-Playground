// frontend/src/services/api.js
import axios from 'axios';

if (!import.meta.env.VITE_GATEWAY_URL) {
  throw new Error('❌ Missing VITE_GATEWAY_URL in environment variables');
}

const api = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_URL,
  withCredentials: true // ✅ חשוב כדי לשלוח קוקיז/טוקנים בבקשות cross-origin
});

// Optional: attach an interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
