<template>
  <el-switch
    ref="kSwitchRef"
    :class="['k-switch', $styleModule]"
    v-bind="$attrs"
    :size="getCompSize(size)"
    :style="{
      '--el-switch-on-color': props.switchOnColor,
      '--el-switch-off-color': props.switchOffColor
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElSwitch } from 'element-plus';
import { SwitchProps } from './type';
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KSwitch'
});

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'base',
  switchOnColor: '',
  switchOffColor: ''
});

const kSwitchRef = ref();
const instance: any = {};
handleExpose(instance, kSwitchRef, 'KSwitch');
defineExpose(instance);

</script>

<style lang="less">
@import './style.less';
</style>