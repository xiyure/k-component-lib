import path from "path";
import { globSync } from "glob";
import sidebar from '../configs/sidebar';

function generateRewrites() {
  const rewrites = {};
  
  // 匹配所有的 Markdown 文件
  const moFiles = globSync('docs/**/*.md');
  
  moFiles.forEach(file => {
    // 将路径转换为 POSIX 格式, 兼容 windows
    const posixFile = file.split(path.sep).join(path.posix.sep);
    
    const fileName = path.posix.basename(posixFile, '.md'); // 获取文件名（不带扩展名）
    const dirName = path.posix.basename(path.posix.dirname(posixFile)); // 获取所在目录名
    
    // 检查文件名和目录名是否相同
    if (fileName.toLowerCase() === dirName.toLowerCase()) {
      // 生成重写路径，去掉该目录
      const relativePath = path.posix.relative('docs', posixFile);
      const rewritePath = `${path.posix.dirname(relativePath)}.md`;
      rewrites[posixFile] = rewritePath;
    } else {
      // 否则，保持原有的相对路径
      const relativePath = path.posix.relative('docs', posixFile);
      rewrites[posixFile] = relativePath;
    }
  });
  // console.log(rewrites);

  return rewrites;
}

function sidebarRewrites() {
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
  const newSidebar = {};

  for (const [key, value] of Object.entries(sidebar)) {
    // console.log(`处理基路径: ${value.base}`);
    if (key.startsWith('/docs')) {
      // 去除键中的 '/docs' 前缀
      const newKey = key.replace(/^\/docs/, '');
      // 去除base路径中的 '/docs'
      const newValue = { ...value, base: value.base.replace(/^\/docs/, '') };
      // 将处理后的键和值添加到新的对象中
      newSidebar[newKey] = newValue;
    } else {
      // 如果键不包含 '/docs'，则直接复制到新对象中
      newSidebar[key] = value;
    }
    processItems(value.items);
  }
  // console.log(JSON.stringify(newSidebar, null, 2));
  return newSidebar; // 返回修改后的 sidebar
}

export { generateRewrites, sidebarRewrites };