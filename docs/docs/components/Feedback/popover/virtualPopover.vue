<template>
  <k-button ref="buttonRef" v-click-outside="onClickOutside">Click me</k-button>

  <k-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="With title"
    virtual-triggering
  >
    <span>Some content</span>
  </k-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { ClickOutside as vClickOutside } from 'element-plus';

const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>
