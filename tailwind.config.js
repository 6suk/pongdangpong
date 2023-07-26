/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        pri: {
          900: '#ebf1ff',
          800: '#bfd1ff',
          700: '#92b1ff',
          600: '#6691ff',
          500: '#4679fc',
          400: '#2d62ea',
          300: '#1546c2',
          200: '#00247e',
          100: '#0833a0',
          50: '#001a5c',
        },
        gray: {
          900: '#fbfbfb',
          800: '#f4f4f4',
          700: '#e7e7e7',
          600: '#cfcfcf',
          500: '#aeaeae',
          400: '#808080',
          300: '#737373',
          200: '#505050',
          100: '#323232',
          50: '#1d1d1d',
        },
        black: '#141212',
        dim: '#282828',
        white: '#ffffff',
        error: '#df291d',
        positive: '#1fb881',
      },
      fontSize: {
        mainTitle: '1.75rem',
        title: '1.5rem',
        subTitle: '1.125rem',
        bodyText: '1rem',
        details: '.875rem',
        smallestText: '.75rem',
      },
      plugins: [],
    },
  },
};
