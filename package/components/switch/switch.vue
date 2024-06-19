<template>
  <el-switch
    ref="kSwitchRef"
    class="k-switch"
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
import { SwitchProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KSwitch'
});

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'base',
  switchOnColor: '',
  switchOffColor: ''
});

const kSwitchRef = ref();

function focus() {
  kSwitchRef.value?.focus();
}

defineExpose({ focus });

</script>

<style lang="less">
@import './style.less';
</style>