<template>
  <div class="k-tree">
    <div class="k-tree__filter">
      <k-input
        v-if="props.showFilter" v-model="query" :placeholder="$t('enterInputSearch')"
        @input="filterTreeNode"
        @keyup.enter="filter(query)"
      >
        <template #append>
          <k-button main @click="filter(query)"><IconSearch /></k-button>
        </template>
      </k-input>
    </div>
    <el-tree-v2 ref="KTreeRef" v-bind="$attrs" :filter-method="filterMethod">
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-tree-v2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types';
import { IconSearch } from 'ksw-vue-icon';
import { TreeProps } from './type';
import { KInput } from '../input';
import { KButton } from '../button';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KTree'
});

const props = withDefaults(defineProps<TreeProps>(), {
  showFilter: true,
  lazy: true,
  filterMethod: (query: string, node: TreeNode) => node.label?.includes(query)
});

const KTreeRef = ref();
const query = ref('');

function filterTreeNode(value: string) {
  if (props.lazy) {
    return;
  }
  filter(value);
}
function filter(query: string) {
  return KTreeRef.value?.filter(query);
}

const instance: any = { filter };
handleExpose(instance, KTreeRef, 'KTree');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>