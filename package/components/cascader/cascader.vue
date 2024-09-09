<template>
  <el-cascader
    ref="cascaderRef"
    :class="['k-cascader', $styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElCascader } from 'element-plus';
import { CascaderProps } from './type';
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KCascader'
});

const props = withDefaults(defineProps<CascaderProps>(), {
  size: 'base'
});

const cascaderRef = ref<any>(null);

const instance: any = {};
handleExpose(instance, cascaderRef, 'KCascader');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>