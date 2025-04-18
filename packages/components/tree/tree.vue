<template>
  <el-tree
    ref="KTreeRef"
    :class="['k-tree', { 'k-tree-show-arrow': props.showArrow }]"
    :filter-method="filterMethod"
    :props="props.props"
    v-bind="$attrs"
  >
    <template #default="{ node, data }">
      <component :is="treeIcon(node, data)" v-if="treeIcon(node, data)" />
      <span class="k-tree-node-label">
        <slot :node="node" :data="data">
          {{ typeof props.props?.label === 'function' 
            ? data[props.props.label(data, node) ?? 'label']
            : data[props.props?.label ?? 'label']
          }}
        </slot>
      </span>
    </template>
    <template v-if="$slots.empty" #empty>
      <slot name="empty"></slot>
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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
  showArrow: true
});

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
});

const instance: any = {};
defineExpose(getExposeProxy(instance, KTreeRef));
</script>

<style lang="less">
@import './style.less';
</style>
