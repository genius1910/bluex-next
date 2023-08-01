import { createAxiosInstance, loadCollectionTypes } from '@/lib/strapi_loader';
require('dotenv').config();

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

const sconfig = {
  apiURL: process.env.STRAPI_URL,
  accessToken: process.env.STRAPI_APIKEY,
}

const instance = createAxiosInstance(sconfig)

const result = loadCollectionTypes({
  axiosInstance: instance,
  collectionName: 'blogs',
  query,
  // locales: ['en', 'zh-Hant-TW', 'zh-Hans-CN'],
  locate: 'en',
  pageSize: 20,
  page: 1,
  sort: 'Date:desc',
})

result.then((res) => {
  // process.stdout.write(JSON.stringify(res) + "\n")
})
