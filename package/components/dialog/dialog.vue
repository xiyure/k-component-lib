<template>
  <el-dialog
    v-model="modelValue"
    class="k-dialog"
    v-bind="$attrs"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    @open-auto-focus="handleOpenFocus"
    @close-auto-focus="handleCloseFocus"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DialogProps } from './type';

defineOptions({
  name: 'KDialog'
});

const props = withDefaults(defineProps<DialogProps>(), {});

const emits = defineEmits([
  'update:modelValue',
  'open',
  'opened',
  'close',
  'closed',
  'open-auto-focus',
  'close-auto-focus'
]);

const modelValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  if (newValue === modelValue.value) {
    return;
  }
  modelValue.value = newValue;
});

function handleOpen() {
  emits('open');
}
function handleOpened() {
  emits('opened');
}
function handleClose() {
  emits('update:modelValue', false);
  emits('close');
}
function handleClosed() {
  emits('closed');
}
function handleOpenFocus() {
  emits('open-auto-focus');
}
function handleCloseFocus() {
  emits('close-auto-focus');
}

</script>

<style lang="less">
@import './style.less';
</style>