<template>
  <k-menu
    :default-active="activeIndex"
    class="k-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
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
    <k-menu-item index="3" disabled>Info</k-menu-item>
    <k-menu-item index="4">Orders</k-menu-item>
  </k-menu>
  <div class="h-6" />
  <k-menu
    :default-active="activeIndex2"
    class="k-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
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
    <k-menu-item index="3" disabled>Info</k-menu-item>
    <k-menu-item index="4">Orders</k-menu-item>
  </k-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
