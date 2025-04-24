const fs = require('fs');
const path = require('path');

const projectRoot = path.join(process.cwd(), 'packages');
const typeSrc = path.join(projectRoot, 'typings/types');

let content = '';
const excludeDirs = ['index.ts', 'message', 'message_box', 'table'];

if (!fs.existsSync(typeSrc)) {
  fs.mkdirSync(typeSrc, { recursive: true });
}

const copyTypes = async (src, filename = 'type', getDir = null) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof getDir === 'function') {
        content += `export * from '../es/${getDir(filename)}';\n`;
        resolve();
      }
      const scanDir = path.join(projectRoot, src);
      const dirs = fs.readdirSync(scanDir);
      dirs.forEach((file) => {
        if (!excludeDirs.includes(file)) {
          content += `export * from '../es/${src}/${file}/${filename}';\n`;
        }
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

Promise.all([
  copyTypes('components'),
  copyTypes('templates')],
  copyTypes(null, null, () => 'components/message'),
  copyTypes(null, null, () => 'components/message_box'),
  copyTypes(null, null, () => 'utils/typescript/util_types'),
  copyTypes(null, null, () => 'native'),
  copyTypes(null, null, () => 'constant')
)
  .then(() => {
    const distType = path.join(process.cwd(), 'dist/types/base.d.ts');
    fs.writeFileSync(distType, content);
    console.log('generate type file success');
  })
  .catch((err) => {
    console.error('generate type file error:', err);
  });