<template>
  <el-drawer
    ref="KDrawerRef"
    :class="['k-drawer', $styleModule]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDrawer } from 'element-plus';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KDrawer'
});

const KDrawerRef = ref<any>(null);

const instance: any = {};
handleExpose(instance, KDrawerRef, 'KDrawer');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>