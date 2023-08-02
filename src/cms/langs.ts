import { baseConfig } from './base';
import { loadLocales } from '@/lib/strapi_adapter';
import { AvailableLocaleType } from './types';

export interface Locale {
  id: number
  name: string
  code: AvailableLocaleType
  isDefault: boolean
}

export async function fetchLocales() {
  const options = {
    method: "GET",
    url: '/api/i18n/locales',
  };

  const data = await loadLocales(baseConfig());

  return data as Locale[]
}
