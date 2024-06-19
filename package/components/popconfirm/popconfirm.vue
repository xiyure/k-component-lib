<template>
  <el-popconfirm
    class="k-popconfirm"
    v-bind="$attrs"
    :icon="props.icon"
    cancel-button-type="default"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { IconClear } from 'ksw-vue-icon';
import { PopconfirmProps } from './type';

defineOptions({
  name: 'KPopconfirm'
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  icon: IconClear
});
</script>

<style lang="less">
@import './style.less';
</style>