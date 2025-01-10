<template>
  <k-icon-popover @updateIcon="handleUpdate">
    <div class="icon-box">
      <component v-if="searchContent" :is="searchContent" />
    </div>
  </k-icon-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let searchContent = ref('');
const handleUpdate = (copyContent: string) => {
  searchContent.value = copyContent;
};
</script>

<style lang="less">
.icon-box {
  width: 100px;
  height: 100px;
  background-color: black;
  .ksw-icon svg {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
}
</style>
