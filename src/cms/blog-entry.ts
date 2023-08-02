import BlogsContent from '@/constants/mockup/blogs-content.json';
import { loadCollectionTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { ImageEntry, ImageFormats, Metadata, SEO } from './types';

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
  Image:       ImageEntry;
  ContentList: ContentList[];
}

export interface ContentList {
  id:        number;
  title?:    string | null;
  content?:  string | null;
  titleSize: number;
}

export async function fetchPage(page: number): Promise<BlogEntry[]> {
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
