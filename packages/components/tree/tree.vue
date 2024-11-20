<template>
  <el-tree
    ref="KTreeRef"
    :class="['k-tree', _styleModule]"
    :filter-method="filterMethod"
    v-bind="$attrs"
    >
    <template #default="{ node, data }">
      <component v-if="treeIcon(node, data)" :is="treeIcon(node, data)" />
      <span class="k-tree-node-label">
        <slot :node="node" :data="data">{{ data.label }}</slot>
      </span>
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElTree } from 'element-plus';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { TreeProps } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KTree'
});

const props = withDefaults(defineProps<TreeProps>(), {
  filterMethod: (query: string, node: TreeNodeData) => node.label?.includes(query),
  icon: '',
  expandIcon: '',
  collapseIcon: '',
});

const _styleModule = inject('_styleModule', '');
const KTreeRef = ref();

const treeIcon = computed(() => (node: TreeNodeData, data: TreeNodeData) => {
  let icon: any = '';
  if (node.isLeaf) {
    icon = props.icon;
  } else if (node.expanded) {
    icon = props.expandIcon;
  } else {
    icon = props.collapseIcon;
  }
  if (typeof icon === 'function') {
    return icon(node, data);
  }
  return icon;
})

const instance: any = {};
defineExpose(getExposeProxy(instance, KTreeRef));
</script>

<style lang="less">
@import './style.less';
</style>