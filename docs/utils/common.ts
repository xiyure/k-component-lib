import * as fs from 'fs';

// 转义特殊字符
export function escapeCharacter(str: string) {
  if (!str) {
    return '';
  }
  return str.replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
};
// 驼峰转下划线
export function toKebabCase(str: string) {
  return str.replace(/[A-Z]/g, (match, offset) => {
    return `${offset > 0 ? "-" : ""}${match.toLocaleLowerCase()}`;
  });
};
// 去除引号
export function unquote(str: string) {
  return str && str.replace(/^['"]|['"]$/g, "");
}
// 去除空格
export function trimStr(str: string) {
  return str && str.replace(/^(\s|\||\r?\n)*|(\s|\||\r?\n)*$/g, "");
}
// 去除换行
export function cleanStr(str: string) {
  return str && str.replace(/\r?\n/g, "");
}
// 读取文件内容
export function readFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = JSON.parse(content);
  return content;
};