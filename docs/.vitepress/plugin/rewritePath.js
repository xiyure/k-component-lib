import path from "path";
import { globSync } from "glob";

function generateRewrites() {
  const rewrites = {};
  
  // 匹配所有的 Markdown 文件
  const moFiles = globSync('docs/**/*.md');
  
  moFiles.forEach(file => {
    const fileName = path.basename(file, '.md'); // 获取文件名（不带扩展名）
    const dirName = path.basename(path.dirname(file)); // 获取所在目录名
    
    // 检查文件名和目录名是否相同
    if (fileName.toLowerCase() === dirName.toLowerCase()) {
      const relativePath = path.relative('docs', file);
      const rewritePath = `${path.dirname(file)}.md`;
      rewrites[file] = rewritePath;
    }
  });
  // console.log(rewrites);

  return rewrites;
}

function sidebarRewrites(sidebar) {
  function processItems(items) {
    items.forEach(item => {
      if (item.link) {
        const parts = item.link?.split('/');
        // 检查 parts 的长度以确保不会访问 undefined
        if (parts.length > 1) {
          const lastPart = parts[parts.length - 1];
          const secondLastPart = parts[parts.length - 2];
  
          // 如果最后两部分相同，则重写链接
          if (lastPart.toLowerCase() === secondLastPart.toLowerCase()) {
            parts.pop(); // 移除最后一部分
            item.link = parts.join('/');
          }
        }
      }

      // 如果有子级，递归处理
      if (item.items) {
        processItems(item.items);
      }
    });
  }

  for (const [key, value] of Object.entries(sidebar)) {
    // console.log(`处理基路径: ${value.base}`);
    processItems(value.items);
  }
  // console.log(JSON.stringify(sidebar, null, 2));
  return sidebar; // 返回修改后的 sidebar
}

export { generateRewrites, sidebarRewrites };