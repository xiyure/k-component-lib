<template>
  <el-dialog
    ref="kDialogRef"
    v-bind="$attrs"
    :class="['k-dialog', _styleModule, { 'k-dialog-resizable': useResizable && !isFull }]"
    :fullscreen="isFull"
    :draggable="useResizable || draggable"
    :style="useResizable ? { minWidth: minWidth + 'px', minHeight: minHeight + 'px' } : {}"
    @update:model-value="updateValue"
  >
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <slot name="header">{{ title }}</slot>
        </div>
        <div v-if="useResizable" style="cursor: pointer">
          <IconWarning @click="handleMinimization" />
          <IconWarning @click="maximization" />
        </div>
      </div>
    </template>
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-dialog>

  <k-card
    v-if="isMinimization && useResizable"
    style="width: 150px"
    shadow="always"
    class="k-dialog-minimization"
  >
    <div style="display: flex; justify-content: space-around">
      <slot name="header">{{ title }}</slot>
      <IconWarning @click="handleBig" />
      <IconClose @click="isMinimization = false" />
    </div>
  </k-card>
</template>

<script setup lang="ts">
import { ref, inject, useAttrs, watch } from 'vue';
import { ElDialog } from 'element-plus';
import { DialogProps } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KDialog'
});

const _styleModule = inject('_styleModule', '');
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

const handleBig = () => {
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
}

.k-dialog-minimization {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>