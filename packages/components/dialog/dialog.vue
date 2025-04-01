<template>
  <el-dialog
    ref="kDialogRef"
    v-bind="$attrs"
    :class="[{ 'k-dialog-resizable': useResizable && !isFull }]"
    :fullscreen="isFull"
    :draggable="useResizable || draggable"
    :style="useResizable ? { minWidth: minWidth + 'px', minHeight: minHeight + 'px' } : {}"
    @update:model-value="updateValue"
  >
    <template #header>
      <div
        class="w-full overflow-hidden text-ellipsis text-nowrap"
        k-ksw_tooltip="{ content: title }"
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

  <k-card v-if="isMinimization && useResizable" shadow="always" class="k-dialog-minimization">
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
  </k-card>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue';
import { ElDialog } from 'element-plus';
import { DialogProps } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KDialog'
});

const kDialogRef = ref();

const instance: any = {};

const props = withDefaults(defineProps<DialogProps>(), {
  title: '',
  fullscreen: false,
  minWidth: 300,
  minHeight: 150,
  useResizable: false,
  draggable: false
});

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
  const dialog = document.querySelector('.k-dialog');
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

const emits = defineEmits(['update:modelValue']);

const handleMinimization = () => {
  if (!isMinimization.value) {
    emits('update:modelValue', false);
  }
  isMinimization.value = !isMinimization.value;
};

const handleRecover = () => {
  isMinimization.value = false;
  emits('update:modelValue', true);
};
const updateValue = (newValue: boolean) => {
  emits('update:modelValue', newValue);
};

defineExpose(getExposeProxy(instance, kDialogRef));
</script>

<style lang="less">
@import './style.less';

.k-dialog-resizable {
  resize: both;
  overflow: auto;

  .k-dialog__header.show-close {
    padding-right: 8rem;
  }
}

.useResizable-ctrl {
  position: absolute;
  top: 0.125rem;
  right: 3rem;
}
.recover-icon {
  position: relative;
  border-right: 1px solid var(--k-gray-400);
  border-bottom: 1px solid var(--k-gray-400);
  // border-radius: 2px;
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: -0.5px;
    width: 80%;
    height: 1px;
    transform: rotate(45deg);
    background: var(--k-gray-400);
    border-radius: 2px;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    border-top: 1px solid var(--k-gray-400);
    border-left: 1px solid var(--k-gray-400);
    // border-radius: 2px;
    z-index: 2;
  }
}
.close-icon {
  position: relative;
  &::after,
  &::before {
    content: '';
    position: absolute;
    background: var(--k-gray-400);
    border-radius: 2px;
    height: 2px;
    width: 200%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg) scale(0.5);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(45deg) scale(0.5);
  }
  &::before {
    transform: translate(-50%, -50%) rotate(-45deg) scale(0.5);
  }
  &:hover {
    &::after,
    &::before {
      background: var(--k-theme-primary);
    }
  }
}

.k-dialog-minimization {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>
