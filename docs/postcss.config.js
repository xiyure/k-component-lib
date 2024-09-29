import { postcssIsolateStyles } from 'vitepress';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/, /base\.css/]
    }),
    tailwindcss(),
    autoprefixer(),
  ],
};
