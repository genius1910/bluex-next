// import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import qs from 'qs';
import { combineURLs } from './tools';

interface LoaderConfig {
  apiURL: string;
  accessToken: string;
}

interface loadSingleTypesRequest {
  apiURL: string;
  accessToken: string;
  singularName: string
  query: any
  locales: string[]
  limit: number
}

const loadContentTypes = async (req: { apiURL: string, accessToken: string }) => {
  const url = combineURLs(req.apiURL, '/api/content-type-builder/content-types')
  const options = {
    method: "GET",
    headers: { 'Authorization': `Bearer ${req.accessToken}` },

  };

  const res = await fetch(url, options);
  const data = await res.json()

  console.log('content-type data:', data)

  return data
}

const loadLocales = async (req: { apiURL: string, accessToken: string }) => {
  const url = combineURLs(req.apiURL, '/api/i18n/locales')
  const options = {
    method: "GET",
    headers: { 'Authorization': `Bearer ${req.accessToken}` },
  };

  const res = await fetch(url, options);
  const data = await res.json()

  return data
}

const loadSingleTypes = async (req: loadSingleTypesRequest) => {
  const queryParams = {
    ...req.query,
    pagination: {
      pageSize: req.limit || 500,
      page: 1,
    },
    populate: req.query?.populate || "*",
  }

  try {
    // Fetch localizations of this entry if there are any
    const localizationsPromises = req.locales.map(async (locale) => {
      const options = {
        method: "GET",
        headers: { 'Authorization': `Bearer ${req.accessToken}` },
      };

      const queryString = qs.stringify(
        { ...queryParams, locale },
        { encodeValuesOnly: true }
      )
      const url = combineURLs(req.apiURL, `/api/${req.singularName}`, queryString)
      const res = await fetch(url, options);
      const { data } = await res.json()

      return { data, locale };
    });

    // Run queries in parallel
    const localizationsData = await Promise.all(localizationsPromises);

    return localizationsData.reduce((acc, entry) => ({ ...acc, [entry.locale]: entry.data?.attributes }), {})

  } catch (error: any) {
    throw new Error(`Failed to fetch data from Strapi for ${req.singularName}, error: ${error}`);
  }
}

interface loadCollectionTypesRequest {
  apiURL: string;
  accessToken: string;
  collectionName: string
  query: any
  locale: string
  pageSize?: number
  page: number
  sort?: string
}

interface CollectionResponse {
  data: CollectionEntry[]
  meta: Meta
}

interface CollectionEntry {
  id:         number;
  attributes: { [key: string]: null | string };
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}


const loadCollectionTypes = async (req: loadCollectionTypesRequest) => {
  const endpoint = `/api/${req.collectionName}`
  const queryParams = {
    ...req.query,
    locale: req.locale,
    ...( req.sort && { sort: req.sort } ),
    pagination: {
      pageSize: req.pageSize || 250,
      page: req.page,
    },
    populate: req.query?.populate || "*",
  }
  const options = {
    method: "GET",
    headers: { 'Authorization': `Bearer ${req.accessToken}` },
  };
  const url = combineURLs(req.apiURL, endpoint, qs.stringify(queryParams, { encodeValuesOnly: true }))

  try {
    const options = {
      method: "GET",
    };

    const res = await fetch(url, options);
    const data = await res.json()
    return data

  } catch (error: any) {
    console.error(`Failed to fetch data from Strapi for ${req.collectionName}, error: ${error}`)
    throw error
  }
}

export { loadSingleTypes, loadContentTypes, loadCollectionTypes, loadLocales }
