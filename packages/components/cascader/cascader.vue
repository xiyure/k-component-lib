<template>
  <el-cascader
    ref="cascaderRef"
    class="k-cascader"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { ElCascader } from 'element-plus';
import { CascaderProps } from './type';
import { getExposeProxy } from '../../utils';
import { SIZE_KEY, useSize } from '../../hooks';

defineOptions({
  name: 'KCascader'
});

const props = withDefaults(defineProps<CascaderProps>(), {});

const formatSize = useSize<CascaderProps>(props);

provide(SIZE_KEY, formatSize);

const cascaderRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, cascaderRef));
</script>

<style lang="less">
@import './style.less';
</style>