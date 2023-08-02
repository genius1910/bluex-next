// import { createAxiosInstance, loadCollectionTypes } from '@/lib/strapi_loader';
import { fetchMeta, fetchPage } from "@/cms/blog-entry";
import { fetch } from "@/cms/header";
require('dotenv').config();

// const query = {
//   populate: {
//     SEO: { populate: "*" },
//     Url: "*",
//     Title: "*",
//     Category: "*",
//     Type: "*",
//     Author: "*",
//     Date: "*",
//     UpdateDate: "*",
//     Image: "*",
//     ContentList: { populate: "*" },
//   },
// }

// const sconfig = {
//   apiURL: process.env.STRAPI_URL || 'http://localhost:3000/',
//   accessToken: process.env.STRAPI_APIKEY || '',
// }

// const instance = createAxiosInstance(sconfig)
// const result = loadCollectionTypes({
//   axiosInstance: instance,
//   collectionName: 'blogs',
//   query,
//   locale: 'en',
//   pageSize: 20,
//   page: 1,
//   sort: 'Date:desc',
// })

// result.then((res) => {
//   process.stdout.write(JSON.stringify(res) + "\n")
// })

// fetchPage(1).then((res) => {
//   process.stdout.write(JSON.stringify(res[1]) + "\n")
// })

// fetchMeta().then((res) => {
//   process.stdout.write(JSON.stringify(res) + "\n")
// })

fetch().then((res) => {
  process.stdout.write(JSON.stringify(res) + "\n")
})
