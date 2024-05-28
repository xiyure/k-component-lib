<template>
  <div class="k-switch">
    <el-switch
      v-model="modelValue"
      v-bind="attrs"
      :style="{
        '--el-switch-on-color': props.switchOnColor,
        '--el-switch-off-color': props.switchOffColor
      }"
      inline-prompt
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ISwitchProps } from '../../interface/index';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KSwitch'
});

const props = withDefaults(defineProps<ISwitchProps>(), {
  switchOnColor: '',
  switchOffColor: ''
});

const emits = defineEmits(['update:modelValue', 'change']);

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

const handleChange = (value: boolean) => {
  emits('update:modelValue', value);
  emits('change', value);
};

</script>

<style lang="less">
@import './style.less';
</style>