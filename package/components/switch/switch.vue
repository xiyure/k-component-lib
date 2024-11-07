<template>
  <el-switch
    ref="kSwitchRef"
    :class="['k-switch', _styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
    :style="{
      '--el-switch-on-color': props.switchOnColor,
      '--el-switch-off-color': props.switchOffColor,
    }"
  />
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElSwitch } from 'element-plus';
import { SwitchProps } from './type';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KSwitch'
});

const props = withDefaults(defineProps<SwitchProps>(), {
  switchOnColor: '',
  switchOffColor: ''
});

const _styleModule = inject('_styleModule', '');

const formatSize = useSize<SwitchProps>(props);

const kSwitchRef = ref();

const instance: any = {};
defineExpose(getExposeProxy(instance, kSwitchRef));
</script>

<style lang="less">
@import './style.less';
</style>
