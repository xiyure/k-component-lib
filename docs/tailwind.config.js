/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './index.md',
    './.vitepress/**/*.{js,ts,vue}',
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
