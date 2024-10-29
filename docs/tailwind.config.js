/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.md',
    './.vitepress/**/*.{js,ts,vue}',
    './api/**/*.{js,ts,vue,md}',
    './components/**/*.{js,ts,vue,md}',
    './example/**/*.{js,ts,vue,md}',
    './docs/**/*.{js,ts,vue,md}',
    '../package/**/*.{js,ts,vue,md}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
