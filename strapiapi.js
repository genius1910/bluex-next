"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { createAxiosInstance, loadCollectionTypes } from '@/lib/strapi_loader';
var blog_entry_1 = require("@/cms/blog-entry");
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
(0, blog_entry_1.fetchPage)(1).then(function (res) {
    process.stdout.write(JSON.stringify(res[1]) + "\n");
});
