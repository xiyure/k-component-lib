<template>
  <div id="inputGroup" class="k-input-group">
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
import { ref, reactive } from 'vue';
</script>
<style scoped>
@import url('./style.less');
</style>