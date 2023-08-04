// import { createAxiosInstance, loadCollectionTypes } from '@/lib/strapi_loader';
// import { fetchBySlug, fetchSlugs } from "@/cms/blog-entry";
import { searchBlogs, fetchBySlug, fetchSlugs } from "@/cms/blog-search";
// import { fetch } from "@/cms/header";
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

fetchSlugs().then((res) => {
  process.stdout.write(JSON.stringify(res) + "\n")
})

// fetchBySlug('the-bluex-open-freight-marketplace-how-logistics-should-work').then((res) => {
//   process.stdout.write(JSON.stringify(res) + "\n")
// })

// searchBlogs({ page: 1, pageSize: 5, type: null, category: null, search: null, sort: ['Date:desc']}).then((res) => {
//   process.stdout.write(JSON.stringify(res) + "\n")
// }).catch((err) => {
//   process.stdout.write("error:" + JSON.stringify(err) + "\n")
// })
