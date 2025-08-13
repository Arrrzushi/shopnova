// Debug script to verify API configuration
import { API_BASE_URL, isDevelopment, isProduction } from './environment.js';

export function debugApiConfig() {
  try {
    console.log('🔍 API Configuration Debug:');
    console.log('========================');
    console.log('Environment Mode:', import.meta.env.MODE || 'production');
    console.log('Is Development:', isDevelopment);
    console.log('Is Production:', isProduction);
    console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL || 'not set');
    console.log('Final API_BASE_URL:', API_BASE_URL);
    console.log('========================');
    
    // Test API endpoint
    const testEndpoint = `${API_BASE_URL}/api/common/feature/get`;
    console.log('Test API Endpoint:', testEndpoint);
    
    return {
      mode: import.meta.env.MODE || 'production',
      isDevelopment,
      isProduction,
      viteApiUrl: import.meta.env.VITE_API_BASE_URL || 'not set',
      finalApiUrl: API_BASE_URL,
      testEndpoint
    };
  } catch (error) {
    console.error('Debug configuration error:', error);
    return null;
  }
}

// Only run in development mode and when explicitly called
if (typeof window !== 'undefined' && import.meta.env.MODE === 'development') {
  // Delay execution to ensure all modules are loaded
  setTimeout(() => {
    debugApiConfig();
  }, 100);
}
