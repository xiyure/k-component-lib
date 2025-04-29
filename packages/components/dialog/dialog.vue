<template>
  <el-dialog
    ref="$dialog"
    v-bind="$attrs"
    v-model="visible"
    :class="[
      'k-dialog',
      { 'k-dialog-resizable': resizable && !isFull },
      { 'k-dialog__is-show-handler': resizable && showResizeHandles }
    ]"
    :fullscreen="isFull"
    :draggable="resizable || draggable"
    :style="resizable ? { minWidth: minWidth + 'px', minHeight: minHeight + 'px' } : {}"
    @opened="handleOpened"
  >
    <template #header>
      <div v-if="resizable && showResizeHandles" class="k-dialog__resizable-header">
        <div class=" k-dialog__title">
          <slot name="header">{{ title }}</slot>
        </div>
        <div class="k-dialog__resizable-handler">
          <!-- Minimization -->
          <IconWindowMin class="mr-3" @click="minimize" />
          <!-- Maximization -->
          <component :is="isFull ? IconWindowReduce : IconWindowMax" @click="maximize" />
          <!-- Close -->
          <IconClose class="ml-3" @click="() => (visible = false)" />
        </div>
      </div>
      <slot v-else name="header">{{ title }}</slot>
    </template>
    <template v-for="(_, name) in inheritSlots($slots)" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-dialog>

  <!-- Minimize card -->
  <el-card v-if="isMinimization && resizable" shadow="always" class="k-dialog-minimization">
    <div class="k-dialog-minimization__content">
      <div class="k-dialog__card-title">
        <slot name="header">{{ title }}</slot>
      </div>
      <IconWindowMaximize
        :size="18"
        class="k-dialog__card-icon k-dialog__card-restore-icon"
        @click="() => (visible = true)"
      />
      <IconClose class="k-dialog__card-icon" @click="() => (isMinimization = false)"></IconClose>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, computed, ComponentInstance } from 'vue';
import { ElDialog, ElCard, DialogInstance } from 'element-plus';
import {
  IconClose,
  IconWindowMaximize,
  IconWindowReduce,
  IconWindowMax,
  IconWindowMin
} from 'ksw-vue-icon';
import { useInheritSlot, useDeprecated } from '../../hooks';
import { DialogProps } from './type';
import { getElement, isInputElement, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KDialog'
});

const $dialog = ref<DialogInstance>();

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  title: '',
  fullscreen: false,
  minWidth: 300,
  minHeight: 150,
  useResizable: false,
  resizable: false,
  draggable: false,
  autoFocusFirst: false,
  showResizeHandles: true
});

useDeprecated(
  {
    scope: 'k-dialog',
    from: 'useResizable',
    replacement: 'resizable',
    version: '2.0.0'
  },
  computed(() => !!props.useResizable)
);

const emits = defineEmits(['opened']);
const inheritSlots = useInheritSlot(['header']);

const visible = defineModel<boolean>();

// cache dialog's width and height when it's maximized
const scaleCache = { w: 0, h: 0 };
const isFull = ref(props.fullscreen);
const isMinimization = ref(false);

const resizable = computed(() => {
  return props.resizable || props.useResizable;
});

watch(
  () => props.fullscreen,
  (val) => {
    isFull.value = val;
  }
);

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      isMinimization.value = false;
    }
  }
);

function maximize() {
  const dialog = $dialog.value?.dialogContentRef?.$el;
  if (!dialog) {
    return;
  }
  if (!isFull.value) {
    const { width, height } = dialog.getBoundingClientRect();
    scaleCache.w = width;
    scaleCache.h = height;
    dialog.style.width = 'auto';
    dialog.style.height = '100%';
  } else {
    dialog.style.width = `${scaleCache.w}px`;
    dialog.style.height = `${scaleCache.h}px`;
  }
  isMinimization.value = false;
  isFull.value = !isFull.value;
}

function minimize() {
  isMinimization.value = true;
  visible.value = false;
}

function handleOpened() {
  if (props.autoFocusTo || props.autoFocusFirst) {
    focusElement();
  }
  emits('opened');
}

function focusElement() {
  let focusEl: HTMLElement | null | undefined = null;
  if (typeof props.autoFocusTo === 'string') {
    focusEl = getElement<HTMLElement>(props.autoFocusTo);
  } else {
    const elRef = props.autoFocusTo as ComponentInstance<any>;
    focusEl = elRef?.$el ?? elRef;
  }
  if (focusEl && isInputElement(focusEl)) {
    focusEl.focus?.();
    return;
  }
  focusEl = focusEl ? getElement<HTMLElement>('input, textarea', focusEl) : null;
  if (!focusEl && props.autoFocusFirst) {
    const el = $dialog.value?.dialogContentRef?.$el as HTMLElement;
    focusEl = getElement<HTMLElement>(
      '.el-dialog__body input, .el-dialog__body textarea',
      el
    ) as HTMLElement;
  }

  typeof focusEl?.focus === 'function' && focusEl.focus();
}

const instance: any = {};

defineExpose(getExposeProxy(instance, $dialog));
</script>

<style lang="less">
@import './style.less';
</style>
