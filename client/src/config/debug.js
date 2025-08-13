// Debug script to verify API configuration
import { API_BASE_URL, isDevelopment, isProduction } from './environment.js';

export function debugApiConfig() {
  console.log('🔍 API Configuration Debug:');
  console.log('========================');
  console.log('Environment Mode:', import.meta.env.MODE);
  console.log('Is Development:', isDevelopment);
  console.log('Is Production:', isProduction);
  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('Final API_BASE_URL:', API_BASE_URL);
  console.log('========================');
  
  // Test API endpoint
  const testEndpoint = `${API_BASE_URL}/api/common/feature/get`;
  console.log('Test API Endpoint:', testEndpoint);
  
  return {
    mode: import.meta.env.MODE,
    isDevelopment,
    isProduction,
    viteApiUrl: import.meta.env.VITE_API_BASE_URL,
    finalApiUrl: API_BASE_URL,
    testEndpoint
  };
}

// Auto-run in development
if (import.meta.env.DEV) {
  debugApiConfig();
}
