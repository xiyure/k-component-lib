<template>
  <div class="flex gap-4 my-4">
    <div class="text-gray-400">使用</div>
    <k-tooltip class="box-item" effect="dark" :content="tooltipContent" placement="right">
      <div class="px-1 rounded hover:cursor-pointer hover:bg-gray-100" @click="handleCopy()">
        <div v-html="highlightedCode" />
      </div>
    </k-tooltip>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import hljs from 'highlight.js/lib/core';
import '../plugin/demo/highlightjs.css';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const props = defineProps({
  name: {
    type: String
  }
});

const sourceCode = `import { ${props.name} } from "@ksware/ksw-ux";`;

// 带缓存的高亮处理
const highlightedCode = computed(() => {
  if (!sourceCode) return '';
  const highlighted = hljs.highlight(sourceCode, { language: 'javascript' }).value;
  return `<pre><code class="language-javascript">${highlighted}</code></pre>`;
});

const { copy } = useClipboard();
const tooltipContent = ref('点击复制');
const handleCopy = async () => {
  await copy(sourceCode);
  tooltipContent.value = '复制成功!';
  setTimeout(() => {
    tooltipContent.value = '点击复制';
  }, 2000); // 2秒后恢复原状态
};


</script>
<style scoped></style>
