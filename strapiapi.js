import { createAxiosInstance, loadSingleTypes } from '@/lib/strapi_loader';
require('dotenv').config();

const query = {
  populate: {
    Product_Dropdown_Label: "*",
    Product_Dropdown_Groups: {
      populate: {
        name: "*",
        type: "*",
        links: { populate: "*" },
      },
    },
    Header_SubMenus: {
      populate: {
        title: "*",
        attachment: "*",
        links: { populate: "*" },
      },
    },
    Header_SignIn_Btn: "*",
    Header_Back_Btn: "*",
    Site_Map: {
      populate: {
        title: "*",
        attachment: "*",
        links: { populate: "*" },
      },
    },
    Footer_Form_Title: "*",
    Footer_Form_Button: "*",
    Footer_Input_First_Name_Label: "*",
    Footer_Input_Last_Name_Label: "*",
    Footer_Input_Email_Label: "*",
    Footer_Input_Company_Label: "*",
    Footer: "*",
    Right_Company: "*",
    Right_Reserved: "*",
    Footer_Form_End_Content: "*",
    Footer_Form_End_Button: "*",
  },
  locale: 'zh-TW',
}

const sconfig = {
  apiURL: process.env.STRAPI_URL,
  accessToken: process.env.STRAPI_APIKEY,
}

const instance = createAxiosInstance(sconfig)
const result = loadSingleTypes({
  axiosInstance: instance,
  singularName: 'layout-content',
  query,
  locales: ['en', 'zh-Hant-TW', 'zh-Hans-CN'],
  limit: 500
})

console.log(result)

// const options = {
//   hostname: 'dev-strapi4.bluex.trade',
//   path: '/api/layout-content?' + queryParams,
//   port: 1337,
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length,
//     Authorization: 'Apikey ' + process.env.STRAPI_APIKEY,
//     'User-Agent': 'Node',
//   },
// };

// const req = https.request(options, (res) => {
//   let data = '';
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on('data', (d) => {
//     data += d;
//   });
//   res.on('end', () => {
//     console.log(JSON.parse(data).data);
//   });
// });

// req.on('error', (error) => {
//   console.error(error);
// });

// req.write(data);
// req.end();
