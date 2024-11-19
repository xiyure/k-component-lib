<template>
  <el-cascader
    ref="cascaderRef"
    :class="['k-cascader', _styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { ref, provide, inject } from 'vue';
import { ElCascader } from 'element-plus';
import { CascaderProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KCascader'
});

const props = withDefaults(defineProps<CascaderProps>(), {});

const formatSize = useSize<CascaderProps>(props);

const _styleModule = inject('_styleModule', '');

provide(SIZE_KEY, formatSize);

const cascaderRef = ref<any>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, cascaderRef));
</script>

<style lang="less">
@import './style.less';
</style>