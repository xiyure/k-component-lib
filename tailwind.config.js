/** @type {import('tailwindcss').Config} */

import AOM from './package/style/theme/theme-AOM';

export default {
  darkMode: 'class',
  content: [
    './docs/**/*.{js,ts,vue,md}',
    './docs/**/*.md',
    './example/**/*.{vue,js,ts,md}',
    './package/**/*.{js,ts,vue,md}',
  ],
  theme: {
    extend: AOM,
  },
  plugins: [],
};
