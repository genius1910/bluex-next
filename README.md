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

4. Copy `.env.sample` to `.env` and fill in all settings

5. Start the local development server
   ```
   npm run dev
   ```

Now, the application should be running at `http://localhost:3000`

## Building the Project

To build the project for production, you should run the following command in your project directory:

```
npm run build
```

This will create an optimized and staticversion of the website in the `out` folder.

## Deploying the Project

The website is server-independent. All necessary files, including HTML, JS, and CSS, are converted to static files. To deploy, simply copy everything from the `out` folder to the root directory of an HTTP server or S3.
