/**
 * API Services Index
 * 
 * Central export point for all API services.
 * When integrating with real backend, configure base URL and auth here.
 */

// Re-export all API functions
export * as lotsApi from './lots';
export * as farmersApi from './farmers';
export * as reservationsApi from './reservations';
export * as blogApi from './blog';

// API configuration (for future use with real backend)
export const API_CONFIG = {
  // baseUrl: process.env.VITE_API_URL || '/api',
  // timeout: 10000,
};
