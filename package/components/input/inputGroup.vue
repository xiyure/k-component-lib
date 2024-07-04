<template>
  <div id="KInputGroup" class="k-input-group">
    <div class="k-input-group__prepend">
      <slot name="prepend">prepend</slot>
    </div>
    <slot></slot>
    <div class="k-input-group__append">
      <slot name="append">append</slot>
    </div>
  </div>
</template>

<script setup>
// import { InputGroupProps } from './type.d';

defineOptions({
  name: 'KInputGroup'
});

// const props = withDefaults(defineProps<InputGroupProps>(), {
//   size: 'base',
// });
</script>
<style scoped>
@import url('./style.less');
</style>