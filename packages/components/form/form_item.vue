<template>
  <el-form-item
    ref="KFormItemRef"
    :class="['k-form-item', _styleModule, { 'k-form-item--colon': injectShowColon }]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElFormItem } from 'element-plus';
import { FormItemProps } from './type';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KFormItem'
});

const props = withDefaults(defineProps<FormItemProps>(), {});

const formatSize = useSize<FormItemProps>(props);

const _styleModule = inject('_styleModule', '');
const KFormItemRef = ref<any>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormItemRef));

const injectShowColon = inject(
  '__showColon__',
  computed(() => false)
);
</script>

<style lang="less">
@import './style.less';
</style>
