<script lang="ts" setup>
  import { ref, onMounted, watch, computed } from 'vue'
  import CodeOpen from './icons/code-open.vue'
  import CodeClose from './icons/code-close.vue'
  import CodeCopy from './icons/code-copy.vue'
  import { useNameSpace } from './hooks/use-namespaces'
  import { useCodeFold } from './hooks/use-codefold'
  import { useCodeCopy } from './hooks/use-codecopy'
  import { MessageNoticeService } from './messages/index'
  import { KMessage } from '@ksware/ksw-ux';

  interface DemoBlockProps {
    code: string
    showCode: string
    title: string
    description: string
  }

  const props = withDefaults(defineProps<DemoBlockProps>(), {
    title: '默认标题',
    description: '描述内容'
  })

  const ns = useNameSpace()
  const { isCodeFold, setCodeFold } = useCodeFold()
  const { copyContent, clickCopy } = useCodeCopy()

  const sourceCode = ref(decodeURIComponent(props.code))
  const showSourceCode = ref(decodeURIComponent(props.showCode))
  const sourceCodeArea = ref<any>(null)

  const clickCodeCopy = () => {
    clickCopy(sourceCode.value)
    KMessage({
      message: '复制成功',
      type: 'success',
    })
  }

  const sourceCodeContainerHeight = computed(() => {
    if (sourceCodeArea.value) return sourceCodeArea.value?.clientHeight
    return 0
  })
  const setContainerHeight = (value: number) => {
    if (isCodeFold.value) sourceCodeArea.value.style.height = '0px'
    else sourceCodeArea.value.style.height = `${value}px`
  }
  onMounted(() => {
    // 组件挂载时，先获取代码块容器为折叠前的容器高度
    const currentContainerHeight = sourceCodeContainerHeight.value
    setContainerHeight(currentContainerHeight)
  })
  watch(isCodeFold, () => {
    const container = sourceCodeContainerHeight.value
    setContainerHeight(container)
  })
</script>

<template>
  <!-- <ClientOnly></ClientOnly> -->
  <div :class="[ns.e('ant-design__container')]">
    <section :class=" [ns.bem('preview')]" class="vp-raw bg-grid-slate-100 bg-slate-50">
      <slot></slot>
    </section>
    <section :class="[ns.bem('description')]">
      <div v-if="props.title" :class="[ns.bem('description', 'title')]">
        {{ title }}
      </div>
      <div v-if="props.description" :class="[ns.bem('description', 'content')]" v-html="description"></div>
      <div
        v-if="props.description || (!props.title && !props.description)"
        :class="[ns.bem('description', 'split-line')]"
      ></div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <CodeClose v-if="!isCodeFold" @click="setCodeFold(true)" />
        <CodeOpen v-else @click="setCodeFold(false)" />
        <CodeCopy @click="clickCodeCopy" />
      </div>
    </section>

    <section :class="[ns.bem('source')]" ref="sourceCodeArea">
      <div v-html="showSourceCode" class="language-vue"></div>
    </section>
  </div>
</template>

<style src="./various.css"></style>

<style scoped>
/* .vitepress-demo-preview__ant-design__container > * {
  font-size: 14px;
} */

.vitepress-demo-preview__ant-design__container {
  div[class*='language-'] {
    margin-top: 0;
    margin-bottom: 0;
    border-radius: 0;
    background-color: var(--vp-code-block-bg);
    border-top: 1px dashed var(--component-preview-border);
  }
}

.vitepress-demo-preview__ant-design__container {
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

.vitepress-demo-preview__ant-design__container > .vitepress-demo-preview-preview {
  padding: 20px 20px 30px 20px;

  p {
    all: initial;
    margin: 0 !important;
    padding: 0 !important;
  }
}

.vitepress-demo-preview__ant-design__container > .vitepress-demo-preview-description {
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

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

.vitepress-demo-preview__ant-design__container > .vitepress-demo-preview-source {
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.bg-grid-slate-100 {
  background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23f1f5f9'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  /* background-image: repeating-linear-gradient(45deg, var(--fallback-b1, oklch(100% 0 0)), var(--fallback-b1, oklch(100% 0 0)) 13px, var(--fallback-b2, oklch(96.1151% 0 0)) 13px, var(--fallback-b2, oklch(96.1151% 0 0)) 14px); */
}
</style>