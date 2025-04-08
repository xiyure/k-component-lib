<template>
  <el-select
    ref="inputRef"
    class="k-select"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in inheritSlots($slots)" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template #default>
      <k-options>
        <slot></slot>
      </k-options>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { ElSelect } from 'element-plus';
import KOptions from './options';
import { SelectProps } from './type';
import { getExposeProxy } from '../../utils';
import { SIZE_KEY, useSize, useInheritSlot } from '../../hooks';

defineOptions({
  name: 'KSelect'
});

const props = withDefaults(defineProps<SelectProps>(), {});

const formatSize = useSize<SelectProps>(props);

const inputRef = ref<any>();

const inheritSlots = useInheritSlot(['default']);

provide(SIZE_KEY, formatSize);

const instance: any = {};
defineExpose(getExposeProxy(instance, inputRef));
</script>

<style lang="less">
@import './style.less';
</style>
