import HeaderContent from '@/constants/mockup/header-content.json';
import { loadSingleTypes } from '@/lib/strapi_loader';
import { axiosInstance, useMockData } from './base';
import { AvailableLocaleType, availableLocales } from './types';

const query = {
  populate: {
    SEO: { populate: "*" },
    Url: "*",
    Title: "*",
    Category: "*",
    Type: "*",
    Author: "*",
    Date: "*",
    UpdateDate: "*",
    Image: "*",
    ContentList: { populate: "*" },
  },
}

type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
}

interface LocalizedContent {
}


export type { LocalizedContent, PageContent };

export const fetch = async () => {
  if (useMockData) {
    return HeaderContent as PageContent
  }

  const res = await loadSingleTypes({
    axiosInstance,
    singularName: 'layout-contentxxxx',
    locales: availableLocales,
    query,
    limit: 500
  })

  return res as PageContent
}
