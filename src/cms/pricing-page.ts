import PricingContent from '@/constants/mockup/pricing-content.json';
import { loadSingleTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { AvailableLocaleType, ImageEntry, ImageFormats, SEO, availableLocales } from './types';

const query = {
  SEO: { populate: "*" },
  Section_1_Paragraph: "*",
  Section_3_Title: "*",
  Section_3_Button: "*",
  Modal_Trigger_Keyword: "*",
  Modal_1_Title: "*",
  Modal_1_Pricing_List: "*",
  Modal_1_Comment: "*",
  Modal_2_Title: "*",
  Modal_2_Local_Fees_Header_List: "*",
  Modal_2_Local_Fees_Group_List: {
    populate: {
      area: "*",
      locals: "*",
    },
  },
}

type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
}

export interface LocalizedContent {
  Section_3_Title:                string;
  Modal_1_Title:                  string;
  Modal_1_Comment:                string;
  Modal_2_Title:                  string;
  Modal_Trigger_Keyword:          string;
  createdAt:                      string;
  updatedAt:                      string;
  publishedAt:                    string;
  locale:                         string;
  Section_1_Paragraph:            SectionParagraph;
  Modal_1_Pricing_List:           PricingList[];
  Modal_2_Local_Fees_Group_List:  LocalFeesGroupList[];
  SEO:                            SEO;
  Modal_2_Local_Fees_Header_List: LocalFeesHeaderList[];
  Section_3_Button:               SectionButton;
  // localizations:                  Localizations;
}

export interface PricingList {
  id:    number;
  name:  string;
  price: string;
}

export interface LocalFeesGroupList {
  id:   number;
  area: null | string;
}

export interface LocalFeesHeaderList {
  id:      number;
  content: string;
}

export interface SectionParagraph {
  id:      number;
  title:   string;
  content: string;
}

export interface SectionButton {
  id:   number;
  text: string;
  link: string;
}

export const fetchContent = async () => {
  if (useMockData) {
    return PricingContent as PageContent
  }

  const res = await loadSingleTypes({
    ...baseConfig(),
    singularName: 'pricing-content',
    locales: availableLocales,
    query,
    limit: 500
  })

  return res as PageContent
}
