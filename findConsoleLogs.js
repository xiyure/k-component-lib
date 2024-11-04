import fs from 'fs';
import path from 'path';

// 定义要搜索的目录
const directoryPath = path.join(process.cwd(), 'package');

// 查找包含 console.log 的文件并移除的函数
async function removeConsoleLogs(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      // 递归搜索子目录
      await removeConsoleLogs(fullPath);
    } else if (file.isFile()) {
      // 检查文件扩展名
      const extname = path.extname(fullPath);
      if (extname === '.js' || extname === '.vue') {
        // 读取文件内容
        const data = await fs.promises.readFile(fullPath, 'utf8');

        // 检查是否包含 console.log
        if (data.includes('console.log')) {
          console.log(`找到并移除 console.log 的文件: ${fullPath}`);

          // 移除 console.log 行
          const updatedData = data.replace(/console\.log\(.*?\);?/g, '');

          // 将更新后的内容写回文件
          await fs.promises.writeFile(fullPath, updatedData, 'utf8');
        }
      }
    }
  }
}

// 执行查找并移除
removeConsoleLogs(directoryPath).catch((err) => {
  console.error(`发生错误: ${err.message}`);
});
