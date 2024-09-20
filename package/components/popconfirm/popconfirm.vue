<template>
  <el-popconfirm
    ref="KPopconfirmRef"
    :class="['k-popconfirm', _styleModule]"
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
import { ref, inject } from 'vue';
import { ElPopconfirm } from 'element-plus';
import { IconClear } from 'ksw-vue-icon';
import { PopconfirmProps } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KPopconfirm'
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  icon: IconClear
});

const _styleModule = inject('_styleModule', '');
const KPopconfirmRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KPopconfirmRef));
</script>

<style lang="less">
@import './style.less';
</style>