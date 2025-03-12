import { execSync } from 'child_process'
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前模块文件的 URL (ES模块)
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块目录的路径
const __dirname = path.dirname(__filename);
// 定义项目的根目录
const rootDir = path.join(__dirname, "..");

const packagePath = path.join(rootDir, "package.json");
const dependenciesVersionPath = path.join(rootDir, "dependenciesVersion.json");

const targetDependencies = [
  'element-plus',
  'vxe-table'
  // 添加需要跟踪的其他依赖...
]

const isFullHistory = true // 设置为 true 处理完整历史
const dependenciesVersions = {}

try {
  // 读取现有数据（增量模式时保留旧记录）
  let existingData = {}
  try {
    existingData = JSON.parse(fs.readFileSync(dependenciesVersionPath, 'utf-8'))
  } catch (e) { /* 文件不存在时忽略 */ }

  if (isFullHistory) {
    // 完整历史模式 ========================================
    const originalRef = execSync('git symbolic-ref --short HEAD || echo "HEAD"').toString().trim()
    const tags = execSync('git tag --sort=-v:refname')
      .toString()
      .trim()
      .split('\n')
      .filter(tag => tag)

    try {
      for (const tag of tags) {
        execSync(`git checkout ${tag}`, { stdio: 'ignore' })
        processVersion(tag.replace(/^v/, ''))
      }
    } finally {
      execSync(`git checkout ${originalRef}`, { stdio: 'ignore' })
    }
  } else {
    // 增量模式 ============================================
    // 自动获取当前版本（优先使用git标签，其次package.json）
    let currentVersion
    try {
      currentVersion = execSync('git describe --tags --abbrev=0')
        .toString()
        .trim()
        .replace(/^v/, '')
    } catch {
      currentVersion = JSON.parse(fs.readFileSync(packagePath, 'utf-8')).version
    }
    
    processVersion(currentVersion)
  }

  // 合并新旧数据（增量模式保留旧记录）
  const finalData = isFullHistory 
    ? dependenciesVersions 
    : { ...existingData, ...dependenciesVersions }

  fs.writeFileSync('dependenciesVersion.json', JSON.stringify(finalData, null, 2))
  console.log('✅ 依赖表更新完成')

} catch (error) {
  console.error('❌ 脚本执行出错:', error)
}

// 处理版本的核心函数
function processVersion(versionKey) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
  
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies
  }

  const filtered = Object.entries(allDeps)
    .filter(([name]) => targetDependencies.includes(name))
    .map(([name, version]) => ({ name, version }))

  if (filtered.length > 0) {
    dependenciesVersions[versionKey] = filtered
  }
}