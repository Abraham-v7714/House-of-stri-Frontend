import axios from 'axios';

// Get the base API URL from environment variables or fallback to localhost
// VITE_API_URL should be set in production (e.g., on Vercel environment variables)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in headers
axiosInstance.interceptors.request.use(
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

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error('API Error:', error.response.data.message || error.response.statusText);
      
      // Handle 401 Unauthorized (e.g., token expired)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        // Optional: redirect to login
        // window.location.href = '/auth';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error: Backend unreachable');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_BASE_URL };
