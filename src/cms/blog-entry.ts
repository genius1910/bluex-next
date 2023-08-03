import BlogsContent from '@/constants/mockup/blogs-content.json';
import { loadCollectionTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { ImageEntry, ImageFormats, Metadata, SEO } from './types';

const pageSize = 5;

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
  createdAt:   string;
  UpdateDate:  string;
  SEO:         SEO;
  Image:       ImageEntry;
  ContentList: ContentList[];
}

export interface BlogSlug {
  Url:         string;
  Type:        string;
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
    pageSize,
    sort: 'Date:desc',
  })

  return res.data.map((v: any) => v.attributes as BlogEntry)
}

export async function fetchMeta() {
  if (useMockData) {
    return {
      "pagination": {
        "page": 1,
        "pageSize": pageSize,
        "pageCount": 14,
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
    pageSize,
    sort: 'Date:desc',
  })

  return res.meta as Metadata
}

export async function fetchSlugs() {
  if (useMockData) {
    return BlogsContent.map((v) => ({ Url: v.Url, Type: v.Type }))
  }

  const fetchByPage = async (page: number): Promise<BlogSlug[]> => {
    const res = await loadCollectionTypes({
      ...baseConfig(),
      collectionName: 'blogs',
      locale: 'en',
      query: {
        populate: { Url: "*" }
      },
      page: page,
      pageSize,
      sort: 'Date:desc',
    })
    const meta = res.meta as Metadata

    if (meta.pagination.pageCount > page) {
      const next = await fetchByPage(page + 1)
      return res.data.map((v: any) => v.attributes as BlogSlug).concat(next)
    }

    return res.data.map((v: any) => v.attributes as BlogSlug)
  }

  return await fetchByPage(1)
}

export async function fetchBySlug(slug: string): Promise<BlogEntry | null> {
  if (useMockData) {
    return BlogsContent[0]
  }

  const res = await loadCollectionTypes({
    ...baseConfig(),
    collectionName: 'blogs',
    locale: 'en',
    query,
    filters: {
      Url: { '$eq': slug },
    },
    page: 1,
    pageSize: 1,
    sort: 'Date:desc',
  })

  return res.data.map((v: any) => v.attributes as BlogSlug)[0]
}
