import { loadCollectionTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { Metadata } from './types';
import BlogsContent from '@/constants/mockup/blogs-content.json'

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

export interface BlogEntry {
  Title:       string;
  Author:      string;
  Date:        string;
  Url:         string;
  Type:        string;
  PreviewText: string;
  locale:      string;
  Category:    string;
  UpdateDate:  string;
  SEO:         SEO;
  Image:       Image;
  ContentList: ContentList[];
}

export interface ContentList {
  id:        number;
  title?:    string | null;
  content?:  string | null;
  titleSize: number;
}

export interface Image {
  data: ImageData;
}

export interface ImageData {
  id:         number;
  attributes: ImageMeta;
}

export interface ImageMeta {
  name:              string;
  alternativeText?:  string | null;
  caption?:          string | null;
  width:             number;
  height:            number;
  formats:           Formats;
  hash:              string;
  ext:               string;
  mime:              string;
  size:              number;
  url:               string;
}

export interface Formats {
  large:     ImageAttr;
  small:     ImageAttr;
  medium:    ImageAttr;
  thumbnail: ImageAttr;
}

export interface ImageAttr {
  ext:    string;
  url:    string;
  hash:   string;
  mime:   string;
  name:   string;
  size:   number;
  width:  number;
  height: number;
}

export interface SEO {
  id:          number;
  title:       string | null;
  description: string;
  image:       Image;
}


export const fetchPage = async (page: number): Promise<BlogEntry[]> => {
  if (useMockData) {
    return BlogsContent
  }

  const res = await loadCollectionTypes({
    ...baseConfig(),
    collectionName: 'blogs',
    locale: 'en',
    query,
    page: page,
    pageSize: 20,
    sort: 'Date:desc',
  })

  return res.data.map((v: any) => v.attributes as BlogEntry)
}

export async function fetchMeta() {
  if (useMockData) {
    return {
      "pagination": {
        "page": 1,
        "pageSize": 20,
        "pageCount": 4,
        "total": 67
      }
    } as Metadata
  }

  const res = await loadCollectionTypes({
    ...baseConfig(),
    collectionName: 'blogs',
    locale: 'en',
    query,
    page: 1,
    pageSize: 20,
    sort: 'Date:desc',
  })

  return res.meta as Metadata
}
