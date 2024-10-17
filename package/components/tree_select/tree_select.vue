<template>
  <el-tree-select
    :name="name ?? randomName"
    ref="KTreeSelectRef"
    :class="['k-tree-select', _styleModule]"
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
          <component defaultData.data.icon
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
      <slot name="empty" :query="query" >
        未找到'{{ query.value }}'相关内容
      </slot>
    </template>
  </el-tree-select>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElTreeSelect } from 'element-plus';
import { debounce } from 'lodash-es';
import { TreeSelectProps } from './type';
import { getExposeProxy, genRandomStr } from '../../utils';

defineOptions({
  name: 'KTreeSelect',
});

const customSlots = ['empty', 'default'];
const _styleModule = inject('_styleModule', '');
const props = withDefaults(defineProps<TreeSelectProps>(), {
  expandIcon: 'IconFolderOpen',
  collapseIcon: 'IconFlowNested',
  debounce: 500,
});
const emits = defineEmits(['input', 'blur']);

const KTreeSelectRef = ref();
const query = ref({
  value: '',
});
const randomName = genRandomStr(8);

const nodeIcon = computed(() => (nodeItem: any) => {
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
})

const handleInput = (event: Event) => {
  const setQuery = () => {
    const input = KTreeSelectRef.value.$el.querySelector(`[name="${props.name ?? randomName}"]`);
    query.value.value = input.value;
  }
  debounce(setQuery, props.debounce)();
  emits('input', event)
}


const instance: any = {};
defineExpose(getExposeProxy(instance, KTreeSelectRef));
</script>

<style lang="less">
@import './style.less';
</style>
