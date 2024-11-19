<template>
  <el-dropdown
    ref="kDropDownRef"
    :class="['k-dropdown', _styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <slot name="title">
      <span class="k-dropdown-link">{{ props.title }}</span>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <slot></slot>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, provide, inject } from 'vue';
import { ElDropdown } from 'element-plus';
import { DropDownProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KDropdown'
});

const _styleModule = inject('_styleModule', '');
const props = withDefaults(defineProps<DropDownProps>(), {});

const formatSize = useSize<DropDownProps>(props);

const kDropDownRef = ref();

provide(SIZE_KEY, formatSize);

const instance: any = {};
defineExpose(getExposeProxy(instance, kDropDownRef));

</script>

<style lang="less">
@import './style.less';
</style>