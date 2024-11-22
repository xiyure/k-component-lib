<template>
  <el-select
    ref="inputRef"
    class="k-select"
    :class="[_styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, provide, inject } from 'vue';
import { ElSelect } from 'element-plus';
import { SelectProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KSelect'
});

const props = withDefaults(defineProps<SelectProps>(), {});

const formatSize = useSize<SelectProps>(props);

const _styleModule = inject('_styleModule', '');

const inputRef = ref<any>();

provide(SIZE_KEY, formatSize);

const instance: any = {};
defineExpose(getExposeProxy(instance, inputRef));
</script>

<style lang="less">
@import './style.less';
</style>
