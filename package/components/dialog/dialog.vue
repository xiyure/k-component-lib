<template>
  <div class="k-dialog">
    <el-dialog
      v-model="modelValue"
      v-bind="attrs"
      @open="handleOpen"
      @opened="handleOpened"
      @close="handleClose"
      @closed="handleClosed"
      @open-auto-focus="handleOpenFocus"
      @close-auto-focus="handleCloseFocus"
    >
      <slot></slot>
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { DialogProps } from './type';

defineOptions({
  name: 'KDialog'
});

const props = withDefaults(defineProps<DialogProps>(), {
  modal: true,
  width: '',
  title: '',
  openDelay: 0,
  closeDelay: 0,
  lockScroll: true,
  draggable: true,
  showClose: true
});

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

const attrs = computed(() => ({
  ...getOriginAttrs(),
}));

watch(() => props.modelValue, (newValue) => {
  if (newValue === modelValue.value) {
    return;
  }
  modelValue.value = newValue;
});

const getOriginAttrs = () => ({
  width: props.width,
  title: props.title,
  fullscreen: props.fullscreen,
  top: props.top,
  modal: props.modal,
  modalClass: props.modalClass,
  appendToBody: props.appendToBody,
  appendTo: props.appendTo,
  lockScroll: props.lockScroll,
  openDelay: props.openDelay,
  closeDelay: props.closeDelay,
  closeOnClickModal: props.closeOnClickModal,
  closeOnPressEscape: props.closeOnPressEscape,
  showClose: props.showClose,
  beforeClose: props.beforeClose,
  draggable: props.draggable,
  overflow: props.overflow,
  center: props.center,
  alignCenter: props.alignCenter,
  destroyOnClose: props.destroyOnClose,
  closeIcon: props.closeIcon,
  zIndex: props.zIndex
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