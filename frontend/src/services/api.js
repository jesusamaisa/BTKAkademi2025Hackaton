// frontend/src/services/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Bir hata oluştu');
    }
    return Promise.reject(error);
  }
);

// Product APIs
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getTrending: () => api.get('/products/trending'),
  getFeatured: () => api.get('/products/featured'),
  search: (query) => api.get('/products/search', { params: { q: query } }),
  compare: (ids) => api.post('/products/compare', { ids }),
};

// Review APIs
export const reviewAPI = {
  getByProduct: (productId, params) => api.get(`/reviews/product/${productId}`, { params }),
  create: (productId, data) => api.post(`/reviews/product/${productId}`, data),
  vote: (reviewId, type) => api.post(`/reviews/${reviewId}/vote`, { type }),
  getSummary: (productId) => api.get(`/reviews/product/${productId}/summary`),
};

// Category APIs
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getTree: () => api.get('/categories/tree'),
  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),
};

// User APIs
export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getFavorites: () => api.get('/users/favorites'),
  getReviews: () => api.get('/users/reviews'),
};

// AI APIs
export const aiAPI = {
  askGemini: (question, context) => api.post('/ai/gemini', { question, context }),
  summarizeReviews: (productId) => api.get(`/ai/summarize/${productId}`),
  getRecommendations: (productId) => api.get(`/ai/recommendations/${productId}`),
};

export default api;