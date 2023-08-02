import { combineURLs } from "@/lib/tools";

export const baseConfig = () => ({
  apiURL: process.env.STRAPI_URL || '',
  accessToken: process.env.STRAPI_APIKEY || ''
});

export const defaultLocale = 'en';
export const useMockData = process.env.MOCK === "true";

export function buildUrl(path: string): string {
  return combineURLs(baseConfig().apiURL, path);
}