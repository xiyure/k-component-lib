<template>
  <el-drawer
    ref="KDrawerRef"
    :class="['k-drawer', _styleModule]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElDrawer } from 'element-plus';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KDrawer'
});

const _styleModule = inject('_styleModule', '');
const KDrawerRef = ref<any>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KDrawerRef));
</script>

<style lang="less">
@import './style.less';
</style>