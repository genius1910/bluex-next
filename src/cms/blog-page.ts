import BlogContent from '@/constants/mockup/blog-content.json';
import { loadSingleTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { AvailableLocaleType, ImageEntry, ImageFormats, SEO, availableLocales } from './types';

const query = {
}

type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
}

export interface LocalizedContent {
  Section_2_Button:                 string;
  Template_Sidebar_Section_1_Title: string;
  Template_Sidebar_Section_2_Title: string;
  locale:                           string;
  Section_1_Paragraph:              Paragraph;
  SEO:                              SEO;
  Section_1_Bg:                     ImageEntry;
  Not_Found_Paragraph:              Paragraph;
  Blog_Type_List:                   TypeList[];
  Category_Type_List:               TypeList[];
}

export interface TypeList {
  id:   number;
  text: string;
  link: string;
}

export interface Paragraph {
  id:      number;
  title:   string;
  content: string;
}

export const fetchContent = async () => {
  if (useMockData) {
    return BlogContent as PageContent
  }

  const res = await loadSingleTypes({
    ...baseConfig(),
    singularName: 'blog-content',
    locales: availableLocales,
    query,
    limit: 500
  })

  return res as PageContent
}
