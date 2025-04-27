<template>
  <el-dialog
    ref="kDialogRef"
    v-bind="$attrs"
    :class="['k-dialog', { 'k-dialog-resizable': useResizable && !isFull }]"
    :fullscreen="isFull"
    :draggable="useResizable || draggable"
    :style="useResizable ? { minWidth: minWidth + 'px', minHeight: minHeight + 'px' } : {}"
    @update:model-value="updateValue"
    @opened="handleOpened"
  >
    <template #header>
      <div
        class="w-full overflow-hidden text-ellipsis text-nowrap"
        v-ksw_tooltip="{ content: title }"
      >
        <slot name="header">{{ title }}</slot>
      </div>
      <div v-if="useResizable" class="useResizable-ctrl flex">
        <div
          class="w-8 h-10 flex justify-center items-center cursor-pointer"
          v-ksw_tooltip="'最小化'"
          @click="handleMinimization"
        >
          <div class="w-3 h-0.5 bg-gray-400 scale-y-50"></div>
        </div>
        <div
          class="ml-2 w-8 h-10 flex justify-center items-center cursor-pointer"
          v-ksw_tooltip="{ content: '最大化' }"
          @click="maximization"
        >
          <div class="w-3 h-3 border border-gray-400 rounded-sm"></div>
        </div>
      </div>
    </template>
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-dialog>

  <el-card v-if="isMinimization && useResizable" shadow="always" class="k-dialog-minimization">
    <div class="flex justify-between items-center">
      <div class="max-w-32 overflow-hidden text-ellipsis" v-ksw_tooltip="{ content: title }">
        <slot name="header">{{ title }}</slot>
      </div>
      <div
        class="ml-2 w-8 h-4 flex justify-center items-center cursor-pointer"
        v-ksw_tooltip="{ content: '还原' }"
        @click="handleRecover"
      >
        <div class="recover-icon w-2.5 h-2.5"></div>
      </div>
      <div class="close-icon w-3 h-3" @click="isMinimization = false"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch, ComponentInstance } from 'vue';
import { ElDialog, ElCard, DialogInstance } from 'element-plus';
import { DialogProps } from './type';
import { getElement, isInputElement, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KDialog'
});

const kDialogRef = ref<DialogInstance>();

const instance: any = {};

const props = withDefaults(defineProps<DialogProps>(), {
  title: '',
  fullscreen: false,
  minWidth: 300,
  minHeight: 150,
  useResizable: false,
  draggable: false,
  autoFocusFirst: false
});

const emits = defineEmits(['update:modelValue', 'opened']);

const isFull = ref(props.fullscreen);

watch(
  () => props.fullscreen,
  (val) => {
    isFull.value = val;
  }
);

const isMinimization = ref(false);
const attrs = useAttrs();

watch(
  () => attrs.modelValue,
  (val) => {
    if (val) {
      isMinimization.value = false;
    }
  }
);

const currentWidth = ref(0);
const currentHeight = ref(0);
const maximization = () => {
  const dialog = document.querySelector('.k-dialog') as HTMLElement;
  if (!isFull.value) {
    const { width, height } = dialog!.getBoundingClientRect();
    currentWidth.value = width;
    currentHeight.value = height;
    dialog!.style.width = 'auto';
    dialog!.style.height = '100%';
  } else if (
    isFull.value &&
    currentWidth.value &&
    currentHeight.value &&
    currentWidth.value > 0 &&
    currentHeight.value > 0
  ) {
    dialog!.style.width = `${currentWidth.value}px`;
    dialog!.style.height = `${currentHeight.value}px`;
  }
  isMinimization.value = false;
  isFull.value = !isFull.value;
};

const handleMinimization = () => {
  if (!isMinimization.value) {
    updateValue(false);
  }
  isMinimization.value = !isMinimization.value;
};

const handleRecover = () => {
  isMinimization.value = false;
  updateValue(true);
};
const updateValue = (newValue: boolean) => {
  emits('update:modelValue', newValue);
};

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
    const el = kDialogRef.value?.dialogContentRef?.$el as HTMLElement;
    focusEl = getElement<HTMLElement>('.el-dialog__body input, .el-dialog__body textarea', el) as HTMLElement;
  }

  typeof focusEl?.focus === 'function' && focusEl.focus();
}

defineExpose(getExposeProxy(instance, kDialogRef));
</script>

<style lang="less">
@import './style.less';
</style>
