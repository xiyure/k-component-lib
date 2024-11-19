/** @type {import('tailwindcss').Config} */

import AOM from './style/theme/AOM/theme-tw';

export default {
  darkMode: 'class',
  content: ['./templates/**/*.{vue,js,ts,md}', './components/**/*.{js,ts,vue,md}'],
  theme: {
    extend: AOM
  },
  plugins: []
};
