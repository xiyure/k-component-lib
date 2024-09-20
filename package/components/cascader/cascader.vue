<template>
  <el-cascader
    ref="cascaderRef"
    :class="['k-cascader', _styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElCascader } from 'element-plus';
import { CascaderProps } from './type';
import { getCompSize, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KCascader'
});

const props = withDefaults(defineProps<CascaderProps>(), {
  size: 'base'
});

const _styleModule = inject('_styleModule', '');
const cascaderRef = ref<any>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, cascaderRef));
</script>

<style lang="less">
@import './style.less';
</style>