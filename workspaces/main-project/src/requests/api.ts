import { Api } from '@core/api';

export const api = Api.create({
  storage: localStorage,
  withCredentials: true,
  baseUrl: import.meta.env.VITE_API_ENDPOINT,
});
