// Environment Configuration
const ENV = {
  development: {
    API_BASE_URL: 'http://localhost:5000',
    CORS_ORIGIN: 'http://localhost:5173'
  },
  production: {
    API_BASE_URL: 'https://your-backend-url.onrender.com', // Replace with your actual backend URL
    CORS_ORIGIN: 'https://your-frontend-url.vercel.app' // Replace with your actual frontend URL
  }
};

// Get current environment
const currentEnv = import.meta.env.MODE || 'development';

// Export environment-specific config
export const config = ENV[currentEnv];

// Export individual values for convenience
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || config.API_BASE_URL;
export const CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN || config.CORS_ORIGIN;

// Export environment flags
export const isDevelopment = currentEnv === 'development';
export const isProduction = currentEnv === 'production';

// Log configuration in development
if (currentEnv === 'development') {
  console.log('Environment:', currentEnv);
  console.log('API Base URL:', API_BASE_URL);
  console.log('CORS Origin:', CORS_ORIGIN);
}
