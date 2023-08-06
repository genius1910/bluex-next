import { combineURLs } from "@/lib/tools";
import { AvailableLocaleType, mapLocaleToLang } from "./types";

const strapiKey = () => process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || '';

export const baseConfig = () => ({
  apiURL: strapiKey(),
  accessToken: process.env.STRAPI_APIKEY || '',
});

export const meliConfig = () => ({
  host: process.env.NEXT_PUBLIC_MELIAPI_URL || '',
  apiKey: process.env.NEXT_PUBLIC_MELIAPI_APIKEY || '',
});

export const useMockData = process.env.MOCK === "true";

export function buildCmsUrl(path: string): string {
  return combineURLs(strapiKey(), path);
}

interface BuildSearchPathParams {
  locale: AvailableLocaleType;
  type: string | null;
  category: string | null;
  search: string | null;
  page: number;
}
export function buildSearchPath({ locale, type, category, search, page }: BuildSearchPathParams): string {
  const queryString = new URLSearchParams({
    page: page.toString(),
    ...(type && { type }),
    ...(category && { category }),
    ...(search && { search }),
  }).toString();
  return buildPath('/blog/search?' + queryString, locale);
}

export function buildPath(path: string | null, locale: AvailableLocaleType): string {
  const lang = mapLocaleToLang(locale);
  return combineURLs(`/${lang}`, path || '#');
}
