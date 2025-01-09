<template>
  <el-switch
    ref="kSwitchRef"
    :class="['k-switch', _styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
    :style="switchStyle"
  />
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { ElSwitch } from 'element-plus';
import { SwitchProps } from './type';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KSwitch'
});

const _styleModule = inject('_styleModule', '');
const props = withDefaults(defineProps<SwitchProps>(), {
  activeColor: '',
  inactiveColor: ''
});
const DEFAULT_STYLE = {
  '--el-switch-on-color': props.activeColor,
  '--el-switch-off-color': props.inactiveColor
};

const switchStyle = computed(() => Object.assign(DEFAULT_STYLE, props.style ?? {}));

const formatSize = useSize<SwitchProps>(props);
const kSwitchRef = ref();

const instance: any = {};
defineExpose(getExposeProxy(instance, kSwitchRef));
</script>

<style lang="less">
@import './style.less';
</style>
