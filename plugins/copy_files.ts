import fs from 'node:fs';

type Paths = {
  from: string;
  to: string;
  isDir?: boolean;
}
function copyFiles(paths: Paths[]) {
  return {
    name: 'copy-file-plugin',
    closeBundle() {
      try {
        for (const { from, to, isDir = false } of paths) {
          fs.cp(from, to, { recursive: isDir }, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
}

export default copyFiles;