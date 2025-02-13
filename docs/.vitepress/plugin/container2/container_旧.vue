<script lang="ts" setup>
  import { shallowRef, onMounted, computed } from 'vue';
  import CodeOpen from './icons/code-open.vue';
  import CodeClose from './icons/code-close.vue';
  import CodeCopy from './icons/code-copy.vue';
  import { useNameSpace } from './hooks/use-namespaces';
  import { useCodeFold } from './hooks/use-codefold';
  import { useCodeCopy } from './hooks/use-codecopy';
  import { MessageNoticeService } from './messages/index';
  import { KMessage } from '@ksware/ksw-ux';
  
  interface DemoBlockProps {
    path: string; // 组件路径
    title: string;
    description: string;
    suffixName: string; // 文件后缀名
  }
  
  const props = withDefaults(defineProps<DemoBlockProps>(), {
    title: '默认标题',
    description: '描述内容',
    suffixName: 'vue',
  });
  
  const ns = useNameSpace();
  const { isCodeFold, setCodeFold } = useCodeFold();
  const { clickCopy } = useCodeCopy();
  
  const sourceCode = ref(''); // 源码
  const showSourceCode = ref(''); // 高亮后的源码
  const sourceCodeArea = ref<any>(null);
  const dynamicComponent = shallowRef<any>(null); // 使用 shallowRef
  
  // 动态加载组件
  const loadComponent = async () => {
    try {
      dynamicComponent.value = defineAsyncComponent(() => import(/* @vite-ignore */ props.path));
    } catch (e) {
      console.error('Failed to load component:', e);
    }
  };
  
  // 加载源码并高亮显示
  const loadSourceCode = async () => {
    try {
      const response = await fetch(props.path);
      const code = await response.text();
      sourceCode.value = code;
      showSourceCode.value = highlightCode(code, props.suffixName); // 假设 highlightCode 是一个高亮函数
    } catch (e) {
      console.error('Failed to load source code:', e);
    }
  };
  
  // 模拟代码高亮函数
  const highlightCode = (code: string, language: string) => {
    // 这里可以使用 highlight.js 或其他高亮库
    return `<pre><code class="language-${language}">${code}</code></pre>`;
  };
  
  // 复制代码
  const clickCodeCopy = () => {
    clickCopy(sourceCode.value);
    KMessage({
      message: '复制成功',
      type: 'success',
    });
  };
  
  // 计算代码区域高度
  const sourceCodeContainerHeight = computed(() => {
    if (sourceCodeArea.value) return sourceCodeArea.value?.clientHeight;
    return 0;
  });
  
  // 设置代码区域高度
  const setContainerHeight = (value: number) => {
    if (isCodeFold.value) sourceCodeArea.value.style.height = '0px';
    else sourceCodeArea.value.style.height = `${value}px`;
  };
  
  onMounted(async () => {
    await loadComponent(); // 加载组件
    await loadSourceCode(); // 加载源码
  
    // 初始化代码区域高度
    const currentContainerHeight = sourceCodeContainerHeight.value;
    setContainerHeight(currentContainerHeight);
  });
  
  watch(isCodeFold, () => {
    const container = sourceCodeContainerHeight.value;
    setContainerHeight(container);
  });
  </script>
  
  <template>
    <div :class="[ns.e('element-plus__container')]">
      <section class="vp-raw" :class="[ns.bem('preview')]">
        <component :is="dynamicComponent.value" v-if="dynamicComponent.value" />
      </section>
      <section :class="[ns.bem('description')]">
        <div :class="[ns.bem('description', 'split-line')]"></div>
        <div :class="[ns.bem('description', 'handle-btn')]">
          <CodeCopy @click="clickCodeCopy" />
          <CodeClose v-if="!isCodeFold" @click="setCodeFold(true)" />
          <CodeOpen v-else @click="setCodeFold(false)" />
        </div>
      </section>
      <section :class="[ns.bem('source')]" ref="sourceCodeArea">
        <div v-html="showSourceCode" class="language-vue"></div>
      </section>
    </div>
  </template>
  
  <style src="./various.css"></style>
  <style scoped>
  /* 保留原有样式 */
  </style>