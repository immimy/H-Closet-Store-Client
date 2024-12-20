/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      'lofi',
      {
        sunTheme: {
          primary: '#bfb5a9',
          secondary: '#a69784',
          accent: '#2a1b08',
          neutral: '#EEEEEE',
        },
        moonTheme: {
          primary: '#31363F',
          secondary: '#222831',
          accent: '#EEEEEE',
          neutral: '#76ABAE',
        },
      },
    ],
  },
};
