import { buildUrl as coreBuilUrl } from '@core/utils/stringUtils';

export function buildUrl(path: string): string {
  return coreBuilUrl(import.meta.env.VITE_AUTH_API_ENDPOINT, path);
}
