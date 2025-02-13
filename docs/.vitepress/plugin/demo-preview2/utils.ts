import MarkdownIt from 'markdown-it'

// componentPreview check
export const isCheckPreviewCom1 = /^<preview (.*)><\/preview>$/
export const isCheckPreviewCom2 = /^<preview (.*) \/>$/
export const isCheckContainerPreview = /^demo-preview=(.+)$/

const scriptRE = /<\/script>/
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/
const scriptSetupCommonRE = /<\s*script\s+(setup|lang='ts'|lang="ts")?\s*(setup|lang='ts'|lang="ts")?\s*>/

/**
 * 统一处理组件名称->驼峰命名
 * @param componentName
 */
export const handleComponentName = (componentName: string) => {
  let newName = componentName
  newName = newName.replaceAll(/[_|-]+(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return newName
}

/**
 * 注入 script 脚本
 * @param mdInstance
 * @param path
 * @param componentName
 */
export const injectComponentImportScript = (env: any, path: string, componentName: string) => {
}

/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
export const transformHighlightCode = (mdInstance: MarkdownIt, sourceCode: string, suffix: string) =>
  mdInstance.options.highlight!(sourceCode, suffix, '')

/**
 * 根据组件路径组合组件引用名称
 * @param path
 * @returns
 */
export const composeComponentName = (path: string) => {
  let isFlag = true
  let componentList: string[] = []
  while (isFlag) {
    const lastIndex = path.lastIndexOf('/')
    if (lastIndex === -1) {
      isFlag = false
    } else {
      const name = path.substring(lastIndex + 1)

      componentList.unshift(name)
      path = path.substring(0, lastIndex)
    }
  }
  componentList = componentList.filter(item => item !== '' && item !== '.' && item !== '..')
  return componentList.join('-').split('.')[0]
}

/**
 * 检查组件相对路径
 * @param path
 * @returns
 */
export const isCheckingRelativePath = (path: string) => {
  const relativePath = path
  if (relativePath.startsWith('./') || relativePath.startsWith('../') || relativePath.startsWith('/'))
    if (!relativePath.endsWith('.vue')) {
        return relativePath + '.vue';
    }
    return relativePath
}
