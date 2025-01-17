<template>
  <k-icon-popover @update-icon="handleUpdate">
    <div class="icon-box">
      <component :is="searchContent" v-if="searchContent" />
    </div>
  </k-icon-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchContent = ref('');
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
