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
        suntheme: {
          primary: '#FFFFFF',
          secondary: '#333333',
          accent: '#B7B7B7',
          neutral: '#EEEEEE',
        },
        moontheme: {
          primary: '#333333',
          secondary: '#FFFFFF',
          accent: '#B7B7B7',
          neutral: '#EEEEEE',
        },
      },
    ],
  },
};
