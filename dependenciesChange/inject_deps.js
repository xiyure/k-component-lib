import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前模块文件的 URL (ES模块)
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块目录的路径
const __dirname = path.dirname(__filename);
// 定义项目的根目录
const rootDir = path.join(__dirname, "..");

const depsDataPath = path.join(rootDir, "dependenciesVersion.json");
const contextPath = path.join(rootDir, "context.json");

// 读取数据文件
const depsData = JSON.parse(
  fs.readFileSync(depsDataPath, "utf-8")
);
const context = JSON.parse(fs.readFileSync(contextPath, "utf-8"));

// 版本标准化函数 (移除v前缀)
const normalizeVersion = (v) => (v || "").replace(/^v/, "");

// 递归处理上下文节点
function processNode(node) {
  if (!node) return;

  // 处理当前节点
  const cleanVersion = normalizeVersion(node.version);
  if (depsData[cleanVersion]) {
    node.extra = node.extra || {};
    node.extra.dependencies = depsData[cleanVersion];
    console.log(`✅ 注入依赖到版本 ${node.version}`);
  } else if (cleanVersion) {
    console.log(`⚠️  未找到 ${node.version} 的依赖信息`);
  }

  // 递归处理前一个版本
  if (node.previous) {
    processNode(node.previous);
  }
}

// 主处理流程
function main() {
  // 遍历所有上下文条目
  context.forEach((entry) => {
    console.log(`\n🔍 处理条目: ${entry.version || "root"}`);
    processNode(entry);
  });

  // 保存修改后的上下文
  fs.writeFileSync("context.json", JSON.stringify(context, null, 2));
  console.log("\n🎉 依赖注入完成");
}

// 执行脚本
main();
