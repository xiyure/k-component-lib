/** @type {import('tailwindcss').Config} */

import AOM from './packages/style/theme/AOM/theme-tw';

export default {
  darkMode: 'class',
  content: ['./example/**/*.{vue,js,ts,md}', './packages/**/*.{js,ts,vue,md}'],
  theme: {
    extend: AOM
  },
  plugins: []
};
