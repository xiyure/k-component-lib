import { cp, writeFile } from 'fs/promises';
import { resolve } from 'path';
import pgk from '../../package.json';
import { projectRoot, distDir } from '../path';

const genPackageFile = () => {
  const { scripts, ...rest } = pgk;
  const newPkg = { ...rest };
  return writeFile(resolve(distDir, 'package.json'), JSON.stringify(newPkg, null, 2))
}

export const copyFiles = () => {
  return {
    name: 'copy-files-plugin',
    closeBundle() {
      Promise.all([
        cp(
          resolve(projectRoot, 'packages', 'static', 'tailwind'),
          resolve(distDir, 'kingsware-ui', 'tailwind'),
          { recursive: true }
        ),
        cp(
          resolve(projectRoot, 'README.md'),
          resolve(distDir, 'README.md')
        ),
        cp(
          resolve(projectRoot, 'typings'),
          resolve(distDir, 'types'),
          { recursive: true }
        ),
        genPackageFile()
      ])
    },
  };
}
