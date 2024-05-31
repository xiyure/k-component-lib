<template>
  <div class="k-radio">
    <el-radio
      v-model="modelValue"
      v-bind="attrs"
      @change="handleChange"
      :class=[getSizeClass]
    >
      <slot></slot>
    </el-radio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { SelectButtonProps } from './type';

defineOptions({
  name: 'KRadio'
});

const props = withDefaults(defineProps<SelectButtonProps>(), {
  size: 'lg',
});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);

const attrs = computed(() => ({
  value: props.value,
  label: props.label,
  disabled: props.disabled,
  // size: getCompSize(props.size)
}));

const getSizeClass = computed(() => {
  return props.size !== '' ? `el-radio--${props.size}` : '';
});

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