<template>
  <k-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <k-radio-button :value="false">expand</k-radio-button>
    <k-radio-button :value="true">collapse</k-radio-button>
  </k-radio-group>
  <k-menu
    default-active="2"
    class="k-menu-vertical-demo"
    :collapse="isCollapse"
    :class="{ 'k-menu--collapse': isCollapse }"
    @open="handleOpen"
    @close="handleClose"
  >
    <k-sub-menu index="1">
      <template #title>
        <k-icon><location /></k-icon>
        <span>Navigator One</span>
      </template>
      <k-menu-item-group>
        <template #title><span>Group One</span></template>
        <k-menu-item index="1-1">item one</k-menu-item>
        <k-menu-item index="1-2">item two</k-menu-item>
      </k-menu-item-group>
      <k-menu-item-group title="Group Two">
        <k-menu-item index="1-3">item three</k-menu-item>
      </k-menu-item-group>
      <k-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <k-menu-item index="1-4-1">item one</k-menu-item>
      </k-sub-menu>
    </k-sub-menu>
    <k-menu-item index="2">
      <k-icon><icon-menu /></k-icon>
      <template #title>Navigator Two</template>
    </k-menu-item>
    <k-menu-item index="3" disabled>
      <k-icon><document /></k-icon>
      <template #title>Navigator Three</template>
    </k-menu-item>
    <k-menu-item index="4">
      <k-icon><setting /></k-icon>
      <template #title>Navigator Four</template>
    </k-menu-item>
  </k-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue';

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.k-menu-vertical-demo:not(.k-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
