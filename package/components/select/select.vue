<template>
  <el-select
    ref="inputRef"
    class="k-select"
    :class="[_styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size ?? __size__)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElSelect } from 'element-plus';
import { SelectInputProps } from './type';
import { getCompSize, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KSelect'
});

const props = withDefaults(defineProps<SelectInputProps>(), {});

const _styleModule = inject('_styleModule', '');
const __size__ = inject(
  '__size__',
  computed(() => 'base')
);

const inputRef = ref<any>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, inputRef));
</script>

<style lang="less">
@import './style.less';
</style>
