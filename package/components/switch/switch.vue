<template>
  <el-switch
    ref="kSwitchRef"
    :class="['k-switch', _styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size ?? __size__)"
    :style="{
      '--el-switch-on-color': props.switchOnColor,
      '--el-switch-off-color': props.switchOffColor,
    }"
  />
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElSwitch } from 'element-plus';
import { SwitchProps } from './type';
import { getCompSize, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KSwitch'
});

const props = withDefaults(defineProps<SwitchProps>(), {
  switchOnColor: '',
  switchOffColor: ''
});

const _styleModule = inject('_styleModule', '');
const kSwitchRef = ref();

const instance: any = {};
defineExpose(getExposeProxy(instance, kSwitchRef));

const __size__ = inject(
  '__size__',
  computed(() => 'base')
);
</script>

<style lang="less">
@import './style.less';
</style>
