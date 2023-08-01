import { createAxiosInstance, loadSingleTypes } from '@/lib/strapi_loader'

export const axiosInstance = createAxiosInstance({
  apiURL: process.env.STRAPI_URL || '',
  accessToken: process.env.STRAPI_APIKEY || ''
});

export const defaultLocale = 'en';
export const useMockData = process.env.MOCK === "true";
