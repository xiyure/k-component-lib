<template>
  <el-switch
    ref="kSwitchRef"
    v-model="modelValue"
    class="k-switch"
    v-bind="attrs"
    :style="{
      '--el-switch-on-color': props.switchOnColor,
      '--el-switch-off-color': props.switchOffColor
    }"
    inline-prompt
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { SwitchProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KSwitch'
});

const props = withDefaults(defineProps<SwitchProps>(), {
  switchOnColor: '',
  switchOffColor: ''
});

const emits = defineEmits(['update:modelValue', 'change']);

const kSwitchRef = ref();
const modelValue = ref(props.modelValue);

const attrs = computed(() => ({
  width: props.width,
  loading: props.loading,
  disabled: props.disabled,
  activeText: props.activeText,
  inactiveText: props.inactiveText,
  size: getCompSize(props.size)
}));

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