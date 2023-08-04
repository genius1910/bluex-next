import BlogsContent from '@/constants/mockup/blogs-content.json';
import { loadCollectionTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { ImageEntry, ImageFormats, Metadata, SEO } from './types';



// export async function fetchMeta() {
//   if (useMockData) {
//     return {
//       "pagination": {
//         "page": 1,
//         "pageSize": pageSize,
//         "pageCount": 14,
//         "total": 67
//       }
//     } as Metadata
//   }

//   const res = await loadCollectionTypes({
//     ...baseConfig(),
//     collectionName: 'blogs',
//     locale: 'en',
//     query,
//     page: 1,
//     pageSize,
//     sort: 'Date:desc',
//   })

//   return res.meta as Metadata
// }
