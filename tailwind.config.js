/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {},
      colors: {},
      plugins: [require('@tailwindcss/forms')],
    },
  },
};
