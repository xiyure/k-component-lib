<template>
  <el-tabs
    v-model="activeName"
    class="k-tabs"
    v-bind="$attrs"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
    @tab-change="handleChange"
    @tab-add="handleAdd"
    @edit="handleEdit"
  >
    <slot></slot>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';

defineOptions({
  name: 'KTabs'
});

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  router: {
    type: Boolean,
    default: false,
  }
});

const emits = defineEmits(['tab-click', 'tab-remove', 'update:modelValue', 'tab-add', 'edit', 'tab-change']);

const activeName = ref('');

provide('isUseRouter', props.router);
provide('activeName', activeName);

watch(() => props.modelValue, () => {
  activeName.value = props.modelValue as string;
}, { immediate: true });

const handleClick = (pane: any, e: Event) => {
  emits('tab-click', pane, e);
};
const handleRemove = (paneName:string) => {
  emits('tab-remove', paneName);
};
const handleAdd = () => {
  emits('tab-add');
};
const handleEdit = (paneName:string, action: string) => {
  emits('edit', paneName, action);
};
const handleChange = (paneName:string) => {
  emits('update:modelValue', paneName);
  emits('tab-change', paneName);
};

</script>

<style lang="less">
@import './style.less';
</style>