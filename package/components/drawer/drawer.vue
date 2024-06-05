<template>
  <el-drawer
    ref="KDrawerRef"
    class="k-drawer"
    v-model="modelValue"
    v-bind="attrs"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleCloseEvent"
    @closed="handleClosed"
    @open-auto-focus="handleOpenFocus"
    @close-auto-focus="handleCloseFocus"
  >
    <slot></slot>
    <template v-if="slots.header" #header="headerSlotProps">
      <slot name="header" v-bind="headerSlotProps"></slot>
    </template>
    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { DrawerProps } from './type';

defineOptions({
  name: 'KDrawer'
});

const props = withDefaults(defineProps<DrawerProps>(), {
  modal: true,
  lockScroll: true,
  showClose: true,
  withHeader: true
});
const slots = defineSlots();
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

const attrs = computed(() => ({
  appendToBody: props.appendToBody,
  lockScroll: props.lockScroll,
  openDelay: props.openDelay,
  closeDelay: props.closeDelay,
  closeOnClickModal: props.closeOnClickModal,
  closeOnPressEscape: props.closeOnPressEscape,
  showClose: props.showClose,
  destroyOnClose: props.destroyOnClose,
  modal: props.modal,
  direction: props.direction,
  size: props.size,
  title: props.title,
  withHeader: props.withHeader,
  modalClass: props.modalClass,
  zIndex: props.zIndex,
  beforeClose: props.beforeClose
}));

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