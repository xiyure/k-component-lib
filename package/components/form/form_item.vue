<template>
  <el-form-item
    ref="KFormItemRef"
    class="k-form-item"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormItemProps } from './type';
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KFormItem'
});

const props = withDefaults(defineProps<FormItemProps>(), {
  size: 'base'
});

const KFormItemRef = ref<any>(null);
const instance: any = {};
handleExpose(instance, KFormItemRef, 'KFormItem');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>