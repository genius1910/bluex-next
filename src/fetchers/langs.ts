import { axiosInstance } from './base';
import { AvailableLocaleType } from './types';

export interface Locale {
  id: number
  name: string
  code: AvailableLocaleType
  isDefault: boolean
}

export const fetchLocales = async () => {
  const options = {
    method: "GET",
    url: '/api/i18n/locales',
  };

  const { data } = await axiosInstance(options);

  return data as Locale[]
}
