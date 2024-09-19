/** @type {import('tailwindcss').Config} */

import AOM from './package/style/theme/theme-AOM';

export default {
  darkMode: 'class',
  content: [
    './example/**/*.{vue,js,ts,md}',
    './package/**/*.{js,ts,vue,md}',
  ],
  theme: {
    extend: AOM,
  },
  plugins: [],
};
