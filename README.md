# BlueX Web Site next generation

Welcome to the BlueX website repository! This repository contains the source code for our company's website, which is designed and developed using Next.js and Tailwind CSS.

## Project Context

BlueX is our company's official website, acting as our primary online presence. This repository holds all the necessary code related to the website, including pages like 'About Us', 'Services', 'Blog', and 'Contact Us'.

The site is built with Next.js, a powerful React framework that provides an ideal environment for building high-performance applications. It utilizes Tailwind CSS, a utility-first CSS framework, to create a clean, responsive, and modern design across all device sizes.

## Getting Started

To begin working with the BlueX project, ensure you have Node.js and npm installed on your local machine. After that, you can follow these steps:

1. Clone this repository
   ```
   git clone https://gitlab.com/bluexlab/bluex-web-next.git
   ```

2. Navigate to the project folder
   ```
   cd bluex-web-next
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the local development server
   ```
   npm run dev
   ```

Now, the application should be running at `http://localhost:3000`

## Building the Project

To build the project for production, you should run the following command in your project directory:

```
npm run build
```

This will create an optimized version of the application in the `.next` folder.

## Deploying the Project

The deployment process may vary based on your hosting platform. Here is a generalized process to follow:

1. Build the project using `npm run build`

2. Move the contents of the `.next` folder to your web server

3. Configure your server to direct all incoming traffic to `/.next/server/pages/index.html`

For specific deployment process, you might want to check the documentation of your hosting platform.

**Note:** For platforms that support Node.js deployments, such as Vercel or Netlify, you can utilize their continuous deployment options by linking your repository.

Please remember to follow our contribution guidelines before making any changes to the project. If you encounter any problems, feel free to open an issue in this repository.

Welcome on board!



## current build stats

```
Route (app)                                Size     First Load JS
┌ ○ /                                      144 B           127 kB
├ ● /[lang]                                145 B           127 kB
├   ├ /en
├   ├ /zh-TW
├   └ /zh-CN
├ ● /[lang]/pricing                        177 B          84.3 kB
├   ├ /en/pricing
├   ├ /zh-TW/pricing
├   └ /zh-CN/pricing
├ ● /[lang]/pricing/detail                 139 B          78.4 kB
├   ├ /en/pricing/detail
├   ├ /zh-TW/pricing/detail
├   └ /zh-CN/pricing/detail
└ ○ /favicon.ico                           0 B                0 B
+ First Load JS shared by all              78.2 kB
  ├ chunks/596-5360791e840a7fb9.js         25.8 kB
  ├ chunks/fd9d1056-6982c396003f1f03.js    50.5 kB
  ├ chunks/main-app-6936f05ec8a4304b.js    214 B
  └ chunks/webpack-4371528dc1ef6fa3.js     1.72 kB

Route (pages)                              Size     First Load JS
─ ○ /404                                   182 B          75.7 kB
+ First Load JS shared by all              75.5 kB
  ├ chunks/framework-8883d1e9be70c3da.js   45 kB
  ├ chunks/main-aae3a04ebb161010.js        28.6 kB
  ├ chunks/pages/_app-52924524f99094ab.js  195 B
  └ chunks/webpack-4371528dc1ef6fa3.js     1.72 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```
