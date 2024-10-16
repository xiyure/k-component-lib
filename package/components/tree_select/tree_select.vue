<template>
  <el-tree-select
    ref="KTreeSelectRef"
    :class="['k-tree-select', _styleModule]"
    v-bind="$attrs"
    @node-click="handleNodeClick"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template #default="defaultData">
      <slot v-bind="defaultData">
        <span>
          <component
            :is="defaultData.data.icon ?? 'IconFlowNested'"
            :class="!defaultData.data.children?.length ? 'tree-item-icon--noChildren' : ''"
          />
          {{ defaultData.data.label }}
        </span>
      </slot>
    </template>
  </el-tree-select>
</template>

<script setup lang="ts">
import { nextTick, ref, inject } from 'vue';
import { ElTreeSelect } from 'element-plus';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KTreeSelect',
});

const _styleModule = inject('_styleModule', '');
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
defineExpose(getExposeProxy(instance, KTreeSelectRef));
</script>

<style lang="less">
@import './style.less';
</style>
