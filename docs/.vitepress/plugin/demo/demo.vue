<script setup>
import { ref, shallowRef, onMounted, computed, defineAsyncComponent, watch } from 'vue';
import { useData } from 'vitepress';
import { dirname, join } from 'pathe';
import CodeOpen from './icons/code-open.vue';
import CodeClose from './icons/code-close.vue';
import CodeCopy from './icons/code-copy.vue';
import { useNameSpace } from './hooks/use-namespaces';
import { useCodeFold } from './hooks/use-codefold';
import { useCodeCopy } from './hooks/use-codecopy';
import { KMessage } from '@ksware/ksw-ux';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

// 注册语言支持
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  suffixName: {
    type: String,
    default: 'vue'
  }
})

const { page } = useData();
const ns = useNameSpace();
const { isCodeFold, setCodeFold } = useCodeFold();
const { clickCopy } = useCodeCopy();

const sourceCode = ref(''); // 源码
const sourceCodeArea = ref(null);
const dynamicComponent = shallowRef(null);

// 解析目标路径并自动补全后缀
const resolveTargetPath = (relativePath) => {
  const mdDir = dirname(page.value.filePath)
  let importPath = join('/', mdDir, relativePath)
  
  // 自动补全.vue后缀
  const hasExtension = /\.[^./]+$/.test(importPath)
  if (!hasExtension) {
    importPath += '.vue'
  }
  
  return importPath
}

// 使用 import.meta.glob 收集所有可能的组件（注意路径根据你的项目结构调整）
const modules = import.meta.glob('@docs/**/*.vue');
// 使用 import.meta.glob 收集所有源码（利用 { as: 'raw' } 选项）
const rawModules = import.meta.glob('@docs/**/*.vue', { query: '?raw', import: 'default' });

// 动态加载组件
const loadComponent = async () => {
  try {
    const importPath = resolveTargetPath(props.path);
    // 从 modules 映射中获取对应模块
    const mod = modules[importPath];
    if (!mod) {
      throw new Error(`Component not found: ${importPath}`)
    }
    dynamicComponent.value = defineAsyncComponent(mod);
  } catch (error) {
    console.error('Failed to load component:', error);
    KMessage({ message: '组件加载失败', type: 'error' })
  }
};

// 加载源码并高亮显示
const loadSourceCode = async () => {
  try {
    const importPath = resolveTargetPath(props.path);
    const rawLoader = rawModules[importPath];
    if (!rawLoader) {
      throw new Error(`Source code not found: ${importPath}`)
    }
    sourceCode.value = await rawLoader()
  } catch (error) {
    console.error('Source code load failed:', error)
    KMessage({ message: '源码加载失败', type: 'error' })
  }
};

// 带缓存的高亮处理
const highlightedCode = computed(() => {
  if (!sourceCode.value) return ''
  try {
    const highlighted = hljs.highlight(sourceCode.value, { 
      language: props.suffixName === 'vue' ? 'xml' : props.suffixName 
    }).value
    return `<pre><code class="language-${props.suffixName}">${highlighted}</code></pre>`
  } catch (e) {
    return `<pre><code class="language-${props.suffixName}">${sourceCode.value}</code></pre>`
  }
})

// 复制代码
const clickCodeCopy = () => {
  clickCopy(sourceCode.value);
  KMessage({
    message: '复制成功',
    type: 'success'
  });
};

// 自动高度处理
const updateCodeAreaHeight = () => {
  if (!sourceCodeArea.value) return
  
  requestAnimationFrame(() => {
    const fullHeight = sourceCodeArea.value.scrollHeight
    sourceCodeArea.value.style.height = isCodeFold.value ? '0px' : `${fullHeight}px`
  })
}

onMounted(async () => {
  await Promise.all([loadComponent(), loadSourceCode()])
  updateCodeAreaHeight()
})

watch(isCodeFold, updateCodeAreaHeight)
watch(() => props.path, () => {
  loadComponent()
  loadSourceCode()
})
</script>

<template>
  <div :class="[ns.e('element-plus__container')]">
    <section class="vp-raw" :class="[ns.bem('preview')]">
      <component :is="dynamicComponent" v-if="dynamicComponent" />
    </section>
    <section :class="[ns.bem('description')]">
      <div :class="[ns.bem('description', 'split-line')]"></div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <CodeCopy @click="clickCodeCopy" />
        <component :is="isCodeFold ? CodeOpen : CodeClose" @click="setCodeFold(!isCodeFold)" />
      </div>
    </section>
    <section ref="sourceCodeArea" :class="[ns.bem('source')]">
      <div v-html="highlightedCode" :class="`language-${props.suffixName}`" />
    </section>
  </div>
</template>

<style src="./various.css"></style>

<style scoped>
/* .vitepress-demo-preview__element-plus__container > * {
  font-size: 14px;
} */

.vitepress-demo-preview__element-plus__container {
  div[class*='language-'] {
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 0;
    background-color: var(--vp-code-block-bg);
    border-top: 1px dashed var(--component-preview-border);
  }
}

.vitepress-demo-preview__element-plus__container {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--component-preview-border);
  /* box-shadow: 0px 0px 10px var(--component-preview-border); */
  margin: 10px 0;
  overflow: hidden;

  .vitepress-demo-preview-preview,
  .vitepress-demo-preview-description,
  .vitepress-demo-preview-source {
    width: 100%;
  }
}

.vitepress-demo-preview__element-plus__container > .vitepress-demo-preview-preview {
  padding: 20px 20px 30px 20px;
  & > p {
    margin: 0;
    padding: 0;
  }
}

.vitepress-demo-preview__element-plus__container > .vitepress-demo-preview-description {
  .vitepress-demo-preview-description__title {
    width: 100%;
    position: relative;
    padding-left: 25px;

    &::before {
      content: '';
      position: absolute;
      width: 3%;
      border-top: 1px solid var(--component-preview-border);
      top: 12px;
      left: 0;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      border-top: 1px solid var(--component-preview-border);
      top: 12px;
      margin-left: 5px;
    }
  }

  .vitepress-demo-preview-description__content {
    padding: 20px;
  }

  .vitepress-demo-preview-description__split-line {
    border-bottom: 1px dashed var(--component-preview-border);
  }

  .vitepress-demo-preview-description__handle-btn {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      color: var(--component-preview-text-1);
      cursor: pointer;
    }

    svg:not(:last-of-type) {
      margin-right: 8px;
    }
  }
}

.vitepress-demo-preview__element-plus__container > .vitepress-demo-preview-source {
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.bg-grid-slate-100 {
  background-color: var(--vp-code-block-bg);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(241 245 249)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}

:root.dark .bg-grid-slate-100 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.25)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}
</style>
