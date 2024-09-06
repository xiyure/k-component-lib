<template>
  <el-tree-select ref="KTreeSelectRef" v-bind="$attrs" @node-click="handleNodeClick">
    <template v-if="$slots.empty" #empty>
      <slot name="empty"></slot>
    </template>
    <template #default="{ data }">
      <span>
        <component
          :is="data.icon ?? 'IconFlowNested'"
          :class="!data.children?.length ? 'tree-item-icon--noChildren' : ''"
        />
        {{ data.label }}
      </span>
    </template>
  </el-tree-select>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { ElTreeSelect } from 'element-plus';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KTreeSelect',
});

const handleNodeClick = async (data: any, node: any) => {
  await nextTick();
  if (node.expanded && (data.icon === 'IconFlowNested' || !data.icon)) {
    data.icon = 'IconFolderOpen';
  }
  if (!node.expanded && data.icon === 'IconFolderOpen') {
    data.icon = 'IconFlowNested';
  }
};

const KTreeSelectRef = ref();
const instance: any = {};
handleExpose(instance, KTreeSelectRef, 'KTreeSelect');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
