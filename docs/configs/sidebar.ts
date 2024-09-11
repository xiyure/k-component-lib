import fs from 'fs';
import _path from 'path';
import matter from 'gray-matter';

const BASE_PATH = process.cwd();
const COMPONENT_DIRS = fs.readdirSync(_path.join(BASE_PATH, 'components'));

type itemType = {
  text: string
  link: string
}

export default {
  '/api/': getApiSidebar(),
  '/components/': getComponentsSidebar(),
  '/guide/': getGuideSidebar()
};

function getApiSidebar() {
  return [
    {
      text: '功能',
      collapsible: true,
      items: [
        {
          text: '已实现',
          link: '/api/'
        },
      ]
    }
  ];
}

function getComponentsSidebar() {
  const items: itemType[] = [];
  // 自动导入组件文档
  for (const fileName of COMPONENT_DIRS) {
    const filePath = _path.join(BASE_PATH, 'components', fileName);
    if (!filePath.endsWith('.md')) {
      continue;
    }
    const markdownContent = readMarkdownFile(filePath);
    if (markdownContent) {
      const compName = _path.basename(fileName, '.md');
      const { title } = matter(markdownContent).data;
      items.push({
        text: title ?? 'undefined',
        link: `/components/${compName}`,
      });
    }
  }
  return [
    {
      text: '组件',
      items
    }
  ];
}

function getGuideSidebar() {
  return [
    {
      text: '指南',
      items: [
        {
          text: '安装',
          link: '/guide/'
        },
        {
          text: '全局注册',
          link: '/guide/register_g'
        },
        {
          text: '按需导入',
          link: '/guide/register_s'
        }
      ]
    }
  ];
}

// 读取 MD 文件内容
function readMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (err) {
    console.error('Error reading file:', err);
    return '';
  }
}