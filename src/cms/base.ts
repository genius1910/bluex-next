import { combineURLs } from "@/lib/tools";
import { AvailableLocaleType, mapLocaleToLang } from "./types";

export const baseConfig = () => ({
  apiURL: process.env.STRAPI_URL || '',
  accessToken: process.env.STRAPI_APIKEY || ''
});

export const defaultLocale = 'en';
export const useMockData = process.env.MOCK === "true";

export function buildCmsUrl(path: string): string {
  return combineURLs(baseConfig().apiURL, path);
}

export function buildPath(path: string | null, locale: AvailableLocaleType): string {
  const lang = mapLocaleToLang(locale);
  return combineURLs(`/${lang}`, path || '#');
}
