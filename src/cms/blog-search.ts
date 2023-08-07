import MeiliSearch from "meilisearch";
import { meliConfig, useMockData } from "./base";
import { ImageMeta, SEO } from "./types";
import BlogFilteredList from "@/constants/mockup/blog-filtered-list.json"
import { retry } from "@/lib/tools";

export const defaultPageSize = 5;

export interface SearchRequest {
  type: string | null;
  category: string | null;
  search: string | null;
  page: number;
  pageSize?: number;
  sort?: string[];
  updateFilterable?: boolean;
}

export interface SearchResponse {
  hits:             BlogEntry[];
  query:            string;
  processingTimeMs: number;
  hitsPerPage:      number;
  page:             number;
  totalPages:       number;
  totalHits:        number;
}

export interface Stats {
  pageSize:     number;
  totalPages:   number;
  total:        number;
}

export interface BlogSlug {
  Url:         string;
  Type:        string | null;
}

export interface BlogEntry {
  id:              number;
  Title:           string;
  Author:          string;
  Date:            string;
  Url:             string;
  Type:            null | string;
  PreviewText:     string;
  createdAt:       string;
  locale:          string;
  SEO:             SEO;
  Image:           ImageMeta;
  ContentList:     ContentList[];
  Category:        string;
  UpdateDate:      string;
}

export interface ContentList {
  id:        number;
  title?:    string | null;
  content?:  string | null;
  titleSize: number;
}

export async function fetchStats() {
  if (useMockData) {
    return {
      pageSize: defaultPageSize,
      totalPages: 14,
      total: 67
    }
  }

  const res = await searchBlogs({
    type: null,
    category: null,
    search: null,
    page: 1,
    sort: ['Date:desc'],
  })

  return {
    pageSize: res.hitsPerPage,
    totalPages: res.totalPages,
    total: res.totalHits
  }
}

let blogsBySlug: { [key: string]: BlogEntry } = {}
export async function fetchBySlug(slug: string): Promise<BlogEntry | null> {
  if (useMockData) {
    return BlogFilteredList.hits[0]
  }

  if (Object.keys(blogsBySlug).length === 0) {
    const all = await fetchAll()
    blogsBySlug = all.reduce((acc, cur) => ({...acc, [cur.Url]: cur}), {})
  }

  return blogsBySlug[slug] || null
}

export async function fetchPage(page: number) {
  if (useMockData) {
    return BlogFilteredList.hits
  }

  const res = await searchBlogs({
    type: null,
    category: null,
    search: null,
    page: page,
    sort: ['Date:desc'],
  })

  return res.hits
}

export async function searchBlogs({ type, category, search, sort, page, pageSize, updateFilterable }: SearchRequest) {
  if (useMockData) {
    return BlogFilteredList
  }

  const client = new MeiliSearch(meliConfig());

  const blogIndex = await client.index("blog");
  if (updateFilterable) {
    blogIndex.updateSortableAttributes(["Date"]);
    blogIndex.updateFilterableAttributes(["Category", "Type", "Url"]);
  }

  const filterCon = [];

  // if category is not All (case insensitive)
  if (category && category.toLowerCase() !== "all") {
    filterCon.push(`Category = "${category}"`);
  }

  // if type is not All (case insensitive)
  if (type && type.toLowerCase() !== "all") {
    filterCon.push(`Type = "${type}"`);
  }

  const res = await blogIndex.search(search, {
    hitsPerPage: pageSize || defaultPageSize,
    page: page,
    sort,
    filter: filterCon,
  });

  return res as SearchResponse;
}

export async function fetchSlugs() {
  if (useMockData) {
    return BlogFilteredList.hits.map((v) => ({ Url: v.Url, Type: v.Type }))
  }

  const fetchByPage = async (page: number): Promise<BlogSlug[]> => {
    const res = await searchBlogs({
      type: null,
      category: null,
      search: null,
      page: page,
      pageSize: 1000,
      sort: ['Date:desc'],
      updateFilterable: page == 1,
    })

    if (res.totalPages > page) {
      const next = await fetchByPage(page + 1)
      return res.hits.map(v => ({ Url: v.Url, Type: v.Type })).concat(next)
    }

    return res.hits.map(v => ({ Url: v.Url, Type: v.Type }))
  }

  return await fetchByPage(1)
}

export async function fetchAll() {
  if (useMockData) {
    return BlogFilteredList.hits as BlogEntry[]
  }

  const fetchByPage = async (page: number): Promise<BlogEntry[]> => {
    const res = await searchBlogs({
      type: null,
      category: null,
      search: null,
      page: page,
      pageSize: 1000,
      sort: ['Date:desc'],
    })

    if (res.totalPages > page) {
      const next = await fetchByPage(page + 1)
      return (res.hits as BlogEntry[]).concat(next)
    }

    return res.hits as BlogEntry[];
  }

  return await fetchByPage(1)
}
