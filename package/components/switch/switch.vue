<template>
  <el-switch
    ref="kSwitchRef"
    v-model="modelValue"
    class="k-switch"
    v-bind="$attrs"
    :size="getCompSize(size)"
    :style="{
      '--el-switch-on-color': props.switchOnColor,
      '--el-switch-off-color': props.switchOffColor
    }"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
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

const emits = defineEmits(['update:modelValue', 'change']);

const kSwitchRef = ref();
const modelValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
});

function handleChange(value: boolean) {
  emits('update:modelValue', value);
  emits('change', value);
}
function focus() {
  kSwitchRef.value?.focus();
}

defineExpose({ focus });

</script>

<style lang="less">
@import './style.less';
</style>