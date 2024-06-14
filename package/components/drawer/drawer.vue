<template>
  <el-drawer
    ref="KDrawerRef"
    v-model="modelValue"
    class="k-drawer"
    v-bind="$attrs"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleCloseEvent"
    @closed="handleClosed"
    @open-auto-focus="handleOpenFocus"
    @close-auto-focus="handleCloseFocus"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { DrawerProps } from './type';

defineOptions({
  name: 'KDrawer'
});

const props = withDefaults(defineProps<DrawerProps>(), {});
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
const KDrawerRef = ref<any>(null);

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
function handleCloseEvent() {
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
function handleClose() {
  KDrawerRef.value?.handleClose();
}

defineExpose({ handleClose });
</script>

<style lang="less">
@import './style.less';
</style>