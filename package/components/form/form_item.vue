<template>
  <el-form-item
    ref="KFormItemRef"
    :class="['k-form-item', _styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElFormItem } from 'element-plus';
import { FormItemProps } from './type';
import { getCompSize, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KFormItem',
});

const props = withDefaults(defineProps<FormItemProps>(), {
  size: 'base',
});

const _styleModule = inject('_styleModule', '');
const KFormItemRef = ref<any>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormItemRef));
</script>

<style lang="less">
@import './style.less';
</style>
