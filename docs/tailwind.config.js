/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.md',
    './api/**/*.{js,ts,vue,md}',
    './components/**/*.{js,ts,vue,md}',
    './example/**/*.{js,ts,vue,md}',
    './guide/**/*.{js,ts,vue,md}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
