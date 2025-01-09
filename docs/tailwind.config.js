/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.md',
    './.vitepress/**/*.{js,ts,vue}',
    './api/**/*.{js,ts,vue,md}',
    './components/**/*.{js,ts,vue,md}',
    './example/**/*.{js,ts,vue,md}',
    './docs/**/*.{js,ts,vue,md}'
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '768px',
        xs: '960px',
        sm: '1440px',
        base: '1920px',
        lg: '2560px',
        xl: '3008px',
        '2xl': '3840px'
      }
    }
  },
  plugins: []
};
