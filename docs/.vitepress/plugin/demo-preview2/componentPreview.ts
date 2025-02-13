/* eslint-disable no-param-reassign */
import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import {
  composeComponentName,
  injectComponentImportScript,
  isCheckingRelativePath,
  transformHighlightCode
} from './utils'

const titleRegex = /title=['"](.*?)['"]/
const pathRegex = /path=['"](.*?)['"]/
const descriptionRegex = /description=['"](.*?)['"]/

export interface DefaultProps {
  path: string
  title: string
  description: string
}

/**
 * 编译预览组件
 * @param md
 * @param token
 * @param env
 * @returns
 */
export const transformPreview = (md: MarkdownIt, token: Token, env: any) => {
  const componentProps: DefaultProps = {
    path: '',
    title: '默认标题',
    description: '描述内容'
  };

  // 获取Props相关参数
  const titleValue = token.content.match(titleRegex);
  const pathRegexValue = token.content.match(pathRegex);
  const descriptionRegexValue = token.content.match(descriptionRegex);

  if (!pathRegexValue) throw new Error('@vitepress-demo-preview/plugin: path is a required parameter');
  componentProps.path = isCheckingRelativePath(pathRegexValue[1]);
  componentProps.title = titleValue ? titleValue[1] : '';
  componentProps.description = descriptionRegexValue ? descriptionRegexValue[1] : '';

  // 后缀名
  const suffixName = componentProps.path.substring(componentProps.path.lastIndexOf('.') + 1);

  return `<demo-preview 
    title="${componentProps.title}" 
    description="${componentProps.description}" 
    path="${componentProps.path}"
    suffixName="${suffixName}">
  </demo-preview>`;
};

