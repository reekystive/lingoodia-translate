// @ts-expect-error no types for tailwindcss-safe-area
import safeArea from 'tailwindcss-safe-area';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [safeArea],
  theme: {
    extend: {
      fontFamily: {
        belanosima: ['Belanosima', ...defaultTheme.fontFamily.sans],
      },
      animation: {},
      keyframes: {},
      colors: {
        contessa: {
          50: '#faf7f6',
          100: '#f5eceb',
          200: '#eeddda',
          300: '#e1c4c0',
          400: '#cfa19a',
          500: '#b77a71',
          600: '#a4675e',
          700: '#89544c',
          800: '#724842',
          900: '#61403b',
          950: '#331f1c',
        },
      },
    },
  },
};
