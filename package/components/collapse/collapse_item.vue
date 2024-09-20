<template>
  <el-collapse-item
    ref="kCollapseItemRef"
    :class="['k-collapse-item', _styleModule]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-collapse-item>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElCollapseItem } from 'element-plus';
import { getExposeProxy } from '../../utils/index';

defineOptions({
  name: 'KCollapseItem'
});

const _styleModule = inject('_styleModule', '');
const kCollapseItemRef = ref(null);
const instance: any = {};
defineExpose(getExposeProxy(instance, kCollapseItemRef));
</script>

<style lang="less">
@import './style.less';
</style>