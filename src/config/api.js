/**
 * API Configuration
 * Senior Developer Note: Centralizing the API routing ensures that we only have
 * one place to update when moving from development to production.
 */

// Determine if we are running in a local environment
const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Base URL setup
// 1. Prioritize environment variable (Vite uses import.meta.env)
// 2. Fallback to production URL if not local
// 3. Absolute fallback to localhost for development
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (isLocal ? 'http://localhost:5000/api' : '/api');

// Utility for creating full URLs if needed
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default API_BASE_URL;
