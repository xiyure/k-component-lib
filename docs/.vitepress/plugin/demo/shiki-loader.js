// 文件路径: ./shiki-loader.js
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

// 预加载基础配置
const highlighterPromise = createHighlighterCore({
  themes: [
    import('shiki/themes/vitesse-light.mjs'),
    import('shiki/themes/vitesse-dark.mjs'),
  ],
  langs: [
    import('shiki/langs/vue.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/css.mjs'),
    // 添加其他需要支持的语言
  ],
  engine: createOnigurumaEngine(import('shiki/wasm'))
})

export async function highlightCode(code, lang) {
  const highlighter = await highlighterPromise
  try {
    return highlighter.codeToHtml(code, {
      lang,
      themes: { 
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      }
    })
  } catch (e) {
    // 回退处理
    return `<pre><code>${code}</code></pre>`
  }
}