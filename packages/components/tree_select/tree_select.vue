<template>
  <el-tree-select
    ref="KTreeSelectRef"
    :name="name ?? randomName"
    :class="['k-tree-select', _styleModule]"
    :size="formatSize.elSize"
    v-bind="$attrs"
    @input="handleInput"
    @blur="(e: Event) => {
      query.value = '';
      emits('blur', e)
    }"
  >
    <template
      v-for="(_, name) in $slots"
      v-if="customSlots.includes(name as string)"
      :key="name"
      #[name]="data"
    >
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template #default="defaultData">
      <slot v-bind="defaultData">
        <span
          :style="typeof props.nodeStyle === 'function'
            ? props.nodeStyle(defaultData)
            : props.nodeStyle"
          :class=" typeof props.className === 'function'
            ? props.className(defaultData)
            : props.className"
        >
          <component
            :is="nodeIcon(defaultData)"
            :class="[
              {'tree-item-icon--noChildren': defaultData.node.isLeaf},
             
            ]"
          />
          {{ defaultData.data.label }}
        </span>
      </slot>
    </template>
    <template #empty>
      <slot name="empty" :query="query">
        未找到'{{ query.value }}'相关内容
      </slot>
    </template>
  </el-tree-select>
</template>

<script setup lang="ts">
import { ref, provide, inject, computed } from 'vue';
import { ElTreeSelect } from 'element-plus';
import { debounce } from 'lodash-es';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { TreeSelectProps } from './type';
import { getExposeProxy, genRandomStr, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KTreeSelect'
});

const customSlots = ['empty', 'default'];

const props = withDefaults(defineProps<TreeSelectProps>(), {
  expandIcon: 'IconFolderOpen',
  collapseIcon: 'IconFlowNested',
  debounce: 500
});

const formatSize = useSize<TreeSelectProps>(props);
const _styleModule = inject('_styleModule', '');

const emits = defineEmits(['input', 'blur']);

const KTreeSelectRef = ref();
const query = ref({
  value: ''
});
const randomName = genRandomStr(8);

const nodeIcon = computed(() => (nodeItem: TreeNodeData) => {
  const { node, data } = nodeItem;
  if (data.icon) {
    return data.icon;
  }
  if (node.isLeaf) {
    return props.icon ?? 'IconFlowNested';
  }
  if (node.expanded) {
    return props.expandIcon ?? 'IconFolderOpen';
  }
  return props.collapseIcon ?? 'IconFlowNested';
});

const handleInput = (event: Event) => {
  const setQuery = () => {
    const input = KTreeSelectRef.value.$el.querySelector(`[name="${props.name ?? randomName}"]`);
    query.value.value = input.value;
  };
  debounce(setQuery, props.debounce)();
  emits('input', event);
};

provide(SIZE_KEY, formatSize);

const instance: any = {};
defineExpose(getExposeProxy(instance, KTreeSelectRef));
</script>

<style lang="less">
@import './style.less';
</style>
