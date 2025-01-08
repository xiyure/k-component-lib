<template>
  <k-menu
    :default-active="activeIndex"
    class="k-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <k-menu-item index="0">
      <img
        style="width: 20px"
        src="../../../../public/klogo.svg"
        alt="Element logo"
      />
      <div>ksw-ux</div>
    </k-menu-item>
    <div class="flex-grow" />
    <k-menu-item index="1">Processing Center</k-menu-item>
    <k-sub-menu index="2">
      <template #title>Workspace</template>
      <k-menu-item index="2-1">item one</k-menu-item>
      <k-menu-item index="2-2">item two</k-menu-item>
      <k-menu-item index="2-3">item three</k-menu-item>
      <k-sub-menu index="2-4">
        <template #title>item four</template>
        <k-menu-item index="2-4-1">item one</k-menu-item>
        <k-menu-item index="2-4-2">item two</k-menu-item>
        <k-menu-item index="2-4-3">item three</k-menu-item>
      </k-sub-menu>
    </k-sub-menu>
  </k-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
