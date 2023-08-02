import HomeContent from '@/constants/mockup/home-content.json';
import { loadSingleTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { AvailableLocaleType, availableLocales } from './types';

const query = {
  populate: {
    SEO: { populate: "*" },
    Section_1_Title: "*",
    Section_1_Content: "*",
    Section_1_Image: "*",
    Section_1_Image_Preview: "*",
    Section_1_Button: "*",
    Section_2_Title: "*",
    Section_2_Media_List: { populate: "*" },
    Section_2_Media: { populate: "*" },
    Section_3_Type: "*",
    Section_3_Title: "*",
    Section_3_Title_Styled_Keyword: "*",
    Section_3_Content: "*",
    Section_3_Image: "*",
    Section_3_Feature_List: "*",
    Section_3_Button: "*",
    Section_4_Page_Intro_List: { populate: "*" },
    Section_5_Title: "*",
    Section_5_Logo_List: "*",
    Section_6_Title: "*",
    Section_6_Testimonial_List: "*",
    Section_7_Title: "*",
    Section_7_FAQ_List: { populate: "*" },
    Section_8_Content: "*",
    Section_8_Button: "*",
    Section_8_Bg: "*",
  },
}

type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
}

interface LocalizedContent {
  Section_1_Title:                string;
  Section_1_Content:              string;
  Section_3_Title:                string;
  Section_5_Title:                string;
  Section_6_Title:                string;
  locale:                         string;
  Section_2_Title:                string | null;
  Section_3_Type:                 string | null;
  Section_3_Title_Styled_Keyword: string | null;
  Section_3_Content:              string | null;
  Section_8_Content:              string | null;
  Section_7_Title:                string | null;
  SEO:                            SEO;
  Section_1_Image:                Image;
  Section_1_Image_Preview:        Image;
  Section_1_Button:               Button;
  Section_2_Media_List:           MediaList[];
  Section_3_Image:                Image;
  Section_3_Feature_List:         FeatureList[];
  Section_3_Button:               Button | null;
  Section_4_Page_Intro_List:      PageIntroList[];
  Section_5_Logo_List:            ImageList;
  Section_6_Testimonial_List:     TestimonialList[];
  Section_7_FAQ_List:             FAQList[];
  Section_8_Button:               Button | null;
  Section_8_Bg:                   Image;
}

export interface SEO {
  id:          number;
  title:       string;
  description: string;
  image:       Image;
}

export interface Button {
  id:   number;
  text: string;
  link: string;
}

export interface ImageList {
  data: ImageData[];
}

export interface Image {
  data: ImageData[] | ImageData | null;
}

export interface MediaList {
  id:          number;
  image:       Image;
  description: FAQList;
}

export interface FAQList {
  id:         number;
  title:      string;
  content:    null | string;
  titleSize?: number;
}

export interface ImageData {
  id:         number;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  name:              string;
  alternativeText:   null | string;
  caption:           null | string;
  width:             number | null;
  height:            number | null;
  formats:           Formats | null;
  hash:              string;
  ext:               string;
  mime:              string;
  size:              number;
  url:               string;
  previewUrl:        null;
  // provider:          Provider;
  provider_metadata: null;
}

export interface MediaInfo {
  ext:    string;
  url:    string;
  hash:   string;
  mime:   string;
  name:   string;
  path:   null;
  size:   number;
  width:  number;
  height: number;
}

export interface Formats {
  small?:    MediaInfo;
  medium?:   MediaInfo;
  thumbnail?: MediaInfo;
  large?:    MediaInfo;
}

export interface FeatureList {
  id:      number;
  content: string;
}

export interface TestimonialList {
  id:       number;
  content:  string;
  name:     string;
  position: string;
  company:  string;
}

export interface PageIntroList {
  id:         number;
  title:      string;
  content:    string;
  attachment: Button | null;
  button:     Button;
  background: Image;
}


export type { LocalizedContent, PageContent };

export const fetch = async () => {
  if (useMockData) {
    return HomeContent as PageContent;
  }

  const res = await loadSingleTypes({
    ...baseConfig(),
    singularName: 'front-content',
    locales: availableLocales,
    query,
    limit: 500
  })

  return res as PageContent
}
