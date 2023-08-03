/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
      'serif': ['Roboto', 'serif'],
      'title': ['lato'],
      'button': ['lato'],
      'menu': ['Inter', 'sans-serif'],
      'btn': ['lato'],
    },
    screens: {
      'md': { min: '425px' },
      'lg': { min: '960px' },
      'mobilex': { max: '425px' },
      'laptopx': { max: '960px' },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#18335e',
        'secondary': '#009bd2',
        'submenu': '#18335e',
      },
    },
  },
  plugins: [],
}
