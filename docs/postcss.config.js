import { postcssIsolateStyles } from 'vitepress';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

console.log('PostCSS config loaded');
export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/, /base\.css/]
    }),
    tailwindcss(),
    autoprefixer(),
  ],
};
