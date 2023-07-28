import { createAxiosInstance, loadContentTypes, loadSingleTypes } from '@/lib/strapi_loader';
require('dotenv').config();

const query = {
  populate: {
    SEO: { populate: "*" },
    Section_1_Title: "*",
    Section_1_Content: "*",
    Section_1_Image: "*",
    Section_1_Image_Preview: "*",
    Section_1_Button: "*",
    Section_2_Title: "*",
    Section_2_Media_List: { populate: "*" },
    Section_2_Media: { populate: "*" },
    Section_3_Type: "*",
    Section_3_Title: "*",
    Section_3_Title_Styled_Keyword: "*",
    Section_3_Content: "*",
    Section_3_Image: "*",
    Section_3_Feature_List: "*",
    Section_3_Button: "*",
    Section_4_Page_Intro_List: { populate: "*" },
    Section_5_Title: "*",
    Section_5_Logo_List: "*",
    Section_6_Title: "*",
    Section_6_Testimonial_List: "*",
    Section_7_Title: "*",
    Section_7_FAQ_List: { populate: "*" },
    Section_8_Content: "*",
    Section_8_Button: "*",
    Section_8_Bg: "*",
  },
}

const sconfig = {
  apiURL: process.env.STRAPI_URL,
  accessToken: process.env.STRAPI_APIKEY,
}

const instance = createAxiosInstance(sconfig)
loadContentTypes({  axiosInstance: instance })

const result = loadSingleTypes({
  axiosInstance: instance,
  singularName: 'front-content',
  query,
  locales: ['en', 'zh-Hant-TW', 'zh-Hans-CN'],
  limit: 500
})

result.then((res) => {
  process.stdout.write(JSON.stringify(res) + "\n")
})
