// API Configuration - Import from environment config
export { API_BASE_URL, isDevelopment, isProduction } from './environment.js';

// Log the current API URL in development
if (isDevelopment) {
  console.log('API Base URL:', API_BASE_URL);
  console.log('Environment:', import.meta.env.MODE);
}
