import { APP_CONFIG } from './branding';

// When running via Vite dev server, empty string uses relative paths and Vite proxy, preventing CORS issues.
export const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined 
  ? import.meta.env.VITE_API_URL 
  : '';

export function getTenantHeaders(): HeadersInit {
  const tenantId = localStorage.getItem(APP_CONFIG.tenantStorageKey);
  const headers: Record<string, string> = {};
  if (tenantId) {
    headers['X-Tenant-ID'] = tenantId;
  }
  return headers;
}
