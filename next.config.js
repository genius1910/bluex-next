/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // serverRuntimeConfig: {
  //   strapiUrl: process.env.STRAPI_URL,
  //   strapiApiKey: process.env.STRAPI_APIKEY,
  // }
}

module.exports = nextConfig
