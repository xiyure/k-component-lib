<template>
  <div ref="list" class="k-list">
    <slot></slot>
    <!-- loading -->
    <div v-if="isLoading && !finished && !error" class="k-list-loading">
      <slot name="loading">
        <div class="k-list-default-loading">
          <IconLoading />
          {{ loadingText ?? t('list.loadingText') }}
        </div>
      </slot>
    </div>
    <!-- finished -->
    <div v-if="finished && !error" class="k-list-finished">
      <slot name="finished">
        <div class="k-list-default-finished">{{ finishedText ?? t('list.finishedText') }}</div>
      </slot>
    </div>
    <!-- error -->
    <div v-if="error" class="k-list-error" @click="handleErrorClick">
      <slot name="error">
        <div class="k-list-default-error">{{ errorText ?? t('list.errorText') }}</div>
      </slot>
    </div>
    <div ref="placeholder" class="k-list-placeholder"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref, computed, watch, onMounted, onUpdated, nextTick, Ref } from 'vue';
import { IconLoading } from 'ksw-vue-icon';
import { useLocale } from '../../hooks';
import { ListProps } from './type';

defineOptions({
  name: 'KList'
});

const { t } = useLocale();
const props = withDefaults(defineProps<ListProps>(), {
  loading: false,
  error: false,
  finished: false,
  offset: 0,
  disabled: false,
  immediate: true
});

const emits = defineEmits(['update:loading', 'update:error', 'load']);

onMounted(() => {
  scroller.value?.addEventListener?.('scroll', check, { passive: true });
  if (props.immediate) {
    check();
  }
});

onUpdated(() => {
  isLoading.value = props.loading;
})

const scroller = computed(() => {
  if (props.scroller) {
    return props.scroller;
  }
  return getScrollParent(list.value as Element);
});

const list = ref<HTMLElement>();
const placeholder = ref<HTMLElement>();
const isLoading = ref(props.loading);
const overflowScrollReg = /scroll|auto|overlay/i;

watch(() => [props.loading, props.error, props.finished], (newVal) => {
  if (newVal[1]) {
    isLoading.value = false;
    emits('update:loading', false);
  }
  check();
});

function handleErrorClick() {
  emits('update:error', false);
  check();
}

function check() {
  nextTick(() => {
    if (
      isLoading.value ||
      props.finished ||
      props.disabled ||
      props.error 
    ) {
      return;
    }
    const offset = +props.offset;
    const scrollParentRect = getRect(scroller);
    
    if (!scrollParentRect.height || isHidden(list)) {
      return;
    }
    
    const placeholderRect = getRect(placeholder);
    if (placeholderRect.bottom - scrollParentRect.bottom <= offset) {
      isLoading.value = true;
      emits('update:loading', true);
      emits('load');
    }
  });
}

// 获取列表最近的滚动父元素
function getScrollParent(el: Element | Window) {
  let node = el;

  while (node && node !== window && node instanceof Element) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode as Element;
  }
  return el;
}

function isHidden(elementRef: HTMLElement | Ref<HTMLElement | undefined>) {
  const el = unref(elementRef);
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === 'none';

  // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed
  const parentHidden = el.offsetParent === null && style.position !== 'fixed';

  return hidden || parentHidden;
}

function getRect(elementOrRef: Element | Window | Ref<Element | Window | undefined>) {
  const element = unref(elementOrRef);

  if (element === window) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return makeDOMRect(width, height);
  }

  if ((element as Element)?.getBoundingClientRect) {
    return (element as Element).getBoundingClientRect();
  }

  return makeDOMRect(0, 0);
}

function makeDOMRect(width: number, height: number){
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  } as DOMRect;
}
  

defineExpose({ check });
</script>
<style lang="less">
@import './style.less';
</style>
