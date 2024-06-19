<template>
  <el-cascader
    ref="cascaderRef"
    class="k-cascader"
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
import { CascaderProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KCascader'
});

const props = withDefaults(defineProps<CascaderProps>(), {
  size: 'base'
});

const cascaderRef = ref<any>(null);

function getCheckedNodes(isOnlyLeaf:boolean) {
  return cascaderRef.value?.getCheckedNodes(isOnlyLeaf);
}
function togglePopperVisible(isExpand:boolean) {
  cascaderRef.value?.togglePopperVisible(isExpand);
}

defineExpose({
  getCheckedNodes,
  togglePopperVisible
});
</script>

<style lang="less">
@import './style.less';
</style>