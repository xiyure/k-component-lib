<template>
  <el-drawer
    ref="KDrawerRef"
    class="k-drawer"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'KDrawer'
});

const KDrawerRef = ref<any>(null);

function handleClose() {
  KDrawerRef.value?.handleClose();
}

defineExpose({ handleClose });
</script>

<style lang="less">
@import './style.less';
</style>